/* --- script.js --- */

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-music");
  const flowerAnimationContainer = document.querySelector(
    ".falling-flowers-container"
  );
  const body = document.body;
  const backgroundOverlay = document.querySelector(".background-overlay");

  const textSection = document.querySelector(".text-section");
  const flowerBucketSection = document.querySelector(".flower-bucket-section");
  const twoBlocksSection = document.querySelector(".two-blocks-section");
  const surpriseButton = document.getElementById("surprise-button"); // Dapatkan tombol kejutan

  const scrollIndicator = document.querySelector(".scroll-indicator");

  // Fungsi untuk menampilkan konten tersembunyi
  function showHiddenContent() {
    textSection.classList.remove("hidden-content");
    textSection.classList.add("visible-content");

    flowerBucketSection.classList.remove("hidden-content");
    flowerBucketSection.classList.add("visible-content");

    twoBlocksSection.classList.remove("hidden-content");
    twoBlocksSection.classList.add("visible-content");

    // Munculkan tombol kejutan setelah semua konten lain
    if (surpriseButton) {
      setTimeout(() => {
        surpriseButton.classList.remove("hidden-content");
        surpriseButton.classList.add("visible-content");
      }, 1000); // Beri sedikit delay setelah bagian terakhir muncul (1 detik)
    }

    if (scrollIndicator) {
      // Beri sedikit waktu agar transisi fade-out indicator terlihat sebelum di-remove
      setTimeout(() => {
        scrollIndicator.remove();
      }, 800);
    }
  }

  // Autoplay Musik dengan fallback tombol
  audio.play().catch((error) => {
    console.log("Autoplay diblokir:", error); // Pesan di konsol jika autoplay gagal
    const playButton = document.createElement("button");
    playButton.textContent = "Cobe deh pencet ni";
    playButton.style.cssText = `
          margin-top: 30px;
          padding: 12px 25px;
          font-size: 1.1em;
          background-color: #ff69b4; /* Pink */
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          /* Animasi kedip untuk menarik perhatian */
          animation: pulse 1.5s infinite alternate; 
      `;
    playButton.onmouseover = () =>
      (playButton.style.backgroundColor = "#e05c9f");
    playButton.onmouseout = () =>
      (playButton.style.backgroundColor = "#ff69b4");
    playButton.onactive = () => (playButton.style.transform = "scale(0.98)");

    // Menambahkan tombol play ke dalam welcome-section
    document.querySelector(".welcome-section").appendChild(playButton);

    // Keyframe untuk animasi tombol pulse (kedip)
    const style = document.createElement("style");
    style.innerHTML = `
          @keyframes pulse {
              0% { transform: scale(1); box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
              100% { transform: scale(1.05); box-shadow: 0 6px 15px rgba(0,0,0,0.4); }
          }
      `;
    document.head.appendChild(style);

    // Event listener saat tombol diklik
    playButton.addEventListener("click", () => {
      audio.play(); // Putar lagu
      playButton.remove(); // Hapus tombol setelah diklik
      startFallingFlowers(); // Mulai animasi bunga jatuh
      showHiddenContent(); // Tampilkan konten tersembunyi

      // Tambahkan kelas untuk memicu fade out overlay background
      body.classList.add("fade-background-out");
    });
  });

  // Fungsi untuk membuat bunga jatuh
  function createFlower() {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    // Posisi acak di lebar layar
    flower.style.left = Math.random() * 100 + "vw";
    // Durasi animasi acak untuk variasi
    flower.style.animationDuration = Math.random() * 5 + 5 + "s"; // 5-10 detik
    // Ukuran bunga acak
    const size = Math.random() * 20 + 20; // 20-40px
    flower.style.width = size + "px";
    flower.style.height = size + "px";
    flowerAnimationContainer.appendChild(flower);

    // Hapus bunga setelah animasinya selesai untuk menghemat memori
    flower.addEventListener("animationend", () => {
      flower.remove();
    });
  }

  // Fungsi untuk memulai interval bunga jatuh
  function startFallingFlowers() {
    // Hanya mulai jika belum ada interval berjalan
    if (!window.fallingFlowersInterval) {
      window.fallingFlowersInterval = setInterval(createFlower, 400); // Buat bunga setiap 0.4 detik
    }
  }

  // Event listener untuk tombol kejutan
  if (surpriseButton) {
    surpriseButton.addEventListener("click", () => {
      window.location.href = "surprise.html"; // Arahkan ke halaman baru
    });
  }
});
