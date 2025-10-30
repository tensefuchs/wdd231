const imgs = document.querySelectorAll('img[data-src]');
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const img = e.target;
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
    obs.unobserve(img);
  });
}, { rootMargin: '200px' });
imgs.forEach(img => io.observe(img));
