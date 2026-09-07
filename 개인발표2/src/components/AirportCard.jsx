import { worldAirportPhotos } from "../data/worldAirportPhotos";

// 공항 코드, 이름, 주소와 직항 노선을 한 장의 카드로 보여주는 컴포넌트입니다.
// airport는 표시 데이터이며 isOpen과 onToggle은 부모가 관리하는 카드 열림 상태와 변경 함수입니다.
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
        {/* 추가 공항은 실제 공항 사진을 표시하고 기존 공항은 기존 배경 사진을 유지합니다. */}
        <span>
          {worldAirportPhotos[airport.code] ? (
            <img
              className="airport-card-photo"
              src={worldAirportPhotos[airport.code]}
              alt={`${airport.name} 전경`}
              loading="lazy"
            />
          ) : (
            airport.code
          )}
        </span>
        <div>
          <div className="airport-title">
            <strong>{airport.name}</strong>
            <span>{englishName}</span>
          </div>
          <small>{airport.area}</small>
          {isOpen && (
            <p className="airport-address">
              {address || `${airport.area} · ${englishName}`}
            </p>
          )}
        </div>
      </div>
      {/* 공항에 등록된 노선 그룹을 카드 아래에 나열합니다. */}
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
