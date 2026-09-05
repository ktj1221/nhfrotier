# 배포 / 인프라

> 배포 환경 설정 절차, 환경변수, 트러블슈팅을 기록합니다.
> **환경변수는 키와 용도만 적습니다. 실제 값은 절대 이 문서에 넣지 않습니다.**
>
> **관련 문서**: [아키텍처 결정](ARCHITECTURE.md) | [기술 스택](TECH_STACK.md) | [보안 체크리스트](../guidelines/SECURITY_CHECKLIST.md)

---

## 1. 배포 대상 요약

| 구분 | 환경 | 상태 |
|---|---|---|
| **A. 프로토타입** (`mockup/`) | 로컬 개발 PC | 동작 중 |
| **B. 운영** | 농협은행 내부 Linux 서버 + Docker | 미구축 (인프라 협의 중) |

---

## 2. 프로토타입 로컬 실행 (`mockup/`)

### 사전 요구사항
- Node.js 20 LTS 이상
- 네이티브 모듈(`better-sqlite3`) 빌드 도구 — Windows는 Visual Studio Build Tools 필요

### 절차
```bash
cd mockup
npm install
# .env.local 파일을 만들고 아래 3절의 키를 채운다
npm run dev          # http://localhost:3000
```

### 기타 명령어
```bash
npm run build        # 프로덕션 빌드
npm run start        # 빌드 결과 실행
npm run lint         # ESLint
```

### 데이터 저장 위치
- SQLite 파일: `mockup/data/mockup.db` — 최초 실행 시 `lib/db.ts`가 디렉터리와 스키마를 자동 생성한다.
- `.gitignore`에 `/data/*.db*`가 등록되어 있어 커밋되지 않는다.
- **초기화 방법**: `mockup/data/` 디렉터리를 삭제하고 재실행한다.

### 디자인 자산 이미지 (`mockup/public/assets/nh/`)

`/proto/assets`(S10 디자인 자산 갤러리)가 읽는 실물 이미지 위치다.

- **커밋하지 않는다.** `.gitignore`에 `mockup/public/assets/nh/*`가 등록되어 있고 `README.md`만 추적된다.
- **이유**: `.github/workflows/pages.yml`이 저장소 루트 전체를 GitHub Pages로 공개 서빙한다(main → `/`, dev → `/dev/`). 올원뱅크·기업인터넷뱅킹 화면 캡처나 NH 로고 원본을 커밋하면 공개 URL로 노출된다. `design-system/uploads/`를 제외한 것과 같은 이유다.
- 파일이 없어도 화면은 동작한다. `AssetThumb`이 대체본을 그리고 배지로 구분한다.
- 파일명 규칙과 폴더 구조는 `mockup/public/assets/nh/README.md` 참고.

### 화면 리디자인 참고 캡처 (`reference/ui/`)

외부 서비스 UI 캡처를 모아 두는 곳이다. 화면 코드가 읽지 않는 순수 참고 자료다.

- **커밋하지 않는다.** `.gitignore`에 `reference/ui/**`가 등록되어 있고 `README.md`만 추적된다.
- **이유**: 위와 같다. 루트가 공개 서빙되는데 캡처에 사내 프로젝트명·계정명이 함께 찍혀 있다.
- 파일이 없어도 저장소·빌드는 그대로 동작한다. 자세한 내용은 `reference/ui/README.md` 참고.

---

## 3. 환경변수

> 값은 기록하지 않는다. `.env`·`.env.local`은 `.gitignore`에 등록되어 있어야 한다.

### A. 프로토타입 (`mockup/.env.local`)

| 키 | 용도 | 필수 |
|---|---|---|
| `ANTHROPIC_API_KEY` | Claude API 호출용 키. `lib/generate.ts`에서 서버 측에서만 사용 | 필수 |

- `NEXT_PUBLIC_` 접두사를 붙이면 브라우저 번들에 포함된다. **API 키에는 절대 붙이지 않는다.**

### B. 운영 (미확정 — 인프라 협의 후 확정)

| 키 | 용도 | 상태 |
|---|---|---|
| `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASSWORD` | PostgreSQL 접속 정보 | 미확정 |
| `REDIS_HOST` / `REDIS_PORT` | Redis 접속 정보 | 미확정 (용도 자체가 미결) |
| `LLM_API_ENDPOINT` | 승인된 LLM API Gateway 주소 | 미확정 |
| `LLM_API_CREDENTIAL` | LLM 인증 정보. Token / API Key / OAuth 중 방식 미정 | 미확정 |
| `LLM_MODEL_NAME` | 호출할 모델 식별자 | 미확정 |
| `SSO_*` | 사내 SSO 연계 설정 | 미확정 (방식 미정) |
| `FILE_STORAGE_PATH` 또는 `OBJECT_STORAGE_*` | 파일 저장소 경로/접속 정보 | 미확정 (종류 미정) |

### 관리 원칙
- 비밀 값은 Secret 저장소 또는 컨테이너 환경변수로 주입한다. 이미지에 굽지 않는다.
- 개발 / 스테이징 / 프로덕션 환경을 분리한다.
- 키 값이 필요할 때 터미널 명령어 인자로 전달하지 않는다. 파일을 직접 열어 입력한다.

---

## 4. 운영 배포 구조 (목표)

```
사내 사용자 PC
      │
      ▼
Nginx / Reverse Proxy
      │
      ├─► Frontend (Vue3 빌드 산출물 / Nginx 컨테이너)
      │
      └─► Backend (Spring Boot 컨테이너)
             ├─► PostgreSQL
             ├─► Redis
             ├─► File Storage (NFS / Object Storage)
             ├─► Audit Log
             └─► AI Orchestrator ──HTTPS+인증──► LLM API Gateway ─► LLM Server
```

- 공개 접점은 DMZ에 두고 내부망과 분리한다.
- 방화벽은 서비스에 필요한 최소 포트만 허용한다. "allow all" 금지.
- Frontend / Backend / AI Worker는 stateless로 유지해 K8s 전환 여지를 남긴다.

---

## 5. 배포 전 승인 체크리스트

배포 전 아래 항목을 모두 확인한다. (출처: [07_QA_SECURITY_OPERATIONS.md](../../개발문서/07_QA_SECURITY_OPERATIONS.md))

- [ ] 소스/이미지 취약점 점검
- [ ] Secret·환경변수 노출 점검
- [ ] SSO 연계 테스트 완료
- [ ] LLM API 인증 테스트 완료
- [ ] 파일 저장소 권한 검증
- [ ] DB schema migration 검증
- [ ] Rollback 절차 검증
- [ ] 운영 로그·감사 로그 확인

---

## 6. 운영 점검 항목

- 컨테이너 health check
- DB backup / restore
- 파일 저장소 backup / restore
- LLM endpoint 장애 시 서비스 상태
- Retry 폭주 방지
- Job queue 적체
- 디스크 용량
- DB connection pool
- Redis 장애 시 영향 범위
- 로그 보존 정책 (접근 로그·감사 로그 1년 이상)

### 장애 대응 우선순위

| 장애 | 대응 |
|---|---|
| **LLM** | 일반 기능은 계속 사용 가능해야 한다. AI 작업은 FAILED/RETRY 상태로 남긴다. |
| **DB** | 쓰기를 제한하고 읽기 가능 여부를 판단한다. 무리한 재시작 전에 원인과 복구 상태를 먼저 확인한다. |
| **File Storage** | 신규 업로드·Export를 제한하고 Version/메타데이터 손상 여부를 확인한다. |
| **Container** | health check와 재기동 정책을 쓰되, 반복 장애는 원인을 먼저 확인한다. |

---

## 7. 인프라 협의 필요 항목 (미결)

| 항목 | 내용 |
|---|---|
| 서버 | Linux 서버 사양, 운영/개발 서버 분리 여부 |
| 컨테이너 | Docker 운영 방식, 이미지 반입 경로 및 Registry |
| 네트워크 | 내부 DNS, Reverse Proxy 구성 |
| 저장소 | NFS / Object Storage 종류와 접근권한 |
| DB | PostgreSQL·Redis 운영 주체 |
| AI | LLM endpoint, 인증 방식, 사용 가능 모델, 최대 토큰, 동시 호출 제한, Timeout/Rate Limit, Prompt·Response 저장 허용 범위 |
| 보안 | SSO 방식, 프로젝트 권한 모델, 파일 반출 정책, 로그 보존 정책 |

전체 목록은 [08_DECISIONS_OPEN_ISSUES.md](../../개발문서/08_DECISIONS_OPEN_ISSUES.md) 참고.

---

## 8. 트러블슈팅

> 배포·실행 중 발생한 오류와 해결 방법을 여기에 누적한다.

### `better-sqlite3` 설치·실행 실패
- **증상**: `npm install` 시 네이티브 빌드 실패, 또는 실행 시 모듈 로드 오류.
- **원인**: 네이티브 모듈이라 Node 버전에 맞춰 컴파일되어야 한다.
- **해결**: Node 버전을 바꿨다면 `npm rebuild better-sqlite3`. Windows에서는 Visual Studio Build Tools(C++ 워크로드)가 필요하다.
- **참고**: Next.js 번들러가 네이티브 모듈을 처리하지 못하므로 `next.config.ts`의 `serverExternalPackages`에 등록되어 있다. 이 설정을 지우면 빌드가 깨진다.

<!-- 새 트러블슈팅은 아래 형식으로 추가:

### [증상 한 줄]
- **증상**:
- **원인**:
- **해결**:

-->
