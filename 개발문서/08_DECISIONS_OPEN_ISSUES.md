# Decision Log & Open Issues v1.0

## 1. 현재 결정사항
| 항목 | 결정 |
|---|---|
| AI 모델 | 자체 LLM 개발하지 않고 승인된 LLM API 사용 |
| LLM 호출 위치 | Backend/AI Orchestrator에서 서버 측 호출 |
| 초기 배포 | Linux + Docker |
| 향후 확장 | K8s 전환 가능 구조 유지 |
| Version | 결과물 상태 관리 |
| History | 작업/의사결정 과정 관리 |
| 파일 저장 | DB와 분리된 File Storage |
| 긴 AI 작업 | Async Job 확장 구조 |
| 디자인 시스템 | 기존 NH 자산과 연결, 중복 구축 최소화 |

## 2. 반드시 협의해야 할 사항
### 인프라
- Linux 서버 사양
- Docker 운영 방식
- 내부 DNS/Reverse Proxy
- 컨테이너 이미지 반입 경로 및 Registry
- 운영/개발 서버 분리
- NFS/Object Storage 종류와 접근권한
- DB/Redis 운영 주체

### AI
- LLM API endpoint
- 인증 방식(Token/API Key/OAuth 등)
- 사용 가능한 모델 목록
- 최대 입력/출력 토큰
- 동시 호출 제한
- Timeout/Rate Limit 정책
- Prompt/Response 저장 허용 범위
- AI Job 중복 제출 시 idempotency 처리 방식 ([04_SYSTEM_ARCHITECTURE.md](개발문서/04_SYSTEM_ARCHITECTURE.md) 6절, [FR-05](개발문서/기능명세/FR-05_AI제작.md))

### 보안
- SSO 방식
- 프로젝트 권한 모델
- 파일 반출 정책
- 로그/감사로그 보존 정책
- AI 입력 데이터의 민감정보 처리 기준
- HTML preview 보안 정책

### 업무
- 공식 NH Template의 관리 주체
- 개인 Template 공유 허용 범위
- Version 승인 개념 필요 여부
- Version 삭제/불변성 정책 — 프로토타입은 버전 삭제를 허용하나 정본 원칙은 "불변에 가까운" 스냅샷([FR-09](개발문서/기능명세/FR-09_버전관리.md))
- 준법/보안 검토를 워크플로우에 넣을지 여부
- 최종 Export 형식 우선순위
- 참고자료 허용 파일 형식·업로드 용량 상한값 ([FR-03](개발문서/기능명세/FR-03_참고자료.md))
- 프로토타입의 프로젝트 단위 팀 채팅(PFR-09) 기능을 정식 제품 범위로 채택할지 여부 ([FR-06](개발문서/기능명세/FR-06_협업의견.md))

### 화면(UI) — S0x로 정의되지 않은 화면
- SSO 리다이렉트/세션 만료 화면 ([FR-01](개발문서/기능명세/FR-01_인증권한.md))
- Admin 화면(IA의 F 노드) 구성 — 인증/권한 관리, 감사 로그 조회에 공통으로 필요 ([FR-01](개발문서/기능명세/FR-01_인증권한.md), [FR-12](개발문서/기능명세/FR-12_감사추적.md))
- Template 관리 화면(IA의 D/D1/D2 노드) ([FR-04](개발문서/기능명세/FR-04_템플릿.md))
- Export 상태·포맷 선택 전용 화면 ([FR-11](개발문서/기능명세/FR-11_Export.md))

## 3. 중요한 제품 의사결정
### Q1. 이 서비스는 디자인 시스템인가?
**아니다.** 디자인 시스템은 구성요소 중 하나이며, 제품의 중심은 업무 제작과 협의/의사결정 관리다.

### Q2. AI가 최종 판단하는가?
**아니다.** AI는 의견과 수정안을 제안하고, 최종 반영 여부는 담당자가 결정한다.

### Q3. 댓글/Version만 있으면 차별점이 되는가?
**아니다.** 핵심은 의견을 의사결정과 Version에 연결하고 이후 업무에서 재사용 가능한 자산으로 남기는 것이다.

## 4. 향후 확장 방향
현재 프로젝트에서 축적되는 프로젝트/Template/Review/History 데이터는 이후 RAG와 유사업무 추천, 업무사례 검색, Agent 자동화의 입력 자산이 될 수 있다.
