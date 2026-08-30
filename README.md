# NH 위드캔버스

AI 기반 NH 업무 제작 · 협의 · 의사결정 자산화 플랫폼 (프로젝트명: NH 뚝딱협업스튜디오)

## 📘 문서 허브

아래 문서 27개를 검색·역할별 진입점과 함께 한 페이지에서 봅니다. 나루뱅크 디자인 시스템을 적용했습니다.

**→ https://claude.ai/code/artifact/f2d7cb0d-3788-445d-8dbd-2e9cfb64b4d4**

> 기본 비공개 링크입니다. 팀원에게 보여주려면 페이지 우측 상단 Share에서 공유 권한을 여세요.

문서를 수정하고 커밋하면 pre-commit 훅이 `프로젝트문서.html`을 다시 만듭니다.
링크에 반영하려면 Claude에게 **"문서 페이지 갱신해줘"** 라고 요청하세요.

```bash
node scripts/install-hooks.mjs      # 클론 후 1회 — 자동 빌드 훅 활성화
node scripts/build-docs-site.mjs    # 수동 빌드
```

Node.js 18 이상이면 되고 설치할 패키지는 없습니다. 디자인 토큰은 `design-system/tokens/`에서 가져옵니다.

## 🌿 팀 작업 흐름

```
main  ◄─PR─  dev  ◄─PR─  개인 브랜치 (팀원당 1개, 고정 유지)
```

모두가 `dev`를 기준으로 받아 자기 브랜치에서 개발하고, 다시 `dev`로 올립니다.

**최초 1회**

```bash
git clone https://github.com/nhfrontier/nhfrotier.git
cd nhfrotier
git switch -c <이름>        # 기본 브랜치가 dev라 자동으로 dev에서 분기됩니다
git push -u origin <이름>
```

**작업할 때마다**

```bash
node scripts/sync-dev.mjs   # 1. 최신 dev 받기 (git 훅도 자동으로 켜집니다)
# ... 개발 ...
git push origin <이름>       # 2. 자기 브랜치에 올리기
```

3. GitHub에서 **개인 브랜치 → `dev`** PR을 올립니다. base는 자동으로 `dev`입니다.
4. 팀원 1명 이상 확인 후 merge합니다. (GitHub 모바일 앱에서도 가능)

`sync-dev.mjs`는 `dev`·`main` 위에 있거나 커밋 안 된 변경이 있으면 **아무것도 하지 않고 멈춥니다.** 개인 브랜치는 merge 후에도 지우지 않고 계속 재사용합니다.

### 목업 공유 링크

`dev` 또는 `main`에 push되면 GitHub Pages가 자동 배포합니다. 용도가 다르니 **건네줄 때 어느 쪽인지 밝혀주세요.**

| 링크 | 기준 | 용도 |
|---|---|---|
| **[팀 내부 확인용](https://nhfrontier.github.io/nhfrotier/dev/)** — `/dev/` | `dev` | dev에 merge되면 즉시 갱신. 일상 작업은 여기만 보면 됩니다 |
| **[외부 공유용 확정본](https://nhfrontier.github.io/nhfrotier/)** — 루트 `/` | `main` | 보여줄 준비가 된 것만. `dev` → `main` PR로 승격합니다 |

## 문서

### 개발 요건 (정본)

| 문서 | 설명 |
|---|---|
| [개발문서/README.md](개발문서/README.md) | 개발 문서 패키지 목차 · 권장 개발 순서 |
| [개발문서/01_PRD.md](개발문서/01_PRD.md) | **PRD 정본** — 제품 목표, 사용자, 기능 범위, MVP, 비기능 요구사항 |
| [개발문서/02_USER_STORIES_AC.md](개발문서/02_USER_STORIES_AC.md) | Epic / User Story / 인수조건 / 우선순위 |
| [개발문서/03_IA_FUNCTION_SPEC.md](개발문서/03_IA_FUNCTION_SPEC.md) | IA, 화면 구조, 주요 상태 |
| [개발문서/기능명세/00_INDEX.md](개발문서/기능명세/00_INDEX.md) | **기능별 상세 명세(FR-01~12)** · FR ↔ US ↔ 화면 ↔ API 추적 매트릭스 |
| [개발문서/04_SYSTEM_ARCHITECTURE.md](개발문서/04_SYSTEM_ARCHITECTURE.md) | 시스템 구조, LLM 연계, 비동기 처리 |
| [개발문서/05_API_DB_SPEC.md](개발문서/05_API_DB_SPEC.md) | API 초안, 도메인 모델, 테이블 |
| [개발문서/06_DEVELOPMENT_BACKLOG.md](개발문서/06_DEVELOPMENT_BACKLOG.md) | Sprint 분할, 개발 티켓, 완료 기준 |
| [개발문서/07_QA_SECURITY_OPERATIONS.md](개발문서/07_QA_SECURITY_OPERATIONS.md) | 테스트 · 보안 · 운영 체크리스트 |
| [개발문서/08_DECISIONS_OPEN_ISSUES.md](개발문서/08_DECISIONS_OPEN_ISSUES.md) | 결정사항 / 미결사항 / 협의 필요 항목 |

### 개발 가이드라인

| 문서 | 설명 |
|---|---|
| [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md) | 아키텍처 결정과 그 이유 (무엇 / 왜 선택 / 왜 X는 아닌지) |
| [docs/architecture/TECH_STACK.md](docs/architecture/TECH_STACK.md) | 기술 선택 이유, **검토 후 제외한 기술** |
| [docs/architecture/DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md) | 실행 방법, 환경변수, 배포, 트러블슈팅 |
| [docs/guidelines/SECURITY_CHECKLIST.md](docs/guidelines/SECURITY_CHECKLIST.md) | 보안 결정 · ISMS-P 대응 현황 · OWASP 대응 |
| [docs/guidelines/SECURITY.md](docs/guidelines/SECURITY.md) | 보안 규칙 원문 (ISMS-P 기반) |
| [docs/guidelines/CLEAN_CODE.md](docs/guidelines/CLEAN_CODE.md) | 클린 코드 원칙 |
| [docs/guidelines/WORKFLOW.md](docs/guidelines/WORKFLOW.md) | 작업 진행 3단계 프로세스 |
| [CLAUDE.md](CLAUDE.md) | AI 협업 가이드 · 작업 상황별 필독 문서 |

### 기획 / 명세

| 문서 | 설명 |
|---|---|
| [docs/NH뚝딱협업스튜디오_기획안.md](docs/NH뚝딱협업스튜디오_기획안.md) | 사업 기획안 (「AI Agent 챌린지」 최종개선본) — 텍스트본 |
| [docs/NH뚝딱협업스튜디오_기획안_최종개선본.pdf](docs/NH뚝딱협업스튜디오_기획안_최종개선본.pdf) | 위 계획서의 원본 PDF |
| [MockupGen_기능명세서.md](MockupGen_기능명세서.md) | 목업 생성 화면 기능 명세서 |
| [MockupGen_기능명세서.html](MockupGen_기능명세서.html) | 위 명세서의 HTML 배포본 |

## 코드

| 위치 | 설명 |
|---|---|
| [mockup/](mockup/) | **프로토타입** — Next.js 16 + React 19 + SQLite + Claude API. AI 목업 생성과 협업 UX 검증용 |
| [mockup/docs/](mockup/docs/) | 정적 HTML 프로토타입 (PWA) |

> ⚠️ `mockup/`은 검증용이며 행내 반입 대상이 아니다. 목표 운영 스택(Vue 3 + Spring Boot + PostgreSQL + Docker)은 아직 구현 전이다. 자세한 내용은 [TECH_STACK.md](docs/architecture/TECH_STACK.md) 0절 참고.

### 프로토타입 실행

```bash
cd mockup
npm install
# .env.local 에 ANTHROPIC_API_KEY 설정
npm run dev   # http://localhost:3000
```

환경변수와 트러블슈팅은 [DEPLOYMENT.md](docs/architecture/DEPLOYMENT.md) 참고.
