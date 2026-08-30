(function () {
  'use strict';

  var docs = Array.prototype.slice.call(document.querySelectorAll('article.doc'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a.doc-link'));
  var tocCol = document.getElementById('toc');
  var results = document.getElementById('results');
  var searchInput = document.getElementById('search');
  var cover = document.getElementById('cover');
  var HOME = 'home';

  /* ── 테마 ── */
  var themeButton = document.getElementById('theme');

  function readStoredTheme() {
    try { return localStorage.getItem('nh-docs-theme'); } catch (err) { return null; }
  }

  function storeTheme(value) {
    try { localStorage.setItem('nh-docs-theme', value); } catch (err) { /* 샌드박스에서 차단될 수 있다 */ }
  }

  function applyTheme(value) {
    if (value) document.documentElement.setAttribute('data-theme', value);
    else document.documentElement.removeAttribute('data-theme');
  }

  /* 이 페이지는 라이트로 확정돼 있다(디자인 시스템이 라이트 팔레트만 정의한다).
     뷰어 OS 테마를 읽으면 다크 OS 사용자의 첫 토글이 헛돌므로 기본값을 light 로 둔다. */
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  applyTheme(readStoredTheme());
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ── 대상자 필터 ── */
  Array.prototype.forEach.call(document.querySelectorAll('.filters button'), function (button) {
    button.addEventListener('click', function () {
      var role = button.getAttribute('data-role');
      Array.prototype.forEach.call(document.querySelectorAll('.filters button'), function (other) {
        other.classList.toggle('on', other === button);
      });
      navLinks.forEach(function (link) {
        var audience = link.getAttribute('data-audience') || '';
        link.classList.toggle('dim', role !== 'all' && audience.indexOf(role) === -1);
      });
    });
  });

  /* ── 우측 목차 ── */
  function buildToc(article) {
    tocCol.textContent = '';
    var headings = article.querySelectorAll('.doc-body h2, .doc-body h3');
    if (!headings.length) return [];

    var title = document.createElement('div');
    title.className = 'toc-title';
    title.textContent = '이 문서';
    tocCol.appendChild(title);

    return Array.prototype.map.call(headings, function (heading) {
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      if (heading.tagName === 'H3') link.className = 'lv3';
      tocCol.appendChild(link);
      return { heading: heading, link: link };
    });
  }

  var tocEntries = [];

  function syncTocHighlight() {
    if (!tocEntries.length) return;
    var active = tocEntries[0];
    for (var i = 0; i < tocEntries.length; i += 1) {
      if (tocEntries[i].heading.getBoundingClientRect().top <= 90) active = tocEntries[i];
    }
    tocEntries.forEach(function (entry) {
      entry.link.classList.toggle('active', entry === active);
    });
  }

  window.addEventListener('scroll', syncTocHighlight, { passive: true });

  /* ── 문서 전환 ── */
  function showDoc(docId) {
    var found = false;
    docs.forEach(function (article) {
      var on = article.id === docId;
      article.classList.toggle('on', on);
      if (on) found = true;
    });

    var isHome = !found;
    cover.style.display = isHome ? '' : 'none';
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + docId);
    });

    tocEntries = isHome ? [] : buildToc(document.getElementById(docId));
    tocCol.style.display = isHome ? 'none' : '';
    syncTocHighlight();
  }

  /* 헤딩 앵커(`docId-h3`)에서 소속 문서를 역추적한다. */
  function ownerDocId(hash) {
    for (var i = 0; i < docs.length; i += 1) {
      if (hash === docs[i].id || hash.indexOf(docs[i].id + '-h') === 0) return docs[i].id;
    }
    return HOME;
  }

  function applyRoute() {
    closeSearch();
    var hash = decodeURIComponent(location.hash.slice(1));
    var docId = hash ? ownerDocId(hash) : HOME;
    showDoc(docId);

    if (hash && hash !== docId) {
      var target = document.getElementById(hash);
      if (target) target.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', applyRoute);

  /* ── 검색 ── */
  var index = null;

  function buildIndex() {
    return docs.reduce(function (rows, article) {
      var docTitle = article.getAttribute('data-title') || article.id;
      var anchor = article.id;
      var blocks = article.querySelectorAll('.doc-body h1, .doc-body h2, .doc-body h3, .doc-body p, .doc-body li, .doc-body td');

      Array.prototype.forEach.call(blocks, function (node) {
        if (/^H[123]$/.test(node.tagName)) anchor = node.id || anchor;
        var text = node.textContent.trim();
        if (text) rows.push({ docId: article.id, docTitle: docTitle, anchor: anchor, text: text });
      });
      return rows;
    }, []);
  }

  /** 사용자 입력을 HTML로 해석하지 않도록 텍스트 노드와 mark 엘리먼트로만 조립한다. */
  function renderSnippet(text, query) {
    var container = document.createElement('div');
    container.className = 'line';
    var lower = text.toLowerCase();
    var needle = query.toLowerCase();
    var at = lower.indexOf(needle);
    var from = Math.max(0, at - 40);

    if (from > 0) container.appendChild(document.createTextNode('… '));
    var cursor = from;

    while (at !== -1 && container.childNodes.length < 24) {
      container.appendChild(document.createTextNode(text.slice(cursor, at)));
      var mark = document.createElement('mark');
      mark.textContent = text.slice(at, at + query.length);
      container.appendChild(mark);
      cursor = at + query.length;
      at = lower.indexOf(needle, cursor);
    }

    container.appendChild(document.createTextNode(text.slice(cursor, cursor + 120)));
    return container;
  }

  function renderHit(row, query) {
    var hit = document.createElement('a');
    hit.className = 'hit';
    hit.href = '#' + row.anchor;

    var where = document.createElement('div');
    where.className = 'where';
    where.textContent = row.docTitle;
    hit.appendChild(where);
    hit.appendChild(renderSnippet(row.text, query));
    return hit;
  }

  function closeSearch() {
    results.classList.remove('on');
    results.textContent = '';
  }

  function runSearch(query) {
    if (!index) index = buildIndex();
    var needle = query.toLowerCase();
    var hits = index.filter(function (row) { return row.text.toLowerCase().indexOf(needle) !== -1; });

    results.textContent = '';
    var heading = document.createElement('h2');
    heading.textContent = '"' + query + '" 검색 결과 ' + hits.length + '건';
    results.appendChild(heading);

    if (!hits.length) {
      var empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = '일치하는 내용이 없어요.';
      results.appendChild(empty);
    }

    hits.slice(0, 60).forEach(function (row) { results.appendChild(renderHit(row, query)); });
    results.classList.add('on');

    docs.forEach(function (article) { article.classList.remove('on'); });
    cover.style.display = 'none';
    tocCol.style.display = 'none';
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var query = searchInput.value.trim();
      if (query.length < 2) {
        closeSearch();
        applyRoute();
        return;
      }
      runSearch(query);
    });
  }

  applyRoute();
}());
