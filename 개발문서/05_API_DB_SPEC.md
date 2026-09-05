# API / DB 초안 v1.0

## 1. API 기본 원칙
- REST API 기준
- `/api/v1` 버전 사용
- 사용자 인증은 사내 SSO 연계
- 서버 간 AI 호출은 내부 credential을 사용
- 장시간 작업은 Job 리소스로 비동기 처리

## 2. 주요 API
### Auth
`GET /api/v1/me`

### Project
`GET /api/v1/projects`
`POST /api/v1/projects`
`GET /api/v1/projects/{projectId}`
`PATCH /api/v1/projects/{projectId}`
`POST /api/v1/projects/{projectId}/members`

### Files
`POST /api/v1/projects/{projectId}/files`
`GET /api/v1/projects/{projectId}/files`
`DELETE /api/v1/projects/{projectId}/files/{fileId}`

### Template
`GET /api/v1/templates`  — `?type=DOCUMENT|BRAND_ASSET`로 유형 필터
`GET /api/v1/templates/{templateId}`

### AI Job
`POST /api/v1/projects/{projectId}/ai/jobs`  — body의 `job_type`으로 산출물 종류를 구분 (8절)
`GET /api/v1/ai/jobs/{jobId}`  — `BRAND_CONCEPT` Job은 출력 3건을 함께 반환
`POST /api/v1/ai/jobs/{jobId}/retry`

### Collaboration
`GET /api/v1/projects/{projectId}/comments`
`POST /api/v1/projects/{projectId}/comments`
`PATCH /api/v1/comments/{commentId}`

### AI Review
`POST /api/v1/projects/{projectId}/reviews/summarize`
`GET /api/v1/projects/{projectId}/reviews`
`POST /api/v1/reviews/{reviewId}/decisions`

### Version
`GET /api/v1/projects/{projectId}/versions`
`GET /api/v1/versions/{versionId}`
`GET /api/v1/versions/{versionId}/compare?baseVersionId=...`

### History
`GET /api/v1/projects/{projectId}/history`

### Export
`POST /api/v1/versions/{versionId}/exports`
`GET /api/v1/exports/{exportId}`

## 3. 주요 DB
```text
users
projects
project_members
files
file_references
templates
template_versions
ai_jobs
ai_job_inputs
ai_job_outputs
comments
review_summaries
review_items
review_decisions
versions
version_files
history_events
exports
audit_logs
```

## 4. 핵심 관계
```text
USER 1:N PROJECT_MEMBER N:1 PROJECT
PROJECT 1:N FILE
PROJECT 1:N AI_JOB
PROJECT 1:N COMMENT
PROJECT 1:N VERSION
PROJECT 1:N HISTORY_EVENT
VERSION 1:N VERSION_FILE
COMMENT 1:N REVIEW_ITEM
REVIEW_ITEM 1:1 REVIEW_DECISION
AI_JOB 1:N AI_JOB_INPUT/OUTPUT
TEMPLATE 1:N TEMPLATE_VERSION
```

## 5. Version 모델
Version은 결과물의 논리적 스냅샷이다.
- version_id
- project_id
- parent_version_id
- version_no
- source_type(AI_GENERATION, AI_REVISION, MANUAL_EDIT, IMPORT)
- source_job_id
- created_by
- created_at
- summary
- status

## 6. History 모델
History는 과정과 의사결정 기록이다.
- history_id
- project_id
- actor_type(USER, AI, SYSTEM)
- actor_id
- action_type
- target_type
- target_id
- payload_summary
- created_at

## 7. API 오류 원칙
- 400 입력 오류
- 401 인증 필요
- 403 권한 없음
- 404 대상 없음
- 409 Version/동시성 충돌
- 413 파일 용량 초과
- 422 업무 규칙 위반
- 429 AI 호출 제한
- 500 서버 오류
- 502/504 LLM/외부 연계 오류

## 8. 산출물 유형 확장 (FR-13 브랜드 시안)

카드 실물·홍보물 컨셉 시안을 위해 **새 테이블과 새 엔드포인트를 만들지 않는다.** 기존 리소스에 구분 필드만 둔다. 근거: [FR-13](개발문서/기능명세/FR-13_브랜드시안제작.md)

### 8-1. 추가 필드

| 테이블 | 필드 | 값 | 용도 |
|---|---|---|---|
| `templates` | `template_type` | `DOCUMENT` / `BRAND_ASSET` | 문서 양식과 브랜드 자산(로고·컬러 토큰·서체 규칙·규격 프리셋)을 구분 |
| `ai_jobs` | `job_type` | `DOC_DRAFT` / `SCREEN_MOCKUP` / `BRAND_CONCEPT` | 산출물 종류별 프롬프트·후처리 분기 |
| `ai_job_outputs` | `variant_no` | 1 · 2 · 3 | 한 Job이 만든 시안 3안의 구분 |
| `ai_job_outputs` | `variant_label` | 텍스트 | 방향 설명 (예: "정통·신뢰형") |

### 8-2. 규격 프리셋

프리셋은 코드가 아니라 `templates`(`BRAND_ASSET`) 데이터로 관리한다. 유형 추가 시 코드를 고치지 않는다.

| 프리셋 ID | 비율 |
|---|---|
| `CARD_H` | 1.586 : 1 |
| `CARD_V` | 1 : 1.586 |
| `POSTER_A` | 1 : 1.414 |
| `BANNER_SQ` | 1 : 1 |

### 8-3. Version 생성 시점

`BRAND_CONCEPT` Job이 완료돼도 **Version은 생성되지 않는다.** 3안은 `ai_job_outputs`에만 남는 후보다.
사용자가 하나를 선택할 때 `versions` 1행이 생성되며 `source_type = AI_GENERATION`, `source_job_id`로 Job과 연결된다. 선택되지 않은 시안은 Version이 되지 않는다.
