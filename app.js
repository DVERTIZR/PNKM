(() => {
  const days = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
  const dayNames = {domingo:"Domingo",lunes:"Lunes",martes:"Martes",miercoles:"Miércoles",jueves:"Jueves",viernes:"Viernes",sabado:"Sábado"};
  const cfg = window.PINKREAM_CONFIG || {links:{},promotions:{}};
  const links = cfg.links || {};
  const promotions = cfg.promotions || {};
  const day = days[new Date().getDay()];
  const promo = promotions[day];

  const setHref = (id, value) => { const el=document.getElementById(id); if(el) el.href=value||"#"; };
  setHref("menu-link", links.menu); setHref("hero-rappi", links.rappi); setHref("rappi-link", links.rappi);
  setHref("review-link", links.googleReview); setHref("facebook-link", links.facebook); setHref("instagram-link", links.instagram);

  const card = document.getElementById("promo-card");
  const none = document.getElementById("no-promo");
  if (promo) {
    document.getElementById("promo-day").textContent = dayNames[day];
    document.getElementById("promo-title").textContent = promo.title || "";
    document.getElementById("promo-description").textContent = promo.description || "";
    document.getElementById("promo-price").textContent = promo.price || "";
    const cta=document.getElementById("promo-cta");
    cta.textContent=(promo.cta||"QUIERO MI PROMO")+" ↗";
    cta.href=promo.url||links.rappi||links.menu||"#";
    card.classList.remove("hidden");
  } else { none.classList.remove("hidden"); }
  document.getElementById("year").textContent = new Date().getFullYear();
})();
