// 홈페이지.js 파일 내용
document.addEventListener("DOMContentLoaded", () => {
  // HTML 문서가 완전히 로드된 후 실행

  // 고정 헤더와 모바일 내비게이션
  const siteHeader = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  window.addEventListener("scroll", () => {
    siteHeader?.classList.toggle("scrolled", window.scrollY > 30);
  });

  navToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle?.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // 원두 → 에스프레소 → 라테 아트: 5초씩, 전체 약 15초 반복
  const bannerVideos = document.querySelectorAll(".banner-video");
  let currentVideoIndex = 0;

  bannerVideos.forEach((video) => {
    video.play().catch(() => {});
  });

  if (bannerVideos.length > 1) {
    setInterval(() => {
      bannerVideos[currentVideoIndex].classList.remove("active");
      currentVideoIndex = (currentVideoIndex + 1) % bannerVideos.length;
      bannerVideos[currentVideoIndex].classList.add("active");
    }, 5000);
  }

  // 카테고리 버튼들과 메뉴 카드들을 모두 선택
  const catButtons = document.querySelectorAll(".cat-btn");
  const menuCards = document.querySelectorAll(".menu-card");

  // 메뉴 카드별 상세 설명
  const menuDescriptions = {
    "아이스 / 핫 아메리카노":
      "진하게 추출한 에스프레소에 물을 더해 원두의 고소한 향과 쌉싸름하고 깔끔한 끝맛을 즐길 수 있는 커피입니다.",
    "아이스 / 핫 카페라떼":
      "진한 에스프레소에 고소한 우유를 넉넉히 더해 쓴맛은 줄이고 부드럽고 담백하게 완성한 라떼입니다.",
    "아이스 / 핫 바닐라라떼":
      "부드러운 카페라떼에 향긋한 바닐라 시럽을 더해 은은한 바닐라 향과 달콤함이 오래 남는 커피입니다.",
    "아이스 / 핫 카라멜마끼아또":
      "우유와 에스프레소의 층 위에 진한 카라멜 드리즐을 올려 달콤함과 커피의 쌉싸름함을 함께 느낄 수 있습니다.",
    "아이스 / 핫 카페모카":
      "에스프레소에 진한 초콜릿과 우유를 더하고 부드러운 크림을 올려, 커피와 초콜릿의 풍부한 맛을 담았습니다.",
    "플레인 요거트 스무디":
      "새콤달콤한 요거트의 맛을 시원하고 부드럽게 즐길 수 있는 스무디입니다.",
    "망고 스무디":
      "달콤하고 진한 망고 풍미를 얼음과 함께 시원하게 블렌딩한 음료입니다.",
    "딸기 스무디":
      "딸기의 새콤달콤한 풍미와 산뜻한 식감을 담은 시원한 스무디입니다.",
    "망고 요거트 스무디":
      "달콤한 망고와 새콤한 요거트가 조화롭게 어우러진 스무디입니다.",
    "블루베리 요거트 스무디":
      "블루베리의 상큼한 풍미와 부드러운 요거트를 함께 즐기는 스무디입니다.",
    레몬에이드: "레몬의 상큼함과 톡 쏘는 탄산이 어우러진 청량한 에이드입니다.",
    자몽에이드:
      "자몽 특유의 새콤쌉싸름한 풍미에 탄산을 더한 상쾌한 음료입니다.",
    유자에이드:
      "향긋한 유자의 달콤함과 탄산의 청량감을 함께 담은 에이드입니다.",
    청포도에이드:
      "청포도 과육의 달콤함과 시원한 탄산이 어우러진 청량한 에이드입니다.",
    블루레몬에이드:
      "상큼한 레몬에 시원한 블루 컬러와 탄산을 더한 스페셜 에이드입니다.",
    "쿠키 초코 프라페":
      "달콤한 초콜릿과 바삭한 쿠키 풍미를 시원하게 블렌딩한 프라페입니다.",
    "그린티 프라페":
      "쌉싸름하고 향긋한 녹차의 맛을 달콤하고 부드럽게 즐기는 프라페입니다.",
    "모카 자바칩 프라페":
      "커피와 초콜릿에 바삭한 자바칩을 더해 풍부한 식감을 살린 프라페입니다.",
    "리얼초코 자바칩 프라페":
      "진한 초콜릿과 자바칩의 달콤하고 바삭한 식감을 가득 담은 프라페입니다.",
    "민트초코 오레오 프라페":
      "상쾌한 민트초코와 달콤한 오레오 쿠키가 어우러진 시원한 프라페입니다.",
  };

  const menuModal = document.querySelector(".menu-modal");
  const modalImage = document.querySelector(".modal-image");
  const modalCategory = document.querySelector(".modal-category");
  const modalName = document.querySelector("#modal-name");
  const modalDescription = document.querySelector(".modal-description");
  const modalPrice = document.querySelector(".modal-price");
  const modalCloseButton = document.querySelector(".modal-close");
  let lastFocusedCard = null;

  const openMenuModal = (card) => {
    const name = card.dataset.name.trim();
    const image = card.querySelector("img");
    const category = card.querySelector(".badge")?.textContent.trim() || "MENU";

    modalImage.src = image.src;
    modalImage.alt = image.alt || name;
    modalCategory.textContent = category;
    modalName.textContent = name;
    modalDescription.textContent =
      menuDescriptions[name] || "컴포즈커피에서 즐길 수 있는 메뉴입니다.";
    modalPrice.textContent = card.dataset.price;

    lastFocusedCard = card;
    menuModal.classList.add("open");
    menuModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalCloseButton.focus();
  };

  const closeMenuModal = () => {
    menuModal.classList.remove("open");
    menuModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastFocusedCard?.focus();
  };

  menuCards.forEach((card) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `${card.dataset.name.trim()} 상세 보기`);

    card.addEventListener("click", () => openMenuModal(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openMenuModal(card);
      }
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((element) => {
    element.addEventListener("click", closeMenuModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuModal.classList.contains("open")) {
      closeMenuModal();
    }
  });

  // 각 버튼에 클릭 이벤트 등록
  catButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 1. 클릭된 버튼 활성화 처리
      catButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // 2. 선택된 카테고리 가져오기
      const selectedCategory = button.getAttribute("data-category");

      // 3. 메뉴 카드 필터링
      menuCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        // '전체보기'이거나 카테고리가 일치하면 보이고, 아니면 숨김
        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.style.display = "flex"; // 보이게 함
        } else {
          card.style.display = "none"; // 숨김
        }
      });
    });
  });
});
