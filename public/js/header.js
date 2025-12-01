function atualizarHeader() {
  const rightHeader = document.getElementById("right-header");

  if (window.innerWidth >= 1024) {
    rightHeader.innerHTML = `
      <a href="https://www.instagram.com/lala_personalizados23/" target="_blank">
        <img src="./assets/logo_instagram.webp" class="social-media">
      </a>
    `;
  } else {
    rightHeader.innerHTML = "";
  }
}

atualizarHeader();
window.addEventListener("resize", atualizarHeader);
