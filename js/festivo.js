/* ══════════════════════════════════════════════════════════════════════════
   festivo.js — adornos según las fechas festivas de Guatemala
   ══════════════════════════════════════════════════════════════════════════
   Qué pone en cada fecha (nada de esto tapa productos ni estorba los clics):
     1. Un accesorio sobre el logo y sobre la mascota de WhatsApp (gorrito, cuernitos…)
     2. Una guirnalda delgada debajo del encabezado
     3. Una animación de bienvenida de pocos segundos, solo en el inicio y una vez por visita
     4. Un saludo corto que se va junto con la animación

   LO ÚNICO QUE NECESITAS CAMBIAR ES  modo  (aquí abajo), o usar el panel:
   PanelFestivo\AbrirPanel.bat

     modo: "auto"      se activa solo según el calendario de más abajo
     modo: "apagado"   sin adornos: el sitio queda exactamente como el original
     modo: "navidad"   fuerza un tema, sin importar la fecha. Temas disponibles:
                       navidad · diablo · anio-nuevo · carino · san-patricio ·
                       semana-santa · madre · padre · independencia · nino ·
                       santos · black-october · thanksgiving

   PROBAR SIN PUBLICAR: agrega  ?festivo=navidad  al final de la dirección.
     ?festivo=apagado  lo quita    ·    ?festivo=auto  vuelve a lo normal
     (la prueba solo la ves tú, y se mantiene mientras no cierres la pestaña)

   Después de cambiar  modo  hay que publicar el sitio (process\PublicarSitio.bat).
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var FESTIVO = {
    modo: "navidad",

    // Qué partes se muestran. Pon false en la que no quieras.
    mostrar: { accesorio: true, franja: true, animacion: true, saludo: true },

    // Animación de bienvenida
    bienvenida: {
      segundos: 8,            // cuánto dura antes de desvanecerse
      soloEnInicio: true,     // false = también en catálogo, carrito y páginas de producto
      unaVezPorVisita: true   // false = se repite cada vez que se abre el inicio
    },

    // Cantidad de adornos de la animación: 1 = normal · 0.5 = la mitad · 2 = el doble
    intensidad: 1,

    // Calendario del modo "auto". Fechas en formato "mes-día" (hora de Guatemala).
    // Si dos se cruzan, gana el que está más arriba. Puedes cambiar fechas, borrar líneas o agregar.
    // Fechas que se calculan solas cada año: "pascua", "ramos" (Semana Santa) y
    // "gracias" (Thanksgiving, 4.º jueves de noviembre). Aceptan días de más o de menos: "gracias-6".
    calendario: [
      { tema: "anio-nuevo",    desde: "12-31", hasta: "01-01" },
      { tema: "diablo",        desde: "12-05", hasta: "12-07" },
      { tema: "navidad",       desde: "12-08", hasta: "12-30" },
      { tema: "carino",        desde: "02-07", hasta: "02-14" },
      { tema: "san-patricio",  desde: "03-15", hasta: "03-17" },
      { tema: "semana-santa",  desde: "ramos", hasta: "pascua" },
      { tema: "madre",         desde: "05-03", hasta: "05-10" },
      { tema: "padre",         desde: "06-14", hasta: "06-17" },
      { tema: "independencia", desde: "09-01", hasta: "09-15" },
      { tema: "nino",          desde: "09-28", hasta: "10-01" },
      { tema: "santos",        desde: "10-28", hasta: "11-02" },
      { tema: "black-october", desde: "10-01", hasta: "10-31" },
      { tema: "thanksgiving",  desde: "gracias-6", hasta: "gracias" }
    ],

    // Dónde están el logo, la mascota y el encabezado en cada tipo de página
    logos: ["#header-logo", ".pp-marca img", "#logo-header"],
    mascotas: ['a[id$="-animada"] img', '#wa-animado img'],
    encabezados: ["#page-header", ".pp-header", "header.encabezado"]
  };

  /* ── Temas. Por cada uno:
        saludo     texto corto de bienvenida ("" = sin saludo)
        color      color del saludo
        accesorio  lo que se le pone al logo y a la mascota ("" = nada)
        franja     guirnalda bajo el encabezado (null = nada)
        mov…       la animación de bienvenida (mov: "" = sin animación)                         ── */
  var TEMAS = {
    "navidad":       { mov: "caer",   forma: "estrella",  n: 46, tam: [5, 10],  vel: [22, 55],  colores: ["#f4c20d", "#ffffff", "#e63946", "#2a9d8f"],
                       saludo: "¡Feliz Navidad!", color: "#b3161d", accesorio: "gorro",
                       franja: { tipo: "colgantes", icono: "foco", colores: ["#e63946", "#f4c20d", "#2a9d8f", "#3a86ff"], brillo: true } },
    "diablo":        { mov: "subir",  forma: "brasa",     n: 110, tam: [8, 20], vel: [60, 170], colores: ["#ffb020", "#ff6a00", "#ff3d00", "#ffd36b"], resplandor: true,
                       saludo: "¡Llegó la Quema del Diablo!", color: "#c2410c", accesorio: "cuernos",
                       franja: { tipo: "banderines", colores: ["#d62828", "#f77f00", "#fcbf49"] } },
    "anio-nuevo":    { mov: "fuegos",                                                           colores: ["#e63946", "#f4a100", "#2a9d8f", "#3a86ff", "#c05cff", "#ff5fa2"],
                       saludo: "¡Feliz Año Nuevo!", color: "#7a5b00", accesorio: "fiesta",
                       franja: { tipo: "banderines", colores: ["#d4a017", "#1d2733", "#b8bfc7"] } },
    "carino":        { mov: "subir",  forma: "corazon",   n: 26, tam: [10, 22], vel: [25, 60],  colores: ["#e63946", "#ff6b81", "#ff9eb5"],
                       saludo: "¡Feliz Día del Cariño!", color: "#c1121f", accesorio: "corazon",
                       franja: { tipo: "colgantes", icono: "corazon", colores: ["#e63946", "#ff6b81", "#ff9eb5"] } },
    "san-patricio":  { mov: "caer",   forma: "trebol",    n: 34, tam: [9, 17],  vel: [25, 60],  colores: ["#1b8a3a", "#2fa84f", "#0b6b2b", "#57c26f"],
                       saludo: "¡Feliz Día de San Patricio!", color: "#0b6b2b", accesorio: "sombrero-verde",
                       franja: { tipo: "colgantes", icono: "trebol", colores: ["#1b8a3a", "#2fa84f", "#57c26f"] } },
    "semana-santa":  { mov: "caer",   forma: "petalo",    n: 45, tam: [6, 11],  vel: [25, 55],  colores: ["#6a1b9a", "#8e44ad", "#f4c20d", "#d62828", "#2e8b57"],
                       saludo: "Feliz Semana Santa", color: "#6a1b9a", accesorio: "",
                       franja: { tipo: "alfombra" } },
    "madre":         { mov: "caer",   forma: "petalo",    n: 40, tam: [6, 12],  vel: [22, 50],  colores: ["#ff8fab", "#ffb3c6", "#fb6f92", "#ffc2d1"],
                       saludo: "¡Feliz Día de la Madre!", color: "#c9184a", accesorio: "flor",
                       franja: { tipo: "colgantes", icono: "flor", colores: ["#fb6f92", "#ff8fab", "#ffb3c6"] } },
    "padre":         { mov: "",
                       saludo: "¡Feliz Día del Padre!", color: "#1d3557", accesorio: "sombrero", franja: null },
    "independencia": { mov: "caer",   forma: "confeti",   n: 70, tam: [6, 11],  vel: [35, 90],  colores: ["#4997d0", "#ffffff", "#4997d0"],
                       saludo: "¡Feliz Independencia, Guatemala!", color: "#1f6fb2", accesorio: "bandera",
                       franja: { tipo: "banderines", colores: ["#4997d0", "#ffffff"] } },
    "nino":          { mov: "subir",  forma: "globo",     n: 16, tam: [15, 24], vel: [30, 65],  colores: ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#9b5de5"],
                       saludo: "¡Feliz Día del Niño!", color: "#118ab2", accesorio: "helice",
                       franja: { tipo: "banderines", colores: ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#9b5de5"] } },
    "santos":        { mov: "subir",  forma: "barrilete", n: 9,  tam: [24, 40], vel: [12, 28],  colores: ["#e63946", "#f4a100", "#2a9d8f", "#3a86ff", "#c05cff", "#ffd166"],
                       saludo: "Feliz Día de Todos los Santos", color: "#b5179e", accesorio: "barrilete",
                       franja: { tipo: "papel", colores: ["#e63946", "#f4a100", "#2a9d8f", "#3a86ff", "#c05cff"] } },
    "black-october": { mov: "caer",   forma: "etiqueta",  n: 24, tam: [13, 21], vel: [30, 70],  colores: ["#111111", "#111111", "#f4c20d"],
                       saludo: "Black October", color: "#111111", accesorio: "etiqueta",
                       franja: { tipo: "banderines", colores: ["#111111", "#f4c20d"] } },
    "thanksgiving":  { mov: "caer",   forma: "hoja",      n: 38, tam: [10, 18], vel: [28, 65],  colores: ["#d35400", "#e67e22", "#c0392b", "#f1c40f", "#8e5a2b"],
                       saludo: "¡Feliz Día de Acción de Gracias!", color: "#a04000", accesorio: "peregrino",
                       franja: { tipo: "colgantes", icono: "hoja", colores: ["#d35400", "#c0392b", "#f1c40f", "#8e5a2b"] } }
  };
  // Otros nombres que también se aceptan en  modo  y en  ?festivo=
  var ALIAS = { "nieve": "navidad", "fuego": "diablo", "quema": "diablo", "fuegos": "anio-nuevo", "ano-nuevo": "anio-nuevo",
                "corazones": "carino", "amor": "carino", "patrias": "independencia", "globos": "nino", "barriletes": "santos",
                "san-patrick": "san-patricio", "st-patrick": "san-patricio", "patricio": "san-patricio", "treboles": "san-patricio",
                "black": "black-october", "blackoctober": "black-october", "black-octubre": "black-october",
                "accion-de-gracias": "thanksgiving", "gracias": "thanksgiving", "thanksgiving-day": "thanksgiving",
                "off": "apagado", "no": "apagado", "original": "apagado" };

  /* ══════════ De aquí para abajo no hace falta tocar nada ══════════ */

  var T = "#1d2733";   // color del contorno de los accesorios
  function svg(dentro) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%" style="display:block;overflow:visible">' +
           '<g stroke="' + T + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">' + dentro + '</g></svg>';
  }
  /* Accesorios. tipo "sombrero" y "cuernos" se apoyan en la cabeza (su base es el punto 32,56 del dibujo);
     "insignia" va prendida en la esquina de arriba a la derecha. */
  var ACCESORIOS = {
    "gorro":          { tipo: "sombrero", d: svg('<path d="M14 48C14 26 30 10 44 12c10 2 14 12 12 22-4-6-10-8-12-4 2 8 4 14 6 18z" fill="#d62828"/><rect x="8" y="46" width="48" height="12" rx="6" fill="#fff"/><circle cx="56" cy="36" r="6" fill="#fff"/>') },
    "cuernos":        { tipo: "cuernos",  d: svg('<path d="M14 56C8 40 12 24 22 14c0 14 4 26 8 38z" fill="#d62828"/><path d="M50 56c6-16 2-32-8-42 0 14-4 26-8 38z" fill="#d62828"/>') },
    "fiesta":         { tipo: "sombrero", d: svg('<path d="M32 8l18 48H14z" fill="#ffca3a"/><path d="M25.5 26l13 0 4.5 12-22 0z" fill="#ff5fa2" stroke="none"/><path d="M18 50l28 0 2 6H16z" fill="#3a86ff" stroke="none"/><path d="M32 8l18 48H14z" fill="none"/><circle cx="32" cy="8" r="5" fill="#ff595e"/>') },
    "corazon":        { tipo: "insignia", d: svg('<path d="M32 54C10 38 8 20 20 14c7-3 12 2 12 8 0-6 5-11 12-8 12 6 10 24-12 40z" fill="#e63946"/>') },
    "sombrero-verde": { tipo: "sombrero", d: svg('<rect x="18" y="16" width="28" height="36" rx="3" fill="#1b8a3a"/><rect x="18" y="38" width="28" height="9" fill="#1d2733" stroke="none"/><rect x="27" y="37" width="10" height="11" rx="1.5" fill="#f4c20d"/><rect x="6" y="50" width="52" height="8" rx="4" fill="#1b8a3a"/>') },
    "flor":           { tipo: "insignia", d: svg('<g fill="#fb6f92"><circle cx="32" cy="15" r="11"/><circle cx="48" cy="27" r="11"/><circle cx="42" cy="45" r="11"/><circle cx="22" cy="45" r="11"/><circle cx="16" cy="27" r="11"/></g><circle cx="32" cy="32" r="9" fill="#ffd166"/>') },
    "sombrero":       { tipo: "sombrero", d: svg('<path d="M16 50C16 30 22 20 32 25c10-5 16 5 16 25z" fill="#1d3557"/><path d="M16.5 40h31l.5 9h-32z" fill="#e9c46a" stroke="none"/><ellipse cx="32" cy="52" rx="27" ry="6" fill="#1d3557"/>') },
    "bandera":        { tipo: "insignia", d: svg('<rect x="14" y="12" width="14" height="26" fill="#4997d0"/><rect x="28" y="12" width="14" height="26" fill="#fff"/><rect x="42" y="12" width="14" height="26" fill="#4997d0"/><path d="M12 8v52" stroke-width="4" stroke="#7a4a1e"/>') },
    "helice":         { tipo: "sombrero", d: svg('<path d="M12 56c0-18 9-28 20-28s20 10 20 28z" fill="#e63946"/><path d="M25 29c-3 6-4 16-4 27h22c0-11-1-21-4-27-5-2-9-2-14 0z" fill="#ffd166" stroke="none"/><path d="M12 56c0-18 9-28 20-28s20 10 20 28z" fill="none"/><path d="M32 28V16"/><ellipse cx="20" cy="14" rx="12" ry="4" fill="#3a86ff"/><ellipse cx="44" cy="14" rx="12" ry="4" fill="#3a86ff"/><circle cx="32" cy="14" r="3" fill="#1d2733"/>') },
    "barrilete":      { tipo: "insignia", d: svg('<path d="M32 46c6 6-6 8 0 16" fill="none" stroke="#e63946" stroke-width="3"/><g stroke-width="1.2"><path d="M32 26L54 26 47.6 10.4z" fill="#e63946"/><path d="M32 26L47.6 10.4 32 4z" fill="#f4a100"/><path d="M32 26L32 4 16.4 10.4z" fill="#2a9d8f"/><path d="M32 26L16.4 10.4 10 26z" fill="#3a86ff"/><path d="M32 26L10 26 16.4 41.6z" fill="#c05cff"/><path d="M32 26L16.4 41.6 32 48z" fill="#ffd166"/><path d="M32 26L32 48 47.6 41.6z" fill="#e63946"/><path d="M32 26L47.6 41.6 54 26z" fill="#2a9d8f"/></g><circle cx="32" cy="26" r="7" fill="#fff"/>') },
    "etiqueta":       { tipo: "insignia", d: svg('<path d="M24 10h30a4 4 0 014 4v36a4 4 0 01-4 4H24L6 32z" fill="#111" stroke="#f4c20d"/><circle cx="18" cy="32" r="3.5" fill="#f4c20d" stroke="none"/><text x="40" y="42" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="28" fill="#f4c20d" stroke="none">%</text>') },
    "peregrino":      { tipo: "sombrero", d: svg('<path d="M20 52l4-36h16l4 36z" fill="#2b2b2b"/><path d="M21 40h22l1 9H20z" fill="#8e5a2b" stroke="none"/><rect x="27" y="38.500" width="10" height="11" rx="1.5" fill="none" stroke="#f4c20d" stroke-width="2.5"/><rect x="5" y="50" width="54" height="8" rx="4" fill="#2b2b2b"/>') }
  };

  /* ── estado ── */
  var lienzo = null, ctx = null, cuadro = 0, activo = null, parts = [], chispas = [];
  var W = 0, H = 0, ultimo = 0, proximoFuego = 0, brillo = null, inicioAnim = 0, duraAnim = 0;
  var puestos = [];        // todo lo que se agregó a la página, para poder quitarlo
  var recolocar = [];      // funciones que reubican los accesorios si cambia el tamaño
  var quieto = false;      // el visitante pidió "reducir movimiento"

  function azar(a, b) { return a + Math.random() * (b - a); }
  function elegir(l) { return l[Math.floor(Math.random() * l.length)]; }
  function normal(t) { t = String(t || "").toLowerCase().trim(); return ALIAS[t] || t; }

  /* ── fecha de hoy en Guatemala (UTC-6, sin horario de verano) ── */
  function hoyGT() {
    var d = new Date(Date.now() - 6 * 3600 * 1000);
    return { a: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() };
  }
  function pascua(anio) {            // Domingo de Resurrección (calendario gregoriano)
    var a = anio % 19, b = Math.floor(anio / 100), c = anio % 100, d = Math.floor(b / 4), e = b % 4,
        f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
        i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7,
        m = Math.floor((a + 11 * h + 22 * l) / 451),
        mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(Date.UTC(anio, mes - 1, dia));
  }
  function cuartoJueves(anio) {      // Thanksgiving: 4.º jueves de noviembre
    var uno = new Date(Date.UTC(anio, 10, 1));
    return new Date(Date.UTC(anio, 10, 1 + ((4 - uno.getUTCDay() + 7) % 7) + 21));
  }
  function clave(txt, anio) {        // "12-08" → 1208 · "pascua", "ramos", "gracias-6"… → fecha de ese año
    var m = /^(pascua|ramos|gracias)([+-]\d+)?$/.exec(String(txt).trim());
    if (m) {
      var p = m[1] === "gracias" ? cuartoJueves(anio) : pascua(anio);
      var dias = (m[1] === "ramos" ? -7 : 0) + (m[2] ? parseInt(m[2], 10) : 0);
      p = new Date(p.getTime() + dias * 864e5);
      return (p.getUTCMonth() + 1) * 100 + p.getUTCDate();
    }
    var t = String(txt).split("-");
    return parseInt(t[0], 10) * 100 + parseInt(t[1], 10);
  }
  function temaDeHoy() {
    var h = hoyGT(), hoy = h.m * 100 + h.d;
    for (var i = 0; i < FESTIVO.calendario.length; i++) {
      var r = FESTIVO.calendario[i], a = clave(r.desde, h.a), b = clave(r.hasta, h.a);
      if (isNaN(a) || isNaN(b)) continue;
      var dentro = a <= b ? (hoy >= a && hoy <= b) : (hoy >= a || hoy <= b);   // a > b: cruza el fin de año
      if (dentro) return normal(r.tema);
    }
    return "apagado";
  }

  /* ── qué tema toca: ?festivo= (prueba) → modo → calendario ── */
  function decidir() {
    var prueba = null;
    try {
      var q = new URLSearchParams(location.search).get("festivo");
      if (q !== null) {
        q = normal(q);
        if (q === "auto" || q === "") sessionStorage.removeItem("festivo-prueba");
        else sessionStorage.setItem("festivo-prueba", q);
      }
      prueba = sessionStorage.getItem("festivo-prueba");
    } catch (x) {}
    var modo = normal(prueba || FESTIVO.modo || "auto");
    var tema = modo === "auto" ? temaDeHoy() : modo;
    return { tema: TEMAS[tema] ? tema : "apagado", forzado: !!prueba };
  }

  /* ══════════ 1. Accesorio sobre el logo y la mascota ══════════ */

  function agregar(el, padre) { padre.appendChild(el); puestos.push(el); return el; }

  function medirDibujo(img) {        // dónde está la "cabeza" de la mascota dentro de su imagen
    var todo = { x0: 0, y0: 0, x1: 1, y1: 1, cx: 0.5 };
    try {
      var w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) return todo;
      var e = Math.min(1, 90 / Math.max(w, h)), cw = Math.max(2, Math.round(w * e)), ch = Math.max(2, Math.round(h * e));
      var c = document.createElement("canvas"); c.width = cw; c.height = ch;
      var x = c.getContext("2d"); x.drawImage(img, 0, 0, cw, ch);
      var d = x.getImageData(0, 0, cw, ch).data, i, px, py, minX = cw, maxX = -1, minY = ch, maxY = -1;
      var lleno = function (px, py) { i = (py * cw + px) * 4; return d[i + 3] > 40 && !(d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240); };
      for (py = 0; py < ch; py++) for (px = 0; px < cw; px++) if (lleno(px, py)) {
        if (px < minX) minX = px; if (px > maxX) maxX = px; if (py < minY) minY = py; if (py > maxY) maxY = py;
      }
      if (maxX < 0) return todo;
      var suma = 0, n = 0, banda = Math.max(1, Math.round((maxY - minY) * 0.06));
      for (py = minY; py <= minY + banda; py++) for (px = 0; px < cw; px++) if (lleno(px, py)) { suma += px; n++; }
      return { x0: minX / cw, y0: minY / ch, x1: (maxX + 1) / cw, y1: (maxY + 1) / ch, cx: n ? (suma / n + 0.5) / cw : 0.5 };
    } catch (x) { return todo; }      // imagen de otro dominio o navegador viejo: se usa la imagen completa
  }

  function vestir(img, esMascota, acc) {
    var padre = img.parentElement;
    if (!padre) return;
    if (getComputedStyle(padre).position === "static") {
      var antes = padre.style.position; padre.style.position = "relative";
      puestos.push({ deshacer: function () { padre.style.position = antes; } });
    }
    var s = document.createElement("span");
    s.className = "festivo-acc"; s.setAttribute("aria-hidden", "true"); s.innerHTML = acc.d;
    s.style.cssText = "position:absolute;pointer-events:none;z-index:3;line-height:0;display:none;";
    agregar(s, padre);
    var medida = null;
    function colocar() {
      var w = img.offsetWidth, h = img.offsetHeight, L = img.offsetLeft, Tp = img.offsetTop;
      if (!w || !h) { s.style.display = "none"; return; }
      var tam, px, py, giro, base = acc.tipo !== "insignia";
      if (esMascota) {
        if (!medida && img.complete && img.naturalWidth) medida = medirDibujo(img);
        var m = medida || { x0: 0, y0: 0, x1: 1, y1: 1, cx: 0.5 }, ancho = (m.x1 - m.x0) * w;
        if (acc.tipo === "sombrero") { tam = Math.max(18, ancho * 0.56); px = L + m.cx * w; py = Tp + m.y0 * h + tam * 0.16; giro = -10; }
        else if (acc.tipo === "cuernos") { tam = Math.max(20, ancho * 0.7); px = L + m.cx * w; py = Tp + m.y0 * h + tam * 0.3; giro = 0; }
        else { tam = Math.max(15, ancho * 0.42); px = L + m.x1 * w - tam * 0.15; py = Tp + m.y0 * h + tam * 0.3; giro = 12; }
      } else {
        if (acc.tipo === "sombrero") { tam = w * 0.6; px = L + w * 0.22; py = Tp + h * 0.3; giro = -22; }
        else if (acc.tipo === "cuernos") { tam = w * 0.56; px = L + w * 0.5; py = Tp + h * 0.1; giro = 0; }
        else { tam = w * 0.5; px = L + w * 0.93; py = Tp + h * 0.1; giro = 12; }
      }
      s.style.width = s.style.height = tam.toFixed(1) + "px";
      s.style.left = (px - tam / 2).toFixed(1) + "px";
      var arriba = py - tam * (base ? 0.875 : 0.5);
      // El encabezado está pegado a la barra de confianza, que va encima: un accesorio del logo no puede subir más de 8 px.
      if (!esMascota && arriba < Tp - 8) arriba = Tp - 8;
      s.style.top = arriba.toFixed(1) + "px";
      s.style.transformOrigin = base ? "50% 87.5%" : "50% 50%";
      s.style.transform = "rotate(" + giro + "deg)";
      s.style.display = "block";
    }
    recolocar.push(colocar);
    if (!img.complete) img.addEventListener("load", colocar);
    colocar();
  }

  function ponerAccesorios(t) {
    var acc = ACCESORIOS[t.accesorio];
    if (!acc || !FESTIVO.mostrar.accesorio) return;
    var vistos = [];
    function cada(lista, esMascota) {
      (lista || []).forEach(function (sel) {
        var els; try { els = document.querySelectorAll(sel); } catch (x) { return; }
        Array.prototype.forEach.call(els, function (img) {
          if (vistos.indexOf(img) < 0) { vistos.push(img); vestir(img, esMascota, acc); }
        });
      });
    }
    cada(FESTIVO.mascotas, true);
    cada(FESTIVO.logos, false);
  }

  /* ══════════ 2. Guirnalda bajo el encabezado ══════════ */

  var ICONOS = {   // dibujos de 14×14 que cuelgan de la guirnalda; {c} = color
    foco:    '<rect x="5" y="0" width="4" height="3.500" fill="#4a4a4a"/><ellipse cx="7" cy="8.500" rx="4.200" ry="5.500" fill="{c}"/>',
    corazon: '<path d="M7 13C1 8.500 0.500 4 3.500 2.300c1.700-.8 3.500.5 3.500 2.200 0-1.700 1.800-3 3.500-2.200C13.500 4 13 8.500 7 13z" fill="{c}"/>',
    trebol:  '<path d="M7 7v6.500" stroke="{c}" stroke-width="1.500" fill="none"/><circle cx="7" cy="4" r="3.200" fill="{c}"/><circle cx="4" cy="8" r="3.200" fill="{c}"/><circle cx="10" cy="8" r="3.200" fill="{c}"/>',
    flor:    '<g fill="{c}"><circle cx="7" cy="3.200" r="2.900"/><circle cx="10.800" cy="6" r="2.900"/><circle cx="9.300" cy="10.400" r="2.900"/><circle cx="4.700" cy="10.400" r="2.900"/><circle cx="3.200" cy="6" r="2.900"/></g><circle cx="7" cy="7.200" r="2.300" fill="#ffd166"/>',
    hoja:    '<path d="M7 0.500C12 4 12 9 7 13.500 2 9 2 4 7 0.500z" fill="{c}"/><path d="M7 2v11" stroke="rgba(60,30,10,.45)" stroke-width="0.800" fill="none"/>'
  };
  function comoFondo(ancho, alto, dentro) {
    return 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + ancho + '" height="' + alto +
           '" viewBox="0 0 ' + ancho + ' ' + alto + '">' + dentro + '</svg>') + '")';
  }
  function hacerFranja(f) {          // devuelve { alto, capas: [fondo, fondo que parpadea] }
    var c = f.colores || [], n = c.length, i, s = "", halo = "", paso;
    if (f.tipo === "banderines") {
      paso = 26;
      for (i = 0; i < n; i++) s += '<path d="M' + (i * paso + 2) + ' 2h22l-11 17z" fill="' + c[i] + '" stroke="rgba(0,0,0,.22)" stroke-width="0.800"/>';
      s += '<path d="M0 2h' + (n * paso) + '" stroke="#6b7280" stroke-width="1.200"/>';
      return { alto: 21, capas: [comoFondo(n * paso, 21, s)] };
    }
    if (f.tipo === "colgantes") {
      paso = 34;
      for (i = 0; i < n; i++) {
        s += '<path d="M' + (i * paso) + ' 2Q' + (i * paso + paso / 2) + ' 9 ' + ((i + 1) * paso) + ' 2" fill="none" stroke="#4b5563" stroke-width="1.200"/>';
        s += '<g transform="translate(' + (i * paso + paso / 2 - 7) + ' 5.500)">' + ICONOS[f.icono].replace(/\{c\}/g, c[i]) + '</g>';
        halo += '<circle cx="' + (i * paso + paso / 2) + '" cy="14" r="8.500" fill="' + c[i] + '" opacity=".38"/>';
      }
      return { alto: 24, capas: f.brillo ? [comoFondo(n * paso, 24, s), comoFondo(n * paso, 24, halo)] : [comoFondo(n * paso, 24, s)] };
    }
    if (f.tipo === "papel") {
      paso = 36;
      for (i = 0; i < n; i++) s += '<path fill-rule="evenodd" transform="translate(' + (i * paso + 3) + ' 2)" fill="' + c[i] +
        '" d="M0 0h30v15q-5 6-10 0-5 6-10 0-5 6-10 0zM6 5a2.200 2.200 0 104.400 0 2.200 2.200 0 10-4.400 0zM12.800 9.500a2.200 2.200 0 104.400 0 2.200 2.200 0 10-4.400 0zM19.600 5a2.200 2.200 0 104.400 0 2.200 2.200 0 10-4.400 0z"/>';
      s += '<path d="M0 2h' + (n * paso) + '" stroke="#6b7280" stroke-width="1.200"/>';
      return { alto: 24, capas: [comoFondo(n * paso, 24, s)] };
    }
    if (f.tipo === "alfombra") {      // cenefa como las alfombras de aserrín
      s = '<rect width="48" height="9" fill="#6a1b9a"/><path d="M12 0.800l5 3.700-5 3.700-5-3.700z" fill="#f4c20d"/><path d="M36 0.800l5 3.700-5 3.700-5-3.700z" fill="#f4c20d"/>' +
          '<path d="M24 1.500l3 3-3 3-3-3z" fill="#2e8b57"/><path d="M0 1.500l3 3-3 3z M48 1.500l-3 3 3 3z" fill="#d62828"/><rect y="9" width="48" height="1.500" fill="#f4c20d"/>';
      return { alto: 10.5, capas: [comoFondo(48, 10.5, s)] };
    }
    return null;
  }

  function primero(lista) {
    for (var i = 0; i < (lista || []).length; i++) {
      try { var el = document.querySelector(lista[i]); if (el) return el; } catch (x) {}
    }
    return null;
  }

  function ponerFranja(t) {
    var cab = primero(FESTIVO.encabezados);
    if (!cab) return null;
    var pos = getComputedStyle(cab).position;
    if (pos === "static") {
      var antes = cab.style.position; cab.style.position = "relative";
      puestos.push({ deshacer: function () { cab.style.position = antes; } });
    }
    if (!t.franja || !FESTIVO.mostrar.franja) return cab;
    var f = hacerFranja(t.franja);
    if (!f) return cab;
    var caja = document.createElement("div");
    caja.className = "festivo-franja-caja"; caja.setAttribute("aria-hidden", "true");
    caja.style.cssText = "position:absolute;left:0;right:0;top:100%;height:" + f.alto + "px;pointer-events:none;transition:opacity .35s;";
    f.capas.forEach(function (fondo, i) {
      var d = document.createElement("div");
      d.className = "festivo-franja";
      d.style.cssText = "position:absolute;left:0;right:0;top:0;height:100%;pointer-events:none;background:" + fondo +
                        " repeat-x center top;" + (i === 1 && !quieto ? "animation:festivo-parpadeo 2.6s ease-in-out infinite;" : "");
      caja.appendChild(d);
    });
    agregar(caja, cab);
    // Si el encabezado no es fijo (páginas de producto), el contenido baja lo que mide la guirnalda para no taparlo.
    if (pos !== "fixed") {
      var mb = cab.style.marginBottom;
      cab.style.marginBottom = ((parseFloat(getComputedStyle(cab).marginBottom) || 0) + f.alto) + "px";
      puestos.push({ deshacer: function () { cab.style.marginBottom = mb; } });
    }
    // Al bajar por la página la guirnalda se desvanece: no pasa por encima de productos ni precios.
    function alDesplazar() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      caja.style.opacity = y > 60 ? "0" : "1";
    }
    window.addEventListener("scroll", alDesplazar, { passive: true });
    puestos.push({ deshacer: function () { window.removeEventListener("scroll", alDesplazar); } });
    alDesplazar();
    return cab;
  }

  /* ══════════ 3 y 4. Animación de bienvenida y saludo ══════════ */

  function hacerBrillo() {           // mancha de luz para las brasas (se dibuja una sola vez)
    var c = document.createElement("canvas"); c.width = c.height = 64;
    var x = c.getContext("2d"), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.25, "rgba(255,255,255,.75)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return c;
  }
  function luzDeColor(color) {       // la mancha de luz teñida del color de la brasa
    var c = document.createElement("canvas"); c.width = c.height = 64;
    var x = c.getContext("2d");
    x.drawImage(brillo, 0, 0);
    x.globalCompositeOperation = "source-in"; x.fillStyle = color; x.fillRect(0, 0, 64, 64);
    return c;
  }
  var BORDE_BLANCO = "rgba(110,160,215,.75)";   // contorno para que lo blanco se vea sobre fondo claro

  var DIBUJAR = {
    copo: function (p) {
      ctx.beginPath(); ctx.arc(0, 0, p.t, 0, 6.283);
      ctx.fillStyle = "#fff"; ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = BORDE_BLANCO; ctx.stroke();
    },
    estrella: function (p) {           // destello de cuatro puntas que titila
      var r = p.t * (0.75 + 0.25 * Math.sin(p.giro * 1.3)), c = r * 0.22;
      ctx.rotate(p.rot * 0.2);
      ctx.beginPath();
      ctx.moveTo(0, -r); ctx.quadraticCurveTo(c, -c, r, 0); ctx.quadraticCurveTo(c, c, 0, r);
      ctx.quadraticCurveTo(-c, c, -r, 0); ctx.quadraticCurveTo(-c, -c, 0, -r);
      ctx.fillStyle = p.c; ctx.fill();
      if (p.c === "#ffffff") { ctx.lineWidth = 1; ctx.strokeStyle = BORDE_BLANCO; ctx.stroke(); }
    },
    confeti: function (p) {
      ctx.rotate(p.rot);
      var ancho = p.t * Math.abs(Math.cos(p.giro)) + 1;      // parece voltearse en el aire
      ctx.fillStyle = p.c; ctx.fillRect(-ancho / 2, -p.t * 0.3, ancho, p.t * 0.6);
      if (p.c === "#ffffff") { ctx.lineWidth = 1; ctx.strokeStyle = BORDE_BLANCO; ctx.strokeRect(-ancho / 2, -p.t * 0.3, ancho, p.t * 0.6); }
    },
    petalo: function (p) {
      ctx.rotate(p.rot);
      ctx.beginPath(); ctx.ellipse(0, 0, p.t, p.t * 0.5 * (0.35 + 0.65 * Math.abs(Math.cos(p.giro))), 0, 0, 6.283);
      ctx.fillStyle = p.c; ctx.fill();
    },
    corazon: function (p) {
      var s = p.t / 16;
      ctx.rotate(Math.sin(p.fase) * 0.25); ctx.scale(s, s);
      ctx.beginPath(); ctx.moveTo(0, 6);
      ctx.bezierCurveTo(-14, -4, -8, -16, 0, -8);
      ctx.bezierCurveTo(8, -16, 14, -4, 0, 6);
      ctx.fillStyle = p.c; ctx.fill();
    },
    globo: function (p) {
      ctx.rotate(Math.sin(p.fase) * 0.12);
      ctx.beginPath(); ctx.moveTo(0, p.t * 1.2);
      ctx.quadraticCurveTo(p.t * 0.35, p.t * 2, 0, p.t * 2.9);
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(90,90,90,.55)"; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 0, p.t * 0.85, p.t * 1.1, 0, 0, 6.283);
      ctx.fillStyle = p.c; ctx.fill();
      ctx.beginPath(); ctx.moveTo(-3, p.t * 1.08); ctx.lineTo(3, p.t * 1.08); ctx.lineTo(0, p.t * 1.3); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-p.t * 0.3, -p.t * 0.4, p.t * 0.16, p.t * 0.3, 0.5, 0, 6.283);
      ctx.fillStyle = "rgba(255,255,255,.45)"; ctx.fill();
    },
    barrilete: function (p) {          // barrilete redondo de gajos, como los de Sumpango y Santiago
      ctx.rotate(Math.sin(p.fase) * 0.18);
      ctx.beginPath(); ctx.moveTo(0, p.t);                     // cola
      ctx.bezierCurveTo(p.t * 0.5, p.t * 1.7, -p.t * 0.5, p.t * 2.3, 0, p.t * 3);
      ctx.lineWidth = 2; ctx.strokeStyle = p.c; ctx.stroke();
      var lados = 8, i, a;
      for (i = 0; i < lados; i++) {                            // gajos de colores
        a = i * 6.283 / lados;
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * p.t, Math.sin(a) * p.t);
        ctx.lineTo(Math.cos(a + 6.283 / lados) * p.t, Math.sin(a + 6.283 / lados) * p.t);
        ctx.closePath(); ctx.fillStyle = p.gajos[i % p.gajos.length]; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(0, 0, p.t * 0.38, 0, 6.283); ctx.fillStyle = "#fff"; ctx.fill();
      ctx.beginPath(); ctx.arc(0, 0, p.t * 0.2, 0, 6.283); ctx.fillStyle = p.c; ctx.fill();
    },
    trebol: function (p) {
      ctx.rotate(Math.sin(p.fase) * 0.5 + p.rot * 0.15);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(p.t * 0.25, p.t * 0.6, p.t * 0.05, p.t * 1.15);
      ctx.lineWidth = Math.max(1.5, p.t * 0.13); ctx.strokeStyle = p.c; ctx.lineCap = "round"; ctx.stroke();
      ctx.fillStyle = p.c;
      for (var i = 0; i < 3; i++) {
        var a = -1.5708 + i * 2.0944;
        ctx.beginPath(); ctx.arc(Math.cos(a) * p.t * 0.46, Math.sin(a) * p.t * 0.46, p.t * 0.46, 0, 6.283); ctx.fill();
      }
    },
    hoja: function (p) {
      ctx.rotate(p.rot);
      var ancho = p.t * 0.55 * (0.35 + 0.65 * Math.abs(Math.cos(p.giro)));
      ctx.beginPath(); ctx.moveTo(-p.t, 0);
      ctx.quadraticCurveTo(0, -ancho * 1.7, p.t, 0);
      ctx.quadraticCurveTo(0, ancho * 1.7, -p.t, 0);
      ctx.fillStyle = p.c; ctx.fill();
      ctx.beginPath(); ctx.moveTo(-p.t * 1.25, 0); ctx.lineTo(p.t * 0.8, 0);
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(70,35,10,.5)"; ctx.stroke();
    },
    etiqueta: function (p) {            // etiqueta de oferta con "%"
      ctx.rotate(Math.sin(p.fase) * 0.45);
      var w = p.t * 1.7, h = p.t, r = h * 0.22, claro = p.c !== "#111111";
      ctx.beginPath();
      ctx.moveTo(-w / 2 + r, -h / 2); ctx.lineTo(w / 2 - r, -h / 2); ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      ctx.lineTo(w / 2, h / 2 - r); ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      ctx.lineTo(-w / 2 + r, h / 2); ctx.lineTo(-w / 2 - h * 0.4, 0); ctx.closePath();
      ctx.fillStyle = p.c; ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = "#f4c20d"; ctx.stroke();
      ctx.beginPath(); ctx.arc(-w / 2 + h * 0.08, 0, h * 0.1, 0, 6.283); ctx.fillStyle = claro ? "#111111" : "#f4c20d"; ctx.fill();
      ctx.font = "800 " + Math.round(h * 0.78) + "px Arial, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("%", w * 0.08, h * 0.04);
    },
    brasa: function (p, gen) {
      var vida = Math.max(0, Math.min(1, p.y / H));           // se apaga al subir
      ctx.globalAlpha = p.alfa * vida * gen;
      var r = p.t * (0.5 + vida);
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(0, 0, r * 0.22, 0, 6.283); ctx.fill();
      ctx.globalAlpha = p.alfa * vida * 0.9 * gen;
      ctx.drawImage(p.luz, -r, -r, r * 2, r * 2);
    }
  };

  function nueva(t, alInicio) {
    var sube = t.mov === "subir", tam = azar(t.tam[0], t.tam[1]);
    var p = {
      x: azar(0, W), t: tam, c: elegir(t.colores),
      vy: azar(t.vel[0], t.vel[1]) * (sube ? -1 : 1),
      fase: azar(0, 6.283), vaiven: azar(0.6, 1.6), ancho: azar(10, 38),
      rot: azar(0, 6.283), vrot: azar(-1.5, 1.5), giro: azar(0, 6.283), vgiro: azar(2, 5),
      alfa: azar(0.65, 1)
    };
    var margen = tam * 4;
    p.y = alInicio ? azar(0, H) : (sube ? H + margen : -margen);
    if (t.forma === "barrilete") { p.gajos = [elegir(t.colores), elegir(t.colores), elegir(t.colores)]; p.alfa = 0.95; }
    if (t.forma === "brasa") { p.luz = t.luces[p.c]; p.ancho = azar(6, 22); if (alInicio) p.y = azar(H * 0.45, H); }
    return p;
  }
  function cuantas(t) {
    var area = Math.max(0.45, Math.min(1.6, (W * H) / (1366 * 768)));
    var movil = W < 700 ? 0.6 : 1;
    return Math.max(4, Math.round(t.n * area * movil * (FESTIVO.intensidad || 1)));
  }
  function pasoParticulas(t, dt, gen) {
    var total = cuantas(t), i, p;
    while (parts.length < total) parts.push(nueva(t, true));
    if (parts.length > total) parts.length = total;
    var pinta = DIBUJAR[t.forma];
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      p.fase += p.vaiven * dt; p.rot += p.vrot * dt; p.giro += p.vgiro * dt;
      p.y += p.vy * dt; p.x += Math.cos(p.fase) * p.ancho * dt;
      var m = p.t * 4;
      if (p.y > H + m || p.y < -m || p.x < -m * 2 || p.x > W + m * 2) { parts[i] = p = nueva(t, false); }
      ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = p.alfa * gen;
      pinta(p, gen);
      ctx.restore();
    }
  }
  function pasoResplandor(ahora, gen) {   // brillo de fogata en el borde de abajo
    var alto = Math.min(190, H * 0.28), fuerza = (0.2 + 0.06 * Math.sin(ahora / 180) + 0.04 * Math.sin(ahora / 67)) * gen;
    var g = ctx.createLinearGradient(0, H, 0, H - alto);
    g.addColorStop(0, "rgba(255,90,0," + fuerza.toFixed(3) + ")");
    g.addColorStop(0.5, "rgba(255,150,0," + (fuerza * 0.4).toFixed(3) + ")");
    g.addColorStop(1, "rgba(255,170,0,0)");
    ctx.fillStyle = g; ctx.fillRect(0, H - alto, W, alto);
  }
  function pasoFuegos(t, ahora, dt, gen) {
    var i, c;
    if (ahora > proximoFuego && gen >= 1) {
      var movil = W < 700, cx = azar(W * 0.1, W * 0.9), cy = azar(H * 0.12, H * 0.5), color = elegir(t.colores);
      var n = Math.round((movil ? 26 : 44) * Math.min(1.5, FESTIVO.intensidad || 1)), fuerza = azar(120, 230);
      for (i = 0; i < n; i++) {
        var a = (i / n) * 6.283 + azar(-0.1, 0.1), v = fuerza * azar(0.55, 1);
        chispas.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 1, dura: azar(0.9, 1.5), c: color });
      }
      proximoFuego = ahora + azar(450, 1100) / Math.max(0.5, FESTIVO.intensidad || 1);
    }
    ctx.lineCap = "round";
    for (i = chispas.length - 1; i >= 0; i--) {
      c = chispas[i];
      var x0 = c.x, y0 = c.y;
      c.vx *= (1 - 1.6 * dt); c.vy = c.vy * (1 - 1.6 * dt) + 90 * dt;
      c.x += c.vx * dt; c.y += c.vy * dt; c.vida -= dt / c.dura;
      if (c.vida <= 0) { chispas.splice(i, 1); continue; }
      ctx.globalAlpha = Math.min(1, c.vida * 1.4) * gen;
      ctx.strokeStyle = c.c; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x0 - c.vx * 0.05, y0 - c.vy * 0.05); ctx.lineTo(c.x, c.y); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function medir() {
    if (!lienzo) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  var DESVANECER = 1500;   // milisegundos que tarda en irse la animación
  function ciclo(ahora) {
    if (!lienzo) return;
    var paso = ahora - inicioAnim, gen = 1;
    if (duraAnim > 0 && paso > duraAnim) gen = 1 - (paso - duraAnim) / DESVANECER;
    if (gen <= 0) { terminarAnimacion(); return; }
    cuadro = requestAnimationFrame(ciclo);
    var dt = Math.min(0.05, (ahora - ultimo) / 1000 || 0.016); ultimo = ahora;
    var t = TEMAS[activo];
    ctx.clearRect(0, 0, W, H);
    if (t.resplandor) pasoResplandor(ahora, gen);
    if (t.mov === "fuegos") pasoFuegos(t, ahora, dt, gen); else pasoParticulas(t, dt, gen);
  }
  function alCambiarVisibilidad() {  // pestaña oculta: no gasta batería
    if (!lienzo) return;
    cancelAnimationFrame(cuadro);
    if (!document.hidden) { ultimo = performance.now(); cuadro = requestAnimationFrame(ciclo); }
  }
  function terminarAnimacion() {
    cancelAnimationFrame(cuadro);
    if (lienzo && lienzo.parentNode) lienzo.parentNode.removeChild(lienzo);
    lienzo = ctx = null; parts = []; chispas = [];
    document.removeEventListener("visibilitychange", alCambiarVisibilidad);
  }

  function ponerAnimacion(t) {
    if (!t.mov || !FESTIVO.mostrar.animacion || quieto) return false;
    lienzo = document.createElement("canvas");
    lienzo.id = "festivo-lienzo"; lienzo.setAttribute("aria-hidden", "true");
    // Encima del contenido, debajo del encabezado, menús y ventanas. No estorba los clics.
    lienzo.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:993;";
    ctx = lienzo.getContext("2d");
    if (!ctx) { lienzo = null; return false; }
    if (t.forma === "brasa" && !t.luces) {
      brillo = brillo || hacerBrillo(); t.luces = {};
      t.colores.forEach(function (c) { t.luces[c] = luzDeColor(c); });
    }
    document.body.appendChild(lienzo);
    medir();
    inicioAnim = ultimo = performance.now(); proximoFuego = 0;
    duraAnim = Math.max(0, (FESTIVO.bienvenida.segundos || 0) * 1000);   // 0 = no se quita
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    if (!document.hidden) cuadro = requestAnimationFrame(ciclo);
    return true;
  }

  function ponerSaludo(t, cab) {
    if (!t.saludo || !FESTIVO.mostrar.saludo || !cab) return;
    var s = document.createElement("div");
    s.className = "festivo-saludo"; s.setAttribute("role", "status"); s.textContent = t.saludo;
    s.style.cssText = "position:absolute;left:50%;top:calc(100% + 7px);transform:translateX(-50%);pointer-events:none;white-space:nowrap;" +
      "font:700 13px/1 system-ui,'Segoe UI',Roboto,Arial,sans-serif;letter-spacing:.01em;padding:7px 14px;border-radius:999px;" +
      "background:#fff;color:" + (t.color || T) + ";border:1.5px solid " + (t.color || T) + ";box-shadow:0 3px 10px rgba(0,0,0,.12);" +
      "max-width:92vw;overflow:hidden;text-overflow:ellipsis;z-index:2;" + (quieto ? "" : "animation:festivo-saludo 9.5s ease forwards;");
    agregar(s, cab);
    var seg = Math.max(3, FESTIVO.bienvenida.segundos || 8);
    s.style.animationDuration = (seg + 1.5) + "s";
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, (seg + 1.6) * 1000);
  }

  /* ══════════ poner y quitar ══════════ */

  function alRedimensionar() { medir(); recolocar.forEach(function (f) { try { f(); } catch (x) {} }); }

  function quitar() {
    terminarAnimacion();
    puestos.forEach(function (p) {
      if (p.deshacer) p.deshacer(); else if (p.parentNode) p.parentNode.removeChild(p);
    });
    puestos = []; recolocar = [];
    if (activo) document.documentElement.classList.remove("festivo", "festivo-" + activo);
    activo = null;
    window.removeEventListener("resize", alRedimensionar);
    window.removeEventListener("load", alRedimensionar);
  }

  function esInicio() {
    return !!document.getElementById("page-header") && !/[?&](cat|sub|q|ver)=/.test(location.search);
  }

  // opciones.bienvenida: true = mostrarla siempre · false = nunca · sin indicar = según la configuración
  function poner(tema, opciones) {
    tema = normal(tema); opciones = opciones || {};
    quitar();
    var t = TEMAS[tema];
    if (!t || !document.body) return false;
    activo = tema;
    quieto = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    document.documentElement.classList.add("festivo", "festivo-" + tema);

    var est = document.createElement("style");
    est.textContent = "@keyframes festivo-parpadeo{0%,100%{opacity:.15}50%{opacity:1}}" +
      "@keyframes festivo-saludo{0%{opacity:0;margin-top:-8px}6%{opacity:1;margin-top:0}86%{opacity:1}100%{opacity:0}}";
    agregar(est, document.head || document.body);

    var cab = null;
    try { cab = ponerFranja(t); } catch (x) {}
    try { ponerAccesorios(t); } catch (x) {}

    var b = FESTIVO.bienvenida, dar = opciones.bienvenida;
    if (dar === undefined) {
      dar = !b.soloEnInicio || esInicio();
      if (dar && b.unaVezPorVisita) {
        try {
          if (sessionStorage.getItem("festivo-visto") === tema) dar = false;
          else sessionStorage.setItem("festivo-visto", tema);
        } catch (x) {}
      }
    }
    if (dar) {
      try { ponerAnimacion(t); } catch (x) {}
      try { ponerSaludo(t, cab); } catch (x) {}
    }
    window.addEventListener("resize", alRedimensionar);
    window.addEventListener("load", alRedimensionar);
    setTimeout(alRedimensionar, 600); setTimeout(alRedimensionar, 2500);   // por si el logo terminó de cargar después
    return true;
  }

  function iniciar() {
    var r = decidir();
    if (r.tema === "apagado") return;
    poner(r.tema, r.forzado ? { bienvenida: true } : {});
  }

  // Para probar desde la consola del navegador:  Festivo.poner("diablo", { bienvenida: true })  ·  Festivo.quitar()
  window.Festivo = { poner: poner, quitar: quitar, temas: Object.keys(TEMAS), temaDeHoy: temaDeHoy,
                     actual: function () { return activo; } };

  try {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
    else iniciar();
  } catch (x) { /* un adorno nunca debe romper la tienda */ }
})();
