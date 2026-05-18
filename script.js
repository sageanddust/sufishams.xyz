const photos = (window.PHOTO_FILES || []).map((src) => {
  const file = decodeURIComponent(src.split("/").pop() || src);
  const title = file.replace(/\.(jpe?g|png)$/i, "").replace(/\s+/g, " ");
  const year = (title.match(/\b20\d{2}\b/) || ["Archive"])[0];
  const signed = src.toLowerCase().includes("signed photos");
  return { src, title, year, signed };
});

const gallery = document.querySelector("#gallery");
const heroPhoto = document.querySelector("#hero-photo");
const count = document.querySelector("#photo-count");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".close");
const galleryCount = document.querySelector("#gallery-count");

const series = [
  { label: "Mountain West", match: "2022 00" },
  { label: "Nepal", match: "Nepal" },
  { label: "American Base Camp", match: "ABC" },
  { label: "Signed Prints", match: "Signed Photos" },
];

function cardFor(photo) {
  const figure = document.createElement("figure");
  figure.className = "photo-card";
  figure.dataset.year = photo.year;
  figure.dataset.signed = photo.signed ? "true" : "false";
  figure.dataset.src = photo.src;
  figure.dataset.title = photo.title;
  figure.innerHTML = `
    <img loading="lazy" src="${photo.src}" alt="${photo.title}">
    <figcaption>${photo.title}</figcaption>
  `;
  figure.addEventListener("click", () => openPhoto(photo));
  return figure;
}

function renderGallery(filter = "all") {
  gallery.innerHTML = "";
  const filtered = photos.filter((photo) => {
    if (filter === "all") return true;
    if (filter === "signed") return photo.signed;
    if (filter === "2022") return photo.title.includes("Nepal");
    return photo.year === filter;
  });
  galleryCount.textContent =
    filter === "all"
      ? `Showing all ${filtered.length} photographs`
      : `Showing ${filtered.length} photographs`;
  filtered.forEach((photo) => gallery.appendChild(cardFor(photo)));
}

function openPhoto(photo) {
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.title;
  lightboxCaption.textContent = photo.title;
  lightbox.showModal();
}

function renderSeries() {
  const target = document.querySelector("#series-grid");
  target.innerHTML = "";
  series.forEach((item) => {
    const photo = photos.find((entry) => entry.src.includes(item.match)) || photos[0];
    const article = document.createElement("article");
    article.className = "series-card";
    article.innerHTML = `
      <img src="${photo.src}" alt="${item.label}">
      <h3>${item.label}</h3>
      <p>${photos.filter((entry) => entry.src.includes(item.match)).length || 1} photographs</p>
    `;
    article.addEventListener("click", () => openPhoto(photo));
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

closeButton.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

if (photos.length) {
  heroPhoto.src = photos.find((photo) => photo.title.includes("Mobius Arch"))?.src || photos[0].src;
  count.textContent = photos.length;
  renderSeries();
  renderGallery();
}
