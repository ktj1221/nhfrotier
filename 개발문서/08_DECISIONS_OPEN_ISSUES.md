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
- 준법/보안 검토를 워크플로우에 넣을지 여부
- 최종 Export 형식 우선순위

## 3. 중요한 제품 의사결정
### Q1. 이 서비스는 디자인 시스템인가?
**아니다.** 디자인 시스템은 구성요소 중 하나이며, 제품의 중심은 업무 제작과 협의/의사결정 관리다.

### Q2. AI가 최종 판단하는가?
**아니다.** AI는 의견과 수정안을 제안하고, 최종 반영 여부는 담당자가 결정한다.

### Q3. 댓글/Version만 있으면 차별점이 되는가?
**아니다.** 핵심은 의견을 의사결정과 Version에 연결하고 이후 업무에서 재사용 가능한 자산으로 남기는 것이다.

## 4. 향후 확장 방향
현재 프로젝트에서 축적되는 프로젝트/Template/Review/History 데이터는 이후 RAG와 유사업무 추천, 업무사례 검색, Agent 자동화의 입력 자산이 될 수 있다.
