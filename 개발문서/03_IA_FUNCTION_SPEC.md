# IA & 화면 명세 v1.0

> **관련 문서**: [기능명세 인덱스](개발문서/기능명세/00_INDEX.md) | [PRD](개발문서/01_PRD.md)
>
> 기능별 동작 상세는 [기능명세](개발문서/기능명세/00_INDEX.md)로 분리했다. 본 문서는 IA · 화면 · 상태 모델의 정본이다.

## 1. IA
```mermaid
flowchart TD
  A[Dashboard] --> B[Project]
  B --> C[Workspace]
  C --> C1[AI Chat]
  C --> C2[Result]
  C --> C3[Comments]
  C --> C4[AI Review]
  C --> C5[Version]
  C --> C6[History]
  C --> C7[Files]
  C --> C8[Export]
  C --> C9[Brand Concept]
  A --> D[Template]
  D --> D1[NH Template]
  D --> D2[My Template]
  D --> D3[Design Asset Library]
  A --> E[My Work]
  A --> F[Admin]
```

## 2. 핵심 화면
### S01 Dashboard
최근 프로젝트, 나의 작업, 검토 대기, 최근 Version, 최근 활동을 보여준다.

### S02 Project List
프로젝트명, 상태, 소유자, 마지막 활동, 멤버 수, 미처리 검토 건수를 표시한다.

### S03 Project Workspace
좌측: 파일/Template/멤버
중앙: 생성 결과물
우측: AI Chat/협업/AI 의견
상단: Version/History/Export

### S04 AI Chat
입력 영역 + 참고자료 선택 + Template 선택 + 작업 유형 선택.

### S05 Result/Review
결과물 미리보기, 댓글, AI 의견 요약, 반영 선택을 한 화면에서 연결한다.

### S06 Version
Version 목록, 현재 버전, 비교 대상 선택, 변경 요약, 관련 의견을 제공한다.

### S07 History
시간순 Timeline 형태로 사용자 작업, AI 작업, 댓글, 반영 결정, Version 생성 이력을 제공한다.

### S08 Brand Concept Brief
카드 실물·홍보물 시안을 요청하는 화면. 산출물 유형·규격 프리셋 선택, 브리프 입력(상품·캠페인명 / 타겟 / 전달할 느낌 / 필수 문구), 브랜드 자산 선택, 참고자료 선택으로 구성한다. 비디자이너가 채울 수 있도록 디자인 용어를 입력칸에 쓰지 않는다.

### S09 Concept Compare
생성된 시안 3개를 규격 비율을 유지한 채 나란히 비교하는 화면. 시안별 방향 라벨·확대 보기·개별 의견 등록을 제공하고, 하나를 선택하면 Version이 생성된다. 선택하지 않으면 Version은 만들어지지 않는다. 시안은 샌드박스 iframe으로 격리 렌더링한다.

화면 상세: [09_UI_SPEC_브랜드시안.md](개발문서/09_UI_SPEC_브랜드시안.md)

### S10 Design Asset Library
IA의 `D3`. NH가 보유한 디자인 자산을 **자산 종류별**(~~로고·워드마크~~ 로고·CI 기본요소 / 컴포넌트 / 화면 템플릿 / 컬러·타이포 토큰)로 한 화면에 펼쳐 보여준다. 각 자산은 출처(올원뱅크 / 기업인터넷뱅킹 / NH공통)와 **실물 보유 여부**를 배지로 표시하고, 자산을 프로젝트에 담아 AI 생성 컨텍스트로 넘기는 진입점을 제공한다.

이 화면의 목적은 자산 관리가 아니라 **"외부 AI와 달리 NH 자산에서 출발한다"는 제품 차별점을 눈으로 확인시키는 것**이다. 그래서 상단에 보유 자산 규모를 고정 배치한다. Template의 버전 선택·소유 구분(D1/D2)은 이 화면이 아니라 S03·S04에서 다룬다.

- 실물 자산이 없는 항목은 대체본(자리표시)을 그려 빈 칸을 만들지 않되, 배지로 실물과 명확히 구분한다.
- 실물 이미지 파일은 공개 서빙 대상에서 제외되는 경로에만 둔다. → [DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md) 3절
- 농협 공식 CI(심볼마크·워드마크·전용색상·그래픽모티브)는 `로고·CI 기본요소`에 둔다. 전용색상 규격서의 PANTONE·RGB 값은 이미지와 별개로 코드에 옮겨 두어, 이미지가 없어도 토큰 카드가 정본 값을 보여준다.
- 관련 기능: [FR-04 Template](개발문서/기능명세/FR-04_템플릿.md)(`BRAND_ASSET`), [FR-13 브랜드 시안 제작](개발문서/기능명세/FR-13_브랜드시안제작.md)

## 3. 상태 모델
### AI Job
REQUESTED → PROCESSING → COMPLETED / FAILED / CANCELLED

### Comment/Review
OPEN → REVIEWED → ACCEPTED / REJECTED / DEFERRED

### Project
DRAFT → ACTIVE → REVIEW → COMPLETED → ARCHIVED

## 4. 핵심 UX 원칙
- AI 제안과 사람의 최종 결정을 시각적으로 구분한다.
- Version과 History를 같은 화면에서 연결한다.
- 사용자가 “왜 바뀌었는지”를 두 번 이상 클릭하지 않고 확인할 수 있게 한다.
- 프로젝트의 현재 상태와 다음 액션을 항상 보여준다.
- 파일/의견/Version을 프로젝트 단위로 묶어 검색 가능하게 한다.
