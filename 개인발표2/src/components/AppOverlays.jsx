export default function AppOverlays({ ui }) {
  const {
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
  } = ui;
  return (
    <>
      {/* 8-2. 로그인 입력 팝업 */}
      {loginOpen && (
        <div
          className="login-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLoginOpen(false);
          }}
        >
          <section
            className="login-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
          >
            <button
              className="login-close"
              type="button"
              aria-label="로그인 창 닫기"
              onClick={() => setLoginOpen(false)}
            >
              ×
            </button>
            <span className="login-symbol" aria-hidden="true">
              ✈
            </span>
            <p>WELCOME BACK</p>
            <h2 id="login-title">SKY FINDER 로그인</h2>
            <form onSubmit={login}>
              <label>
                아이디
                <input
                  type="text"
                  autoFocus
                  autoComplete="username"
                  value={loginForm.id}
                  onChange={(event) => {
                    setLoginForm((current) => ({
                      ...current,
                      id: event.target.value,
                    }));
                    setLoginError("");
                  }}
                  placeholder="아이디를 입력하세요"
                />
              </label>
              <label>
                비밀번호
                <input
                  type="password"
                  autoComplete="current-password"
                  value={loginForm.password}
                  onChange={(event) => {
                    setLoginForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }));
                    setLoginError("");
                  }}
                  placeholder="비밀번호를 입력하세요"
                />
              </label>
              {loginError && (
                <span className="login-error" role="alert">
                  {loginError}
                </span>
              )}
              <button className="login-submit" type="submit">
                로그인
              </button>
            </form>
            <small className="demo-account">
              발표용 계정: skyfinder / 1234
            </small>
          </section>
        </div>
      )}

      {/* 8-3. 로그인 성공 안내 팝업 */}
      {loginSuccess && (
        <div
          className="login-backdrop success-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLoginSuccess(false);
          }}
        >
          <section
            className="login-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-success-title"
          >
            <span className="success-check" aria-hidden="true">
              ✓
            </span>
            <h2 id="login-success-title">로그인이 되었습니다</h2>
            <p>{user?.name}님, 환영합니다.</p>
            <small>빈 여백을 클릭하면 화면으로 돌아갑니다.</small>
          </section>
        </div>
      )}

      {/* 8-4. 프로필 이름과 기본 이미지 변경 팝업 */}
      {profileOpen && (
        <div
          className="profile-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setProfileOpen(false);
          }}
        >
          <section
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-title"
          >
            <button
              className="profile-close"
              type="button"
              aria-label="프로필 창 닫기"
              onClick={() => setProfileOpen(false)}
            >
              ×
            </button>
            <span className="profile-preview" aria-hidden="true">
              {profileAvatars.find(({ id }) => id === profileForm.avatar)?.icon}
            </span>
            <h2 id="profile-title">프로필 설정</h2>
            <p>표시할 이름과 프로필 이미지를 선택하세요.</p>
            <form onSubmit={saveProfile}>
              <label>
                프로필 이름
                <input
                  type="text"
                  maxLength="12"
                  value={profileForm.name}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  required
                />
              </label>
              <fieldset>
                <legend>기본 프로필 이미지</legend>
                <div className="avatar-groups">
                  {profileAvatarGroups.map((group) => (
                    <section className="avatar-group" key={group.category}>
                      <h3>{group.category}</h3>
                      <div className="avatar-options">
                        {group.avatars.map((avatar) => (
                          <button
                            className={
                              profileForm.avatar === avatar.id
                                ? "is-selected"
                                : ""
                            }
                            type="button"
                            key={avatar.id}
                            onClick={() =>
                              setProfileForm((current) => ({
                                ...current,
                                avatar: avatar.id,
                              }))
                            }
                            aria-label={avatar.label}
                            aria-pressed={profileForm.avatar === avatar.id}
                          >
                            {avatar.icon}
                          </button>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </fieldset>
              <button className="profile-save" type="submit">
                변경사항 저장
              </button>
            </form>
          </section>
        </div>
      )}

      {/* 8-5. 질문 작성, 내 질문 확인, 삭제가 가능한 Q & A 화면 */}
      {qnaOpen && (
        <div
          className="qna-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setQnaOpen(false);
          }}
        >
          <section
            className="qna-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qna-title"
          >
            <button
              className="qna-close"
              type="button"
              aria-label="질의응답 창 닫기"
              onClick={() => setQnaOpen(false)}
            >
              ×
            </button>
            <header className="qna-heading">
              <span>What Can I Help You?</span>
              <h2 id="qna-title">무엇을 도와드릴까요?</h2>
              <p>항공권과 서비스에 대해 궁금한 내용을 남겨 주세요.</p>
            </header>
            <div className="qna-layout">
              <form className="qna-form" onSubmit={submitQuestion}>
                <h3>새 질문 작성</h3>
                <label>
                  제목
                  <input
                    type="text"
                    value={qnaForm.title}
                    onChange={(event) =>
                      setQnaForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="질문 제목을 입력하세요"
                    required
                  />
                </label>
                <label>
                  질문 내용
                  <textarea
                    rows="6"
                    value={qnaForm.content}
                    onChange={(event) =>
                      setQnaForm((current) => ({
                        ...current,
                        content: event.target.value,
                      }))
                    }
                    placeholder="궁금한 내용을 자세히 적어 주세요"
                    required
                  />
                </label>
                <button type="submit">질문 등록</button>
                {questionNotice && (
                  <p className="qna-notice" role="status">
                    ✓ {questionNotice}
                  </p>
                )}
              </form>
              <div className="qna-list">
                <div className="qna-list-title">
                  <h3>
                    {qnaTab === "mine" ? "내가 질문한 목록" : "전체 질문"}
                  </h3>
                  <span>{visibleQuestions.length}개</span>
                </div>
                <div className="qna-tabs">
                  <button
                    className={qnaTab === "all" ? "is-active" : ""}
                    type="button"
                    onClick={() => setQnaTab("all")}
                  >
                    전체 질문
                  </button>
                  <button
                    className={qnaTab === "mine" ? "is-active" : ""}
                    type="button"
                    onClick={() => setQnaTab("mine")}
                  >
                    내 질문 ({myQuestions.length})
                  </button>
                </div>
                {visibleQuestions.length === 0 && (
                  <div className="qna-empty">아직 작성한 질문이 없습니다.</div>
                )}
                {visibleQuestions.map((question) => (
                  <article className="qna-item" key={question.id}>
                    <div className="qna-item-head">
                      <span className="qna-status">
                        {question.answer ? "답변 완료" : "답변 대기"}
                      </span>
                      {question.ownerId === currentOwnerId && (
                        <button
                          type="button"
                          onClick={() => deleteQuestion(question.id)}
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <h4>Q. {question.title}</h4>
                    <p>{question.content}</p>
                    {question.author && (
                      <small className="qna-author">
                        작성자: {question.author}
                      </small>
                    )}
                    {question.answer && (
                      <div className="qna-answer">
                        <strong>A.</strong>
                        <span>{question.answer}</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 8-6. 선택한 항공편의 탑승객 정보 입력 */}
      {selectedFlight && (
        <div
          className="booking-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedFlight(null);
          }}
        >
          <section
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
          >
            <button
              className="booking-close"
              type="button"
              aria-label="예매 창 닫기"
              onClick={() => setSelectedFlight(null)}
            >
              ×
            </button>
            <span className="booking-eyebrow">PASSENGER DETAILS</span>
            <h2 id="booking-title">항공권 예매</h2>
            <div className="booking-flight-summary">
              {selectedOutbound && (
                <>
                  <strong>
                    가는 편 · {selectedOutbound.airline.name}{" "}
                    {selectedOutbound.flightNumber}
                  </strong>
                  <span>
                    {searchedTrip.departure} {selectedOutbound.departureTime} →{" "}
                    {searchedTrip.arrival} {selectedOutbound.arrivalTime}{selectedOutbound.arrivalDayOffset > 0 && ` (+${selectedOutbound.arrivalDayOffset}일)`}
                  </span>
                </>
              )}
              <strong>
                {selectedOutbound ? "오는 편" : "가는 편"} ·{" "}
                {selectedFlight.airline.name} {selectedFlight.flightNumber}
              </strong>
              <span>
                {selectedOutbound
                  ? searchedTrip.arrival
                  : searchedTrip.departure}{" "}
                {selectedFlight.departureTime} →{" "}
                {selectedOutbound
                  ? searchedTrip.departure
                  : searchedTrip.arrival}{" "}
                {selectedFlight.arrivalTime}{selectedFlight.arrivalDayOffset > 0 && ` (+${selectedFlight.arrivalDayOffset}일)`}
              </span>
              <b>
                총{" "}
                {formatPrice(
                  (selectedOutbound?.price ?? 0) + selectedFlight.price,
                )}
              </b>
            </div>
            <form onSubmit={requestPaymentPin}>
              <label>
                탑승객 이름
                <input
                  type="text"
                  value={bookingForm.passengerName}
                  onChange={(event) =>
                    setBookingForm((current) => ({
                      ...current,
                      passengerName: event.target.value,
                    }))
                  }
                  placeholder="신분증과 동일한 이름"
                  required
                />
              </label>
              <label>
                휴대전화
                <input
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(event) =>
                    setBookingForm((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="010-0000-0000"
                  required
                />
              </label>
              <label>
                이메일
                <input
                  type="email"
                  value={bookingForm.email}
                  onChange={(event) =>
                    setBookingForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="예약 확인서를 받을 이메일"
                  required
                />
              </label>
              <div className="payment-section">
                <div className="payment-heading">
                  <span>PAYMENT</span>
                  <strong>신용/체크카드 결제</strong>
                </div>
                <label>
                  카드번호
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={paymentForm.cardNumber}
                    onChange={(event) => {
                      const digits = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 16);
                      setPaymentForm((current) => ({
                        ...current,
                        cardNumber: digits.replace(/(.{4})/g, "$1 ").trim(),
                      }));
                    }}
                    placeholder="0000 0000 0000 0000"
                    pattern="[0-9 ]{19}"
                    required
                  />
                </label>
                <div className="payment-row">
                  <label>
                    유효기간
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      value={paymentForm.expiry}
                      onChange={(event) => {
                        const digits = event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        setPaymentForm((current) => ({
                          ...current,
                          expiry:
                            digits.length > 2
                              ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                              : digits,
                        }));
                      }}
                      placeholder="MM/YY"
                      pattern="[0-9]{2}/[0-9]{2}"
                      required
                    />
                  </label>
                  <label>
                    CVC
                    <input
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      value={paymentForm.cvc}
                      onChange={(event) =>
                        setPaymentForm((current) => ({
                          ...current,
                          cvc: event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 3),
                        }))
                      }
                      placeholder="000"
                      pattern="[0-9]{3}"
                      required
                    />
                  </label>
                </div>
                <label className="payment-agree">
                  <input
                    type="checkbox"
                    checked={paymentForm.agreed}
                    onChange={(event) =>
                      setPaymentForm((current) => ({
                        ...current,
                        agreed: event.target.checked,
                      }))
                    }
                    required
                  />
                  <span>
                    결제 금액과 예약 정보를 확인했으며 결제 진행에 동의합니다.
                  </span>
                </label>
              </div>
              <div className="booking-caution">
                테스트 결제입니다. 실제 카드 승인이나 금액 청구는 진행되지
                않습니다.
              </div>
              <button type="submit">
                {formatPrice(
                  (selectedOutbound?.price ?? 0) + selectedFlight.price,
                )}{" "}
                결제하기
              </button>
            </form>
          </section>
        </div>
      )}

      {/* 8-7. 결제 PIN 확인 */}
      {paymentPinOpen && (
        <div className="pin-backdrop" role="presentation">
          <section
            className="pin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pin-title"
          >
            <button
              className="pin-close"
              type="button"
              aria-label="PIN 입력 창 닫기"
              onClick={() => setPaymentPinOpen(false)}
            >
              ×
            </button>
            <span className="pin-lock" aria-hidden="true">
              🔒
            </span>
            <p>SECURE PAYMENT</p>
            <h2 id="pin-title">결제 PIN 입력</h2>
            <small>카드 결제를 승인하려면 4자리 PIN을 입력하세요.</small>
            <form onSubmit={reserveFlight}>
              <input
                type="password"
                inputMode="numeric"
                autoComplete="off"
                autoFocus
                maxLength="4"
                pattern="[0-9]{4}"
                value={paymentPin}
                onChange={(event) =>
                  setPaymentPin(
                    event.target.value.replace(/\D/g, "").slice(0, 4),
                  )
                }
                aria-label="결제 PIN 4자리"
                placeholder="••••"
                required
              />
              <div className="pin-dots" aria-hidden="true">
                {[0, 1, 2, 3].map((index) => (
                  <i
                    className={paymentPin.length > index ? "is-filled" : ""}
                    key={index}
                  ></i>
                ))}
              </div>
              <button type="submit" disabled={paymentPin.length !== 4}>
                결제 승인
              </button>
            </form>
            <em>테스트용 PIN은 원하는 숫자 4자리를 입력하세요.</em>
          </section>
        </div>
      )}

      {/* 8-8. 예약 완료번호 안내 */}
      {bookingComplete && (
        <div
          className="booking-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setBookingComplete(null);
          }}
        >
          <section
            className="booking-complete"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-complete-title"
          >
            <span>✓</span>
            <h2 id="booking-complete-title">결제 및 예매가 완료되었습니다</h2>
            <div className="payment-complete-info">
              <b>{formatPrice(bookingComplete.payment.amount)}</b>
              <span>
                카드 끝번호 {bookingComplete.payment.lastFour} · 결제 완료
              </span>
            </div>
            <p>예약번호</p>
            <strong>{bookingComplete.number}</strong>
            <small>
              {bookingComplete.passenger.passengerName} ·{" "}
              {bookingComplete.flight.airline.name}{" "}
              {bookingComplete.flight.flightNumber}
            </small>
            <button type="button" onClick={() => setBookingComplete(null)}>
              확인
            </button>
          </section>
        </div>
      )}
    </>
  );
}
