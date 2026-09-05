#!/usr/bin/env node
/**
 * GitHub Pages 로 공개되는 정적 HTML(mockup-site/)이 참조하는 로컬 파일이
 * "내 PC 에만 있고 저장소에는 없는" 상태가 아닌지 검사한다.
 *
 * 막으려는 사고: 이미지가 .gitignore 대상이면 내 브라우저에서는 멀쩡히 보이지만
 * Pages 에서는 404 가 된다. 링크를 받은 팀원만 깨진 화면을 본다.
 *
 *   node scripts/check-pages-assets.mjs
 *
 * 종료 코드 0 = 이상 없음, 1 = 깨진 참조 있음.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/** Pages 가 서빙하는 정적 HTML 디렉터리. 늘리려면 여기에 추가한다. */
const SERVED_DIRS = ["mockup-site"];

const REPO = process.cwd();

/** 저장소에 실제로 들어가는 파일 목록(인덱스 기준이라 staged 추가분도 포함된다). */
function trackedFiles() {
  const out = execFileSync("git", ["ls-files", "-z"], { cwd: REPO, maxBuffer: 64 << 20 });
  return new Set(out.toString("utf8").split("\0").filter(Boolean));
}

function htmlFilesIn(dir) {
  const abs = path.join(REPO, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs, { recursive: true })
    .map((name) => path.posix.join(dir, String(name).split(path.sep).join("/")))
    .filter((rel) => rel.endsWith(".html"));
}

/** src="..." · href="..." · url(...) 에서 로컬 경로만 뽑는다. */
function localRefs(html) {
  const refs = new Set();
  const patterns = [/(?:src|href)\s*=\s*["']([^"']+)["']/gi, /url\(\s*["']?([^"')]+)["']?\s*\)/gi];
  for (const re of patterns) {
    for (const [, raw] of html.matchAll(re)) {
      const ref = raw.trim();
      if (!ref) continue;
      if (/^(https?:)?\/\//i.test(ref)) continue; // 외부 URL
      if (/^(data|mailto|tel|javascript):/i.test(ref)) continue;
      if (ref.startsWith("#")) continue; // 페이지 내 앵커
      refs.add(ref.split("#")[0].split("?")[0]);
    }
  }
  return [...refs].filter(Boolean);
}

function main() {
  const tracked = trackedFiles();
  const problems = [];

  for (const dir of SERVED_DIRS) {
    for (const htmlRel of htmlFilesIn(dir)) {
      const html = fs.readFileSync(path.join(REPO, htmlRel), "utf8");
      for (const ref of localRefs(html)) {
        if (path.posix.isAbsolute(ref)) {
          problems.push({ htmlRel, ref, why: "절대경로 — Pages 는 /nhfrotier/ 하위에 올라가므로 깨진다. 상대경로로 쓸 것" });
          continue;
        }
        const target = path.posix.normalize(path.posix.join(path.posix.dirname(htmlRel), ref));
        if (target.startsWith("..")) {
          problems.push({ htmlRel, ref, why: "저장소 바깥을 가리킨다" });
          continue;
        }
        if (!fs.existsSync(path.join(REPO, target))) {
          problems.push({ htmlRel, ref, why: `파일이 없다 (${target})` });
          continue;
        }
        if (!tracked.has(target)) {
          problems.push({ htmlRel, ref, why: `내 PC 에만 있고 저장소에 없다 — Pages 에서 404 (${target})` });
        }
      }
    }
  }

  if (problems.length === 0) {
    console.log(`check-pages-assets: 이상 없음 (${SERVED_DIRS.join(", ")})`);
    return 0;
  }

  console.error(`\ncheck-pages-assets: 공개 페이지에서 깨질 참조 ${problems.length}건\n`);
  let last = null;
  for (const p of problems) {
    if (p.htmlRel !== last) {
      console.error(`  ${p.htmlRel}`);
      last = p.htmlRel;
    }
    console.error(`    ✗ ${p.ref}\n      ${p.why}`);
  }
  console.error(`
  파일이 .gitignore 대상이라면 둘 중 하나를 고른다.
    - 공개해도 되는 자산이면  → .gitignore 에 예외를 뚫고 커밋한다
    - 공개하면 안 되는 자산이면 → HTML 에서 이미지를 빼고 CSS/SVG 대체본을 그린다
`);
  return 1;
}

process.exit(main());
