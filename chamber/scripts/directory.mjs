import { attractions } from "../data/attractions.mjs";

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const VISIT_KEY = "discover-last-visit";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("discoverGrid");
  const visitBox = document.getElementById("visitMessage");

  if (!grid || !visitBox) return;

  updateVisitMessage(visitBox);
  renderAttractions(grid);
});

/**
 * Show last-visit message using localStorage.
 */
function updateVisitMessage(visitBox) {
  const now = Date.now();
  const last = Number(localStorage.getItem(VISIT_KEY));

  let message = "";

  if (!last || Number.isNaN(last)) {
    // First visit
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const diffMs = now - last;
    const diffDays = diffMs / MS_PER_DAY;

    if (diffDays < 1) {
      message = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(diffDays);
      const label = days === 1 ? "day" : "days";
      message = `You last visited ${days} ${label} ago.`;
    }
  }

  visitBox.textContent = message;
  localStorage.setItem(VISIT_KEY, String(now));
}

/**
 * Render the 8 attraction cards into the grid.
 */
function renderAttractions(grid) {
  // We already have visitMessage as first child; append cards after that.
  attractions.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = `place place${index + 1} panel`;

    card.innerHTML = `
      <h2>${escapeHtml(item.name)}</h2>
      <figure>
        <img src="${escapeAttr(item.image)}"
             alt="${escapeAttr(item.name)}"
             width="300" height="200"
             loading="lazy">
      </figure>
      <address>${escapeHtml(item.address)}</address>
      <p>${escapeHtml(item.description)}</p>
      <button type="button" class="btn-ghost">Learn more</button>
    `;

    grid.append(card);
  });
}

/* Simple escaping helper functions */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(str) {
  return String(str)
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}
