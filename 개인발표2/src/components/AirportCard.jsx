export default function AirportCard({
  airport,
  isOpen,
  onToggle,
  englishName,
  address,
}) {
  return (
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
        <div className="route-group" key={route.type}>
          <b>{route.type}</b>
          <p>{route.cities}</p>
        </div>
      ))}
    </article>
  );
}
