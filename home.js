// Initialize lucide icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const body = document.getElementById('home-body');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // Elements that change colors/text classes in dark vs light
  const welcomeFade = document.getElementById('welcomeFade');
  const welcomePara = document.getElementById('welcomePara');
  const statEls = [document.getElementById('stat1'), document.getElementById('stat2'), document.getElementById('stat3')];
  const card1 = document.getElementById('card1');
  const card2 = document.getElementById('card2');
  const card3 = document.getElementById('card3');
  const cardTitles = [document.getElementById('card1Title'), document.getElementById('card2Title'), document.getElementById('card3Title')];
  const cardSubs = [document.getElementById('card1Sub'), document.getElementById('card2Sub'), document.getElementById('card3Sub')];
  const bottomCta = document.getElementById('bottomCta');
  const ctaText = document.getElementById('ctaText');

  // Persist theme
  const saved = localStorage.getItem('gradecalc_theme') || 'light';
  let isDark = saved === 'dark';

  function applyTheme() {
    if (isDark) {
      // Body gradient
      body.className = 'min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900';
      // Welcome fade
      welcomeFade.className = 'bg-gradient-to-r bg-clip-text text-transparent from-gray-100 via-indigo-200 to-purple-200';
      welcomePara.className = 'text-xl leading-relaxed font-light max-w-lg text-gray-300';
      // Stats
      statEls.forEach(el => el.className = 'text-sm font-medium text-gray-400');
      // Cards
      [card1, card2, card3].forEach(c => {
        c.className = 'backdrop-blur-sm p-6 rounded-3xl shadow-xl transition-colors duration-300 bg-gray-800/80 border border-gray-700/20';
      });
      // Card titles/subs
      cardTitles.forEach(el => el.className = 'font-semibold text-gray-200');
      cardSubs.forEach(el => el.className = 'text-sm text-gray-400');
      // CTA
      bottomCta.className = 'inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-colors duration-300 bg-gradient-to-r from-gray-800 to-slate-800 border-gray-700';
      ctaText.className = 'text-sm font-medium text-gray-300';

      themeToggle.className = 'rounded-xl transition-colors duration-200 p-2 text-gray-300 hover:text-white hover:bg-gray-800';
      themeIcon.setAttribute('data-lucide', 'sun');
    } else {
      body.className = 'min-h-screen transition-colors duration-300 bg-gradient-to-br from-slate-50 via-white to-indigo-50';
      welcomeFade.className = 'bg-gradient-to-r bg-clip-text text-transparent from-gray-900 via-indigo-800 to-purple-800';
      welcomePara.className = 'text-xl leading-relaxed font-light max-w-lg text-gray-600';
      statEls.forEach(el => el.className = 'text-sm font-medium text-gray-500');
      [card1, card2, card3].forEach(c => {
        c.className = 'backdrop-blur-sm p-6 rounded-3xl shadow-xl transition-colors duration-300 bg-white/80 border border-white/20';
      });
      cardTitles.forEach(el => el.className = 'font-semibold text-gray-800');
      cardSubs.forEach(el => el.className = 'text-sm text-gray-600');
      bottomCta.className = 'inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-colors duration-300 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100';
      ctaText.className = 'text-sm font-medium text-gray-700';

      themeToggle.className = 'rounded-xl transition-colors duration-200 p-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50';
      themeIcon.setAttribute('data-lucide', 'moon');
    }

    // Re-render icon
    if (window.lucide) window.lucide.createIcons();
    localStorage.setItem('gradecalc_theme', isDark ? 'dark' : 'light');
  }

  applyTheme();

  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme();
  });
});
