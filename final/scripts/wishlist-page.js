// scripts/wishlist-page.js
import { initCommon } from './common.js';

const STORAGE_KEY = 'jellycatWishlistItems';
let wishlist = [];

document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  loadWishlist();
  renderWishlist();
  initForm();
  initClearButton();
});

function loadWishlist() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    wishlist = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(wishlist)) {
      wishlist = [];
    }
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    wishlist = [];
  }
}

function saveWishlist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
}

function initForm() {
  const form = document.getElementById('wishForm');
  const input = document.getElementById('wishName');

  if (!form || !input) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    wishlist.push(value);
    saveWishlist();
    renderWishlist();
    form.reset();
    input.focus();
  });
}

function initClearButton() {
  const clearBtn = document.getElementById('clearAll');
  if (!clearBtn) return;

  clearBtn.addEventListener('click', () => {
    if (wishlist.length === 0) return;
    if (confirm('Clear all wishlist items?')) {
      wishlist = [];
      saveWishlist();
      renderWishlist();
    }
  });
}

function renderWishlist() {
  const listEl = document.getElementById('wishList');
  if (!listEl) return;

  if (wishlist.length === 0) {
    listEl.innerHTML = '<li class="muted">No items in your wishlist yet.</li>';
    return;
  }

  const items = wishlist.map(
    (item, index) => `
      <li>
        <span>${item}</span>
        <button type="button" data-index="${index}" class="small-button">Remove</button>
      </li>
    `
  );

  listEl.innerHTML = items.join('');

  listEl.querySelectorAll('button[data-index]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      wishlist.splice(idx, 1);
      saveWishlist();
      renderWishlist();
    });
  });
}
