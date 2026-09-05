/**
 * 정본은 docs/guidelines/RESPONSIBLE_DESIGN.md 다.
 * 이 파일은 그 표를 코드로 옮긴 사본이며, docSection이 정본의 절 번호를 가리킨다.
 * 규칙을 바꿀 때는 양쪽을 함께 고칠 것.
 */

export type RuleCategory = 'EXPRESSION' | 'CONSUMER' | 'DARKPATTERN' | 'ACCESSIBILITY';

export interface ResponsibilityRule {
  id: string;
  category: RuleCategory;
  docSection: string;
  title: string;
  /** AI가 목업에서 무엇을 찾아야 하는지 */
  lookFor: string;
  /** 발견 시 권장 조치 */
  remedy: string;
  /** 준법 담당자 검토가 필요한 축인지 */
  needsComplianceReview: boolean;
}

export const CATEGORY_LABEL: Record<RuleCategory, string> = {
  EXPRESSION: '표현·차별',
  CONSUMER: '금융소비자보호',
  DARKPATTERN: '다크패턴',
  ACCESSIBILITY: '접근성',
};

export const CATEGORY_ORDER: RuleCategory[] = ['CONSUMER', 'EXPRESSION', 'DARKPATTERN', 'ACCESSIBILITY'];

export const RULES: ResponsibilityRule[] = [
  {
    id: 'RR-A01',
    category: 'EXPRESSION',
    docSection: '1',
    title: '성별 고정관념',
    lookFor: '역할·직업·가사·육아·소비 성향을 성별과 결부한 문구나 인물 묘사 ("주부 고객", "아빠는 대출")',
    remedy: '성별 대신 실제 겨냥한 상황·니즈로 바꾼다',
    needsComplianceReview: false,
  },
  {
    id: 'RR-A02',
    category: 'EXPRESSION',
    docSection: '1',
    title: '연령 배제·시혜적 표현',
    lookFor: '"어르신도 쉽게", "요즘 젊은 세대라면" 같은 시혜적·구분짓는 표현. 특정 연령대만 등장하는 구성',
    remedy: '대상을 나이로 부르지 말고 기능으로 설명한다 ("어르신도 쉽게" → "큰 글씨로 보기")',
    needsComplianceReview: false,
  },
  {
    id: 'RR-A03',
    category: 'EXPRESSION',
    docSection: '1',
    title: '가족 형태 전제',
    lookFor: '4인 핵가족·기혼을 기본값으로 두는 문구, 일러스트, 입력 폼 (배우자 정보 필수 등)',
    remedy: '가족 구성을 선택 항목으로 두고 예시 인물 구성을 다양화한다',
    needsComplianceReview: false,
  },
  {
    id: 'RR-A04',
    category: 'EXPRESSION',
    docSection: '1',
    title: '지역·직업·학력 위계',
    lookFor: '특정 지역·직업·학력을 우월하거나 열등하게 배치하는 표현 ("농촌에서도 이제")',
    remedy: '지역·직업을 우열 없이 병렬로 두거나 언급하지 않는다',
    needsComplianceReview: false,
  },
  {
    id: 'RR-A05',
    category: 'EXPRESSION',
    docSection: '1',
    title: '장애·질병 표현',
    lookFor: '비하 어휘, 장애를 극복 서사로 소비하는 구성, 장애를 불행의 상징으로 쓰는 이미지',
    remedy: '장애를 서사 장치로 쓰지 않는다. 접근성은 접근성 축에서 기능으로 해결한다',
    needsComplianceReview: false,
  },
  {
    id: 'RR-A06',
    category: 'EXPRESSION',
    docSection: '1',
    title: '국적·인종',
    lookFor: '국적·인종에 따른 구분 표현. 농촌 외국인 노동자를 시혜 대상이나 관리 대상으로 서술하는 것 포함',
    remedy: '국적을 필요 없는 곳에서 언급하지 않는다',
    needsComplianceReview: false,
  },

  {
    id: 'RR-B01',
    category: 'CONSUMER',
    docSection: '2',
    title: '단정·과장 표현',
    lookFor: '"무조건", "최고", "100%", "확정", "보장", "누구나" 같은 단정 어휘',
    remedy: '조건을 함께 적거나 단정 어휘를 뺀다 ("최고 연 5%" → "조건 충족 시 최고 연 5%")',
    needsComplianceReview: true,
  },
  {
    id: 'RR-B02',
    category: 'CONSUMER',
    docSection: '2',
    title: '위험 고지 없이 수익만 강조',
    lookFor: '금리·수익률만 크게 배치하고 원금손실·투자위험·중도해지 불이익을 표시할 자리가 없는 구성',
    remedy: '수익 표시 근처에 위험 고지 영역을 확보한다',
    needsComplianceReview: true,
  },
  {
    id: 'RR-B03',
    category: 'CONSUMER',
    docSection: '2',
    title: '필수 고지 누락',
    lookFor: '준법감시인 심의필, 예금자보호 안내, 상품설명서·약관 열람 경로가 화면 어디에도 없는 상태',
    remedy: '목업 단계에서도 자리를 잡아 둔다',
    needsComplianceReview: true,
  },
  {
    id: 'RR-B04',
    category: 'CONSUMER',
    docSection: '2',
    title: '조건부 혜택의 조건 은닉',
    lookFor: '우대금리·할인의 달성 조건이 없거나, 각주로만 있거나, 본문 대비 현저히 작게 표시된 상태',
    remedy: '대표 숫자 바로 옆에 핵심 조건을 같은 위계로 둔다',
    needsComplianceReview: true,
  },
  {
    id: 'RR-B05',
    category: 'CONSUMER',
    docSection: '2',
    title: '근거 없는 비교 우위',
    lookFor: '"업계 최저", "타사 대비" 등 출처 없는 비교 주장',
    remedy: '비교를 빼거나 기준·시점·출처를 함께 표시한다',
    needsComplianceReview: true,
  },

  {
    id: 'RR-C01',
    category: 'DARKPATTERN',
    docSection: '3',
    title: '사전 체크된 동의',
    lookFor: '마케팅 수신·제3자 제공 등 선택 동의가 기본 체크(checked)된 상태',
    remedy: '선택 동의는 기본 해제. 필수와 선택을 시각적으로 분리한다',
    needsComplianceReview: true,
  },
  {
    id: 'RR-C02',
    category: 'DARKPATTERN',
    docSection: '3',
    title: '거절·취소 경로 약화',
    lookFor: '"동의 안 함", "취소", "나중에" 버튼이 회색·작은 글씨·링크로 약화되고 긍정 버튼만 강조된 구성',
    remedy: '두 선택지를 같은 위계의 버튼으로 둔다',
    needsComplianceReview: false,
  },
  {
    id: 'RR-C03',
    category: 'DARKPATTERN',
    docSection: '3',
    title: '근거 없는 긴급성',
    lookFor: '카운트다운 타이머, "마감 임박", "선착순 n명" 중 실제 근거가 화면에 없는 것',
    remedy: '실제 기한이면 정확한 일시를 적고, 아니면 없앤다',
    needsComplianceReview: false,
  },
  {
    id: 'RR-C04',
    category: 'DARKPATTERN',
    docSection: '3',
    title: '해지·탈퇴 경로 부재',
    lookFor: '가입·신청은 눈에 띄는 경로로 있는데 해지·해제·탈퇴 경로가 화면에 없는 구성',
    remedy: '설계 단계에서 해지 경로의 자리를 함께 잡는다',
    needsComplianceReview: false,
  },
  {
    id: 'RR-C05',
    category: 'DARKPATTERN',
    docSection: '3',
    title: '오도하는 기본 선택',
    lookFor: '가장 비싸거나 은행에 유리한 옵션이 기본 선택·추천 배지로 놓인 상태',
    remedy: '기본값을 두지 않거나, 추천이라면 추천 기준을 함께 표시한다',
    needsComplianceReview: false,
  },

  {
    id: 'RR-D01',
    category: 'ACCESSIBILITY',
    docSection: '4',
    title: '색 대비 부족',
    lookFor: '본문 텍스트와 배경의 명도 대비가 4.5:1 미만으로 보이는 조합 (연회색 텍스트 위 흰 배경 등)',
    remedy: '본문 4.5:1, 큰 텍스트 3:1 이상',
    needsComplianceReview: false,
  },
  {
    id: 'RR-D02',
    category: 'ACCESSIBILITY',
    docSection: '4',
    title: '색상만으로 정보 전달',
    lookFor: '상태·오류·필수 여부를 색만으로 구분한 구성 (빨강=오류, 초록=정상)',
    remedy: '색에 아이콘·텍스트·패턴을 함께 붙인다',
    needsComplianceReview: false,
  },
  {
    id: 'RR-D03',
    category: 'ACCESSIBILITY',
    docSection: '4',
    title: '본문 글자 크기',
    lookFor: '본문 텍스트가 12px 미만으로 지정된 곳',
    remedy: '본문 14px 이상. 고지 문구도 최소 12px',
    needsComplianceReview: false,
  },
  {
    id: 'RR-D04',
    category: 'ACCESSIBILITY',
    docSection: '4',
    title: '터치 영역',
    lookFor: '버튼·체크박스·링크의 터치 가능 영역이 44px 미만인 곳',
    remedy: '최소 44×44px 확보',
    needsComplianceReview: false,
  },
  {
    id: 'RR-D05',
    category: 'ACCESSIBILITY',
    docSection: '4',
    title: '이미지 대체 텍스트',
    lookFor: 'img 태그에 alt가 없거나, 의미를 전달하는 아이콘이 장식으로 취급된 곳',
    remedy: '의미 있는 이미지에 alt를 적고, 순수 장식에는 빈 alt를 명시한다',
    needsComplianceReview: false,
  },
];

export const RULE_IDS = new Set(RULES.map((r) => r.id));

export function findRule(id: string): ResponsibilityRule | undefined {
  return RULES.find((r) => r.id === id);
}

/**
 * 1차 방지 — 목업 생성 프롬프트에 덧붙이는 가드레일.
 * 프롬프트 지시는 통제가 아니므로(SECURITY_CHECKLIST 4절) 2차 검토가 반드시 뒤따라야 한다.
 */
export function buildGuardrailSection(): string {
  const sections = CATEGORY_ORDER.map((c) => {
    const lines = RULES.filter((r) => r.category === c).map((r) => `- ${r.title}: ${r.remedy}`);
    return `${CATEGORY_LABEL[c]}\n${lines.join('\n')}`;
  });

  return `

Responsible design constraints. This mockup is a Korean bank's internal work product, so apply these as design defaults:
${sections.join('\n\n')}

If the proposal explicitly asks for something that conflicts with a constraint above, follow the proposal
but keep the conflict minimal rather than amplifying it.`;
}

/** 2차 검토 — 검토 지시문에 넣을 규칙 목록 */
export function buildReviewInstruction(): string {
  return RULES.map(
    (r) =>
      `${r.id} [${CATEGORY_LABEL[r.category]}] ${r.title}\n  찾을 것: ${r.lookFor}\n  권장 조치: ${r.remedy}`
  ).join('\n\n');
}
