// scripts/collection-page.js
import { initCommon } from './common.js';

const DATA_URL = './data/jellycats.json';

let plushies = [];
let currentFilter = 'all';
let currentSort = null;

document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  initFilters();
  loadPlushies();
});

function initFilters() {
  const filterButtons = document.querySelectorAll('.filters [data-filter], .filters [data-sort]');
  const gallery = document.getElementById('gallery');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.filter) {
        currentFilter = btn.dataset.filter;
        currentSort = null;
      } else if (btn.dataset.sort) {
        currentSort = btn.dataset.sort;
      }

      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery();
    });
  });

  if (gallery) {
    gallery.addEventListener('click', (event) => {
      const card = event.target.closest('[data-id]');
      if (!card) return;
      const id = card.dataset.id;
      openModal(id);
    });
  }

  const backdrop = document.getElementById('plushModalBackdrop');
  const closeBtn = document.querySelector('.modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (backdrop) {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

// Fetch + async/await + try...catch
async function loadPlushies() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    plushies = Array.isArray(data.plushies) ? data.plushies : [];
    renderGallery();
  } catch (error) {
    console.error('Error loading plush data:', error);
    gallery.innerHTML = '<p class="muted">Sorry, we could not load the collection right now.</p>';
  }
}

// Uses array methods: filter + sort + map
function getVisiblePlushies() {
  let result = [...plushies];

  if (currentFilter && currentFilter !== 'all') {
    if (currentFilter.startsWith('category:')) {
      const cat = currentFilter.split(':')[1];
      result = result.filter((p) => p.category.toLowerCase() === cat.toLowerCase());
    } else if (currentFilter.startsWith('size:')) {
      const size = currentFilter.split(':')[1];
      result = result.filter((p) => p.size.toLowerCase() === size.toLowerCase());
    }
  }

  if (currentSort === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

function renderGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const visible = getVisiblePlushies();

  if (visible.length === 0) {
    gallery.innerHTML = '<p class="muted">No plushies match the current filters.</p>';
    return;
  }

  const html = visible
    .map(
      (item) => `
      <article class="plush-card" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="card-body">
          <h2>${item.name}</h2>
          <p class="meta">Category: ${item.category} • Size: ${item.size} • Rarity: ${item.rarity}</p>
          <p class="meta">Approx. price range: ${item.priceRange}</p>
          <p class="hint">Click for more details</p>
        </div>
      </article>
    `
    )
    .join('');

  gallery.innerHTML = html;
}

function openModal(id) {
  const plush = plushies.find((p) => String(p.id) === String(id));
  if (!plush) return;

  const backdrop = document.getElementById('plushModalBackdrop');
  if (!backdrop) return;

  document.getElementById('modalTitle').textContent = plush.name;
  document.getElementById('modalCategory').textContent = `Category: ${plush.category}`;
  document.getElementById('modalSize').textContent = `Size: ${plush.size}`;
  document.getElementById('modalRarity').textContent = `Rarity: ${plush.rarity}`;
  document.getElementById('modalDescription').textContent = plush.description;

  backdrop.hidden = false;
}

function closeModal() {
  const backdrop = document.getElementById('plushModalBackdrop');
  if (backdrop) {
    backdrop.hidden = true;
  }
}
