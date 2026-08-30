# NH뚝딱협업스튜디오 시스템 아키텍처 v1.0

## 1. 목표 배포 환경
- 농협은행 내부 Linux 서버
- Docker 컨테이너 기반 배포
- 승인된 LLM 서버는 API 방식으로 연계
- 사용자 브라우저에서 LLM 직접 호출 금지
- 향후 K8s 전환을 고려한 stateless 애플리케이션 구조

## 2. 논리 구성
```mermaid
flowchart TB
  U[사내 사용자 PC]
  SSO[사내 SSO]
  RP[Nginx / Reverse Proxy]
  subgraph APP[Linux Server / Docker]
    FE[Frontend Vue3 / Nginx]
    BE[Backend Spring Boot]
    AO[AI Orchestrator]
    WK[Async Worker]
    DB[(PostgreSQL)]
    RD[(Redis)]
    FS[File Storage / NFS or Object Storage]
    AL[Audit Log]
  end
  subgraph LLM[승인 AI 영역]
    GW[LLM API Gateway]
    MODEL[LLM Server]
  end
  U --> RP --> FE --> BE
  U --> SSO
  BE --> SSO
  BE --> DB
  BE --> RD
  BE --> FS
  BE --> AL
  BE --> AO
  BE --> WK
  WK --> AO
  AO -->|HTTPS + 인증정보| GW --> MODEL
```

## 3. 컴포넌트 책임
### Frontend
화면/상태 표시, 파일 선택, Chat 입력, 협업 UI, Version/History 시각화.

### Backend
인증/인가, 프로젝트 도메인, 파일 메타데이터, 협업, Version, History, Export orchestration, API 제공.

### AI Orchestrator
LLM API 표준화, 인증정보 주입, 프롬프트 구성, 모델 라우팅, timeout/retry, 오류 정규화, 사용량 메타데이터 관리.

### Async Worker
장시간 문서 분석/생성/Export 작업을 큐 기반으로 처리할 확장 지점.

### PostgreSQL
프로젝트, 사용자, 멤버, 댓글, Review, Version, History, Template 메타데이터를 저장.

### Redis
세션/캐시/작업 상태 등 용도로 사용. 실제 운영 목적은 인프라 협의 후 확정.

### File Storage
원본 참고자료와 Version별 생성 산출물을 DB와 분리해 저장.

## 4. AI 호출 흐름
```mermaid
sequenceDiagram
  actor User
  participant FE as Frontend
  participant BE as Backend
  participant AO as AI Orchestrator
  participant GW as LLM API Gateway
  participant LLM as LLM Server
  participant DB as PostgreSQL

  User->>FE: AI 작업 요청
  FE->>BE: POST /ai/jobs
  BE->>DB: 작업 REQUESTED 저장
  BE->>AO: 작업 전달
  AO->>GW: 인증 Token + 요청
  GW->>LLM: 모델 호출
  LLM-->>GW: 결과
  GW-->>AO: 응답
  AO-->>BE: 정규화된 결과
  BE->>DB: 결과/Version 저장
  BE-->>FE: 상태/결과 반환
```

## 5. 보안 원칙
- SSO/사내 인증을 Backend에서 검증
- LLM credential은 Secret/보안 저장소 등 허용된 방식 사용
- 프론트 번들에 credential 포함 금지
- 프로젝트별 파일 접근권한 확인
- 로그에 원문/민감정보를 기본 저장하지 않음
- AI 요청 대상 자료를 사용자가 명시적으로 선택할 수 있게 함
- 파일 업로드 시 확장자/바이러스/용량 정책 적용

## 6. 안정성
- LLM timeout/retry/circuit-breaker 고려
- 장시간 작업 비동기 처리
- 실패 작업 재시도 가능
- 중복 요청 idempotency 고려
- DB/파일 간 불일치 복구 절차 필요

## 7. 확장성
초기에는 Docker 단일/소수 컨테이너로 구성하되, Frontend/Backend/AI Worker를 stateless하게 설계한다. 향후 NH K8s 환경으로 전환할 경우 Deployment/Service/Ingress/PVC 등으로 분리하기 쉽도록 이미지와 환경변수를 명확히 관리한다.
