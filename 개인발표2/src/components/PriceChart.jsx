export default function PriceChart({ destination, formatPrice }) {
  const width = 760;
  const height = 300;
  const padding = { top: 45, right: 35, bottom: 45, left: 35 };
  const min = Math.min(...destination.prices) * 0.92;
  const max = Math.max(...destination.prices) * 1.05;
  const points = destination.prices.map((price, index) => ({
    x: padding.left + ((width - padding.left - padding.right) / 4) * index,
    y:
      padding.top +
      ((max - price) / (max - min)) * (height - padding.top - padding.bottom),
  }));
  const pointText = points.map(({ x, y }) => `${x},${y}`).join(" ");
  const areaText = `${padding.left},${height - padding.bottom} ${pointText} ${width - padding.right},${height - padding.bottom}`;

  return (
    <section className="price-chart-panel" aria-live="polite">
      <div className="chart-heading">
        <div>
          <span>{destination.country}</span>
          <h3>{destination.city} 주별 항공 가격</h3>
        </div>
        <strong>최저 {formatPrice(Math.min(...destination.prices))}</strong>
      </div>
      <div className="chart-wrap">
        <svg
          className="price-chart"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${destination.city} 5주간 항공 가격 변화 그래프`}
        >
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#68b8f5" stopOpacity=".32" />
              <stop offset="1" stopColor="#68b8f5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[padding.top, height / 2, height - padding.bottom].map((y) => (
            <line
              className="chart-grid"
              key={y}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
            />
          ))}
          <polygon className="chart-area" points={areaText} />
          <polyline className="chart-line" points={pointText} />
          {points.map((point, index) => (
            <g key={index}>
              <circle className="chart-point" cx={point.x} cy={point.y} r="6" />
              <text className="chart-price" x={point.x} y={point.y - 15}>
                {Math.round(destination.prices[index] / 10000)}만원
              </text>
              <text className="chart-label" x={point.x} y={height - 17}>
                {index + 1}주차
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="chart-note">
        발표 화면용 예상 가격이며 실제 항공권 가격과 다를 수 있습니다.
      </p>
    </section>
  );
}
