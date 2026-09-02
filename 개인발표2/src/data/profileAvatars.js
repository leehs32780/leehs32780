export const profileAvatarGroups = [
  { category: "여행", avatars: [
    { id: "pilot", icon: "👨‍✈️", label: "파일럿" }, { id: "traveler", icon: "🧳", label: "여행 가방" },
    { id: "camera", icon: "📷", label: "카메라" }, { id: "map", icon: "🗺️", label: "지도" },
    { id: "compass", icon: "🧭", label: "나침반" }, { id: "passport", icon: "🛂", label: "여권 여행" },
  ]},
  { category: "자연", avatars: [
    { id: "world", icon: "🌏", label: "지구" }, { id: "island", icon: "🏝️", label: "휴양지" },
    { id: "mountain", icon: "🏔️", label: "산" }, { id: "sunset", icon: "🌅", label: "일출" },
    { id: "wave", icon: "🌊", label: "바다" }, { id: "flower", icon: "🌸", label: "꽃" },
  ]},
  { category: "캐릭터", avatars: [
    { id: "smile", icon: "😎", label: "선글라스 얼굴" }, { id: "astronaut", icon: "🧑‍🚀", label: "우주비행사" },
    { id: "fox", icon: "🦊", label: "여우" }, { id: "bear", icon: "🐻", label: "곰" },
    { id: "penguin", icon: "🐧", label: "펭귄" }, { id: "cat", icon: "🐱", label: "고양이" },
  ]},
  { category: "교통", avatars: [
    { id: "airplane", icon: "✈️", label: "비행기" }, { id: "departure", icon: "🛫", label: "출발 비행기" },
    { id: "helicopter", icon: "🚁", label: "헬리콥터" }, { id: "train", icon: "🚄", label: "기차" },
    { id: "ship", icon: "🚢", label: "배" }, { id: "car", icon: "🚙", label: "자동차" },
  ]},
];

export const profileAvatars = profileAvatarGroups.flatMap(({ avatars }) => avatars);
