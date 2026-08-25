const menuToggle = document.querySelector('.menu-toggle');
const siteHeader = menuToggle?.closest('header');
const mobileMenu = siteHeader?.querySelector('nav');

function closeMobileMenu() {
  siteHeader?.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', '카테고리 메뉴 열기');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = siteHeader.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '카테고리 메뉴 닫기' : '카테고리 메뉴 열기');
});

mobileMenu?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMobileMenu();
});

document.addEventListener('click', (event) => {
  if (siteHeader?.classList.contains('menu-open') && !siteHeader.contains(event.target)) closeMobileMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMobileMenu();
});

window.addEventListener('resize', () => {
  if (menuToggle && getComputedStyle(menuToggle).display === 'none') closeMobileMenu();
});