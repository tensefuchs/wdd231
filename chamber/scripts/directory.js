// chamber/scripts/directory.js

const container = document.querySelector("#memberContainer");
const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");

// Fetch and render members on page load
document.addEventListener("DOMContentLoaded", () => {
  if (!container) {
    console.warn("Member container (#memberContainer) not found.");
    return;
  }
  loadMembers();
  setupViewToggle();
});

/**
 * Fetch member data from JSON file and render as cards.
 */
async function loadMembers() {
  try {
    const response = await fetch("data/members.json"); // relative to directory.html
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const members = await response.json();
    renderMembers(members);
  } catch (err) {
    console.error("Error loading members:", err);
    container.innerHTML = `<p class="error">Unable to load directory at this time.</p>`;
  }
}

/**
 * Render member cards inside the container.
 * @param {Array} members
 */
function renderMembers(members) {
  container.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    card.innerHTML = `
      <figure class="member-logo">
        <img src="${escapeAttr(member.image)}"
             alt="${escapeAttr(member.name)} logo"
             loading="lazy">
      </figure>
      <div class="member-info">
        <h2>${escapeHtml(member.name)}</h2>
        <p class="member-address">${escapeHtml(member.address)}</p>
        <p class="member-phone">${escapeHtml(member.phone)}</p>
        <p class="member-membership">Membership:
          <strong>${escapeHtml(member.membership)}</strong>
        </p>
        <p class="member-site">
          <a href="${escapeAttr(member.website)}" target="_blank" rel="noopener">
            Visit Website
          </a>
        </p>
      </div>
    `;

    container.append(card);
  });
}

/**
 * Setup grid/list view toggle buttons.
 */
function setupViewToggle() {
  if (!gridBtn || !listBtn || !container) return;

  gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.setAttribute("aria-pressed", "false");
  });

  listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    listBtn.setAttribute("aria-pressed", "true");
    gridBtn.setAttribute("aria-pressed", "false");
  });
}

/* --- escaping helpers --- */
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
