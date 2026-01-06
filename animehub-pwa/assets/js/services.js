const animeList = document.getElementById("animeList");
const statusDiv = document.getElementById("status");

const API_URL = "https://api.jikan.moe/v4/anime?order_by=score&sort=desc&limit=12";

function showLoading() {
  statusDiv.innerHTML = `<div class="spinner-border text-primary"></div>`;
}

function showError() {
  statusDiv.innerHTML = `<div class="alert alert-danger">Veriler alınamadı.</div>`;
}

async function fetchAnimes() {
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

    showError();
  }
}

function render(list) {
  animeList.innerHTML = "";
  list.forEach(anime => {
    animeList.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <img src="${anime.images.jpg.image_url}" class="card-img-top">
          <div class="card-body">
            <h6>${anime.title}</h6>
            <a href="detail.html?id=${anime.mal_id}" class="btn btn-sm btn-outline-primary">
              Detaylar
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

fetchAnimes();
