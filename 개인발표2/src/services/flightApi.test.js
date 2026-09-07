import assert from "node:assert/strict";
import test from "node:test";
import { formatDuration, mapFlightOffers, fetchDirectFlights } from "./flightApi.js";
import { worldAirports } from "../data/worldAirports.js";
import { allRouteAirports, getDirectDestinationCodes, getAirportRouteCards, createFlightSchedules } from "../data/appData.js";
import { amadeusPlugin } from "../../amadeusPlugin.js";

const offer = {
  id: "1", price: "1250000", carrierName: "LUFTHANSA", marketingCarrierName: "UNITED AIRLINES",
  segment: {
    departure: { iataCode: "FRA", at: "2026-10-10T22:15:00" },
    arrival: { iataCode: "GRU", at: "2026-10-11T05:55:00" },
    carrierCode: "UA", number: "9000", operating: { carrierCode: "LH" }, duration: "PT12H40M",
  },
};

test("API 소요시간은 시차와 무관하게 표시하고 일 단위도 처리한다", () => {
  assert.equal(formatDuration("PT12H40M"), "12시간 40분");
  assert.equal(formatDuration("P1DT2H5M"), "26시간 5분");
  assert.equal(formatDuration(), "소요시간 미제공");
});

test("공동운항 운항사, 현지시각, 날짜 차이, 테스트 출처를 보존한다", () => {
  const [flight] = mapFlightOffers({ offers: [offer], environment: "test" }, "one-way");
  assert.equal(flight.airline.code, "LH");
  assert.equal(flight.marketingCarrierName, "UNITED AIRLINES");
  assert.equal(flight.flightNumber, "UA9000");
  assert.equal(flight.departureTime, "22:15");
  assert.equal(flight.arrivalTime, "05:55");
  assert.equal(flight.arrivalDayOffset, 1);
  assert.equal(flight.duration, "12시간 40분");
  assert.equal(flight.priceSource, "api-test");
  assert.equal(flight.seats, null);
});

test("같은 편의 최저가를 남기고 외항사 결과를 8개로 제한하지 않는다", () => {
  const offers = Array.from({ length: 12 }, (_, i) => ({ ...offer, id: String(i), segment: { ...offer.segment, number: String(i) } }));
  const flights = mapFlightOffers({ environment: "production", offers: [...offers, { ...offers[0], price: "1000000" }] }, "one-way");
  assert.equal(flights.length, 12);
  assert.equal(flights[0].price, 1000000);
  assert.equal(flights[0].priceSource, "live");
});

test("24개 추가 공항이 검색·카드에 연결되고 모든 등록 노선에 시간표가 생성된다", () => {
  const cards = getAirportRouteCards();
  assert.equal(worldAirports.length, 24);
  for (const airport of worldAirports) {
    assert.ok(allRouteAirports.some(({ code }) => code === airport.code));
    assert.ok(cards.some(({ code }) => code === airport.code));
    assert.ok(getDirectDestinationCodes(airport.code).length);
  }
  assert.ok(getDirectDestinationCodes("FRA").includes("GRU"));
  assert.ok(getDirectDestinationCodes("ADD").includes("NBO"));
  assert.ok(!getDirectDestinationCodes("ICN").includes("GRU"));
  for (const airport of allRouteAirports) {
    for (const arrival of getDirectDestinationCodes(airport.code)) {
      const schedules = createFlightSchedules({ departure: airport.code, arrival, departDate: "2026-10-10" });
      assert.equal(schedules.length, 8, `${airport.code}-${arrival}`);
      for (const flight of schedules) {
        assert.ok(flight.durationMinutes > 0);
        assert.equal(Date.parse(flight.arrivalUtc) - Date.parse(flight.departureUtc), flight.durationMinutes * 60000);
        assert.match(flight.arrivalTime, /^\d{2}:\d{2}$/);
      }
    }
  }
});

test("유럽 서머타임과 남미 현지 도착 날짜를 반영한다", () => {
  const winter = createFlightSchedules({ departure: "FRA", arrival: "GRU", departDate: "2026-01-15" })[0];
  const summer = createFlightSchedules({ departure: "FRA", arrival: "GRU", departDate: "2026-07-15" })[0];
  assert.equal(new Date(winter.departureUtc).getUTCHours(), 5);
  assert.equal(new Date(summer.departureUtc).getUTCHours(), 4);
  assert.notEqual(winter.arrivalTime, summer.arrivalTime);
  assert.ok(winter.durationMinutes > 600);
});

test("API 빈 결과와 오류는 예상 스케줄로 대체하지 않는다", async (t) => {
  t.mock.method(globalThis, "fetch", async () => ({ ok: true, json: async () => ({ offers: [] }) }));
  const search = { departure: "FRA", arrival: "GRU", departDate: "2026-10-10" };
  assert.deepEqual(await fetchDirectFlights(search), []);
  globalThis.fetch.mock.mockImplementation(async () => ({ ok: false, json: async () => ({ message: "API 설정 필요" }) }));
  await assert.rejects(fetchDirectFlights(search), /API 설정 필요/);
});

test("서버가 무착륙·정확한 공항만 반환하고 출처와 운항사 사전을 전달한다", async (t) => {
  const originalEnv = { key: process.env.AMADEUS_API_KEY, secret: process.env.AMADEUS_API_SECRET, base: process.env.AMADEUS_API_BASE_URL };
  t.after(() => {
    for (const [key, value] of Object.entries({ AMADEUS_API_KEY: originalEnv.key, AMADEUS_API_SECRET: originalEnv.secret, AMADEUS_API_BASE_URL: originalEnv.base })) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  });
  process.env.AMADEUS_API_KEY = "test-fixture";
  process.env.AMADEUS_API_SECRET = "test-fixture";
  process.env.AMADEUS_API_BASE_URL = "https://test.api.amadeus.com";
  let handler;
  amadeusPlugin().configureServer({ middlewares: { use: (_path, fn) => { handler = fn; } } });
  t.mock.method(globalThis, "fetch", async (url) => {
    if (url.includes("oauth2/token")) return { ok: true, json: async () => ({ access_token: "fixture-token", expires_in: 1800 }) };
    assert.equal(new URL(url).searchParams.get("nonStop"), "true");
    const segments = [offer.segment, { ...offer.segment, numberOfStops: 1 }, { ...offer.segment, arrival: { ...offer.segment.arrival, iataCode: "GIG" } }];
    return { ok: true, json: async () => ({
      dictionaries: { carriers: { LH: "LUFTHANSA", UA: "UNITED AIRLINES" } },
      data: segments.map((segment, index) => ({ id: String(index), price: { total: "1250000" }, itineraries: [{ duration: "PT12H40M", segments: [segment] }] })),
    }) };
  });
  let result;
  const response = { setHeader() {}, end(body) { result = JSON.parse(body); } };
  await handler({ url: "/?departure=FRA&arrival=GRU&departDate=2026-10-10" }, response);
  assert.equal(response.statusCode, 200);
  assert.equal(result.offers.length, 1);
  assert.equal(result.offers[0].carrierName, "LUFTHANSA");
  assert.equal(result.environment, "test");
  assert.ok(!JSON.stringify(result).includes("fixture-token"));
});
