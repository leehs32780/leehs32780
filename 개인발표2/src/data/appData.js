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
// 3. 공통 설정: 가격 표시, 항공사, 배경 영상
// ============================================================
export const formatPrice = (price) => `${price.toLocaleString("ko-KR")}원`;

export const airlines = [
  { name: "대한항공", code: "KE", color: "#1976c9" },
  { name: "아시아나항공", code: "OZ", color: "#c52b36" },
  { name: "제주항공", code: "7C", color: "#f26b21" },
  { name: "진에어", code: "LJ", color: "#5a9f38" },
  { name: "티웨이항공", code: "TW", color: "#d92832" },
  { name: "에어부산", code: "BX", color: "#245ea8" },
  { name: "이스타항공", code: "ZE", color: "#d9232e" },
  { name: "에어서울", code: "RS", color: "#20a887" },
  { name: "에어로케이", code: "RF", color: "#6d38a8" },
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
// 공항별 현지 시각을 계산하기 위한 IANA 표준 시간대입니다.
const airportTimeZones = {
  ICN: "Asia/Seoul",
  GMP: "Asia/Seoul",
  PUS: "Asia/Seoul",
  TAE: "Asia/Seoul",
  CJU: "Asia/Seoul",
  CJJ: "Asia/Seoul",
  RSU: "Asia/Seoul",
  KWJ: "Asia/Seoul",
  NRT: "Asia/Tokyo",
  HND: "Asia/Tokyo",
  KIX: "Asia/Tokyo",
  FUK: "Asia/Tokyo",
  CTS: "Asia/Tokyo",
  PEK: "Asia/Shanghai",
  PVG: "Asia/Shanghai",
  HKG: "Asia/Hong_Kong",
  TPE: "Asia/Taipei",
  TSA: "Asia/Taipei",
  BKK: "Asia/Bangkok",
  DAD: "Asia/Ho_Chi_Minh",
  CXR: "Asia/Ho_Chi_Minh",
  JFK: "America/New_York",
  LAX: "America/Los_Angeles",
  CDG: "Europe/Paris",
  LHR: "Europe/London",
};
const durationByForeignAirport = {
  NRT: 150,
  HND: 140,
  KIX: 110,
  FUK: 85,
  CTS: 160,
  PEK: 130,
  PVG: 120,
  HKG: 220,
  TPE: 160,
  TSA: 155,
  BKK: 350,
  DAD: 300,
  CXR: 310,
  JFK: 840,
  LAX: 660,
  CDG: 850,
  LHR: 870,
};

// 실시간 예약 API를 사용하지 않는 발표용 화면이므로 최근 시세를 참고한 편도 기준가를 사용합니다.
// 왕복 검색에서는 가는 편과 오는 편 가격이 합산되며, 미주·유럽이 근거리 가격으로 표시되지 않습니다.
const baseFareByDestination = {
  NRT: 190000,
  HND: 210000,
  KIX: 170000,
  FUK: 140000,
  CTS: 230000,
  PEK: 260000,
  PVG: 230000,
  HKG: 300000,
  TPE: 230000,
  TSA: 250000,
  BKK: 360000,
  DAD: 280000,
  CXR: 300000,
  JFK: 750000,
  LAX: 520000,
  CDG: 550000,
  LHR: 590000,
};
const domesticBaseFareByRoute = {
  "CJU-GMP": 72000,
  "GMP-PUS": 68000,
  "GMP-RSU": 76000,
  "CJU-PUS": 65000,
  "CJU-TAE": 62000,
  "CJJ-CJU": 67000,
  "CJU-KWJ": 59000,
};
const airlineFareRate = {
  KE: 1.12,
  OZ: 1.1,
  "7C": 0.94,
  LJ: 0.96,
  TW: 0.93,
  BX: 0.95,
  ZE: 0.92,
  RS: 0.94,
  RF: 0.93,
};
const scheduleFareRates = [
  1.08, 0.96, 1.03, 0.92, 1.06, 1.0, 0.95, 0.98, 1.11, 1.05,
];

// 2026년 9월 직항 운항 자료를 기준으로 실제 취항 범위를 벗어난 항공사가
// 검색되지 않도록 출발 공항과 도착 공항의 정확한 조합별 운항사를 제한합니다.
// 키는 출발·도착 순서와 무관하게 공항 코드를 알파벳순으로 연결해 사용합니다.
const airlineCodesByRoute = {
  "ICN-NRT": ["KE", "OZ", "7C", "LJ", "TW", "BX", "ZE", "RS"],
  "ICN-KIX": ["KE", "OZ", "7C", "LJ", "TW", "BX", "ZE", "RS", "RF"],
  "FUK-ICN": ["KE", "OZ", "7C", "LJ", "TW", "BX", "ZE", "RS"],
  "CTS-ICN": ["KE", "OZ", "7C", "LJ", "TW", "ZE"],
  "ICN-PEK": ["KE", "OZ", "7C"],
  "ICN-PVG": ["KE", "OZ", "7C", "LJ", "TW"],
  "ICN-TPE": ["KE", "OZ", "7C", "LJ", "TW"],
  "BKK-ICN": ["KE", "OZ", "7C", "LJ", "TW"],
  "DAD-ICN": ["KE", "OZ", "7C", "LJ", "TW"],
  "ICN-JFK": ["KE", "OZ"],
  "ICN-LAX": ["KE", "OZ"],
  "CDG-ICN": ["KE", "TW"],
  "ICN-LHR": ["KE", "OZ"],
  "GMP-HND": ["KE", "OZ"],
  "GMP-KIX": ["KE", "OZ", "7C"],
  "GMP-PEK": ["KE", "OZ"],
  "GMP-PVG": ["KE", "OZ"],
  "GMP-TSA": ["KE", "OZ", "TW"],
  "NRT-TAE": ["TW"],
  "KIX-TAE": ["TW"],
  "TAE-TPE": ["TW"],
  "DAD-TAE": ["TW"],
  "NRT-PUS": ["KE", "7C", "LJ", "BX"],
  "KIX-PUS": ["KE", "7C", "LJ", "TW", "BX"],
  "FUK-PUS": ["KE", "7C", "LJ", "BX"],
  "PUS-TPE": ["KE", "7C", "LJ", "BX"],
  "BKK-PUS": ["KE", "LJ", "BX"],
  "DAD-PUS": ["LJ", "BX"],
  "CJU-NRT": ["KE"],
  "CJU-KIX": ["TW"],
  "CJU-TPE": ["LJ", "TW", "ZE"],
  "CJU-PVG": ["LJ", "ZE"],
  "CJU-HKG": ["LJ"],
  "CJJ-NRT": ["RF", "ZE"],
  "CJJ-KIX": ["RF", "TW"],
  "CJJ-TPE": ["RF", "ZE"],
  "CJJ-DAD": ["RF", "TW"],
  "CJJ-CXR": ["RF", "TW"],
  "CJU-GMP": ["KE", "OZ", "7C", "LJ", "TW", "BX", "ZE", "RS"],
  "GMP-PUS": ["KE", "LJ", "BX"],
  "GMP-RSU": ["KE", "OZ"],
  "CJU-PUS": ["KE", "7C", "LJ", "BX"],
  "CJU-TAE": ["KE", "7C", "LJ", "TW"],
  "CJJ-CJU": ["KE", "7C", "LJ", "TW", "ZE", "RF"],
  "CJU-KWJ": ["KE", "OZ", "LJ"],
};

function getRouteAirlines(departure, arrival) {
  const routeKey = [departure, arrival].sort().join("-");
  const allowedCodes = airlineCodesByRoute[routeKey] ?? [];
  const routeAirlines = allowedCodes
    .map((code) => airlines.find((airline) => airline.code === code))
    .filter(Boolean);

  // 노선 코드로 만든 고정 시드로 운항사 순서를 섞습니다.
  // 같은 노선은 항상 같은 순서를 유지하지만 노선마다 첫 항공사와 배열 순서가 달라집니다.
  let seed = routeKey
    .split("")
    .reduce(
      (value, character) =>
        (Math.imul(value, 31) + character.charCodeAt(0)) >>> 0,
      2166136261,
    );
  const shuffledAirlines = [...routeAirlines];
  for (let index = shuffledAirlines.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const targetIndex = seed % (index + 1);
    [shuffledAirlines[index], shuffledAirlines[targetIndex]] = [
      shuffledAirlines[targetIndex],
      shuffledAirlines[index],
    ];
  }
  return shuffledAirlines;
}

// 특정 순간의 해당 지역 UTC 시차를 밀리초 단위로 구합니다.
function timeZoneOffset(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  return (
    Date.UTC(
      +values.year,
      +values.month - 1,
      +values.day,
      +values.hour,
      +values.minute,
      +values.second,
    ) - date.getTime()
  );
}

// 사용자가 입력한 공항 현지 출발 시각을 UTC 시각으로 변환합니다.
function localTimeToUtc(dateText, timeText, timeZone) {
  const [year, month, day] = dateText.split("-").map(Number);
  const [hour, minute] = timeText.split(":").map(Number);
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  return new Date(guess.getTime() - timeZoneOffset(guess, timeZone));
}

// UTC 시각을 도착 공항의 날짜와 시각 문자열로 변환합니다.
function localParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  return {
    date: `${values.year}-${values.month}-${values.day}`,
    time: `${values.hour}:${values.minute}`,
  };
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
  // 노선과 날짜를 기준으로 항공사, 가격, 출도착 시각이 포함된 샘플 스케줄을 만듭니다.
  const routeKey = [searchForm.departure, searchForm.arrival].sort().join("-");
  const foreignCode = koreaAirports.includes(searchForm.departure)
    ? searchForm.arrival
    : searchForm.departure;
  const isInternational = !koreaAirports.includes(foreignCode);
  const startPrice = isInternational
    ? (baseFareByDestination[foreignCode] ?? 320000)
    : (domesticBaseFareByRoute[routeKey] ?? 68000);
  // 모든 노선은 이 10개의 출발 시간대를 기준으로 정확히 10편을 표시합니다.
  const departureTimes = [
    "06:40",
    "08:15",
    "09:25",
    "10:30",
    "12:05",
    "13:20",
    "14:45",
    "16:10",
    "18:00",
    "19:25",
  ];
  const routeSeed = `${searchForm.departure}${searchForm.arrival}`
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);
  const routeAirlines = getRouteAirlines(
    searchForm.departure,
    searchForm.arrival,
  );
  const durationMinutes = durationByForeignAirport[foreignCode] ?? 80;
  const departureZone = airportTimeZones[searchForm.departure] ?? "Asia/Seoul";
  const arrivalZone = airportTimeZones[searchForm.arrival] ?? "Asia/Seoul";

  // 취항사가 10개보다 적으면 실제 운항사 목록을 순환해 서로 다른 시간대에 배치합니다.
  if (routeAirlines.length === 0) return [];
  return departureTimes.map((departureTime, index) => {
    const airline = routeAirlines[index % routeAirlines.length];
    const departureUtc = localTimeToUtc(
      searchForm.departDate,
      departureTime,
      departureZone,
    );
    const arrival = localParts(
      new Date(departureUtc.getTime() + durationMinutes * 60000),
      arrivalZone,
    );
    const dayOffset = Math.round(
      (Date.parse(`${arrival.date}T00:00:00Z`) -
        Date.parse(`${searchForm.departDate}T00:00:00Z`)) /
        86400000,
    );
    return {
      id: `${airline.code}-${searchForm.departDate}-${index}`,
      airline,
      flightNumber: `${airline.code}${120 + index * 17}`,
      departureTime,
      arrivalTime: arrival.time,
      arrivalDayOffset: dayOffset,
      duration:
        `${Math.floor(durationMinutes / 60)}시간 ${durationMinutes % 60 ? `${durationMinutes % 60}분` : ""}`.trim(),
      seats: 3 + index * 2,
      price:
        Math.round(
          (startPrice *
            scheduleFareRates[(index + routeSeed) % scheduleFareRates.length] *
            (airlineFareRate[airline.code] ?? 1)) /
            1000,
        ) * 1000,
      tripType: searchForm.tripType,
    };
  });
}

export function getAirportLabel(code) {
  // 공항 코드에 해당하는 한글 표시 이름을 국내·해외 데이터 전체에서 찾습니다.
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
