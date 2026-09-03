// Reinicializa los widgets sociales si se cargan dinámicamente
document.addEventListener("DOMContentLoaded", () => {
  // Inicializador para Instagram Embeds
  if (window.instgrm) {
    window.instgrm.Widgets.load();
  }

  // Desplazamiento suave para los links de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
