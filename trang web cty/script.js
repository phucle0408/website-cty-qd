// Đảm bảo toàn bộ HTML đã tải xong mới chạy JavaScript
document.addEventListener("DOMContentLoaded", function () {
  /* ===================================================
       1. NÚT CUỘN LÊN ĐẦU TRANG (Back to Top)
    =================================================== */
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    // Hiện/ẩn nút khi cuộn chuột xuống quá 300px
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    // Bấm nút để cuộn mượt lên đầu
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===================================================
       2. MENU THU NHỎ TRÊN ĐIỆN THOẠI (Mobile Menu Toggle)
    =================================================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  /* ===================================================
       3. FORM LIÊN HỆ (validation nhẹ, xử lý riêng ở onsubmit)
    =================================================== */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const phoneInput = document.getElementById("phone");
      const nameInput = document.getElementById("name");

      if (nameInput && nameInput.value.trim() === "") {
        e.preventDefault();
        alert("Vui lòng nhập họ và tên của bạn!");
        nameInput.focus();
        return;
      }

      if (phoneInput && phoneInput.value.trim() === "") {
        e.preventDefault();
        alert("Vui lòng nhập số điện thoại để công ty liên hệ!");
        phoneInput.focus();
        return;
      }
    });
  }
});

/* ===================================================
   4. LỌC DANH SÁCH DỰ ÁN (Project Filter)
=================================================== */
function filterProjects(category) {
  const projects = document.querySelectorAll(".project-item");

  projects.forEach(function (project) {
    if (category === "all" || project.classList.contains(category)) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}

let currentProduct = "";

function openQuoteModal(productName) {
  currentProduct = productName;
  document.getElementById("selectedProductText").innerText =
    "Sản phẩm chọn: " + productName;
  document.getElementById("quoteModal").style.display = "flex";
}

function closeQuoteModal() {
  document.getElementById("quoteModal").style.display = "none";
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const note = document.getElementById("customerNote").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !phone) {
    alert("Vui lòng nhập họ tên và số điện thoại để gửi yêu cầu.");
    return;
  }

  const product = currentProduct || "Sản phẩm chưa xác định";
  const subject = encodeURIComponent(`Yêu cầu báo giá - ${product}`);
  const body = encodeURIComponent(
    `Kính chào công ty QD,\n\n` +
      `Em/chị muốn tư vấn về sản phẩm: ${product}\n` +
      `Họ tên: ${name}\n` +
      `Số điện thoại/Zalo: ${phone}\n` +
      `Ghi chú: ${note || "Không có"}\n\n` +
      `Cảm ơn!`,
  );

  const mailtoLink = `mailto:congngheqd8686@gmail.com?subject=${subject}&body=${body}`;
  window.open("https://zalo.me/0988787585", "_blank");
  setTimeout(function () {
    window.location.href = mailtoLink;
  }, 300);

  if (status) {
    status.innerText =
      "Đang mở Zalo và hộp thư email... vui lòng gửi thư để hoàn tất yêu cầu.";
    status.style.display = "block";
  }

  document.getElementById("quoteForm").reset();
}

function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("contactStatus");

  if (!name || !phone) {
    alert("Vui lòng nhập họ tên và số điện thoại để gửi yêu cầu.");
    return;
  }

  const serviceText =
    {
      camera: "Lắp đặt Camera an ninh",
      mang: "Thi công Mạng & Wifi",
      diennhe: "Hệ thống Điện nhẹ (ELV)",
      khat: "Dịch vụ khác",
    }[service] || service;

  const subject = encodeURIComponent("Yêu cầu tư vấn từ website");
  const body = encodeURIComponent(
    `Kính chào công ty QD,\n\n` +
      `Họ tên: ${name}\n` +
      `Số điện thoại/Zalo: ${phone}\n` +
      `Dịch vụ: ${serviceText}\n` +
      `Nội dung: ${message || "Không có"}\n\n` +
      `Cảm ơn!`,
  );

  const mailtoLink = `mailto:congngheqd8686@gmail.com?subject=${subject}&body=${body}`;
  window.open("https://zalo.me/0988787585", "_blank");
  setTimeout(function () {
    window.location.href = mailtoLink;
  }, 300);

  if (status) {
    status.innerText =
      "Đang mở Zalo và hộp thư email... vui lòng gửi thư để hoàn tất yêu cầu.";
    status.style.display = "block";
  }

  document.getElementById("contactForm").reset();
}
