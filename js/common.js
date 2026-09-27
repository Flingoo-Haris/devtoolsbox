// Shared behaviour across every DevToolbox page.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggle) {
        sidebar.classList.remove('open');
      }
    });
  }

  // Quick filter box on the homepage / sidebar search
  var search = document.getElementById('tool-search');
  if (search) {
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      document.querySelectorAll('[data-search-item]').forEach(function (el) {
        var hay = (el.getAttribute('data-search-item') || '').toLowerCase();
        el.style.display = hay.indexOf(q) !== -1 ? '' : 'none';
      });
    });
  }
})();

// Reusable "copy to clipboard" wiring: any button with data-copy-target="#id"
function wireCopyButtons() {
  document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-copy-target'));
      if (!target) return;
      var text = 'value' in target ? target.value : target.textContent;
      navigator.clipboard.writeText(text).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = original; }, 1200);
      }).catch(function () {
        var original = btn.textContent;
        btn.textContent = 'Copy failed';
        setTimeout(function () { btn.textContent = original; }, 1200);
      });
    });
  });
}
document.addEventListener('DOMContentLoaded', wireCopyButtons);

function setStatus(el, message, ok) {
  if (!el) return;
  el.textContent = message || '';
  el.className = 'status' + (message ? (ok ? ' ok' : ' err') : '');
}
