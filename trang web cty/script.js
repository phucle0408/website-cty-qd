document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

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
      }
    });
  }
}

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
  const selectedText = document.getElementById("selectedProductText");
  const modal = document.getElementById("quoteModal");

  if (selectedText) {
    selectedText.innerText = "Sản phẩm chọn: " + productName;
  }

  if (modal) {
    modal.style.display = "flex";
  }
}

function closeQuoteModal() {
  const modal = document.getElementById("quoteModal");
  if (modal) {
    modal.style.display = "none";
  }
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
  const subject = encodeURIComponent("Yêu cầu báo giá - " + product);
  const body = encodeURIComponent(
    "Kính chào công ty QD,\n\n" +
      "Em/chị muốn tư vấn về sản phẩm: " +
      product +
      "\n" +
      "Họ tên: " +
      name +
      "\n" +
      "Số điện thoại/Zalo: " +
      phone +
      "\n" +
      "Ghi chú: " +
      (note || "Không có") +
      "\n\n" +
      "Cảm ơn!",
  );

  const mailtoLink =
    "mailto:congngheqd8686@gmail.com?subject=" + subject + "&body=" + body;

  try {
    window.open("https://zalo.me/0988787585", "_blank");
  } catch (e) {
    console.warn("Không mở được Zalo:", e);
  }

  setTimeout(function () {
    window.location.href = mailtoLink;
  }, 300);

  if (status) {
    status.innerText = "Đang mở Zalo và hộp thư email...";
    status.style.display = "block";
  }

  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.reset();
  }
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
    "Kính chào công ty QD,\n\n" +
      "Họ tên: " +
      name +
      "\n" +
      "Số điện thoại/Zalo: " +
      phone +
      "\n" +
      "Dịch vụ: " +
      serviceText +
      "\n" +
      "Nội dung: " +
      (message || "Không có") +
      "\n\n" +
      "Cảm ơn!",
  );

  const mailtoLink =
    "mailto:congngheqd8686@gmail.com?subject=" + subject + "&body=" + body;

  try {
    window.open("https://zalo.me/0988787585", "_blank");
  } catch (e) {
    console.warn("Không mở được Zalo:", e);
  }

  setTimeout(function () {
    window.location.href = mailtoLink;
  }, 300);

  if (status) {
    status.innerText = "Đang mở Zalo và hộp thư email...";
    status.style.display = "block";
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.reset();
  }
}

// Gửi form báo giá qua Zalo
function handleQuoteSendZalo() {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const note = document.getElementById("customerNote").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !phone) {
    alert("Vui lòng nhập họ tên và số điện thoại để gửi yêu cầu.");
    return;
  }

  const product = currentProduct || "Sản phẩm chưa xác định";
  const message = encodeURIComponent(
    "Kính chào công ty QD,\n\n" +
      "Em/chị muốn tư vấn về sản phẩm: " +
      product +
      "\n" +
      "Họ tên: " +
      name +
      "\n" +
      "Số điện thoại/Zalo: " +
      phone +
      "\n" +
      "Ghi chú: " +
      (note || "Không có") +
      "\n\n" +
      "Cảm ơn!",
  );

  const zaloLink = "https://zalo.me/0988787585?text=" + message;
  window.open(zaloLink, "_blank");

  if (status) {
    status.innerText = "Đã mở Zalo. Hãy gửi tin nhắn!";
    status.style.display = "block";
  }

  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.reset();
  }
}

// Gửi form báo giá qua Email
function handleQuoteSendEmail() {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const note = document.getElementById("customerNote").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !phone) {
    alert("Vui lòng nhập họ tên và số điện thoại để gửi yêu cầu.");
    return;
  }

  const product = currentProduct || "Sản phẩm chưa xác định";
  const subject = encodeURIComponent("Yêu cầu báo giá - " + product);
  const body = encodeURIComponent(
    "Kính chào công ty QD,\n\n" +
      "Em/chị muốn tư vấn về sản phẩm: " +
      product +
      "\n" +
      "Họ tên: " +
      name +
      "\n" +
      "Số điện thoại/Zalo: " +
      phone +
      "\n" +
      "Ghi chú: " +
      (note || "Không có") +
      "\n\n" +
      "Cảm ơn!",
  );

  const mailtoLink =
    "mailto:congngheqd8686@gmail.com?subject=" + subject + "&body=" + body;
  window.location.href = mailtoLink;

  if (status) {
    status.innerText = "Đang mở email...";
    status.style.display = "block";
  }

  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.reset();
  }
}

// Gửi form liên hệ qua Zalo
function handleContactSendZalo() {
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

  const textMessage = encodeURIComponent(
    "Kính chào công ty QD,\n\n" +
      "Họ tên: " +
      name +
      "\n" +
      "Số điện thoại/Zalo: " +
      phone +
      "\n" +
      "Dịch vụ: " +
      serviceText +
      "\n" +
      "Nội dung: " +
      (message || "Không có") +
      "\n\n" +
      "Cảm ơn!",
  );

  const zaloLink = "https://zalo.me/0988787585?text=" + textMessage;
  window.open(zaloLink, "_blank");

  if (status) {
    status.innerText = "Đã mở Zalo. Hãy gửi tin nhắn!";
    status.style.display = "block";
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.reset();
  }
}

// Gửi form liên hệ qua Email
function handleContactSendEmail() {
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
    "Kính chào công ty QD,\n\n" +
      "Họ tên: " +
      name +
      "\n" +
      "Số điện thoại/Zalo: " +
      phone +
      "\n" +
      "Dịch vụ: " +
      serviceText +
      "\n" +
      "Nội dung: " +
      (message || "Không có") +
      "\n\n" +
      "Cảm ơn!",
  );

  const mailtoLink =
    "mailto:congngheqd8686@gmail.com?subject=" + subject + "&body=" + body;
  window.location.href = mailtoLink;

  if (status) {
    status.innerText = "Đang mở email...";
    status.style.display = "block";
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.reset();
  }
}
