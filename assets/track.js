/* SaveSnakes engagement events for GA4.
   Loaded on every page. Reports what people read, not just when they call.
   Events:
     guide_open    {guide}   a click to an education page
     blog_open     {post}    a click to a story
     triage_choice {choice}  which of the three homepage paths was taken
     scroll_depth  {depth}   50 and 90 percent, once each, on long pages
*/
(function () {
  if (typeof window.gtag !== 'function') return;
  var GUIDES = {
    'snake-identification.html': 'identify',
    'avoid-snakes.html':         'prevent',
    'snakebite-help.html':       'snakebite',
    'virginia-snakes.html':      'all-snakes'
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    if (a.hasAttribute('data-cta')) {
      gtag('event', 'contact_click', { method: a.getAttribute('data-cta'), page: location.pathname });
    }
    var href = (a.getAttribute('href') || '').split('#')[0].split('?')[0];
    var file = href.split('/').pop();
    if (a.hasAttribute('data-triage')) {
      gtag('event', 'triage_choice', { choice: a.getAttribute('data-triage') });
    }
    if (GUIDES[file]) {
      gtag('event', 'guide_open', { guide: GUIDES[file], from: location.pathname });
    } else if (/^blog-.*\.html$/.test(file)) {
      gtag('event', 'blog_open', { post: file.replace(/^blog-|\.html$/g, ''), from: location.pathname });
    }
  }, true);

  // Scroll depth, only where there is something to scroll through.
  var fired = {};
  function depth() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (max < 1200) return;
    var pct = Math.round((h.scrollTop || document.body.scrollTop) / max * 100);
    [50, 90].forEach(function (m) {
      if (pct >= m && !fired[m]) { fired[m] = true; gtag('event', 'scroll_depth', { depth: m, page: location.pathname }); }
    });
  }
  var t; window.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(depth, 150); }, { passive: true });
})();
