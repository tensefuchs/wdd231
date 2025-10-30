const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('#primary-nav');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
