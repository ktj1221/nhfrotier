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
├── logo/        allone-wordmark.svg · nh-symbol.svg · corp-logo.svg · nh-logotype.svg
├── component/   button.png · card.png · textfield.png · menugrid.png · bottomnav.png
├── screen/      allone-home.png · allone-login.png · allone-menu.png · corp-dashboard.png
└── icon/        (아직 카드 없음 — 추가하려면 data.ts에 항목부터 만들 것)
```

## 규칙

- 파일명은 `mockup/app/proto/assets/data.ts`의 각 자산 `src` 값과 **정확히 일치**해야 한다.
  이름이 다르면 조용히 대체본이 계속 보인다.
- 새 자산을 늘리려면 파일만 넣지 말고 `data.ts`에 항목을 먼저 추가한다.
- 파일을 넣으면 카드 배지가 `대체본`(주황)에서 `실물`(초록)로 자동으로 바뀐다.
  판정은 `components/AssetThumb.tsx`의 `assetFileExists()`가 서버에서 파일 존재 여부로 한다.
- 파일을 넣거나 지운 뒤에는 **새로고침만 하면 된다.** 재빌드·재기동이 필요 없다.
  `page.tsx`가 `export const dynamic = "force-dynamic"`으로 매 요청마다 파일 존재를 다시 확인한다.
  (이 옵션이 없으면 빌드 타임에 판정이 굳어 나중에 넣은 파일이 반영되지 않는다.)
