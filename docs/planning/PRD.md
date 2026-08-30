# PRD (Product Requirements Document)

> ⚠️ **이 문서는 포인터입니다. PRD 정본은 [개발문서/01_PRD.md](../../개발문서/01_PRD.md)입니다.**
>
> 제품 목표·사용자·문제 정의·기능 범위·MVP·비기능 요구사항은 모두 정본에 있습니다.
> **PRD 내용을 이 파일에 옮겨 적지 마십시오.** 두 벌이 되면 반드시 한쪽이 낡습니다.

---

## 정본 문서 지도

| 알고 싶은 것 | 문서 |
|---|---|
| 제품 목표, 사용자, 기능 범위, MVP, 비기능 요구사항 | [개발문서/01_PRD.md](../../개발문서/01_PRD.md) |
| Epic / User Story / 인수조건(AC) / 우선순위 | [개발문서/02_USER_STORIES_AC.md](../../개발문서/02_USER_STORIES_AC.md) |
| 기능별 상세 명세(FR-01~12), FR ↔ US ↔ 화면 ↔ API 추적 | [개발문서/기능명세/00_INDEX.md](../../개발문서/기능명세/00_INDEX.md) |
| IA, 화면 구조, 주요 상태 | [개발문서/03_IA_FUNCTION_SPEC.md](../../개발문서/03_IA_FUNCTION_SPEC.md) |
| 시스템 구조, LLM 연계, 비동기 처리 | [개발문서/04_SYSTEM_ARCHITECTURE.md](../../개발문서/04_SYSTEM_ARCHITECTURE.md) |
| API 초안, 도메인 모델, 테이블 | [개발문서/05_API_DB_SPEC.md](../../개발문서/05_API_DB_SPEC.md) |
| Sprint 분할, 개발 티켓, 완료 기준 | [개발문서/06_DEVELOPMENT_BACKLOG.md](../../개발문서/06_DEVELOPMENT_BACKLOG.md) |
| 테스트·보안·운영 체크리스트 | [개발문서/07_QA_SECURITY_OPERATIONS.md](../../개발문서/07_QA_SECURITY_OPERATIONS.md) |
| 결정사항 / 미결사항 / 협의 필요 항목 | [개발문서/08_DECISIONS_OPEN_ISSUES.md](../../개발문서/08_DECISIONS_OPEN_ISSUES.md) |
| 사업 기획안 원본 | [docs/NH뚝딱협업스튜디오_기획안.md](../NH뚝딱협업스튜디오_기획안.md) |

## 개발 가이드라인 (이 저장소가 관리하는 문서)

| 상황 | 문서 |
|---|---|
| 아키텍처 결정과 그 이유 | [docs/architecture/ARCHITECTURE.md](../architecture/ARCHITECTURE.md) |
| 기술 선택 이유, **검토 후 제외한 기술** | [docs/architecture/TECH_STACK.md](../architecture/TECH_STACK.md) |
| 실행 방법, 환경변수, 배포, 트러블슈팅 | [docs/architecture/DEPLOYMENT.md](../architecture/DEPLOYMENT.md) |
| 보안 결정·ISMS-P 대응 현황 | [docs/guidelines/SECURITY_CHECKLIST.md](../guidelines/SECURITY_CHECKLIST.md) |
| 보안 규칙 원문 (ISMS-P) | [docs/guidelines/SECURITY.md](../guidelines/SECURITY.md) |
| 클린 코드 원칙 | [docs/guidelines/CLEAN_CODE.md](../guidelines/CLEAN_CODE.md) |
| 작업 진행 프로세스 | [docs/guidelines/WORKFLOW.md](../guidelines/WORKFLOW.md) |

---

## 기능·우선순위가 바뀌면

[개발문서/01_PRD.md](../../개발문서/01_PRD.md)와 [개발문서/02_USER_STORIES_AC.md](../../개발문서/02_USER_STORIES_AC.md)를 수정합니다.
이전 내용은 지우지 말고 ~~취소선~~으로 남기고 새 내용을 추가합니다.
