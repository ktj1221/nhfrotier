# 개발 프로젝트 분할 및 Backlog v1.0

## 1. 개발 전략
제품 전체를 한 번에 개발하지 않고 업무가치가 연결되는 5개 프로젝트로 나눈다. 각 프로젝트는 독립적으로 테스트 가능하지만 다음 프로젝트의 기반이 된다.

## P0. 착수/환경 확정
**목표:** 개발·보안·인프라 기준을 먼저 확정
- Repository/branch 전략
- Docker build/run 기준
- 개발/검증 환경 구성
- SSO 연계 방식 확정
- LLM API 인증/endpoint 확정
- 파일 저장 위치/보존정책 확정
- 로그/감사 정책 초안
- 화면/DB/API 기본 규칙

**완료 기준:** 개발계에서 최소 Hello API + Docker 배포 + SSO/LLM 연계 가능성 검증

## P1. 업무공간 기반
**목표:** 프로젝트를 만들고 자료를 관리할 수 있는 기반 확보
- Dashboard
- Project CRUD
- Project Member/권한
- File Upload/Download
- Template 목록/선택
- PostgreSQL schema
- Redis 초기 연계

**완료 기준:** 사용자가 프로젝트를 생성하고 멤버/자료/Template을 관리할 수 있다.

## P2. AI 제작
**목표:** 승인된 LLM으로 실제 결과물을 생성
- Chat UI
- AI Job API
- AI Orchestrator
- LLM 인증/호출
- Prompt/Context builder
- Async Worker
- 결과 저장
- 실패/Retry

**완료 기준:** 프로젝트 자료와 Template을 선택하고 AI 결과를 생성/저장할 수 있다.

## P3. 협업/의사결정
**목표:** 여러 담당자의 의견을 하나의 결과물에 연결
- Comment
- Mention/담당자
- AI Review
- 합의/이견/추가확인 분류
- 반영/보류/반려 결정
- AI 수정 작업 생성

**완료 기준:** 의견 등록 → AI 취합 → 담당자 결정 → 수정 작업 요청까지 완주한다.

## P4. Version/History/Export
**목표:** 업무 과정을 조직의 자산으로 남김
- Version Snapshot
- Version Compare
- History Timeline
- 변경 이유 연결
- Export Job
- 파일별 Version 연결
- Audit Log

**완료 기준:** v1 → v2 변경과정 및 변경 이유를 추적할 수 있고 결과물을 다운로드할 수 있다.

## P5. 고도화
- RAG
- 업무기준/VOC 연계
- Template 추천
- 유사 프로젝트 추천
- 승인/결재 연계
- 협업 분석
- Agent 자동화

## 2. Sprint 권장 순서
Sprint 0: 환경/아키텍처
Sprint 1-2: P1
Sprint 3-4: P2
Sprint 5-6: P3
Sprint 7-8: P4
Sprint 9+: P5/운영 고도화

## 3. 우선 개발 티켓 예시
### FE
FE-001 Layout/Router
FE-002 Project List
FE-003 Project Workspace
FE-004 AI Chat
FE-005 File UI
FE-006 Comment UI
FE-007 AI Review Panel
FE-008 Version Compare
FE-009 History Timeline

### BE
BE-001 SSO Middleware
BE-002 Project API
BE-003 Member/Authorization
BE-004 File API
BE-005 Template API
BE-006 AI Job API
BE-007 AI Orchestrator Client
BE-008 Comment/Review API
BE-009 Version Service
BE-010 History/Audit Service
BE-011 Export Service

### Infra/DevOps
OPS-001 Docker image standard
OPS-002 Environment config/Secret
OPS-003 Reverse Proxy
OPS-004 DB backup/restore
OPS-005 File storage backup/retention
OPS-006 Monitoring/logging
OPS-007 LLM endpoint connectivity
OPS-008 Deployment runbook

## 4. 프로젝트 완료 판단
기능이 "동작"하는 것 외에 API/DB/로그/권한/실패 시나리오/테스트 결과가 함께 있어야 완료로 본다.
