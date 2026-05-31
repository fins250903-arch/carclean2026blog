(function () {
  const SEO_LIMIT = 32;

  function injectStyles() {
    if (document.getElementById('blog-cms-styles')) return;
    const el = document.createElement('style');
    el.id = 'blog-cms-styles';
    el.textContent = `
      .blog-cms-counter { margin: 4px 0 0; font-size: 13px; }
      .blog-cms-counter.ok { color: #15803d; }
      .blog-cms-counter.warn { color: #b45309; }
      .blog-cms-counter.over { color: #b91c1c; font-weight: 600; }
      .blog-cms-slug-preview { margin: 4px 0 0; font-size: 12px; color: #1d4ed8; word-break: break-all; }
    `;
    document.head.appendChild(el);
  }

  function sanitizeSlug(text) {
    return String(text || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48);
  }

  function firstImageFromMarkdown(md) {
    if (!md) return null;
    const mdMatch = md.match(/!\[[^\]]*]\(([^)]+)\)/);
    if (mdMatch) return mdMatch[1].split('/').pop();
    const htmlMatch = md.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (htmlMatch) return htmlMatch[1].split('/').pop();
    return null;
  }

  function shortSlugFromEntrySlug(entrySlug) {
    if (!entrySlug) return '';
    const match = String(entrySlug).match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
    return match ? sanitizeSlug(match[1]) : sanitizeSlug(entrySlug);
  }

  function bindTitleCounter() {
    const inputs = document.querySelectorAll('input[type="text"]');
    for (const input of inputs) {
      if (input.dataset.blogCmsBound === 'title') continue;
      const label = input.closest('div')?.querySelector('label');
      if (!label || !label.textContent.includes('タイトル')) continue;
      input.dataset.blogCmsBound = 'title';

      const counter = document.createElement('p');
      counter.className = 'blog-cms-counter ok';
      input.insertAdjacentElement('afterend', counter);

      function update() {
        const len = Array.from(input.value || '').length;
        const remaining = SEO_LIMIT - len;
        counter.className =
          'blog-cms-counter ' + (remaining < 0 ? 'over' : remaining <= 8 ? 'warn' : 'ok');
        counter.textContent =
          remaining < 0
            ? '⚠ ' + Math.abs(remaining) + ' 文字オーバー（32文字目安）'
            : '残り ' + remaining + ' 文字（32文字目安・現在 ' + len + ' 文字）';
      }
      input.addEventListener('input', update);
      update();
    }
  }

  function bindSlugHelper() {
    const inputs = document.querySelectorAll('input[type="text"]');
    for (const input of inputs) {
      if (input.dataset.blogCmsBound === 'slug') continue;
      const label = input.closest('div')?.querySelector('label');
      if (!label || !label.textContent.includes('スラッグ')) continue;
      input.dataset.blogCmsBound = 'slug';

      const preview = document.createElement('p');
      preview.className = 'blog-cms-slug-preview';
      input.insertAdjacentElement('afterend', preview);

      function update() {
        const short = sanitizeSlug(input.value);
        if (short !== input.value) input.value = short;
        let dateStr = '';
        for (const dateInput of document.querySelectorAll('input[type="text"]')) {
          const dl = dateInput.closest('div')?.querySelector('label');
          if (dl && dl.textContent.includes('公開日') && dateInput.value) {
            dateStr = String(dateInput.value).slice(0, 10);
            break;
          }
        }
        preview.textContent =
          short && dateStr
            ? 'URL: https://carinteriorcleaning.jp/blog/' +
              dateStr.slice(0, 4) +
              '/' +
              dateStr.slice(5, 7) +
              '/' +
              dateStr +
              '-' +
              short +
              '/'
            : '公開日とスラッグを入力するとURLプレビューが表示されます';
      }
      input.addEventListener('input', update);
      input.addEventListener('blur', update);
      update();
    }
  }

  function enhanceFormFields() {
    bindTitleCounter();
    bindSlugHelper();
  }

  injectStyles();

  document.addEventListener('DOMContentLoaded', function () {
    const observer = new MutationObserver(enhanceFormFields);
    observer.observe(document.body, { childList: true, subtree: true });
    setInterval(enhanceFormFields, 1500);
  });

  function registerListeners() {
    if (!window.CMS) return;
    CMS.registerEventListener({
      name: 'preSave',
      handler: function ({ entry }) {
        if (entry.get('collection') !== 'blog') return;
        const data = entry.get('data');
        let short = data.get('shortSlug');
        if (!short) short = shortSlugFromEntrySlug(entry.get('slug'));
        data.set('shortSlug', sanitizeSlug(short || ''));
        if (!data.get('shortSlug')) {
          throw new Error('URL用スラッグ（英字）を入力してください。例: trucksaitama');
        }
        if (!data.get('coverImage')) {
          const first = firstImageFromMarkdown(data.get('body') || '');
          if (first) data.set('coverImage', first);
        }
      },
    });
  }

  document.addEventListener('decap-cms-init', registerListeners);
  registerListeners();
})();
