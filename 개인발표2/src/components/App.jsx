import { useEffect, useMemo, useState } from "react";
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
  demoAccount,
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
    cardNumber: "",
    expiry: "",
    cvc: "",
    agreed: false,
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
    return savedUser ? JSON.parse(savedUser) : null;
  });

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
    const isComplete =
      form.departure &&
      form.arrival &&
      form.departDate &&
      (form.tripType === "one-way" || form.returnDate);

    if (!isComplete) {
      setMessage("출발지, 도착지와 여행 날짜를 모두 입력해 주세요.");
      setFlightResults([]);
      setReturnFlightResults([]);
      return;
    }

    setSearchedTrip({ ...form });
    setFlightResults(createFlightSchedules(form));
    setReturnFlightResults([]);
    setSelectedOutbound(null);
    setSelectedFlight(null);
    setMessage(`${form.departure} → ${form.arrival} 항공편 6개를 찾았습니다.`);
  };

  const selectOutboundFlight = (flight) => {
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
    event.preventDefault();
    setPaymentPin("");
    setPaymentPinOpen(true);
  };

  const reserveFlight = (event) => {
    event.preventDefault();
    if (paymentPin.length !== 4) return;
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
        method: "신용/체크카드",
        lastFour: paymentForm.cardNumber.replace(/\s/g, "").slice(-4),
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
    setPaymentForm({ cardNumber: "", expiry: "", cvc: "", agreed: false });
  };

  // 로그인 및 로그아웃 처리
  const login = (event) => {
    event.preventDefault();

    if (
      loginForm.id !== demoAccount.id ||
      loginForm.password !== demoAccount.password
    ) {
      setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    const loggedInUser = {
      id: demoAccount.id,
      name: demoAccount.name,
      avatar: "pilot",
    };
    localStorage.setItem("skyfinder-user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setLoginForm({ id: "", password: "" });
    setLoginError("");
    setLoginOpen(false);
    setLoginSuccess(true);
  };
  const logout = () => {
    localStorage.removeItem("skyfinder-user");
    setUser(null);
    setProfileOpen(false);
  };
  const openProfile = () => {
    setProfileForm({ name: user.name, avatar: user.avatar ?? "pilot" });
    setProfileOpen(true);
  };
  const saveProfile = (event) => {
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
          login,
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
          <button className="primary-button" type="submit">
            항공권 검색
          </button>
        </form>
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
                      <strong>{flight.arrivalTime}{flight.arrivalDayOffset > 0 && <sup>+{flight.arrivalDayOffset}일</sup>}</strong>
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
                    <strong>{flight.arrivalTime}{flight.arrivalDayOffset > 0 && <sup>+{flight.arrivalDayOffset}일</sup>}</strong>
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
          <p className="route-notice">
            주요 직항 노선 예시이며 실제 운항지는 계절과 항공사 일정에 따라
            변경될 수 있습니다.
          </p>
        </section>
      </main>
    </>
  );
}
