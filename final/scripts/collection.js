// Jellycat Collection (objects + array methods + DOM render)

const items = [
  { id: 1, name: "Amuseables Mitten", animal: "other", size: "small",  img: "images/collection/amuseables-mitten.webp", alt: "Amuseables Mitten plush" },
  { id: 2, name: "Amuseables Hot Chocolate With Marshmallows", animal: "other", size: "medium", img: "images/collection/amuseables-hot-chocolate-with-marshmallows.webp", alt: "Amuseables Hot Chocolate plush mug with marshmallows" },
  { id: 3, name: "Amuseables Toastie Pink And White Marshmallows", animal: "other", size: "small",  img: "images/collection/amuseables-toastie-pink-white-marshmallows.webp", alt: "Amuseables Toastie Pink and White Marshmallows plush" },
  { id: 4, name: "Amuseables Silver Star", animal: "other", size: "small",  img: "images/collection/amuseables-silver-star.webp", alt: "Amuseables Silver Star plush" },
  { id: 5, name: "Amuseables Gingerbread House", animal: "other", size: "medium", img: "images/collection/amuseables-gingerbread-house.webp", alt: "Amuseables Gingerbread House plush" },
  { id: 6, name: "Amuseables Snowflake", animal: "other", size: "small",  img: "images/collection/amuseables-snowflake.webp", alt: "Amuseables Snowflake plush" },
  { id: 7, name: "Amuseables Letter To Santa", animal: "other", size: "small",  img: "images/collection/amuseables-letter-to-santa.webp", alt: "Amuseables Letter to Santa plush" },
  { id: 8, name: "Amuseables Tree Cookie", animal: "other", size: "small",  img: "images/collection/amuseables-tree-cookie.webp", alt: "Amuseables Tree Cookie plush" },
  { id: 9, name: "Amuseables Star Cookie", animal: "other", size: "small",  img: "images/collection/amuseables-star-cookie.webp", alt: "Amuseables Star Cookie plush" }
];

const gallery = document.getElementById("gallery");
const chips = document.querySelectorAll(".chip");

function cardTemplate(item) {
  return `
    <article class="item">
      <img src="${item.img}" alt="${item.alt}" loading="lazy" width="600" height="600">
      <h3>${item.name}</h3>
      <p><strong>Category:</strong> ${item.animal} &nbsp;•&nbsp; <strong>Size:</strong> ${item.size}</p>
    </article>
  `;
}

function render(list) {
  if (!gallery) return;
  gallery.innerHTML = list.length
    ? list.map(cardTemplate).join("")
    : `<p class="muted">No items match your filter.</p>`;
}

function applyFilter(token) {
  if (token === "all") return render(items);

  if (token?.startsWith("animal:")) {
    const a = token.split(":")[1];
    return render(items.filter(i => i.animal === a));
  }

  if (token?.startsWith("size:")) {
    const s = token.split(":")[1];
    return render(items.filter(i => i.size === s));
  }

  // Fallback: show all if token not recognized
  render(items);
}

function sortByName() {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
  render(sorted);
}

// Wire up filter/sort chips
chips.forEach(btn => {
  btn.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");

    if (btn.dataset.filter) applyFilter(btn.dataset.filter);
    if (btn.dataset.sort === "name") sortByName();
  });
});

// Initial render
render(items);