/* ================================
   PWA – SERVICE WORKER REGISTER
   (HER SAYFADA ÇALIŞIR)
================================ */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => console.log("Service Worker kayıtlı"))
      .catch(err => console.log("SW hata:", err));
  });
}

/* ================================
   SADECE ANIME SAYFASI İÇİN
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const animeList = document.getElementById("animeList");
  const statusDiv = document.getElementById("status");
  const searchInput = document.getElementById("searchInput");

  // Eğer anime sayfası değilse → sadece çık
  if (!animeList || !statusDiv || !searchInput) {
    console.log("Anime sayfası değil");
    return;
  }

  const API_URL = "https://api.jikan.moe/v4/top/anime?limit=12";

  function showLoading() {
    statusDiv.innerHTML = `
      <div class="text-center my-4">
        <div class="spinner-border text-primary"></div>
      </div>`;
  }

  function showError(message) {
    statusDiv.innerHTML = `
      <div class="alert alert-danger text-center">${message}</div>`;
  }

  async function fetchAnime() {
    showLoading();
    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("API hatası");

      const data = await res.json();
      renderAnime(data.data);
      statusDiv.innerHTML = "";
    } catch (err) {
      console.error(err);
      showError("Anime verileri alınamadı.");
    }
  }

  function renderAnime(animes) {
    animeList.innerHTML = "";
    animes.forEach(anime => {
      animeList.innerHTML += `
        <div class="col-md-3 mb-4 anime-card">
          <div class="card h-100 shadow-sm">
            <img src="${anime.images?.jpg?.image_url || 'assets/img/no-image.png'}"
                 class="card-img-top" alt="${anime.title}">
            <div class="card-body d-flex flex-column">
              <h6 class="card-title">${anime.title}</h6>
              <a href="detail.html?id=${anime.mal_id}"
                 class="btn btn-sm btn-primary mt-auto">
                Detay
              </a>
            </div>
          </div>
        </div>`;
    });
  }

  searchInput.addEventListener("keyup", e => {
    const value = e.target.value.toLowerCase();
    document.querySelectorAll(".anime-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value)
        ? ""
        : "none";
    });
  });

  fetchAnime();
});
