# NH뚝딱협업스튜디오 개발 문서 패키지

## 1. 문서 목적
이 패키지는 NH뚝딱협업스튜디오의 개발 착수를 위한 기준 문서다. 제품의 핵심은 범용 디자인 생성기가 아니라, NH의 기존 업무 자산과 승인된 AI를 활용해 아이디어 생성부터 협업, 의사결정, 버전 관리, 업무 자산화를 연결하는 내부 업무 제작 플랫폼이다.

## 2. 문서 구성
- 01_PRD.md: 제품 목표, 사용자, 문제, 기능 범위, MVP, 비기능 요구사항
- 02_USER_STORIES_AC.md: Epic, User Story, Acceptance Criteria, 우선순위
- 03_IA_FUNCTION_SPEC.md: IA, 화면 구조, 주요 상태
- 기능명세/: FR-01~13 기능별 상세 명세와 추적 매트릭스(00_INDEX.md)
- 04_SYSTEM_ARCHITECTURE.md: Linux + Docker 기반 시스템 구조, LLM API 연계, 비동기 처리, 보안 원칙
- 05_API_DB_SPEC.md: API 초안, 도메인 모델, 주요 테이블 및 데이터 관계
- 06_DEVELOPMENT_BACKLOG.md: 프로젝트 분할, Sprint/단계, 개발 티켓 후보, 완료 기준
- 07_QA_SECURITY_OPERATIONS.md: 테스트, 보안, 운영, 장애 대응 체크리스트
- 08_DECISIONS_OPEN_ISSUES.md: 결정사항, 미결사항, 인프라/보안 협의 항목
- 09_UI_SPEC_브랜드시안.md: S08·S09 화면 상세 명세 (FR-13 브랜드 시안 제작)

## 3. 권장 개발 순서
P0 제품/환경 확정 → P1 업무공간 기반 → P2 AI 제작 → P3 협업/의사결정 → P4 Version/History/Export → P5 고도화(RAG/통계/자동화)

## 4. 핵심 차별화
1. NH 디자인 시스템을 또 하나 만드는 것이 아니라 기존 자산을 업무 맥락에 연결한다.
2. 댓글 자체가 아니라 의견 → 합의/이견/추가확인 → 반영 여부 → 버전 생성의 의사결정 흐름을 관리한다.
3. Version은 결과물의 상태, History는 변경/의사결정의 과정을 관리한다.
4. 개인 결과물이 아니라 프로젝트 단위로 업무 자산을 축적하고 후속 업무에서 재사용한다.
5. 승인된 LLM을 API로 호출하는 AI orchestration layer로 모델 교체와 운영 통제를 분리한다.
