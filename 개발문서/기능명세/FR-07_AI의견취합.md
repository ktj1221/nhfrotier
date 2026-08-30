# FR-07 AI 의견 취합 v1.0

> **관련 문서**: [기능명세 인덱스](개발문서/기능명세/00_INDEX.md) | [PRD](개발문서/01_PRD.md) | [IA·화면](개발문서/03_IA_FUNCTION_SPEC.md) | [API/DB](개발문서/05_API_DB_SPEC.md)

## 1. 개요

다수 의견을 합의/이견/추가확인으로 분류하고 수정 후보를 제시한다. (PRD 9절)
댓글을 "합의/이견/추가확인"으로 구조화하는 것이 이 제품의 핵심 차별점이다(기획안 2-2절).

## 2. 동작 상세

- 프로젝트에 쌓인 의견([FR-06](개발문서/기능명세/FR-06_협업의견.md))을 AI가 **합의 / 이견 / 추가확인** 세 분류로 정리하고 수정 후보를 제시한다.
- 원 의견과 AI 요약 결과의 연결관계를 보존한다(`comments → review_items`, `review_summaries`).
- **AI 결과는 제안일 뿐 자동 확정되지 않는다.** 최종 반영 여부는 담당자가 결정한다 → [FR-08](개발문서/기능명세/FR-08_반영결정.md)
- 분류되지 않은 의견도 누락되지 않아야 한다.
- 취합은 AI Orchestrator 경유 서버 측 호출로 수행하며, 장시간 처리 시 비동기 Job 규칙을 따른다 → [FR-05](개발문서/기능명세/FR-05_AI제작.md)
- AI 제안과 사람의 최종 결정은 UI에서 시각적으로 구분한다(03 UX 원칙).

## 3. 관련 화면

| 화면 | 역할 |
|---|---|
| S05 Result/Review | AI 의견 요약 표시, 원 의견과 연결 |

정본: [03_IA_FUNCTION_SPEC.md](개발문서/03_IA_FUNCTION_SPEC.md)

## 4. 관련 API

| Method | Path | 용도 |
|---|---|---|
| POST | `/api/v1/projects/{projectId}/reviews/summarize` | AI 취합 요청 |
| GET | `/api/v1/projects/{projectId}/reviews` | 취합 결과 조회 |

정본: [05_API_DB_SPEC.md](개발문서/05_API_DB_SPEC.md)

## 5. US 매핑

| US | 요지 | 핵심 AC 요약 |
|---|---|---|
| US-031 | AI 의견 취합 | 원 의견-요약 연결 보존, AI 결과는 제안(자동 확정 금지), 미분류 의견 누락 금지 |

AC 전문 정본: [02_USER_STORIES_AC.md](개발문서/02_USER_STORIES_AC.md)

## 6. 구현 상태

| 단계 | 상태 | 근거 |
|---|---|---|
| 설계 | ✅ | PRD FR-07 · US-031 · `/reviews` API 반영 |
| 프로토타입 검증 | — 미검증 | 프로토타입([MockupGen](MockupGen_기능명세서.md))에 의견 취합 기능 없음 |
| 운영 구현 | ⬜ 미착수 | P3 — 티켓 FE-007, BE-008 ([백로그](개발문서/06_DEVELOPMENT_BACKLOG.md)) |
