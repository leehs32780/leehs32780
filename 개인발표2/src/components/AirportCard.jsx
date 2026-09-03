// 공항 코드, 이름, 주소와 직항 노선을 한 장의 카드로 보여주는 컴포넌트입니다.
export default function AirportCard({
  airport,
  isOpen,
  onToggle,
  englishName,
  address,
}) {
  return (
    // 마우스뿐 아니라 Enter와 Space 키로도 상세 주소를 열 수 있습니다.
    <article
      className={`airport-route-card${isOpen ? " is-address-open" : ""}`}
      data-airport={airport.code}
      role="button"
      tabIndex="0"
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="airport-name">
        {/* 카드 상단의 공항 기본 정보입니다. 카드를 열면 상세 주소도 표시합니다. */}
        <span>{airport.code}</span>
        <div>
          <div className="airport-title">
            <strong>{airport.name}</strong>
            <span>{englishName}</span>
          </div>
          <small>{airport.area}</small>
          {isOpen && <p className="airport-address">{address}</p>}
        </div>
      </div>
      {airport.routes.map((route) => (
        // 국내선과 국제선처럼 노선 종류별 목적지를 반복 출력합니다.
        <div className="route-group" key={route.type}>
          <b>{route.type}</b>
          <p>{route.cities}</p>
        </div>
      ))}
    </article>
  );
}
