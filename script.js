/* Adspirer front-end interactions */

// ---- Mobile nav ----
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Billing toggle ----
const toggleButtons = document.querySelectorAll('.toggle-btn');
const prices = document.querySelectorAll('.price[data-monthly]');

toggleButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    toggleButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const period = btn.dataset.period;
    prices.forEach((price) => {
      price.textContent = price.dataset[period] || price.dataset.monthly;
    });
  });
});

// ---- Copy suggested prompt ----
const copyBtn = document.getElementById('copyPrompt');
const promptQuote = document.querySelector('.prompt-quote');

if (copyBtn && promptQuote) {
  copyBtn.addEventListener('click', async () => {
    const text = promptQuote.textContent.replace(/^«\s*|\s*»$/g, '').trim();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    const original = copyBtn.textContent;
    copyBtn.textContent = 'Copié ✓';
    setTimeout(() => {
      copyBtn.textContent = original;
    }, 2000);
  });
}

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
