// Wishlist with localStorage persistence
const KEY = "jc_wishlist";

const elForm = document.getElementById("wishForm");
const elName = document.getElementById("wishName");
const elList = document.getElementById("wishList");
const btnClear = document.getElementById("clearAll");

const load = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

function render(items){
  elList.innerHTML = items.length
    ? items.map((name, i) => `
        <li>
          <span>${name}</span>
          <button type="button" class="ghost" data-index="${i}" aria-label="Remove ${name}">Remove</button>
        </li>
      `).join("")
    : `<li class="muted">No items yet. Add something you love!</li>`;
}

function addItem(name){
  const items = load();
  if (!items.some(n => n.toLowerCase() === name.toLowerCase())) {
    items.push(name);
    save(items);
    render(items);
  }
}

function removeAt(index){
  const items = load();
  items.splice(index, 1);
  save(items);
  render(items);
}

if (elForm) {
  elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = elName.value.trim();
    if (name) {
      addItem(name);
      elName.value = "";
      elName.focus();
    }
  });
}

if (elList) {
  elList.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-index]");
    if (!btn) return;
    const idx = Number(btn.dataset.index);
    removeAt(idx);
  });
}

if (btnClear) {
  btnClear.addEventListener("click", () => {
    if (confirm("Clear your whole wishlist?")) {
      save([]);
      render([]);
    }
  });
}

// initial render
render(load());