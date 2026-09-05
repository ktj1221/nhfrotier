export type AssetSource = "allone" | "corp" | "nh";

/** AssetThumb이 실물 파일 없을 때 그릴 대체본 종류 */
export type ThumbArt =
  | "wordmark"
  | "symbol"
  | "button"
  | "card"
  | "textfield"
  | "menugrid"
  | "bottomnav"
  | "screen-home"
  | "screen-login"
  | "screen-menu"
  | "screen-corp";

export type Asset = {
  id: string;
  name: string;
  source: AssetSource;
  /** public/ 기준 실물 파일 경로. 이 파일이 있으면 대체본 대신 실물을 쓴다. */
  src: string;
  art: ThumbArt;
  /** wordmark 대체본에 그릴 글자 */
  word?: string;
  /** 이미 담긴 프로젝트 이름 */
  inProject?: string;
};

/** 배너 숫자는 아래 네 섹션과 1:1로 맞춘다. 화면에 없는 자산을 배너에서 세지 않는다. */
export const ASSET_STATS = [
  { value: "23", label: "컴포넌트" },
  { value: "95", label: "컬러 토큰" },
  { value: "4", label: "화면 템플릿" },
  { value: "4", label: "로고 · 워드마크" },
];

export const LOGO_ASSETS: Asset[] = [
  { id: "allone-wordmark", name: "올원뱅크 워드마크", source: "allone", src: "/assets/nh/logo/allone-wordmark.svg", art: "wordmark", word: "올원뱅크" },
  { id: "nh-symbol", name: "NH 심볼마크", source: "nh", src: "/assets/nh/logo/nh-symbol.svg", art: "symbol" },
  { id: "corp-logo", name: "기업뱅킹 로고", source: "corp", src: "/assets/nh/logo/corp-logo.svg", art: "wordmark", word: "기업인터넷뱅킹" },
  { id: "nh-logotype", name: "국문 로고타입", source: "nh", src: "/assets/nh/logo/nh-logotype.svg", art: "wordmark", word: "농협은행" },
];

export const COMPONENT_ASSETS: Asset[] = [
  { id: "button", name: "Button", source: "allone", src: "/assets/nh/component/button.png", art: "button", inProject: "고객 포털 리뉴얼" },
  { id: "card", name: "Card", source: "allone", src: "/assets/nh/component/card.png", art: "card" },
  { id: "textfield", name: "TextField", source: "allone", src: "/assets/nh/component/textfield.png", art: "textfield" },
  { id: "menugrid", name: "MenuGrid", source: "allone", src: "/assets/nh/component/menugrid.png", art: "menugrid" },
  { id: "bottomnav", name: "BottomNav", source: "allone", src: "/assets/nh/component/bottomnav.png", art: "bottomnav" },
];

export const SCREEN_ASSETS: Asset[] = [
  { id: "screen-home", name: "홈 화면", source: "allone", src: "/assets/nh/screen/allone-home.png", art: "screen-home" },
  { id: "screen-login", name: "로그인 화면", source: "allone", src: "/assets/nh/screen/allone-login.png", art: "screen-login" },
  { id: "screen-menu", name: "전체메뉴", source: "allone", src: "/assets/nh/screen/allone-menu.png", art: "screen-menu" },
  { id: "screen-corp", name: "기업뱅킹 대시보드", source: "corp", src: "/assets/nh/screen/corp-dashboard.png", art: "screen-corp" },
];

/** design-system/tokens/ 실측값. 토큰 카드는 썸네일이 아니라 값 자체를 보여준다. */
export const BRAND_RAMP = ["#E7F5F2", "#C4E8E1", "#93D6C8", "#55BCA9", "#1E9F8C", "#0B8478", "#076A61", "#05534C"];

export const STATUS_TOKENS = [
  { bg: "#E4F5EC", line: "#0F9D58" },
  { bg: "#FDF3DC", line: "#EFA300" },
  { bg: "#FDE9E9", line: "#DB3D40" },
  { bg: "#E5EDFE", line: "#2B6CF6" },
];

/** 이미 프로젝트에 담긴 자산. 갤러리 상단 바구니 줄이 이걸 센다. */
export const PICKED_ASSETS: Asset[] = [...LOGO_ASSETS, ...COMPONENT_ASSETS, ...SCREEN_ASSETS].filter((a) => a.inProject);
