const detailDiv = document.getElementById("detail");
const statusDiv = document.getElementById("status");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const API_URL = `https://api.jikan.moe/v4/anime/${id}`;

function showLoading() {
  statusDiv.innerHTML = `<div class="spinner-border text-primary"></div>`;
}

async function fetchDetail() {
  showLoading();
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error();
    const data = await res.json();
    render(data.data);
    statusDiv.innerHTML = "";
  } catch {

    fetch("data/sample.json")
  .then(res => res.json())
  .then(sample => {
    statusDiv.innerHTML =
      `<div class="alert alert-warning">
        Canlı API erişilemiyor, örnek veri gösteriliyor.
      </div>`;
    render(sample.data);
  });

    statusDiv.innerHTML = `<div class="alert alert-danger">Detay yüklenemedi.</div>`;
  }
}

function render(anime) {
  detailDiv.innerHTML = `
    <div class="row">
      <div class="col-md-4">
        <img src="${anime.images.jpg.large_image_url}" class="img-fluid rounded">
      </div>
      <div class="col-md-8">
        <h3>${anime.title}</h3>
        <p>${anime.synopsis || "Açıklama yok."}</p>
        <p><strong>Puan:</strong> ${anime.score}</p>
        <p><strong>Bölüm:</strong> ${anime.episodes}</p>
      </div>
    </div>
  `;
}

fetchDetail();
