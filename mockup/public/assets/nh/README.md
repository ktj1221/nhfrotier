# 디자인 자산 갤러리 — 실물 이미지 반입 위치

`/proto/assets` 화면이 읽는 실물 이미지를 여기에 넣는다.

## 왜 여기만 gitignore인가

저장소 루트 전체가 GitHub Pages로 공개 서빙된다 (`.github/workflows/pages.yml` — main은 `/`, dev는 `/dev/`).
올원뱅크·기업인터넷뱅킹 화면 캡처나 NH 로고 원본을 커밋하면 **공개 URL로 그대로 노출된다.**
`design-system/uploads/`를 제외한 것과 같은 이유다.

그래서 이 폴더는 `.gitignore` 대상이고, **README.md만 추적된다.**
파일은 각자 로컬에만 두고 커밋하지 않는다.

## 폴더 구조

```
mockup/public/assets/nh/
├── logo/        allone-wordmark.svg · nh-symbol.jpg · nh-wordmark.jpg · corp-logo.svg · nh-logotype.svg
├── ci/          nh-colors.jpg · nh-wave.jpg          ← 농협 공식 CI 아카이브
├── component/   button.png · card.png · textfield.png · menugrid.png · bottomnav.png
├── screen/      allone-home.png · allone-login.png · allone-menu.png · corp-dashboard.png
└── icon/        (아직 카드 없음 — 추가하려면 data.ts에 항목부터 만들 것)
```

## 농협 공식 CI 자산 반입 (`logo/` · `ci/`)

출처는 저장소 루트의 **`reference/농협CI 이미지 아카이브.zip`** 이다. 아래 4장이 들어 있다.

| zip 안 이름 | 넣을 위치 | 갤러리 카드 |
|---|---|---|
| `NH농협금융지주_심볼마크.jpg` | `logo/nh-symbol.jpg` | NH 심볼마크 |
| `NH농협금융지주_워드마크.jpg` | `logo/nh-wordmark.jpg` | NH 워드마크 |
| `NH농협금융지주_전용색상.jpg` | `ci/nh-colors.jpg` | NH 전용색상 |
| `그래픽모티브.jpg` | `ci/nh-wave.jpg` | 그래픽모티브 NH Wave |

zip은 macOS에서 만들어져 한글 파일명이 **NFD·UTF-8** 로 들어 있다. Windows 기본 압축 해제기로 풀면
이름이 깨지므로, 풀고 나서 위 표의 이름으로 직접 바꿔 넣는 편이 확실하다.

### 전용색상은 값도 코드에 있다

`nh-colors.jpg` 규격서의 PANTONE·RGB 값은 `mockup/app/proto/assets/data.ts`의 `NH_CI_COLORS`에
옮겨져 있어 **이미지가 없어도 토큰 카드는 정상으로 보인다.**

| 이름 | PANTONE | HEX |
|---|---|---|
| NH Blue | 300 C | `#005CA9` |
| NH Yellow | 1235 C | `#FBBA00` |
| NH Green | 354 C | `#04A64B` |
| NH Light Green | 368 C | `#A2C617` |

같은 화면의 `BRAND_RAMP`(teal 계열)는 **올원뱅크 앱 팔레트로 CI 전용색상과 다른 값이다.** 섞어 쓰지 않는다.

## 규칙

- 파일명은 `mockup/app/proto/assets/data.ts`의 각 자산 `src` 값과 **정확히 일치**해야 한다.
  이름이 다르면 조용히 대체본이 계속 보인다.
- 새 자산을 늘리려면 파일만 넣지 말고 `data.ts`에 항목을 먼저 추가한다.
- 파일을 넣으면 카드 배지가 `대체본`(주황)에서 `실물`(초록)로 자동으로 바뀐다.
  판정은 `components/AssetThumb.tsx`의 `assetFileExists()`가 서버에서 파일 존재 여부로 한다.
- 파일을 넣거나 지운 뒤에는 **새로고침만 하면 된다.** 재빌드·재기동이 필요 없다.
  `page.tsx`가 `export const dynamic = "force-dynamic"`으로 매 요청마다 파일 존재를 다시 확인한다.
  (이 옵션이 없으면 빌드 타임에 판정이 굳어 나중에 넣은 파일이 반영되지 않는다.)
