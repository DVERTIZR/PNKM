(() => {
  const days = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado"
  ];

  const dayNames = {
    domingo: "Domingo",
    lunes: "Lunes",
    martes: "Martes",
    miercoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sabado: "Sábado"
  };

  const cfg = window.PINKREAM_CONFIG || {
    links: {},
    promotions: {}
  };

  const links = cfg.links || {};
  const promotions = cfg.promotions || {};

  const day = days[new Date().getDay()];
  const promo = promotions[day];

  /*
   * Configura un enlace.
   * Si no existe una URL válida, desactiva el enlace
   * en lugar de enviarlo a "#".
   */
  const setHref = (id, value) => {
    const el = document.getElementById(id);

    if (!el) return;

    if (value && typeof value === "string" && value.trim() !== "") {
      el.href = value.trim();
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      el.classList.remove("link-disabled");
    } else {
      el.removeAttribute("href");
      el.removeAttribute("target");
      el.classList.add("link-disabled");

      el.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }
  };

  // Enlaces principales
  setHref("menu-link", links.menu);
  setHref("hero-rappi", links.rappi);
  setHref("rappi-link", links.rappi);

  // Redes y reseña
  setHref("review-link", links.googleReview);
  setHref("facebook-link", links.facebook);
  setHref("instagram-link", links.instagram);

  // Promoción del día
  const card = document.getElementById("promo-card");
  const none = document.getElementById("no-promo");

  if (promo) {
    const promoDay = document.getElementById("promo-day");
    const promoTitle = document.getElementById("promo-title");
    const promoDescription = document.getElementById("promo-description");
    const promoPrice = document.getElementById("promo-price");
    const cta = document.getElementById("promo-cta");

    if (promoDay) {
      promoDay.textContent = dayNames[day];
    }

    if (promoTitle) {
      promoTitle.textContent = promo.title || "";
    }

    if (promoDescription) {
      promoDescription.textContent = promo.description || "";
    }

    if (promoPrice) {
      promoPrice.textContent = promo.price || "";
    }

    if (cta) {
      cta.textContent = `${promo.cta || "QUIERO MI PROMO"} ↗`;

      const promoUrl =
        promo.url ||
        links.rappi ||
        links.menu;

      if (promoUrl) {
        cta.href = promoUrl;
        cta.target = "_blank";
        cta.rel = "noopener noreferrer";
      } else {
        cta.removeAttribute("href");

        cta.addEventListener("click", (event) => {
          event.preventDefault();
        });
      }
    }

    if (card) {
      card.classList.remove("hidden");
    }

    if (none) {
      none.classList.add("hidden");
    }
  } else {
    if (card) {
      card.classList.add("hidden");
    }

    if (none) {
      none.classList.remove("hidden");
    }
  }

  // Renderizar reseñas automáticas desde reviews.json
  const renderReviews = async () => {
    const container = document.querySelector(".pk-reviews-grid");
    if (!container) return;

    try {
      const res = await fetch("reviews.json");
      if (!res.ok) return;

      const reviews = await res.json();
      if (!Array.isArray(reviews) || reviews.length === 0) return;

      container.innerHTML = "";

      reviews.slice(0, 6).forEach((review) => {
        const cardEl = document.createElement("div");
        cardEl.className = "pk-review-card";

        const fotoHtml = review.foto
          ? `<div class="pk-review-img-wrap"><img src="${review.foto}" class="pk-review-img" alt="Foto de reseña"></div>`
          : "";

        const avatarSrc = review.avatar || "assets/logo.svg";

        cardEl.innerHTML = `
          <div class="pk-review-header">
            <img src="${avatarSrc}" alt="${review.autor || "Cliente"}" class="pk-avatar">
            <div>
              <h4 class="pk-reviewer-name">${review.autor || "Cliente de PinKream"}</h4>
              <div class="pk-stars">★★★★★ <span class="pk-date">• ${review.sucursal || "Google Maps"}</span></div>
            </div>
          </div>
          <p class="pk-review-text">"${review.comentario || ""}"</p>
          ${fotoHtml}
        `;

        container.appendChild(cardEl);
      });
    } catch (err) {
      console.error("Error cargando reviews.json:", err);
    }
  };

  renderReviews();

  // Año del footer
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /*
   * Evita que cualquier enlace accidental con "#"
   * vuelva a llevar la página al inicio.
   */
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
})();
