const container = document.getElementById('members');
const q = document.getElementById('q');
const btns = document.querySelectorAll('.toolbar button');

let data = [];
let view = 'grid';

async function loadMembers() {
  const res = await fetch('data/members.json');
  data = await res.json();
  render();
}
function cardTemplate(m) {
  return `
    <article class="card">
      <h3>${m.name}</h3>
      <p>${m.category} • ${m.membership}</p>
      <p>${m.address}</p>
      <p><a href="tel:${m.phone}">${m.phone}</a> · <a href="${m.url}">Website</a></p>
    </article>`;
}
function rowTemplate(m) {
  return `
    <div class="row">
      <span>${m.name}</span>
      <span>${m.category}</span>
      <span>${m.membership}</span>
      <a href="${m.url}">Website</a>
    </div>`;
}
function render() {
  const term = (q.value || '').toLowerCase();
  const list = data.filter(m => m.name.toLowerCase().includes(term) || m.category.toLowerCase().includes(term));
  container.className = view;
  container.innerHTML = list.map(m => view === 'grid' ? cardTemplate(m) : rowTemplate(m)).join('');
}
q?.addEventListener('input', render);
btns.forEach(b => b.addEventListener('click', () => {
  btns.forEach(x => x.setAttribute('aria-pressed', 'false'));
  b.setAttribute('aria-pressed', 'true');
  view = b.dataset.view;
  render();
}));
loadMembers();
