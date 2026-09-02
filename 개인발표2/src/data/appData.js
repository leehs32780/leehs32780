// ============================================================
// 1. 공항 및 직항 노선 데이터
// ============================================================
export const airports = [
  {
    code: "ICN",
    name: "인천국제공항",
    area: "서울·인천",
    routes: [
      { type: "일본", cities: "도쿄 · 오사카 · 후쿠오카 · 삿포로" },
      { type: "아시아", cities: "베이징 · 상하이 · 타이베이 · 방콕 · 다낭" },
      { type: "장거리", cities: "뉴욕 · 로스앤젤레스 · 파리 · 런던" },
    ],
  },
  {
    code: "GMP",
    name: "김포국제공항",
    area: "서울",
    routes: [
      { type: "국내", cities: "제주 · 부산 · 여수" },
      {
        type: "국제",
        cities: "도쿄(하네다) · 오사카 · 베이징 · 상하이 · 타이베이(쑹산)",
      },
    ],
  },
  {
    code: "TAE",
    name: "대구국제공항",
    area: "대구",
    routes: [
      { type: "국내", cities: "제주" },
      { type: "국제", cities: "도쿄 · 오사카 · 타이베이 · 다낭" },
    ],
  },
  {
    code: "PUS",
    name: "김해국제공항",
    area: "부산",
    routes: [
      { type: "국내", cities: "제주 · 김포" },
      {
        type: "국제",
        cities: "도쿄 · 오사카 · 후쿠오카 · 타이베이 · 방콕 · 다낭",
      },
    ],
  },
  {
    code: "CJU",
    name: "제주국제공항",
    area: "제주",
    routes: [
      { type: "국내", cities: "김포 · 김해 · 대구 · 청주 · 광주" },
      { type: "국제", cities: "도쿄 · 오사카 · 타이베이 · 상하이 · 홍콩" },
    ],
  },
  {
    code: "CJJ",
    name: "청주국제공항",
    area: "충북·대전권",
    routes: [
      { type: "국내", cities: "제주" },
      { type: "국제", cities: "도쿄 · 오사카 · 타이베이 · 다낭 · 나트랑" },
    ],
  },
];

export const airportEnglishNames = {
  ICN: "Incheon International Airport",
  GMP: "Gimpo International Airport",
  TAE: "Daegu International Airport",
  PUS: "Gimhae International Airport",
  CJU: "Jeju International Airport",
  CJJ: "Cheongju International Airport",
};

// ============================================================
// 2. 인기 여행지와 가격 그래프 데이터
// ============================================================
export const destinations = [
  {
    id: "tokyo",
    country: "일본",
    city: "도쿄",
    from: 198000,
    prices: [238000, 219000, 198000, 225000, 247000],
  },
  {
    id: "paris",
    country: "프랑스",
    city: "파리",
    from: 892000,
    prices: [965000, 928000, 892000, 910000, 948000],
  },
  {
    id: "newyork",
    country: "미국",
    city: "뉴욕",
    from: 1120000,
    prices: [1240000, 1185000, 1120000, 1168000, 1215000],
  },
];

export const airportAddresses = {
  ICN: "인천광역시 영종구 공항로 271 (제1여객터미널)\n인천광역시 영종구 제2터미널대로 446 (제2여객터미널)",
  GMP: "서울 강서구 하늘길 38",
  TAE: "대구 동구 공항로 221",
  PUS: "부산 강서구 공항진입로 108",
  CJU: "제주 제주시 공항로 2 제주국제공항",
  CJJ: "충북 청주시 청원구 내수읍 오창대로 980 5-4",
};

// ============================================================
// 3. 공통 설정: 가격 표시, 로그인 계정, 배경 영상
// ============================================================
export const formatPrice = (price) => `${price.toLocaleString("ko-KR")}원`;

export const demoAccount = {
  id: "skyfinder",
  password: "1234",
  name: "여행자",
};

export const airlines = [
  { name: "대한항공", code: "KE", color: "#1976c9" },
  { name: "아시아나항공", code: "OZ", color: "#c52b36" },
  { name: "제주항공", code: "7C", color: "#f26b21" },
  { name: "진에어", code: "LJ", color: "#5a9f38" },
  { name: "티웨이항공", code: "TW", color: "#d92832" },
  { name: "에어부산", code: "BX", color: "#245ea8" },
];

export const travelScenes = [
  "/videos/travel-resort.mp4",
  "/videos/travel-mountain.mp4",
  "/videos/travel-flight.mp4",
];

// ============================================================
// 4. 도착 도시별 국가·공항명·공항 코드
// ============================================================
export const countryByCity = {
  도쿄: "일본",
  오사카: "일본",
  후쿠오카: "일본",
  삿포로: "일본",
  베이징: "중국",
  상하이: "중국",
  홍콩: "홍콩",
  타이베이: "대만",
  방콕: "태국",
  다낭: "베트남",
  나트랑: "베트남",
  뉴욕: "미국",
  로스앤젤레스: "미국",
  파리: "프랑스",
  런던: "영국",
};

export const destinationAirports = {
  도쿄: ["나리타 국제공항", "NRT"],
  "도쿄(하네다)": ["도쿄 국제공항(하네다)", "HND"],
  오사카: ["간사이 국제공항", "KIX"],
  후쿠오카: ["후쿠오카 공항", "FUK"],
  삿포로: ["신치토세 공항", "CTS"],
  베이징: ["베이징 수도 국제공항", "PEK"],
  상하이: ["상하이 푸동 국제공항", "PVG"],
  홍콩: ["홍콩 국제공항", "HKG"],
  타이베이: ["타이완 타오위안 국제공항", "TPE"],
  "타이베이(쑹산)": ["타이베이 쑹산 공항", "TSA"],
  방콕: ["수완나품 국제공항", "BKK"],
  다낭: ["다낭 국제공항", "DAD"],
  나트랑: ["깜라인 국제공항", "CXR"],
  뉴욕: ["존 F. 케네디 국제공항", "JFK"],
  로스앤젤레스: ["로스앤젤레스 국제공항", "LAX"],
  파리: ["샤를 드골 국제공항", "CDG"],
  런던: ["런던 히드로 국제공항", "LHR"],
};

export const domesticAirports = {
  김포: ["김포국제공항", "GMP"],
  부산: ["김해국제공항", "PUS"],
  김해: ["김해국제공항", "PUS"],
  대구: ["대구국제공항", "TAE"],
  제주: ["제주국제공항", "CJU"],
  청주: ["청주국제공항", "CJJ"],
  여수: ["여수공항", "RSU"],
  광주: ["광주공항", "KWJ"],
};

const koreaAirports = ["ICN", "GMP", "PUS", "TAE", "CJU", "CJJ", "RSU", "KWJ"];
const airportTimeZones = {
  ICN: "Asia/Seoul", GMP: "Asia/Seoul", PUS: "Asia/Seoul", TAE: "Asia/Seoul", CJU: "Asia/Seoul", CJJ: "Asia/Seoul", RSU: "Asia/Seoul", KWJ: "Asia/Seoul",
  NRT: "Asia/Tokyo", HND: "Asia/Tokyo", KIX: "Asia/Tokyo", FUK: "Asia/Tokyo", CTS: "Asia/Tokyo",
  PEK: "Asia/Shanghai", PVG: "Asia/Shanghai", HKG: "Asia/Hong_Kong", TPE: "Asia/Taipei", TSA: "Asia/Taipei",
  BKK: "Asia/Bangkok", DAD: "Asia/Ho_Chi_Minh", CXR: "Asia/Ho_Chi_Minh",
  JFK: "America/New_York", LAX: "America/Los_Angeles", CDG: "Europe/Paris", LHR: "Europe/London",
};
const durationByForeignAirport = { NRT: 150, HND: 140, KIX: 110, FUK: 85, CTS: 160, PEK: 130, PVG: 120, HKG: 220, TPE: 160, TSA: 155, BKK: 350, DAD: 300, CXR: 310, JFK: 840, LAX: 660, CDG: 850, LHR: 870 };

function timeZoneOffset(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return Date.UTC(+values.year, +values.month - 1, +values.day, +values.hour, +values.minute, +values.second) - date.getTime();
}

function localTimeToUtc(dateText, timeText, timeZone) {
  const [year, month, day] = dateText.split("-").map(Number);
  const [hour, minute] = timeText.split(":").map(Number);
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  return new Date(guess.getTime() - timeZoneOffset(guess, timeZone));
}

function localParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return { date: `${values.year}-${values.month}-${values.day}`, time: `${values.hour}:${values.minute}` };
}

// 출발 공항 코드를 받아 국내 노선과 국가별 국제 노선을 분류합니다.
export function getArrivalCountries(departureCode) {
  const airport = airports.find(({ code }) => code === departureCode);
  if (!airport) return { domestic: [], international: [] };

  const domesticCities = airport.routes
    .filter(({ type }) => type === "국내")
    .flatMap(({ cities }) => cities.split(" · "));
  const internationalCities = airport.routes
    .filter(({ type }) => type !== "국내")
    .flatMap(({ cities }) => cities.split(" · "));

  const countries = new Map();
  internationalCities.forEach((city) => {
    const baseCity = city.replace(/\(.+\)/, "");
    const country = countryByCity[baseCity] ?? baseCity;
    countries.set(country, [...(countries.get(country) ?? []), city]);
  });

  return {
    domestic: domesticCities.map((city) => {
      const [airportName, airportCode] = domesticAirports[city] ?? [city, city];
      return { city, airportName, airportCode };
    }),
    international: Array.from(countries, ([country, cities]) => ({
      country,
      cities,
    })),
  };
}

// 검색 조건으로 발표용 항공편 목록을 생성합니다.
export function createFlightSchedules(searchForm) {
  const isInternational = !koreaAirports.includes(searchForm.departure) || !koreaAirports.includes(searchForm.arrival);
  const startPrice = isInternational ? 238000 : 68000;
  const departureTimes = ["06:40", "08:15", "10:30", "13:20", "16:10", "19:25"];
  const foreignCode = koreaAirports.includes(searchForm.departure) ? searchForm.arrival : searchForm.departure;
  const durationMinutes = durationByForeignAirport[foreignCode] ?? 80;
  const departureZone = airportTimeZones[searchForm.departure] ?? "Asia/Seoul";
  const arrivalZone = airportTimeZones[searchForm.arrival] ?? "Asia/Seoul";

  return airlines.map((airline, index) => {
    const departureUtc = localTimeToUtc(searchForm.departDate, departureTimes[index], departureZone);
    const arrival = localParts(new Date(departureUtc.getTime() + durationMinutes * 60000), arrivalZone);
    const dayOffset = Math.round((Date.parse(`${arrival.date}T00:00:00Z`) - Date.parse(`${searchForm.departDate}T00:00:00Z`)) / 86400000);
    return {
      id: `${airline.code}-${searchForm.departDate}-${index}`, airline,
      flightNumber: `${airline.code}${120 + index * 17}`,
      departureTime: departureTimes[index], arrivalTime: arrival.time,
      arrivalDayOffset: dayOffset,
      duration: `${Math.floor(durationMinutes / 60)}시간 ${durationMinutes % 60 ? `${durationMinutes % 60}분` : ""}`.trim(),
      seats: 3 + index * 2,
      price: startPrice + [32000, 18000, 0, 12000, 7000, 24000][index], tripType: searchForm.tripType,
    };
  });
}

export function getAirportLabel(code) {
  const departureAirport = airports.find((airport) => airport.code === code);
  if (departureAirport) return departureAirport.name;

  const allDestinations = [
    ...Object.entries(domesticAirports),
    ...Object.entries(destinationAirports),
  ];
  const destination = allDestinations.find(
    ([, [, airportCode]]) => airportCode === code,
  );
  return destination?.[1][0] ?? code;
}
