// Footer dates
const cy = document.getElementById("currentyear");
if (cy) cy.textContent = new Date().getFullYear();

const lm = document.getElementById("lastModified");
if (lm) lm.textContent = "Last Modified: " + document.lastModified;

// Hamburger toggle
const menuBtn = document.getElementById("menuButton");
const nav = document.getElementById("primaryNav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    const expanded = nav.classList.contains("open");
    menuBtn.setAttribute("aria-expanded", String(expanded));
    menuBtn.textContent = expanded ? "✕" : "☰";
  });
}