// 현재 사용자가 결제한 예약 목록과 예약 취소 기능을 제공하는 모달입니다.
export default function MyBookingsModal({
  bookings,
  onClose,
  onCancel,
  formatPrice,
  getAirportLabel,
}) {
  return (
    <div
      className="my-bookings-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="my-bookings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-bookings-title"
      >
        <button
          className="my-bookings-close"
          type="button"
          onClick={onClose}
          aria-label="내 예약 닫기"
        >
          ×
        </button>
        <header>
          {/* 모달의 제목과 기능 안내 문구입니다. */}
          <span>MY TRIPS</span>
          <h2 id="my-bookings-title">내가 예약한 항공권</h2>
          <p>결제 완료된 항공권과 여행 일정을 확인하세요.</p>
        </header>
        <div className="my-bookings-list">
          {/* 저장된 예약이 없을 때 보여주는 빈 화면입니다. */}
          {bookings.length === 0 && (
            <div className="my-bookings-empty">
              아직 예약한 항공권이 없습니다.
            </div>
          )}
          {bookings.map((booking) => (
            // 예약 한 건마다 노선, 항공편, 탑승객과 결제 정보를 카드로 출력합니다.
            <article className="my-booking-card" key={booking.number}>
              <div className="my-booking-top">
                <span>결제 완료</span>
                <strong>{booking.number}</strong>
              </div>
              <div className="my-booking-route">
                <b>{booking.trip.departure}</b>
                <i>✈</i>
                <b>{booking.trip.arrival}</b>
              </div>
              <p>
                {getAirportLabel(booking.trip.departure)} →{" "}
                {getAirportLabel(booking.trip.arrival)}
              </p>
              <dl>
                <div>
                  <dt>가는 편</dt>
                  <dd>
                    {booking.trip.departDate} ·{" "}
                    {booking.outboundFlight.airline.name}{" "}
                    {booking.outboundFlight.flightNumber} ·{" "}
                    {booking.outboundFlight.departureTime}
                  </dd>
                </div>
                {booking.returnFlight && (
                  <div>
                    <dt>오는 편</dt>
                    <dd>
                      {booking.trip.returnDate} ·{" "}
                      {booking.returnFlight.airline.name}{" "}
                      {booking.returnFlight.flightNumber} ·{" "}
                      {booking.returnFlight.departureTime}
                    </dd>
                  </div>
                )}
                <div>
                  <dt>탑승객</dt>
                  <dd>{booking.passenger.passengerName}</dd>
                </div>
                <div>
                  <dt>결제 금액</dt>
                  <dd>{formatPrice(booking.payment.amount)} · {booking.payment.method}</dd>
                </div>
              </dl>
              <button
                className="booking-cancel-button"
                type="button"
                onClick={() => onCancel(booking.number)}
              >
                예약 취소
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
