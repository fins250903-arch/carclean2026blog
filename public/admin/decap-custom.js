(function () {
  function firstImageFromMarkdown(md) {
    if (!md) return null;
    const mdMatch = md.match(/!\[[^\]]*]\(([^)]+)\)/);
    if (mdMatch) return mdMatch[1].split('/').pop();
    const htmlMatch = md.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (htmlMatch) return htmlMatch[1].split('/').pop();
    return null;
  }

  function injectStyles() {
    const css = `
      .seo-title-input, .date-slug-input { width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
      .seo-title-counter { margin: 6px 0 0; font-size: 13px; }
      .seo-title-ok { color: #15803d; }
      .seo-title-warn { color: #b45309; }
      .seo-title-over { color: #b91c1c; font-weight: 600; }
      .date-slug-preview { margin: 6px 0 0; font-size: 13px; color: #1d4ed8; word-break: break-all; }
      .date-slug-hint { margin: 4px 0 0; font-size: 12px; color: #6b7280; }
    `;
    const el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  injectStyles();

  function registerListeners() {
    if (!window.CMS) return;

    CMS.registerEventListener({
      name: 'preSave',
      handler: function ({ entry }) {
        if (entry.get('collection') !== 'blog') return;
        const data = entry.get('data');
        if (data.get('coverImage')) return;
        const first = firstImageFromMarkdown(data.get('body') || '');
        if (!first) return;
        return data.set('coverImage', first);
      },
    });
  }

  document.addEventListener('decap-cms-init', registerListeners);
  registerListeners();
})();
