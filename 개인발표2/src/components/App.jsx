import { useEffect, useMemo, useRef, useState } from "react";
import AirportCard from "./AirportCard";
import AppOverlays from "./AppOverlays";
import Header from "./Header";
import MyBookingsModal from "./MyBookingsModal";
import PriceChart from "./PriceChart";
import { profileAvatarGroups, profileAvatars } from "../data/profileAvatars";
import {
  airports,
  airportEnglishNames,
  destinations,
  airportAddresses,
  formatPrice,
  travelScenes,
  destinationAirports,
  getArrivalCountries,
  createFlightSchedules,
  getAirportLabel,
} from "../data/appData";

// ============================================================
// 7. 메인 애플리케이션 컴포넌트
// ============================================================
export default function App() {
  // 항공권 검색 폼 상태
  const [form, setForm] = useState({
    tripType: "round-trip",
    departure: "",
    arrival: "",
    departDate: "",
    returnDate: "",
  });

  // 인기 여행지, 영상, 공항 카드 화면 상태
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isPopularOpen, setIsPopularOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef(null);
  const [flightResults, setFlightResults] = useState([]);
  const [returnFlightResults, setReturnFlightResults] = useState([]);
  const [searchedTrip, setSearchedTrip] = useState(null);
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    passengerName: "",
    phone: "",
    email: "",
  });
  const [paymentForm, setPaymentForm] = useState({
    method: "kakao",
    agreed: false,
  });
  const [savedCards, setSavedCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);
  const [sitePaymentPin, setSitePaymentPin] = useState("");
  const [sitePinForm, setSitePinForm] = useState({
    current: "",
    newPin: "",
    confirm: "",
  });
  const [cardForm, setCardForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [paymentPinOpen, setPaymentPinOpen] = useState(false);
  const [paymentPin, setPaymentPin] = useState("");
  const [bookingComplete, setBookingComplete] = useState(null);
  const [bookingsOpen, setBookingsOpen] = useState(false);
  const [bookings, setBookings] = useState(() =>
    JSON.parse(localStorage.getItem("skyfinder-bookings") ?? "[]"),
  );
  const [travelScene, setTravelScene] = useState(0);
  const [openAirport, setOpenAirport] = useState(null);

  // 로그인 창, 로그인 정보, 성공 안내 상태
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [signupForm, setSignupForm] = useState({
    id: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [signupError, setSignupError] = useState("");
  const [findIdName, setFindIdName] = useState("");
  const [resetForm, setResetForm] = useState({
    id: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", avatar: "pilot" });

  // Q & A 입력, 목록, 탭, 안내 메시지 상태
  const [qnaOpen, setQnaOpen] = useState(false);
  const [qnaForm, setQnaForm] = useState({ title: "", content: "" });
  const [qnaTab, setQnaTab] = useState("all");
  const [questionNotice, setQuestionNotice] = useState("");
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = JSON.parse(
      localStorage.getItem("skyfinder-questions") ?? "[]",
    );
    return [
      ...savedQuestions,
      {
        id: 1,
        title: "항공권 가격은 실시간인가요?",
        content: "표시된 가격의 기준이 궁금합니다.",
        answer:
          "현재 가격은 발표용 예상 가격이며 실제 예약 가격과 다를 수 있습니다.",
        ownerId: null,
      },
      {
        id: 2,
        title: "왕복에서 편도로 변경할 수 있나요?",
        content: "검색 중간에도 변경 가능한가요?",
        answer:
          "여행 유형에서 편도를 선택하면 귀국일 입력이 자동으로 비활성화됩니다.",
        ownerId: null,
      },
    ];
  });

  // 브라우저에 저장된 사용자가 있으면 로그인 상태를 복원합니다.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("skyfinder-user");
    if (!savedUser) return null;

    const parsedUser = JSON.parse(savedUser);
    const savedAccounts = JSON.parse(
      localStorage.getItem("skyfinder-accounts") ?? "[]",
    );

    // 예전에 제공하던 기본 계정의 로그인 기록은 제거합니다.
    if (
      parsedUser.id === "skyfinder" &&
      !savedAccounts.some(({ id }) => id === parsedUser.id)
    ) {
      localStorage.removeItem("skyfinder-user");
      return null;
    }

    return parsedUser;
  });

  useEffect(() => {
    if (!user) {
      setSavedCards([]);
      setSitePaymentPin("");
      return;
    }
    const stored = JSON.parse(
      localStorage.getItem(`skyfinder-payment-${user.id}`) ?? "[]",
    );
    const cards = Array.isArray(stored)
      ? stored
      : stored
        ? [{ ...stored, id: stored.id ?? Date.now() }]
        : [];
    const storedPin =
      localStorage.getItem(`skyfinder-site-pin-${user.id}`) ??
      cards.find(({ pin }) => pin)?.pin ??
      "";
    setSavedCards(cards.map(({ pin, ...card }) => card));
    setSitePaymentPin(storedPin);
    if (storedPin)
      localStorage.setItem(`skyfinder-site-pin-${user.id}`, storedPin);
  }, [user]);

  // 공항 카드 바깥을 클릭하면 열려 있던 상세 주소를 닫습니다.
  useEffect(() => {
    const closeAirportCard = (event) => {
      if (!event.target.closest(".airport-route-card")) {
        setOpenAirport(null);
      }
    };

    document.addEventListener("click", closeAirportCard);
    return () => document.removeEventListener("click", closeAirportCard);
  }, []);

  useEffect(() => () => clearTimeout(searchTimerRef.current), []);

  // 사용자가 작성한 질문만 브라우저 저장소에 보관합니다.
  useEffect(() => {
    localStorage.setItem(
      "skyfinder-questions",
      JSON.stringify(questions.filter(({ ownerId }) => ownerId)),
    );
  }, [questions]);

  // 오늘 날짜와 선택한 출발 공항의 도착지 목록을 계산합니다.
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const arrivalCountries = useMemo(
    () => getArrivalCountries(form.departure),
    [form.departure],
  );

  // 항공권 검색 폼 입력 처리
  const updateForm = ({ target }) =>
    setForm((current) => ({ ...current, [target.name]: target.value }));
  const updateTripType = ({ target }) =>
    setForm((current) => ({
      ...current,
      tripType: target.value,
      returnDate: target.value === "one-way" ? "" : current.returnDate,
    }));
  const updateAirport = ({ target }) => {
    if (target.name === "departure") {
      setForm((current) => ({
        ...current,
        departure: target.value,
        arrival: "",
      }));
      return;
    }

    setForm((current) => ({ ...current, arrival: target.value }));
  };

  // 항공권 검색 버튼 처리
  const searchFlights = (event) => {
    event.preventDefault();
    clearTimeout(searchTimerRef.current);
    const isComplete =
      form.departure &&
      form.arrival &&
      form.departDate &&
      (form.tripType === "one-way" || form.returnDate);

    if (!isComplete) {
      setIsSearching(false);
      setMessage("출발지, 도착지와 여행 날짜를 모두 입력해 주세요.");
      setFlightResults([]);
      setReturnFlightResults([]);
      return;
    }

    const submittedForm = { ...form };
    setIsSearching(true);
    setMessage("");
    setFlightResults([]);
    setReturnFlightResults([]);
    setSelectedOutbound(null);
    setSelectedFlight(null);
    searchTimerRef.current = setTimeout(() => {
      const schedules = createFlightSchedules(submittedForm);
      setSearchedTrip(submittedForm);
      setFlightResults(schedules);
      setMessage(
        `${submittedForm.departure} → ${submittedForm.arrival} 항공편 ${schedules.length}개를 찾았습니다.`,
      );
      setIsSearching(false);
    }, 3000);
  };

  const selectOutboundFlight = (flight) => {
    // 편도는 선택 즉시 예매 창을 열고, 왕복은 가는 편을 저장한 뒤 오는 편을 생성합니다.
    if (searchedTrip.tripType === "one-way") {
      setSelectedFlight(flight);
      return;
    }

    setSelectedOutbound(flight);
    setReturnFlightResults(
      createFlightSchedules({
        ...searchedTrip,
        departure: searchedTrip.arrival,
        arrival: searchedTrip.departure,
        departDate: searchedTrip.returnDate,
        tripType: "one-way",
      }),
    );
    setTimeout(
      () =>
        document
          .querySelector("#return-flights")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0,
    );
  };

  const requestPaymentPin = (event) => {
    // 탑승객 정보와 결제수단 선택이 끝나면 최종 비밀번호 확인 창을 엽니다.
    event.preventDefault();
    if (!user || !sitePaymentPin) {
      window.alert(
        "결제 전에 프로필에서 SKY FINDER 결제 PIN 6자리를 설정해 주세요.",
      );
      return;
    }
    setPaymentPin("");
    setPaymentPinOpen(true);
  };

  const reserveFlight = (event) => {
    // 결제 승인 후 예약 객체를 만들고 최신 예약과 전체 예약 목록에 모두 저장합니다.
    event.preventDefault();
    if (paymentPin.length !== 6) return;
    const selectedCard = paymentForm.method.startsWith("card:")
      ? savedCards.find(({ id }) => `card:${id}` === paymentForm.method)
      : savedCards[0];
    if (paymentPin !== sitePaymentPin) {
      window.alert("결제 PIN이 일치하지 않습니다.");
      setPaymentPin("");
      return;
    }
    const reservationNumber = `SF${Date.now().toString().slice(-8)}`;
    const totalAmount = (selectedOutbound?.price ?? 0) + selectedFlight.price;
    const reservation = {
      number: reservationNumber,
      flight: selectedFlight,
      outboundFlight: selectedOutbound ?? selectedFlight,
      returnFlight: selectedOutbound ? selectedFlight : null,
      trip: searchedTrip,
      passenger: { ...bookingForm },
      payment: {
        status: "결제 완료",
        amount: totalAmount,
        method: paymentForm.method.startsWith("card:")
          ? selectedCard.cardName
          : {
              kakao: "카카오페이",
              naver: "네이버페이",
              toss: "토스페이",
              payco: "페이코",
            }[paymentForm.method],
        lastFour: paymentForm.method.startsWith("card:")
          ? selectedCard.lastFour
          : "",
      },
      ownerId: user?.id ?? "guest",
    };
    localStorage.setItem(
      "skyfinder-latest-booking",
      JSON.stringify(reservation),
    );
    setBookingComplete(reservation);
    setBookings((current) => {
      const updatedBookings = [reservation, ...current];
      localStorage.setItem(
        "skyfinder-bookings",
        JSON.stringify(updatedBookings),
      );
      return updatedBookings;
    });
    setPaymentPinOpen(false);
    setPaymentPin("");
    setSelectedFlight(null);
    setBookingForm({ passengerName: "", phone: "", email: "" });
    setPaymentForm({ method: "kakao", agreed: false });
  };

  // 로그인 및 로그아웃 처리
  const login = (event) => {
    // localStorage의 가입 계정 중 입력한 아이디와 비밀번호가 같은 계정을 찾습니다.
    event.preventDefault();
    const savedAccounts = JSON.parse(
      localStorage.getItem("skyfinder-accounts") ?? "[]",
    );
    const account = savedAccounts.find(
      ({ id, password }) =>
        id === loginForm.id && password === loginForm.password,
    );
    if (!account) {
      setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    const loggedInUser = {
      id: account.id,
      name: account.name,
      avatar: "pilot",
    };
    localStorage.setItem("skyfinder-user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setLoginForm({ id: "", password: "" });
    setLoginError("");
    setLoginOpen(false);
    setLoginSuccess(true);
  };
  const signup = (event) => {
    // 아이디 중복과 비밀번호 조건을 검사한 뒤 새 계정을 브라우저에 저장합니다.
    event.preventDefault();
    const savedAccounts = JSON.parse(
      localStorage.getItem("skyfinder-accounts") ?? "[]",
    );
    if (savedAccounts.some(({ id }) => id === signupForm.id.trim())) {
      setSignupError("이미 사용 중인 아이디입니다.");
      return;
    }
    if (signupForm.password.length < 4) {
      setSignupError("비밀번호는 4자리 이상 입력해 주세요.");
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupError("비밀번호가 서로 일치하지 않습니다.");
      return;
    }
    const newAccount = {
      id: signupForm.id.trim(),
      name: signupForm.name.trim(),
      password: signupForm.password,
    };
    localStorage.setItem(
      "skyfinder-accounts",
      JSON.stringify([...savedAccounts, newAccount]),
    );
    setLoginForm({ id: newAccount.id, password: "" });
    setSignupForm({ id: "", name: "", password: "", confirmPassword: "" });
    setSignupError("");
    setAuthMode("login");
    setLoginError("회원가입이 완료되었습니다. 비밀번호를 입력해 로그인하세요.");
  };
  const findId = (event) => {
    // 가입할 때 사용한 이름이 같은 모든 아이디를 찾아 안내합니다.
    event.preventDefault();
    const savedAccounts = JSON.parse(
      localStorage.getItem("skyfinder-accounts") ?? "[]",
    );
    const matchedIds = savedAccounts
      .filter(({ name }) => name === findIdName.trim())
      .map(({ id }) => id);

    setRecoveryMessage(
      matchedIds.length
        ? `가입한 아이디: ${matchedIds.join(", ")}`
        : "입력한 이름으로 가입된 아이디가 없습니다.",
    );
  };
  const resetPassword = (event) => {
    // 아이디와 이름으로 본인을 확인한 뒤 해당 계정의 비밀번호만 교체합니다.
    event.preventDefault();
    if (resetForm.password.length < 4) {
      setRecoveryMessage("새 비밀번호는 4자리 이상 입력해 주세요.");
      return;
    }
    if (resetForm.password !== resetForm.confirmPassword) {
      setRecoveryMessage("새 비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    const savedAccounts = JSON.parse(
      localStorage.getItem("skyfinder-accounts") ?? "[]",
    );
    const accountIndex = savedAccounts.findIndex(
      ({ id, name }) =>
        id === resetForm.id.trim() && name === resetForm.name.trim(),
    );
    if (accountIndex < 0) {
      setRecoveryMessage("아이디와 이름이 일치하는 계정을 찾을 수 없습니다.");
      return;
    }

    const updatedAccounts = savedAccounts.map((account, index) =>
      index === accountIndex
        ? { ...account, password: resetForm.password }
        : account,
    );
    localStorage.setItem("skyfinder-accounts", JSON.stringify(updatedAccounts));
    setLoginForm({ id: resetForm.id.trim(), password: "" });
    setResetForm({ id: "", name: "", password: "", confirmPassword: "" });
    setRecoveryMessage("");
    setAuthMode("login");
    setLoginError("비밀번호가 재설정되었습니다. 새 비밀번호로 로그인하세요.");
  };
  const logout = () => {
    // 저장된 로그인 세션을 지우고 사용자 전용 화면을 닫습니다.
    localStorage.removeItem("skyfinder-user");
    setUser(null);
    setProfileOpen(false);
  };
  const openProfile = () => {
    // 현재 프로필과 사용자별 등록 카드를 불러온 뒤 설정 창을 엽니다.
    setProfileForm({ name: user.name, avatar: user.avatar ?? "pilot" });
    const stored = JSON.parse(
      localStorage.getItem(`skyfinder-payment-${user.id}`) ?? "[]",
    );
    const cards = Array.isArray(stored)
      ? stored
      : stored
        ? [{ ...stored, id: stored.id ?? Date.now() }]
        : [];
    const storedPin =
      localStorage.getItem(`skyfinder-site-pin-${user.id}`) ??
      cards.find(({ pin }) => pin)?.pin ??
      "";
    setSavedCards(cards.map(({ pin, ...card }) => card));
    setSitePaymentPin(storedPin);
    setSitePinForm({ current: "", newPin: "", confirm: "" });
    setEditingCardId(null);
    setCardForm({ cardName: "", cardNumber: "", expiry: "", cvc: "" });
    setProfileOpen(true);
  };
  const savePaymentMethod = (event) => {
    // 카드 형식을 검사하고 민감한 전체 번호 대신 끝 네 자리만 저장합니다.
    event.preventDefault();
    event.stopPropagation();
    const digits = cardForm.cardNumber.replace(/\D/g, "");
    const isEditing = editingCardId !== null;
    if (
      !cardForm.cardName.trim() ||
      (!isEditing && digits.length !== 16) ||
      (isEditing && digits.length !== 0 && digits.length !== 16) ||
      !/^\d{2}\/\d{2}$/.test(cardForm.expiry) ||
      (!isEditing && cardForm.cvc.length !== 3) ||
      (isEditing && cardForm.cvc.length !== 0 && cardForm.cvc.length !== 3)
    ) {
      window.alert("카드 이름, 카드번호, 유효기간과 CVC를 모두 확인해 주세요.");
      return;
    }
    const previousCard = savedCards.find(({ id }) => id === editingCardId);
    const card = {
      id: editingCardId ?? Date.now(),
      cardName: cardForm.cardName.trim(),
      lastFour: digits ? digits.slice(-4) : previousCard?.lastFour,
      expiry: cardForm.expiry,
    };
    const updatedCards = isEditing
      ? savedCards.map((savedCard) =>
          savedCard.id === editingCardId ? card : savedCard,
        )
      : [...savedCards, card];
    localStorage.setItem(
      `skyfinder-payment-${user.id}`,
      JSON.stringify(updatedCards),
    );
    setSavedCards(updatedCards);
    setEditingCardId(null);
    setCardForm({ cardName: "", cardNumber: "", expiry: "", cvc: "" });
  };
  const editPaymentMethod = (card) => {
    setEditingCardId(card.id);
    setCardForm({
      cardName: card.cardName,
      cardNumber: "",
      expiry: card.expiry,
      cvc: "",
    });
  };
  const cancelPaymentEdit = () => {
    setEditingCardId(null);
    setCardForm({ cardName: "", cardNumber: "", expiry: "", cvc: "" });
  };
  const saveSitePaymentPin = () => {
    if (sitePaymentPin && sitePinForm.current !== sitePaymentPin) {
      window.alert("현재 결제 PIN이 일치하지 않습니다.");
      return;
    }
    if (
      sitePinForm.newPin.length !== 6 ||
      sitePinForm.newPin !== sitePinForm.confirm
    ) {
      window.alert("새 PIN 6자리와 PIN 확인 값을 동일하게 입력해 주세요.");
      return;
    }
    localStorage.setItem(`skyfinder-site-pin-${user.id}`, sitePinForm.newPin);
    setSitePaymentPin(sitePinForm.newPin);
    setSitePinForm({ current: "", newPin: "", confirm: "" });
    window.alert(
      sitePaymentPin
        ? "결제 PIN이 변경되었습니다."
        : "결제 PIN이 등록되었습니다.",
    );
  };
  const removePaymentMethod = (cardId) => {
    // 선택한 카드만 삭제하고 나머지 등록 결제수단은 그대로 유지합니다.
    const updatedCards = savedCards.filter(({ id }) => id !== cardId);
    localStorage.setItem(
      `skyfinder-payment-${user.id}`,
      JSON.stringify(updatedCards),
    );
    setSavedCards(updatedCards);
    setPaymentForm((current) => ({
      ...current,
      method: current.method === `card:${cardId}` ? "kakao" : current.method,
    }));
    if (editingCardId === cardId) cancelPaymentEdit();
  };
  const deleteAccount = () => {
    // 재확인 후 계정과 해당 사용자가 만든 개인 데이터를 브라우저에서 제거합니다.
    if (
      !window.confirm(
        "정말 계정을 탈퇴하시겠습니까? 예약과 질문, 결제수단이 모두 삭제됩니다.",
      )
    )
      return;
    const userId = user.id;
    const savedAccounts = JSON.parse(
      localStorage.getItem("skyfinder-accounts") ?? "[]",
    );
    const remainingBookings = bookings.filter(
      ({ ownerId }) => ownerId !== userId,
    );
    const remainingQuestions = questions.filter(
      ({ ownerId }) => ownerId !== userId,
    );
    localStorage.setItem(
      "skyfinder-accounts",
      JSON.stringify(savedAccounts.filter(({ id }) => id !== userId)),
    );
    localStorage.setItem(
      "skyfinder-bookings",
      JSON.stringify(remainingBookings),
    );
    localStorage.setItem(
      "skyfinder-questions",
      JSON.stringify(remainingQuestions.filter(({ ownerId }) => ownerId)),
    );
    localStorage.removeItem(`skyfinder-payment-${userId}`);
    localStorage.removeItem(`skyfinder-site-pin-${userId}`);
    localStorage.removeItem("skyfinder-user");
    const latestBooking = JSON.parse(
      localStorage.getItem("skyfinder-latest-booking") ?? "null",
    );
    if (latestBooking?.ownerId === userId)
      localStorage.removeItem("skyfinder-latest-booking");
    setBookings(remainingBookings);
    setQuestions(remainingQuestions);
    setSavedCards([]);
    setSitePaymentPin("");
    setProfileOpen(false);
    setUser(null);
  };
  const saveProfile = (event) => {
    // 이름과 아바타 변경 내용을 현재 로그인 세션에도 반영합니다.
    event.preventDefault();
    const updatedUser = {
      ...user,
      name: profileForm.name.trim() || user.name,
      avatar: profileForm.avatar,
    };
    localStorage.setItem("skyfinder-user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setProfileOpen(false);
  };
  const selectedAvatar =
    profileAvatars.find(({ id }) => id === user?.avatar) ?? profileAvatars[0];

  // Q & A 질문 등록 및 삭제 처리
  const submitQuestion = (event) => {
    event.preventDefault();
    const title = qnaForm.title.trim();
    const content = qnaForm.content.trim();
    if (!title || !content) return;
    setQuestions((current) => [
      {
        id: Date.now(),
        title,
        content,
        answer: null,
        ownerId: user?.id ?? "guest",
        author: user?.name ?? "비회원",
      },
      ...current,
    ]);
    setQnaForm({ title: "", content: "" });
    setQuestionNotice("질문 작성이 완료되어 업로드되었습니다.");
    setQnaTab("mine");
  };
  const deleteQuestion = (questionId) => {
    setQuestions((current) => current.filter(({ id }) => id !== questionId));
    setQuestionNotice("질문이 삭제되었습니다.");
  };

  // 전체 질문과 현재 사용자가 작성한 질문을 탭에 맞게 분류합니다.
  const currentOwnerId = user?.id ?? "guest";
  const myQuestions = questions.filter(
    ({ ownerId }) => ownerId === currentOwnerId,
  );
  const visibleQuestions = qnaTab === "mine" ? myQuestions : questions;
  const myBookings = bookings.filter(
    ({ ownerId }) => ownerId === (user?.id ?? "guest"),
  );
  const cancelBooking = (reservationNumber) => {
    // 사용자 확인을 받은 뒤 선택한 예약만 목록과 localStorage에서 제거합니다.
    if (!window.confirm(`${reservationNumber} 예약을 취소하시겠습니까?`))
      return;
    setBookings((current) => {
      const updatedBookings = current.filter(
        ({ number }) => number !== reservationNumber,
      );
      localStorage.setItem(
        "skyfinder-bookings",
        JSON.stringify(updatedBookings),
      );
      return updatedBookings;
    });
  };

  return (
    <>
      {/* 8-1. 상단 로고, 메뉴, 로그인 프로필 */}
      <Header
        user={user}
        avatarIcon={selectedAvatar.icon}
        bookingCount={myBookings.length}
        onBookings={() => setBookingsOpen(true)}
        onLogin={() => setLoginOpen(true)}
        onLogout={logout}
        onProfile={openProfile}
        onQna={() => setQnaOpen(true)}
      />
      {bookingsOpen && (
        <MyBookingsModal
          bookings={myBookings}
          onClose={() => setBookingsOpen(false)}
          onCancel={cancelBooking}
          formatPrice={formatPrice}
          getAirportLabel={getAirportLabel}
        />
      )}

      <AppOverlays
        ui={{
          loginOpen,
          setLoginOpen,
          loginForm,
          setLoginForm,
          loginError,
          setLoginError,
          authMode,
          setAuthMode,
          signupForm,
          setSignupForm,
          signupError,
          setSignupError,
          signup,
          login,
          findIdName,
          setFindIdName,
          resetForm,
          setResetForm,
          recoveryMessage,
          setRecoveryMessage,
          findId,
          resetPassword,
          loginSuccess,
          setLoginSuccess,
          user,
          profileOpen,
          setProfileOpen,
          profileForm,
          setProfileForm,
          profileAvatars,
          profileAvatarGroups,
          saveProfile,
          savedCards,
          editingCardId,
          sitePaymentPin,
          sitePinForm,
          setSitePinForm,
          cardForm,
          setCardForm,
          savePaymentMethod,
          editPaymentMethod,
          cancelPaymentEdit,
          saveSitePaymentPin,
          removePaymentMethod,
          deleteAccount,
          qnaOpen,
          setQnaOpen,
          qnaForm,
          setQnaForm,
          submitQuestion,
          questionNotice,
          qnaTab,
          setQnaTab,
          visibleQuestions,
          myQuestions,
          currentOwnerId,
          deleteQuestion,
          selectedFlight,
          setSelectedFlight,
          searchedTrip,
          selectedOutbound,
          formatPrice,
          bookingForm,
          setBookingForm,
          requestPaymentPin,
          paymentForm,
          setPaymentForm,
          paymentPinOpen,
          setPaymentPinOpen,
          paymentPin,
          setPaymentPin,
          reserveFlight,
          bookingComplete,
          setBookingComplete,
        }}
      />
      {/* 8-5. 메인 배경 여행 영상 */}
      <aside className="travel-video-popup" aria-label="여행지 미리보기 영상">
        <video
          key={travelScene}
          src={travelScenes[travelScene]}
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 4) {
              setTravelScene((scene) => (scene + 1) % travelScenes.length);
            }
          }}
        />
      </aside>

      {/* 8-6. 항공권 검색과 공항별 직항 노선 화면 */}
      <main className="container">
        <h1>어디로 떠나시나요?</h1>
        <p className="sub-title">
          여러 항공사의 항공권을 한눈에 비교해 보세요.
        </p>
        {/* 항공권 검색 입력 영역 */}
        <form className="search-form" onSubmit={searchFlights}>
          <label>
            여행 유형
            <select
              name="tripType"
              value={form.tripType}
              onChange={updateTripType}
            >
              <option value="round-trip">왕복</option>
              <option value="one-way">편도</option>
            </select>
          </label>
          <label>
            출발지
            <select
              name="departure"
              value={form.departure}
              onChange={updateAirport}
            >
              <option value="">출발 공항 선택</option>
              {airports.map((airport) => (
                <option
                  key={airport.code}
                  value={airport.code}
                  disabled={airport.code === form.arrival}
                >
                  {airport.name} ({airport.code})
                </option>
              ))}
            </select>
          </label>
          <label>
            도착지
            <select
              name="arrival"
              value={form.arrival}
              onChange={updateAirport}
              disabled={!form.departure}
            >
              <option value="">
                {form.departure
                  ? "도착 공항 선택"
                  : "출발 공항을 먼저 선택해 주세요"}
              </option>
              {arrivalCountries.domestic.length > 0 && (
                <optgroup label="국내">
                  {arrivalCountries.domestic.map(
                    ({ city, airportName, airportCode }) => (
                      <option key={airportCode} value={airportCode}>
                        {city} - {airportName} ({airportCode})
                      </option>
                    ),
                  )}
                </optgroup>
              )}
              {arrivalCountries.international.map(({ country, cities }) => (
                <optgroup label={country} key={country}>
                  {cities.map((city) => {
                    const [airportName, airportCode] = destinationAirports[
                      city
                    ] ?? [city, city];
                    return (
                      <option key={city} value={airportCode}>
                        {city} – {airportName} ({airportCode})
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
          </label>
          <label>
            출국일
            <input
              name="departDate"
              type="date"
              min={today}
              value={form.departDate}
              onChange={updateForm}
            />
          </label>
          <label>
            귀국일
            <input
              name="returnDate"
              type="date"
              min={form.departDate || today}
              value={form.returnDate}
              onChange={updateForm}
              disabled={form.tripType === "one-way"}
            />
          </label>
          <button
            className="primary-button"
            type="submit"
            disabled={isSearching}
          >
            {isSearching ? "검색 중..." : "항공권 검색"}
          </button>
        </form>
        {isSearching && (
          <div
            className="flight-search-loading"
            role="status"
            aria-live="polite"
          >
            <span className="loading-plane" aria-hidden="true">
              ✈
            </span>
            <div>
              <strong>최적의 항공편을 찾고 있어요</strong>
              <small>항공사별 스케줄과 가격을 비교 중입니다.</small>
            </div>
            <i aria-hidden="true"></i>
          </div>
        )}
        {message && (
          <p className="search-message" role="status">
            {message}
          </p>
        )}
        {flightResults.length > 0 && (
          <section
            className="flight-results"
            aria-labelledby="flight-results-title"
          >
            <div className="flight-results-heading">
              <div>
                <span>AVAILABLE FLIGHTS</span>
                <h2 id="flight-results-title">항공 스케줄</h2>
                <p>
                  {getAirportLabel(searchedTrip.departure)} →{" "}
                  {getAirportLabel(searchedTrip.arrival)} ·{" "}
                  {searchedTrip.departDate}
                  {searchedTrip.tripType === "round-trip" &&
                    ` ~ ${searchedTrip.returnDate}`}
                </p>
              </div>
              <b>{searchedTrip.tripType === "round-trip" ? "왕복" : "편도"}</b>
            </div>
            <div className="flight-list">
              {flightResults.map((flight) => {
                const totalPrice = flight.price;
                return (
                  <article className="flight-card" key={flight.id}>
                    <div className="airline-info">
                      <span style={{ background: flight.airline.color }}>
                        {flight.airline.code}
                      </span>
                      <div>
                        <strong>{flight.airline.name}</strong>
                        <small>{flight.flightNumber} · 일반석</small>
                      </div>
                    </div>
                    <div className="flight-time">
                      <strong>{flight.departureTime}</strong>
                      <div>
                        <small>{flight.duration}</small>
                        <i></i>
                        <span>직항 · 현지시간</span>
                      </div>
                      <strong>
                        {flight.arrivalTime}
                        {flight.arrivalDayOffset > 0 && (
                          <sup>+{flight.arrivalDayOffset}일</sup>
                        )}
                      </strong>
                    </div>
                    <div className="flight-airports">
                      <span>{searchedTrip.departure}</span>
                      <span>{searchedTrip.arrival}</span>
                    </div>
                    <div className="flight-price">
                      <small>
                        {searchedTrip.tripType === "round-trip"
                          ? "가는 편 1인"
                          : "1인 편도"}
                      </small>
                      <strong>{formatPrice(totalPrice)}</strong>
                      <span>잔여 {flight.seats}석</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => selectOutboundFlight(flight)}
                    >
                      {searchedTrip.tripType === "round-trip"
                        ? "가는 편 선택"
                        : "예매하기"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}
        {returnFlightResults.length > 0 && selectedOutbound && (
          <section
            className="flight-results return-flight-results"
            id="return-flights"
            aria-labelledby="return-flights-title"
          >
            <div className="selected-outbound">
              <span>가는 편 선택 완료</span>
              <strong>
                {selectedOutbound.airline.name} {selectedOutbound.flightNumber}
              </strong>
              <p>
                {searchedTrip.departure} {selectedOutbound.departureTime} →{" "}
                {searchedTrip.arrival} {selectedOutbound.arrivalTime}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedOutbound(null);
                  setReturnFlightResults([]);
                }}
              >
                다시 선택
              </button>
            </div>
            <div className="flight-results-heading">
              <div>
                <span>RETURN FLIGHTS</span>
                <h2 id="return-flights-title">오는 편을 선택하세요</h2>
                <p>
                  {getAirportLabel(searchedTrip.arrival)} →{" "}
                  {getAirportLabel(searchedTrip.departure)} ·{" "}
                  {searchedTrip.returnDate}
                </p>
              </div>
              <b>2단계</b>
            </div>
            <div className="flight-list">
              {returnFlightResults.map((flight) => (
                <article className="flight-card" key={flight.id}>
                  <div className="airline-info">
                    <span style={{ background: flight.airline.color }}>
                      {flight.airline.code}
                    </span>
                    <div>
                      <strong>{flight.airline.name}</strong>
                      <small>{flight.flightNumber} · 일반석</small>
                    </div>
                  </div>
                  <div className="flight-time">
                    <strong>{flight.departureTime}</strong>
                    <div>
                      <small>{flight.duration}</small>
                      <i></i>
                      <span>직항 · 현지시간</span>
                    </div>
                    <strong>
                      {flight.arrivalTime}
                      {flight.arrivalDayOffset > 0 && (
                        <sup>+{flight.arrivalDayOffset}일</sup>
                      )}
                    </strong>
                  </div>
                  <div className="flight-airports">
                    <span>{searchedTrip.arrival}</span>
                    <span>{searchedTrip.departure}</span>
                  </div>
                  <div className="flight-price">
                    <small>오는 편 1인</small>
                    <strong>{formatPrice(flight.price)}</strong>
                    <span>잔여 {flight.seats}석</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFlight(flight)}
                  >
                    오는 편 선택
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
        {/* 인기 여행지 가격과 공항별 직항 노선 영역 */}
        <section className="route-section" id="direct-routes">
          <div className="section-heading">
            <div>
              <span className="eyebrow">DIRECT ROUTES</span>
              <h2>공항별 주요 직항 노선</h2>
            </div>
            <div className="route-heading-side">
              <p>출발 공항을 기준으로 목적지를 확인해 보세요.</p>
              <section
                className={`popular-section${isPopularOpen ? " is-open" : ""}`}
              >
                <button
                  className="popular-toggle"
                  type="button"
                  aria-expanded={isPopularOpen}
                  onClick={() => setIsPopularOpen((open) => !open)}
                >
                  <span>POPULAR</span>
                  <strong>
                    인기
                    <br />
                    여행지
                  </strong>
                </button>
                <div className="destination-list">
                  {destinations.map((destination) => (
                    <button
                      type="button"
                      className={`destination-card${selectedDestination?.id === destination.id ? " is-active" : ""}`}
                      key={destination.id}
                      onClick={() => setSelectedDestination(destination)}
                    >
                      <span>{destination.country}</span>
                      <strong>{destination.city}</strong>
                      <p>{formatPrice(destination.from)}부터</p>
                    </button>
                  ))}
                </div>
                {selectedDestination && (
                  <PriceChart
                    destination={selectedDestination}
                    formatPrice={formatPrice}
                  />
                )}
              </section>
            </div>
          </div>
          <div className="airport-route-list">
            {airports.map((airport) => (
              <AirportCard
                airport={airport}
                englishName={airportEnglishNames[airport.code]}
                address={airportAddresses[airport.code]}
                isOpen={openAirport === airport.code}
                onToggle={() => {
                  setOpenAirport((current) =>
                    current === airport.code ? null : airport.code,
                  );
                  setForm((current) => ({
                    ...current,
                    departure: airport.code,
                    arrival: "",
                  }));
                }}
                key={airport.code}
              />
            ))}
          </div>
          <aside className="route-promotion-strip" aria-label="여행 프로모션 예시">
            <article className="route-promotion route-promotion-baggage">
              <div className="promotion-copy">
                <span>AD · DEMO</span>
                <small>SKY BAGGAGE</small>
                <strong>수하물 걱정 없이<br />가볍게 출발하세요</strong>
                <p>추가 수하물 사전 예약 시 최대 20% 혜택</p>
              </div>
              <b className="promotion-icon" aria-hidden="true">🧳</b>
            </article>
            <article className="route-promotion route-promotion-stay">
              <div className="promotion-copy">
                <span>AD · DEMO</span>
                <small>SKY STAY</small>
                <strong>항공권 다음은<br />여행지 숙소 찾기</strong>
                <p>예약 변경이 자유로운 숙소를 모아보세요</p>
              </div>
              <b className="promotion-icon" aria-hidden="true">🏨</b>
            </article>
            <article className="route-promotion route-promotion-esim">
              <div className="promotion-copy">
                <span>AD · DEMO</span>
                <small>TRAVEL eSIM</small>
                <strong>도착하는 순간<br />바로 연결되는 여행</strong>
                <p>아시아 7일 데이터 플랜을 간편하게 준비하세요</p>
              </div>
              <b className="promotion-icon" aria-hidden="true">📶</b>
            </article>
          </aside>
          <p className="promotion-disclaimer">위 프로모션은 화면 구성을 위한 시연용 광고입니다.</p>
          <p className="route-notice">
            주요 직항 노선 예시이며 실제 운항지는 계절과 항공사 일정에 따라
            변경될 수 있습니다.
          </p>
        </section>
      </main>
    </>
  );
}
