const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("messageError").innerText = "";
  status.innerHTML = "";

  if (!name.value.trim()) {
    document.getElementById("nameError").innerText = "Ad soyad alanı zorunludur.";
    valid = false;
  }

  if (!email.value.includes("@")) {
    document.getElementById("emailError").innerText = "Geçerli bir e-posta adresi giriniz.";
    valid = false;
  }

  if (!message.value.trim()) {
    document.getElementById("messageError").innerText = "Mesaj alanı boş bırakılamaz.";
    valid = false;
  }

  if (valid) {
    status.innerHTML = `
      <div class="alert alert-success">
        Mesajınız başarıyla alınmıştır. En kısa sürede sizinle iletişime geçilecektir.
      </div>
    `;
    form.reset();
  }
});
