# 공개 정적 목업 (`mockup-site/`)

**팀원·외부에 링크로 보여주는 화면은 여기뿐이다.**

<https://nhfrontier.github.io/nhfrotier/dev/mockup-site/main.html> (dev 기준)

---

## 목업이 두 벌인 이유

이 저장소에는 성격이 다른 목업 표면이 **두 개** 있다. 헷갈리면 "고쳤는데 왜 링크에는 안 보이지"가 된다.

| | `mockup/` | `mockup-site/` (여기) |
|---|---|---|
| 무엇 | Next.js 앱 | 손으로 쓴 정적 HTML |
| 실행 | `npm run dev` 필요 | 파일을 그냥 열면 된다 |
| **GitHub Pages** | **안 보인다** (빌드 산출물이 아니라 소스라서) | **이것만 보인다** |
| 쓰는 곳 | 동작·데이터 흐름 검증 | 화면 공유·리뷰 |

Pages 워크플로(`.github/workflows/pages.yml`)는 저장소를 **통째로 정적 서빙**한다.
그래서 `mockup/` 의 *파일* 은 URL 로 존재하지만, Next.js 앱이므로 **화면으로는 뜨지 않는다.**

> ### 그래서 지킬 것
> 공유 링크에 보여야 하는 변경은 **`mockup-site/` 에도 반영해야 한다.**
> `mockup/` 만 고치고 dev 에 merge 하면 링크는 한 글자도 바뀌지 않는다.

---

## 왜 깨지나 — 실제로 겪은 사고

`mockup/app/proto/assets/` (Next.js) 에 농협 CI 자산을 붙이고 dev 에 merge 했는데
공유 링크에는 아무것도 안 나왔다. 원인이 **셋** 겹쳐 있었다.

1. Pages 가 보여주는 건 `mockup-site/` 뿐인데 Next.js 쪽만 고쳤다.
2. `mockup-site/design-assets.html` 은 `<img>` 가 하나도 없는 대체본 페이지였다.
3. 이미지가 `.gitignore` 대상이라 **내 PC 에만 있었다.** 내 브라우저에서는 멀쩡히 보였다.

3번이 특히 위험하다. **로컬에서 확인해도 절대 발견되지 않는다.**
링크를 받은 사람만 깨진 화면을 본다.

### 막는 장치

`scripts/check-pages-assets.mjs` 가 이 세 가지를 잡는다.

```bash
node scripts/check-pages-assets.mjs
```

`mockup-site/` 를 건드린 커밋에서 pre-commit 훅이 자동으로 돌리고, 걸리면 커밋을 막는다.
검사 항목:

| 검사 | 왜 |
|---|---|
| 참조한 파일이 존재하는가 | 오타·경로 실수 |
| 그 파일이 **저장소에 커밋되는가** | gitignore 대상이면 Pages 에서 404 |
| 절대경로(`/assets/...`)를 쓰지 않았는가 | Pages 는 `/nhfrotier/` 하위라 절대경로가 깨진다 |

훅이 안 도는 것 같으면 `node scripts/install-hooks.mjs` 를 실행한다.

---

## 이미지를 넣을 때

이 저장소 루트는 **공개 서빙된다.** 이미지를 커밋한다는 건 공개한다는 뜻이다.

| 자산 | 어떻게 |
|---|---|
| 농협 공식 CI (심볼·워드마크·전용색상·그래픽모티브) | 커밋한다. 대외 공개 자산이라 무방하다 |
| 올원뱅크·기업뱅킹 화면 캡처, 사내 자료 | **커밋하지 않는다.** HTML 에서 이미지를 빼고 CSS/SVG 대체본을 그린다 |

현재 커밋된 CI 4장은 `mockup/public/assets/nh/` 에 있고, 이 폴더의 이미지를
**상대참조**(`../mockup/public/assets/nh/...`)로 쓴다. 사본을 만들지 않아 한 벌만 관리한다.
자세한 규칙은 [`mockup/public/assets/nh/README.md`](../mockup/public/assets/nh/README.md).

---

## 화면 목록

`main.html` 이 진입점이다. 나머지는 거기서 링크된다.
