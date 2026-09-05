# 디자인 정본

`doc-hub.html` 은 문서 허브 화면의 **디자인 정본**이다. CSS와 렌더 로직이 여기에 있다.

## 역할 분담

| | 무엇을 갖는가 | 누가 고치는가 |
|---|---|---|
| `reference/doc-hub.html` | 화면 구조 · CSS · 렌더 로직 | 디자인 |
| `scripts/build-docs-site.mjs` | 저장소 마크다운 → 데이터 | 개발 |
| `프로젝트문서.html` | 둘을 합친 산출물 | **아무도 직접 고치지 않는다** |

`ui/` 는 화면 리디자인 참고용 외부 UI 캡처 보관소다. 정본이 아니며 이미지는 커밋하지 않는다 — `reference/ui/README.md` 참고.

빌드는 `doc-hub.html` 의 `/* DATA:BEGIN */` ~ `/* DATA:END */` 구간만 통째로 갈아끼운다.
그 바깥은 한 글자도 건드리지 않는다.

```bash
node scripts/build-docs-site.mjs
```

## 이 파일을 단독으로 열어도 된다

DATA 구간에 데모 데이터가 들어 있어 브라우저로 바로 열면 화면이 그대로 보인다.
디자인을 고칠 때는 이 파일을 열어 작업하면 된다.

## 디자인을 새로 받았을 때

새 시안으로 통째로 교체하려면 아래 두 가지를 반드시 유지해야 빌드가 붙는다.

1. **`/* DATA:BEGIN */` · `/* DATA:END */` 마커** — 없으면 빌드가 실패한다.
2. **주입 변수 4개** — 마커 안에 이 이름으로 선언되어 있어야 한다.

| 변수 | 내용 |
|---|---|
| `BUILD` | `{commit, date, version}` — 저장소 HEAD |
| `ROLES` | `[{id, label, desc, docs[]}]` — 역할별 진입점 |
| `FEATURES` | `[{id, doc, name, summary, phases[], areas[], open, us, screens, api, ticket, stages{design,proto,ops}, links[]}]` |
| `DOCS` | `[{id, group, title, lede, author, commit, date, path, size, changed, roles[], feature?, body}]` |

`FEATURES[].links` 는 링크 띠의 정본 위치다.
`[{key, mono, links:[{href, label}]}]` 형태이며, `href` 는 문서가 아니라
`US-020` · `S03` 같은 식별자로 찾아낸 **정확한 헤딩 앵커**다.

### 시안에서 하드코딩하지 말 것

프로젝트마다 값이 다르므로 아래는 데이터에서 유도해야 한다.
시안 최초 반영 시 실제로 문제가 됐던 것들이다.

- 문서 ID (`01_PRD` 등) — 링크 띠·역할 진입점이 끊긴다
- 개발 단계 (`P1`·`P2`) — 이 프로젝트는 P0~P4다
- 영역 (`FE`·`BE`·`Infra`) — 이 프로젝트는 FE·BE뿐이다
- 문서 그룹 이름 — `DOCS` 등장 순서에서 뽑는다
- 커밋 해시·날짜 — 사이드바는 `BUILD`, 문서 칩은 문서별 `commit`·`date`

## 제약

- 외부 스크립트·폰트·이미지를 쓰지 않는다. 사내망 오프라인에서 열려야 한다.
- 검색 결과 스니펫은 사용자 입력을 HTML로 해석하지 않는다(XSS).
