const photos = (window.PHOTO_FILES || []).filter((src) => !src.includes("/Signed Photos/")).map((src) => {
  const file = decodeURIComponent(src.split("/").pop() || src);
  const title = file.replace(/\.(jpe?g|png)$/i, "").replace(/\s+/g, " ");
  const year = (title.match(/\b20\d{2}\b/) || ["Archive"])[0];
  return { title, year };
});

const gallery = document.querySelector("#gallery");
const count = document.querySelector("#photo-count");
const galleryCount = document.querySelector("#gallery-count");

const series = [
  { label: "Mountain West", match: "2022 00" },
  { label: "Nepal", match: "Nepal" },
  { label: "Annapurna Base Camp", match: "ABC" },
];

function cardFor(photo) {
  const entry = document.createElement("p");
  entry.className = "photo-card";
  entry.textContent = photo.title;
  return entry;
}

function renderGallery(filter = "all") {
  gallery.innerHTML = "";
  const filtered = photos.filter((photo) => {
    if (filter === "all") return true;
    if (filter === "2022") return photo.title.includes("Nepal");
    return photo.year === filter;
  });
  galleryCount.textContent =
    filter === "all"
      ? `Showing all ${filtered.length} photographs`
      : `Showing ${filtered.length} photographs`;
  filtered.forEach((photo) => gallery.appendChild(cardFor(photo)));
}

function renderSeries() {
  const target = document.querySelector("#series-grid");
  target.innerHTML = "";
  series.forEach((item) => {
    const article = document.createElement("article");
    article.className = "series-card";
    article.innerHTML = `
      <h3>${item.label}</h3>
      <p>${photos.filter((entry) => entry.title.includes(item.match)).length} photographs</p>
    `;
    target.appendChild(article);
  });
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.is-active").classList.remove("is-active");
    button.classList.add("is-active");
    renderGallery(button.dataset.filter);
  });
});

count.textContent = photos.length;
renderSeries();
renderGallery();
