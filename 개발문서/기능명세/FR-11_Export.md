# FR-11 Export v1.0

> **관련 문서**: [기능명세 인덱스](개발문서/기능명세/00_INDEX.md) | [PRD](개발문서/01_PRD.md) | [IA·화면](개발문서/03_IA_FUNCTION_SPEC.md) | [API/DB](개발문서/05_API_DB_SPEC.md)

## 1. 개요

최종 산출물을 실제 업무파일 형태로 생성/다운로드한다. (PRD 9절)
MVP는 기본 Export까지, PPTX/DOCX/HWPX/HTML 고도화는 후속 범위다(PRD 4절).

## 2. 동작 상세

- Export는 Version 단위로 요청한다. 장시간 변환은 비동기 Job으로 처리하고 포맷별 생성 상태를 보여준다.
- 다운로드 파일과 해당 Version을 연결해, 반출된 산출물이 어느 버전에서 나왔는지 추적한다 → [FR-09](개발문서/기능명세/FR-09_버전관리.md)
- Export 결과 파일은 File Storage에 저장하고 DB에는 메타데이터만 남긴다(`exports`).
- Export 요청·다운로드는 감사 대상 이벤트다 → [FR-12](개발문서/기능명세/FR-12_감사추적.md)
- ❓ **미결**: 지원 포맷 우선순위(HTML/PPTX/DOCX/HWPX — 기획안 7-3절), 파일 반출 허용 범위·승인 절차 — [결정/미결](개발문서/08_DECISIONS_OPEN_ISSUES.md)

## 3. 관련 화면

| 화면 | 역할 |
|---|---|
| S03 Project Workspace | 상단 Export 진입 |
| ❓ 미정의 | Export 상태·포맷 선택 전용 화면(S0x)이 정의되지 않음 |

정본: [03_IA_FUNCTION_SPEC.md](개발문서/03_IA_FUNCTION_SPEC.md)

## 4. 관련 API

| Method | Path | 용도 |
|---|---|---|
| POST | `/api/v1/versions/{versionId}/exports` | Export Job 생성 |
| GET | `/api/v1/exports/{exportId}` | 상태·결과 조회 |

정본: [05_API_DB_SPEC.md](개발문서/05_API_DB_SPEC.md)

## 5. US 매핑

| US | 요지 | 핵심 AC 요약 |
|---|---|---|
| US-050 | Export | 포맷별 생성 상태 표시, 다운로드 파일-Version 연결 |

AC 전문 정본: [02_USER_STORIES_AC.md](개발문서/02_USER_STORIES_AC.md)

## 6. 구현 상태

| 단계 | 상태 | 근거 |
|---|---|---|
| 설계 | ✅ | PRD FR-11 · US-050 · `/exports` API 반영 |
| 프로토타입 검증 | 부분 | [MockupGen](MockupGen_기능명세서.md) PFR-05-05(HTML 다운로드), PFR-10(기획서 HTML 생성·다운로드). HTML 한정이며 업무 포맷 변환·Version 연결은 미검증 |
| 운영 구현 | ⬜ 미착수 | P4 — 티켓 BE-011 ([백로그](개발문서/06_DEVELOPMENT_BACKLOG.md)) |
