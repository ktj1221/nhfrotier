# 아키텍처 결정

> 이 프로젝트의 아키텍처 설계 결정과 그 이유를 기록합니다.
>
> **관련 문서**: [기술 스택](TECH_STACK.md) | [배포](DEPLOYMENT.md) | [보안 체크리스트](../guidelines/SECURITY_CHECKLIST.md)
> **정본 상세 설계**: [개발문서/04_SYSTEM_ARCHITECTURE.md](../../개발문서/04_SYSTEM_ARCHITECTURE.md) · [개발문서/05_API_DB_SPEC.md](../../개발문서/05_API_DB_SPEC.md)

---

## 0. 결정 요약

| # | 결정 | 선택 |
|---|---|---|
| 1 | 배포 형태 | Linux + Docker (K8s 전환 가능한 stateless 구조) |
| 2 | LLM 호출 위치 | Backend의 AI Orchestrator에서 서버 측 호출 |
| 3 | AI 연동 방식 | 자체 모델 미개발, 승인된 LLM을 API로 호출 |
| 4 | 긴 AI 작업 | Job 리소스 기반 비동기 처리 |
| 5 | 결과물 이력 | Version(상태)과 History(과정)를 분리 |
| 6 | 협업 모델 | 댓글을 Review Item → Decision → Version으로 연결 |
| 7 | 파일 저장 | DB와 분리된 File Storage에 저장, DB에는 메타데이터만 |
| 8 | API 스타일 | REST + `/api/v1` 버전 경로 |
| 9 | 에러 처리 | HTTP 상태코드 기반 정규화, 내부 정보 비노출 |
| 10 | 폴더 구조 | 기능(도메인) 단위 구성 |
| 11 | 책임성 검토 | 차단 게이트가 아닌 자문 계층. AI Orchestrator 뒤에 두고 결과를 의견 흐름에 얹는다 |

---

## 1. 배포 형태: Linux 서버 + Docker

- **무엇**: 농협은행 내부 Linux 서버에 Docker 컨테이너로 배포한다. Frontend / Backend / AI Worker를 각각 stateless하게 설계하고, 상태는 PostgreSQL·Redis·File Storage에만 둔다.
- **왜 선택**: 행내 반입 절차와 서버 사양이 확정되기 전에도 이미지 단위로 옮길 수 있고, 초기에는 단일 서버 소수 컨테이너로 시작해 트래픽 증가 시 컨테이너만 늘리면 된다.
- **왜 처음부터 K8s가 아닌지**: 초기 사용자 규모가 작아 오케스트레이션 운영 부담이 이득보다 크다. 대신 애플리케이션을 stateless로 유지하고 설정을 환경변수로 외부화해, 이후 Deployment/Service/Ingress/PVC로 분리하는 전환 비용을 낮춰 둔다.
- **왜 SaaS/클라우드가 아닌지**: 행내 업무 자료를 다루므로 외부 반출이 불가하다.

## 2. LLM 호출 위치: Backend(AI Orchestrator)에서 서버 측 호출

- **무엇**: 브라우저는 LLM에 직접 접근하지 않는다. Frontend → Backend → AI Orchestrator → LLM API Gateway → LLM Server 경로로만 호출한다.
- **왜 선택**: LLM credential이 프론트 번들이나 브라우저 Network 탭에 노출되지 않는다. 호출 대상 자료의 권한 검증, 사용량 기록, 감사 로그를 한 지점에서 강제할 수 있다.
- **왜 프론트 직접 호출이 아닌지**: 어떤 방식으로 감추더라도 클라이언트에 내려간 credential은 탈취 가능하며, ISMS-P 기준상 허용되지 않는다. ([SECURITY.md](../guidelines/SECURITY.md) 7절)

## 3. AI Orchestrator를 별도 계층으로 분리

- **무엇**: LLM API 표준화, 인증정보 주입, 프롬프트 구성, 모델 라우팅, timeout/retry, 오류 정규화, 사용량 메타데이터 관리를 담당하는 계층을 Backend 도메인 로직과 분리한다.
- **왜 선택**: 행내에서 승인되는 모델·endpoint·인증 방식이 아직 미정이고 이후 교체될 수 있다. 교체 지점을 한 계층으로 모아 두면 도메인 코드를 건드리지 않고 모델을 바꿀 수 있다. Rate limit·circuit breaker 같은 운영 통제도 이 계층에 모인다.
- **왜 도메인 서비스에서 직접 호출하지 않는지**: 모델 교체나 재시도 정책 변경이 여러 도메인 서비스로 번지는 shotgun surgery가 된다.

## 4. 긴 AI 작업: 비동기 Job 리소스

- **무엇**: 문서 분석/생성/Export처럼 오래 걸리는 작업은 `POST /api/v1/projects/{projectId}/ai/jobs`로 Job을 만들고, `GET /api/v1/ai/jobs/{jobId}`로 상태를 조회한다. 실패 시 `POST /api/v1/ai/jobs/{jobId}/retry`.
- **왜 선택**: LLM 응답 시간이 길고 편차가 크다. 동기 요청으로 묶으면 HTTP timeout과 사용자 대기 문제가 동시에 발생하고, 실패한 작업을 재시도할 수단도 없다. Job으로 만들면 상태(REQUESTED/RUNNING/DONE/FAILED)가 남아 재시도와 감사가 가능하다.
- **왜 동기 응답이 아닌지**: LLM 장애 시 요청이 그대로 유실되어 사용자가 처음부터 다시 입력해야 한다.
- **중복 제출 대응**: 동일 Job 중복 요청에 대한 idempotency 처리가 필요하다. (미결 — [08_DECISIONS_OPEN_ISSUES.md](../../개발문서/08_DECISIONS_OPEN_ISSUES.md))

## 5. Version과 History의 분리

- **무엇**: **Version**은 결과물의 논리적 스냅샷(상태)이고, **History**는 변경과 의사결정의 과정(로그)이다. 서로 다른 테이블로 관리한다.
  - Version: `parent_version_id`, `version_no`, `source_type`(AI_GENERATION / AI_REVISION / MANUAL_EDIT / IMPORT), `source_job_id`, `summary`, `status`
  - History: `actor_type`(USER / AI / SYSTEM), `actor_id`, `action_type`, `target_type`, `target_id`, `payload_summary`
- **왜 선택**: "지금 결과물이 어떤 상태인가"와 "왜 이렇게 됐는가"는 조회 목적도 보존 주기도 다르다. 분리해야 Version 비교(`/versions/{id}/compare`)는 가볍게 유지하면서, History에는 AI·시스템 행위까지 포함한 전체 흐름을 남길 수 있다.
- **왜 하나로 합치지 않는지**: 한 테이블에 섞으면 Version 목록 조회마다 무관한 이벤트를 걸러내야 하고, 감사 로그 보존 정책(1년 이상)을 결과물 데이터에까지 적용하게 된다.

## 6. 협업 모델: 댓글 → Review → Decision → Version

- **무엇**: 댓글을 단순 코멘트로 두지 않고 `comments → review_items → review_decisions → versions`로 연결한다. AI가 의견을 요약(`POST /reviews/summarize`)하고, 담당자가 반영/보류/반려를 결정하면 그 결정이 새 Version의 근거로 남는다.
- **왜 선택**: 이 제품의 핵심 차별점이 협의 과정의 자산화다. 의견이 어떤 결정을 거쳐 어느 버전에 반영됐는지 추적할 수 있어야 이후 업무에서 재사용 가능한 자산이 된다.
- **왜 단순 댓글이 아닌지**: 댓글만으로는 "이 의견이 반영됐는지"를 알 수 없어, 결국 사람이 별도 문서로 정리하게 된다. ([08_DECISIONS_OPEN_ISSUES.md](../../개발문서/08_DECISIONS_OPEN_ISSUES.md) Q3)
- **AI의 역할 경계**: AI는 의견 요약과 수정안을 제안할 뿐, 최종 반영 여부는 담당자가 결정한다.

## 7. 파일 저장: DB와 분리된 File Storage

- **무엇**: 원본 참고자료와 Version별 산출물은 NFS 또는 Object Storage에 저장하고, DB에는 메타데이터(경로, 크기, mime, 소유 프로젝트)만 둔다.
- **왜 선택**: 대용량 바이너리를 DB에 넣으면 백업/복구 시간과 커넥션 점유가 급격히 늘어난다. 저장소 종류가 아직 미정이라 메타데이터와 분리해 두면 이후 교체가 쉽다.
- **왜 DB BLOB이 아닌지**: 위와 같음. 단, DB와 파일 저장소 간 불일치가 생길 수 있으므로 복구 절차가 필요하다.
- **접근 제어**: 파일 조회 시 프로젝트 멤버십을 반드시 확인한다. IDOR 방지는 [SECURITY_CHECKLIST.md](../guidelines/SECURITY_CHECKLIST.md) 참고.

## 8. API 설계: REST + `/api/v1`

- **무엇**: REST 기준, `/api/v1` 경로에 버전을 명시한다. 인증은 사내 SSO 연계, 사용자 정보는 `GET /api/v1/me`.
- **왜 선택**: 리소스 구조(Project / File / Version / Comment / Job)가 명확하고 팀이 익숙하다. 행내 Reverse Proxy·WAF 정책도 경로 기반 REST에서 다루기 쉽다.
- **왜 GraphQL이 아닌지**: 단일 endpoint로 들어오는 임의 쿼리는 경로 기반 접근 통제·감사 로그와 맞지 않고, 초기 규모에서 스키마 운영 비용이 이득보다 크다.
- **왜 경로 버전(`/v1`)인지**: 헤더 버전보다 프록시·로그·문서에서 식별이 쉽다.

## 9. 에러 처리 전략

- **무엇**: HTTP 상태코드로 오류를 정규화한다. 응답 본문에는 스택 트레이스·DB 정보·내부 경로를 포함하지 않는다.

| 코드 | 의미 |
|---|---|
| 400 | 입력 오류 |
| 401 | 인증 필요 |
| 403 | 권한 없음 |
| 404 | 대상 없음 |
| 409 | Version/동시성 충돌 |
| 413 | 파일 용량 초과 |
| 422 | 업무 규칙 위반 |
| 429 | AI 호출 제한 |
| 500 | 서버 오류 |
| 502 / 504 | LLM·외부 연계 오류 |

- **왜 선택**: LLM 장애(502/504)와 업무 규칙 위반(422)을 구분해야 Frontend가 "재시도 가능"과 "입력을 고쳐야 함"을 다르게 안내할 수 있다.
- **왜 200 + 본문 에러코드가 아닌지**: 프록시·모니터링·재시도 정책이 상태코드를 기준으로 동작한다.
- **AI Orchestrator 오류**: LLM별 상이한 오류 형식을 Orchestrator에서 위 코드 체계로 정규화한 뒤 도메인 계층에 전달한다.

## 10. 폴더 구조: 기능(도메인) 단위

- **무엇**: `controller/`, `service/`, `dto/` 같은 타입별 묶음이 아니라 `project/`, `file/`, `ai/`, `review/`, `version/`, `history/`, `export/` 같은 도메인 단위로 묶는다.
- **왜 선택**: 이 제품의 변경은 대부분 한 도메인 안에서 발생한다(예: Review 흐름 변경). 도메인별로 묶으면 관련 파일이 한곳에 모여 변경 범위가 좁아진다.
- **왜 타입별이 아닌지**: 기능 하나를 고치는 데 여러 폴더를 오가야 하고, 도메인 경계가 코드에 드러나지 않는다.
- **의존 방향**: 도메인 → 인프라 방향으로만 의존한다. AI Orchestrator는 인터페이스로 주입해 도메인이 특정 LLM SDK에 묶이지 않게 한다.

---

## 11. 책임성 검토: 차단 게이트가 아닌 자문 계층

- **무엇**: 생성된 산출물을 규칙 목록(표현·차별 / 금융소비자보호 / 다크패턴 / 접근성)에 비추어 다시 읽고, 지적을 **의견 흐름에 얹는** 계층이다. 호출은 AI Orchestrator를 경유하며(2·3절), 결과는 근거 인용이 있는 항목만 저장한다. 담당자는 반영 / 보류 / 반려 / **준법 검토 요청** 중 하나를 고른다. 규칙 정본은 [RESPONSIBLE_DESIGN.md](../guidelines/RESPONSIBLE_DESIGN.md), 기능 명세는 [FR-14](../../개발문서/기능명세/FR-14_책임성검토.md).
- **왜 선택**: 이 제품은 AI 생성물을 은행 산출물로 쓴다. 표현·소비자보호·접근성 문제를 걸러낼 지점이 어디에도 없었다. 자문 계층은 놓친 지적을 줄이면서도 6절의 협업 모델(의견 → 결정 → Version)을 그대로 재사용한다 — 새 파이프라인을 만들지 않는다.
- **왜 차단 게이트가 아닌지**: [PRD 5절](../../개발문서/01_PRD.md)이 "준법 판단의 완전 자동화"를 비범위로 두고, [08 Q2](../../개발문서/08_DECISIONS_OPEN_ISSUES.md)가 "AI는 제안하고 사람이 결정한다"로 확정했다. 게이트로 만들면 AI 오판이 업무를 멈추게 하는데, 그 비용이 놓친 지적의 비용보다 크다고 판단했다.
- **왜 규칙을 문서와 코드 양쪽에 두는지**: 정본은 문서다. 코드 사본은 생성 가드레일과 검토 지시문을 **규칙에서 생성**하기 위한 것으로, 규칙을 추가하면 프롬프트 두 곳이 함께 갱신되어 드리프트가 생기지 않는다. 프롬프트를 손으로 관리하면 규칙과 어긋난다.
- **왜 근거 인용을 강제하는지**: 근거 없는 지적은 담당자가 검증할 수 없어 결정을 내릴 수 없고, 노이즈가 섞이면 검토 결과 전체의 신뢰가 무너진다. 규칙 ID나 근거가 없는 항목은 저장 전에 버린다.
- **왜 생성 가드레일만으로 끝내지 않는지**: [SECURITY_CHECKLIST 4절](../guidelines/SECURITY_CHECKLIST.md)이 명시하듯 프롬프트 지시는 통제가 아니다. 1차(가드레일)와 2차(사후 검토)를 둘 다 둔다.

---

## 12. 미결 사항

아래는 아직 결정되지 않았고, 확정 시 이 문서에 결정 형식으로 추가한다. 전체 목록은 [08_DECISIONS_OPEN_ISSUES.md](../../개발문서/08_DECISIONS_OPEN_ISSUES.md) 참고.

- SSO 방식과 프로젝트 권한 모델
- LLM endpoint / 인증 방식 / 사용 가능 모델 / 토큰·동시 호출 한도
- Prompt·Response 저장 허용 범위
- File Storage 종류(NFS vs Object Storage)와 접근권한
- Redis의 실제 운영 용도(세션 / 캐시 / Job 상태)
- HTML preview 보안 정책
- Version 승인 개념 도입 여부
