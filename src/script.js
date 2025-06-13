const modal = document.getElementById("reviewModal");
const stars = document.querySelectorAll(".star-rating .star");
let selectedRating = 0;

function openModal() {
  document.getElementById("myModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function aturTanggalKeluarMin() {
  const masuk = document.getElementById("tglMasuk");
  const keluar = document.getElementById("tglKeluar");
  keluar.min = masuk.value;
  if (keluar.value && keluar.value < masuk.value) {
    keluar.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservasiForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nama = document.getElementById("nama").value;
      const whatsapp = document.getElementById("whatsapp").value;
      const tempat = document.getElementById("tempat").value;
      const tglMasuk = document.getElementById("tglMasuk").value;
      const tglKeluar = document.getElementById("tglKeluar").value;
      const pembayaran = document.getElementById("pembayaran").value;
      const catatan = document.getElementById("catatan").value;

      const pesanWA =
        `*Reservasi Baru Telah Diterima*\n\n` +
        `🔹 *Nama:* ${nama}\n` +
        `🔹 *WhatsApp:* ${whatsapp}\n` +
        `🔹 *Tempat:* ${tempat}\n` +
        `🔹 *Tanggal:* ${tglMasuk} s/d ${tglKeluar}\n` +
        `🔹 *Metode Pembayaran:* ${pembayaran}\n` +
        `🔹 *Catatan:* ${catatan || "-"}\n\n` +
        `Mohon menunggu konfirmasi ketersediaan jadwal dan tempat.\n` +
        `Pembayaran *hanya dilakukan* setelah reservasi dikonfirmasi.\n` +
        `Silakan kirim pesan ini langsung tanpa perlu mengubah apa pun.`;

      const nomorAdmin = "6283197392024";
      const urlWA = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesanWA)}`;
      window.open(urlWA, "_blank");

      const scriptURL = "https://script.google.com/macros/s/AKfycbwZF19nqOjh5L2lo63TWSywTZflhO7wjsSnIwPs41MDDV3LL326e3ZTyngloLWzJsUIxw/exec";
      fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({
          nama,
          whatsapp,
          tempat,
          tglMasuk,
          tglKeluar,
          pembayaran,
          catatan,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("Data terkirim ke Google Sheet");
        })
        .catch((error) => {
          console.error("Gagal kirim data ke Sheet:", error);
        });

      closeModal();
    });
  }

  document.querySelectorAll(".detail-btn").forEach((button) => {
    button.addEventListener("click", function () {
      openPopupDetail(this);
    });
  });

  const detailModal = document.getElementById("detailModal");
  if (detailModal) {
    detailModal.querySelector(".popup-detail-close").addEventListener("click", closePopupDetail);
    detailModal.querySelector(".back-to-list-btn").addEventListener("click", closePopupDetail);
  }

  const popupReservasiBtn = document.getElementById("popupReservasiBtn");
  if (popupReservasiBtn) {
    popupReservasiBtn.addEventListener("click", function () {
      closePopupDetail();
      openModal();
      const landingReservasiBtn = document.querySelector(".reservasi-btn");
      if (landingReservasiBtn) {
        landingReservasiBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
});

function openPopupDetail(button) {
  const modal = document.getElementById("detailModal");
  const title = button.getAttribute("data-title");
  const desc = button.getAttribute("data-desc");
  const img = button.getAttribute("data-img");
  const harga = button.getAttribute("data-harga");
  const kapasitas = button.getAttribute("data-kapasitas");
  const akses = button.getAttribute("data-akses");
  const sarana = button.getAttribute("data-sarana");
  const jenis = button.getAttribute("data-jenis");

  modal.querySelector("#popupTitle").innerText = title;
  modal.querySelector("#popupDesc").innerText = desc;
  modal.querySelector("#popupGallery").innerHTML = `<img src="${img}" alt="${title}" style="width:100%; height:auto; border-radius:8px;">`;
  modal.querySelector("#popupHarga").innerText = harga;
  modal.querySelector("#popupKapasitas").innerText = kapasitas;
  modal.querySelector("#popupAkses").innerText = akses || "-";

  const fiturListElement = modal.querySelector("#popupFitur");
  fiturListElement.innerHTML = "";
  if (sarana) {
    sarana.split(",").forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.trim();
      fiturListElement.appendChild(li);
    });
  }

  const jenisListElement = modal.querySelector("#popupJenisAcara");
  jenisListElement.innerHTML = "";
  if (jenis) {
    jenis.split(",").forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.trim();
      jenisListElement.appendChild(li);
    });
  }

  modal.style.display = "flex";
}

function closePopupDetail() {
  document.getElementById("detailModal").style.display = "none";
}

function toggleModal(show) {
  if (show) {
    modal.classList.remove("hidden");
  } else {
    modal.classList.add("hidden");
  }
}

stars.forEach((star, index) => {
  star.addEventListener("mouseover", () => highlightStars(index));
  star.addEventListener("mouseout", () => highlightStars(selectedRating - 1));
  star.addEventListener("click", () => {
    selectedRating = index + 1;
    highlightStars(index);
  });
});

function highlightStars(index) {
  stars.forEach((star, i) => {
    star.classList.toggle("active", i <= index);
  });
}
