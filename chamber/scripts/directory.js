// View toggle
const membersEl = document.getElementById('members');
const btnGrid   = document.getElementById('btnGrid');
const btnList   = document.getElementById('btnList');

btnGrid.addEventListener('click', () => {
  membersEl.classList.remove('list');
  membersEl.classList.add('grid');
  btnGrid.setAttribute('aria-pressed', 'true');
  btnList.setAttribute('aria-pressed', 'false');
});

btnList.addEventListener('click', () => {
  membersEl.classList.remove('grid');
  membersEl.classList.add('list');
  btnList.setAttribute('aria-pressed', 'true');
  btnGrid.setAttribute('aria-pressed', 'false');
});

// Load members
(async () => {
  try {
    const res = await fetch('data/members.json');
    const members = await res.json();
    renderMembers(members);
  } catch (err) {
    console.error(err);
    membersEl.innerHTML = '<p>Unable to load directory at this time.</p>';
  }
})();

function renderMembers(list){
  membersEl.innerHTML = '';
  list.forEach(m => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="head">
        <img class="icon" src="${m.image}" alt="${m.category} icon" width="40" height="40" loading="lazy">
        <div>
          <h3>${m.name}</h3>
          <span class="badge">${membershipLabel(m.membership)}</span>
        </div>
      </div>
      <p>${m.tagline ?? ''}</p>
      <p><strong>Phone:</strong> <a href="tel:${cleanPhone(m.phone)}">${m.phone}</a></p>
      <p><strong>Address:</strong> ${m.address}</p>
      <p><a href="${m.url}" target="_blank" rel="noopener">Visit website</a></p>
    `;
    membersEl.append(card);
  });
}

function membershipLabel(level){
  // example: 1 = Bronze, 2 = Silver, 3 = Gold
  return level === 3 ? 'Gold Member'
       : level === 2 ? 'Silver Member'
       : 'Bronze Member';
}
function cleanPhone(p){ return (p || '').replace(/[^0-9+]/g,''); }
