# Pinkream — Landing Page

Versión rediseñada usando el logo oficial proporcionado. Diseño visual tipo candy/pop, responsive y pensado primero para celular.

## Archivos
- `index.html` — página completa.
- `styles.css` — diseño visual responsive.
- `app.js` — detección automática del día y carga de promoción.
- `config.js` — enlaces y promociones.
- `assets/pinkream-logo.webp` — logo proporcionado.

## Promociones
En `config.js`, usa un objeto para los días con promoción y `null` para los días sin promoción. La página detecta el día local del dispositivo y solo muestra la promoción correspondiente a ese día.

## Enlaces configurados
Google reseña, Facebook, Instagram y Rappi fueron configurados con los enlaces proporcionados. TikTok queda pendiente.

## Menú
Como no se proporcionó un enlace de menú independiente, el botón de menú actualmente abre Rappi. Sustituye `links.menu` cuando tengas el menú definitivo.
