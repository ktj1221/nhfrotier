export const PROJECT_ID = "demo";

export const CURRENT_USER = { name: "김민준", color: "indigo" as const };

export const TEAM = {
  minjun: { name: "김민준", color: "indigo" as const, role: "PM/사업" },
  seoyeon: { name: "이서연", color: "pink" as const, role: "디자인" },
  junhyuk: { name: "박준혁", color: "blue" as const, role: "테크" },
  yujin: { name: "최유진", color: "teal" as const, role: "준법" },
};

export const PROJECT = {
  id: PROJECT_ID,
  name: "고객 포털 리뉴얼",
  status: "ACTIVE" as const,
  version: 3,
  versionSummary: "포인트 영역 강조 반영",
};

export const PROJECTS_LIST = [
  { id: PROJECT_ID, name: "고객 포털 리뉴얼", status: "ACTIVE", owner: TEAM.minjun, members: 4, lastActive: "10분 전", pendingReview: 4 },
  { id: "mobile-onboarding", name: "모바일뱅킹 온보딩", status: "REVIEW", owner: TEAM.seoyeon, members: 3, lastActive: "2시간 전", pendingReview: 1 },
  { id: "branch-leaflet", name: "지점 안내 리플렛", status: "DRAFT", owner: TEAM.junhyuk, members: 2, lastActive: "1일 전", pendingReview: 0 },
  { id: "cc-promo", name: "신용카드 프로모션 배너", status: "COMPLETED", owner: TEAM.yujin, members: 5, lastActive: "3일 전", pendingReview: 0 },
  { id: "recruit-landing", name: "2025 채용 랜딩페이지", status: "ARCHIVED", owner: TEAM.minjun, members: 2, lastActive: "2주 전", pendingReview: 0 },
];

export const CHAT_MESSAGES = [
  { from: "user", user: TEAM.minjun, text: "고객 대시보드 초안 만들어줘. 최근 주문, 포인트, 배송현황을 한눈에 보여줬으면 해.", time: "13:30" },
  { from: "ai", text: "참고자료 2개(기존 포털 UI, 브랜드가이드)를 반영해 대시보드 초안을 생성했습니다. 상단에 환영 메시지와 포인트, 중단에 최근 주문 목록, 하단에 배송 추적을 배치했습니다.", status: "COMPLETED", time: "13:31" },
  { from: "user", user: TEAM.minjun, text: "좋아요. 포인트 영역을 더 크게 강조해줘.", time: "14:31" },
  { from: "ai", text: "", status: "PROCESSING", time: "14:31" },
];

export const REVIEW_ITEMS = [
  {
    id: 1,
    group: "합의" as const,
    title: "포인트 영역 시각적 강조 필요",
    detail: "AI 제안: 포인트 카드 크기 1.5배 확대, 인디고 강조 색상 적용 · 관련 의견 2건",
    decision: "반영" as const,
  },
  {
    id: 2,
    group: "합의" as const,
    title: "색상 톤을 브랜드 가이드와 통일",
    detail: "AI 제안: 전체 배경/버튼 색상을 인디고 계열로 일괄 정리 · 관련 의견 2건",
    decision: null,
  },
  {
    id: 3,
    group: "이견" as const,
    title: "포인트 색상: 브랜드 오렌지 유지 vs 인디고 통일",
    detail: "이서연은 오렌지 유지, 박준혁은 인디고 통일을 제안 · 상반된 의견 2건",
    decision: null,
  },
  {
    id: 4,
    group: "추가확인" as const,
    title: "포인트 표기 방식 약관 검토 필요",
    detail: "최유진(준법)의 확인 요청 · 관련 의견 1건",
    decision: null,
  },
];

export const COMMENTS = [
  { user: TEAM.seoyeon, text: "포인트 영역이 다른 카드에 묻혀서 잘 안 보여요. 더 크게 강조하면 좋겠어요.", time: "14:20", pin: 1 },
  { user: TEAM.junhyuk, text: "동의합니다. 색상도 브랜드 오렌지 대신 인디고로 통일해주세요.", time: "14:22", pin: 2 },
  { user: TEAM.yujin, text: "포인트 표기 방식이 약관상 문제없는지 확인이 필요합니다.", time: "14:35", pin: 3 },
];

export const VERSIONS = [
  { no: 3, source: "AI_REVISION", author: "김민준", time: "12분 전", summary: "포인트 영역 강조 반영", current: true },
  { no: 2, source: "AI_REVISION", author: "AI", time: "41분 전", summary: "최근 주문 목록 레이아웃 수정", current: false },
  { no: 1, source: "AI_GENERATION", author: "김민준", time: "2시간 전", summary: "최초 대시보드 초안 생성", current: false },
];

export const HISTORY: { group: string; actor: "user" | "ai" | "system"; bold?: string; text: string; time: string; link?: string }[] = [
  { group: "오늘", actor: "user", bold: "김민준", text: "님이 의견 3건을 반영해 새 버전을 생성했습니다.", time: "오늘 14:32", link: "v3 보기" },
  { group: "오늘", actor: "ai", bold: "AI", text: "가 의견 5건을 합의 2 · 이견 2 · 추가확인 1로 정리했습니다.", time: "오늘 14:20" },
  { group: "오늘", actor: "user", bold: "이서연", text: '님이 의견을 남겼습니다: "포인트 영역이 잘 안보여요"', time: "오늘 13:55" },
  { group: "오늘", actor: "ai", text: "AI 목업 생성 완료 (v2 → v3 수정 작업)", time: "오늘 13:40" },
  { group: "어제", actor: "user", bold: "박준혁", text: "님이 참고자료 '브랜드가이드.pdf'를 업로드했습니다.", time: "어제 17:10" },
  { group: "어제", actor: "system", text: "프로젝트 상태가 DRAFT → ACTIVE로 변경되었습니다. (김민준)", time: "어제 16:00" },
];
