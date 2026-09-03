// 로고, 주요 메뉴, 로그인 상태와 사용자 메뉴를 담당하는 상단 헤더입니다.
export default function Header({
  user,
  avatarIcon,
  bookingCount,
  onBookings,
  onLogin,
  onLogout,
  onProfile,
  onQna,
}) {
  return (
    <header className="site-header">
      <div className="container">
        {/* 로고를 누르면 메인 화면으로 이동합니다. */}
        <a className="logo" href="/" aria-label="Sky Finder 홈">
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M17.8 19 15 12l3.5-3.5c1.5-1.5 2-3.5 1-4.5s-3-.5-4.5 1l-3.5 3.5-7-2.8L3 7.2l5.5 4-3 3H3l-1 1 3 2 2 3 1-1v-2.5l3-3 4 5.5z" />
            </svg>
          </span>
          <span className="logo-wordmark">
            <strong>SKY</strong>
            <b>FINDER</b>
            <small>FLIGHTS, SIMPLIFIED</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="주요 메뉴">
          {/* 로그인한 사용자에게만 내 예약 버튼과 예약 개수를 보여줍니다. */}
          <a href="/">항공권</a>
          <a href="#direct-routes">여행지</a>
          {user && (
            <button
              className="header-action bookings-button"
              type="button"
              onClick={onBookings}
            >
              내 예약 <span>{bookingCount}</span>
            </button>
          )}
          {/* 로그인 상태에서는 프로필 메뉴를, 비로그인 상태에서는 로그인 버튼을 표시합니다. */}
          {user ? (
            <div className="profile">
              <button
                className="profile-main"
                type="button"
                onClick={onProfile}
                aria-label="프로필 수정"
              >
                <span className="profile-avatar" aria-hidden="true">
                  {avatarIcon}
                </span>
                <span className="profile-copy">
                  <strong>{user.name}</strong>
                  <small>{user.id}</small>
                </span>
              </button>
              <button
                className="logout-button"
                type="button"
                onClick={onLogout}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              className="header-action login-button"
              type="button"
              onClick={onLogin}
            >
              로그인
            </button>
          )}
          {/* 로그인 여부와 관계없이 Q&A 창을 열 수 있습니다. */}
          <button
            className="header-action qna-action"
            type="button"
            onClick={onQna}
          >
            Q &amp; A
          </button>
        </nav>
      </div>
    </header>
  );
}
