/* ══════════════════════════════════════════════════════════════════════════
   festivo.js — adornos animados según las fechas festivas de Guatemala
   ══════════════════════════════════════════════════════════════════════════
   LO ÚNICO QUE NECESITAS CAMBIAR ES  modo  (aquí abajo):

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
   También puedes cambiarlo sin abrir este archivo: PanelFestivo\AbrirPanel.bat
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var FESTIVO = {
    modo: "navidad",

    // Cantidad de adornos: 1 = normal · 0.5 = la mitad · 2 = el doble
    intensidad: 1,

    // Calendario del modo "auto". Fechas en formato "mes-día" (hora de Guatemala).
    // Si dos se cruzan, gana el que está más arriba. Puedes cambiar fechas, borrar líneas o agregar.
    // Fechas que se calculan solas cada año: "pascua", "ramos" (Semana Santa) y
    // "gracias" (Thanksgiving, 4.º jueves de noviembre). Aceptan días de más o de menos: "gracias-6".
    calendario: [
      { tema: "anio-nuevo",    desde: "12-31", hasta: "01-01" },  // fuegos artificiales
      { tema: "diablo",        desde: "12-05", hasta: "12-07" },  // Quema del Diablo: fuego y chispas
      { tema: "navidad",       desde: "12-08", hasta: "12-30" },  // nieve
      { tema: "carino",        desde: "02-07", hasta: "02-14" },  // Día del Cariño: corazones
      { tema: "san-patricio",  desde: "03-15", hasta: "03-17" },  // San Patricio: tréboles
      { tema: "semana-santa",  desde: "ramos", hasta: "pascua" }, // pétalos con colores de alfombra
      { tema: "madre",         desde: "05-03", hasta: "05-10" },  // Día de la Madre: pétalos
      { tema: "padre",         desde: "06-14", hasta: "06-17" },  // Día del Padre: confeti sobrio
      { tema: "independencia", desde: "09-01", hasta: "09-15" },  // confeti azul y blanco
      { tema: "nino",          desde: "09-28", hasta: "10-01" },  // Día del Niño: globos
      { tema: "santos",        desde: "10-28", hasta: "11-02" },  // Todos los Santos: barriletes
      { tema: "black-october", desde: "10-01", hasta: "10-31" },  // Black October: etiquetas negro y dorado
      { tema: "thanksgiving",  desde: "gracias-6", hasta: "gracias" } // Thanksgiving: hojas de otoño
    ]
  };

  /* ── Temas: qué se dibuja en cada uno (colores y cantidades se pueden ajustar) ── */
  var TEMAS = {
    "navidad":       { mov: "caer",   forma: "copo",      n: 80, tam: [2.5, 6],  vel: [25, 70],  colores: ["#ffffff"] },
    "diablo":        { mov: "subir",  forma: "brasa",     n: 110, tam: [8, 20], vel: [60, 170], colores: ["#ffb020", "#ff6a00", "#ff3d00", "#ffd36b"], resplandor: true },
    "anio-nuevo":    { mov: "fuegos",                                                           colores: ["#e63946", "#f4a100", "#2a9d8f", "#3a86ff", "#c05cff", "#ff5fa2"] },
    "carino":        { mov: "subir",  forma: "corazon",   n: 26, tam: [10, 22], vel: [25, 60],  colores: ["#e63946", "#ff6b81", "#ff9eb5"] },
    "semana-santa":  { mov: "caer",   forma: "petalo",    n: 45, tam: [6, 11],  vel: [25, 55],  colores: ["#6a1b9a", "#8e44ad", "#f4c20d", "#d62828", "#2e8b57"] },
    "madre":         { mov: "caer",   forma: "petalo",    n: 40, tam: [6, 12],  vel: [22, 50],  colores: ["#ff8fab", "#ffb3c6", "#fb6f92", "#ffc2d1"] },
    "padre":         { mov: "caer",   forma: "confeti",   n: 28, tam: [5, 9],   vel: [30, 70],  colores: ["#1d4e89", "#3a7ca5", "#d4a017"] },
    "independencia": { mov: "caer",   forma: "confeti",   n: 70, tam: [6, 11],  vel: [35, 90],  colores: ["#4997d0", "#ffffff", "#4997d0"] },
    "nino":          { mov: "subir",  forma: "globo",     n: 16, tam: [15, 24], vel: [30, 65],  colores: ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#9b5de5"] },
    "santos":        { mov: "subir",  forma: "barrilete", n: 9,  tam: [24, 40], vel: [12, 28],  colores: ["#e63946", "#f4a100", "#2a9d8f", "#3a86ff", "#c05cff", "#ffd166"] },
    "san-patricio":  { mov: "caer",   forma: "trebol",    n: 34, tam: [9, 17],  vel: [25, 60],  colores: ["#1b8a3a", "#2fa84f", "#0b6b2b", "#57c26f"] },
    "black-october": { mov: "caer",   forma: "etiqueta",  n: 24, tam: [13, 21], vel: [30, 70],  colores: ["#111111", "#111111", "#f4c20d"] },
    "thanksgiving":  { mov: "caer",   forma: "hoja",      n: 38, tam: [10, 18], vel: [28, 65],  colores: ["#d35400", "#e67e22", "#c0392b", "#f1c40f", "#8e5a2b"] }
  };
  // Otros nombres que también se aceptan en  modo  y en  ?festivo=
  var ALIAS = { "nieve": "navidad", "fuego": "diablo", "quema": "diablo", "fuegos": "anio-nuevo", "ano-nuevo": "anio-nuevo",
                "corazones": "carino", "amor": "carino", "patrias": "independencia", "globos": "nino", "barriletes": "santos",
                "san-patrick": "san-patricio", "st-patrick": "san-patricio", "patricio": "san-patricio", "treboles": "san-patricio",
                "black": "black-october", "blackoctober": "black-october", "black-octubre": "black-october",
                "accion-de-gracias": "thanksgiving", "gracias": "thanksgiving", "thanksgiving-day": "thanksgiving",
                "off": "apagado", "no": "apagado", "original": "apagado" };

  /* ══════════ De aquí para abajo no hace falta tocar nada ══════════ */

  var lienzo = null, ctx = null, cuadro = 0, activo = null, parts = [], chispas = [];
  var W = 0, H = 0, ultimo = 0, proximoFuego = 0, brillo = null;

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

  /* ── dibujo de cada forma ── */
  function hacerBrillo() {           // mancha de luz para las brasas (se dibuja una sola vez)
    var c = document.createElement("canvas"); c.width = c.height = 64;
    var x = c.getContext("2d"), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.25, "rgba(255,255,255,.75)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return c;
  }
  var BORDE_BLANCO = "rgba(110,160,215,.75)";   // contorno para que lo blanco se vea sobre fondo claro

  var DIBUJAR = {
    copo: function (p) {
      ctx.beginPath(); ctx.arc(0, 0, p.t, 0, 6.283);
      ctx.fillStyle = "#fff"; ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = BORDE_BLANCO; ctx.stroke();
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
    brasa: function (p) {
      var vida = Math.max(0, Math.min(1, p.y / H));           // se apaga al subir
      ctx.globalAlpha = p.alfa * vida;
      var r = p.t * (0.5 + vida);
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(0, 0, r * 0.22, 0, 6.283); ctx.fill();
      ctx.globalAlpha = p.alfa * vida * 0.9;
      ctx.drawImage(p.luz, -r, -r, r * 2, r * 2);
    }
  };

  function luzDeColor(color) {       // la mancha de luz teñida del color de la brasa
    var c = document.createElement("canvas"); c.width = c.height = 64;
    var x = c.getContext("2d");
    x.drawImage(brillo, 0, 0);
    x.globalCompositeOperation = "source-in"; x.fillStyle = color; x.fillRect(0, 0, 64, 64);
    return c;
  }

  /* ── partículas ── */
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

  function pasoParticulas(t, dt) {
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
      ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = p.alfa;
      pinta(p);
      ctx.restore();
    }
  }

  function pasoResplandor(ahora) {   // brillo de fogata en el borde de abajo
    var alto = Math.min(190, H * 0.28), fuerza = 0.2 + 0.06 * Math.sin(ahora / 180) + 0.04 * Math.sin(ahora / 67);
    var g = ctx.createLinearGradient(0, H, 0, H - alto);
    g.addColorStop(0, "rgba(255,90,0," + fuerza.toFixed(3) + ")");
    g.addColorStop(0.5, "rgba(255,150,0," + (fuerza * 0.4).toFixed(3) + ")");
    g.addColorStop(1, "rgba(255,170,0,0)");
    ctx.fillStyle = g; ctx.fillRect(0, H - alto, W, alto);
  }

  function pasoFuegos(t, ahora, dt) {
    var i, c;
    if (ahora > proximoFuego) {
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
      ctx.globalAlpha = Math.min(1, c.vida * 1.4);
      ctx.strokeStyle = c.c; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x0 - c.vx * 0.05, y0 - c.vy * 0.05); ctx.lineTo(c.x, c.y); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* ── ciclo de animación ── */
  function medir() {
    if (!lienzo) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function ciclo(ahora) {
    if (!activo) return;
    cuadro = requestAnimationFrame(ciclo);
    var dt = Math.min(0.05, (ahora - ultimo) / 1000 || 0.016); ultimo = ahora;
    var t = TEMAS[activo];
    ctx.clearRect(0, 0, W, H);
    if (t.resplandor) pasoResplandor(ahora);
    if (t.mov === "fuegos") pasoFuegos(t, ahora, dt); else pasoParticulas(t, dt);
  }
  function alCambiarVisibilidad() {  // pestaña oculta: no gasta batería
    if (!activo) return;
    cancelAnimationFrame(cuadro);
    if (!document.hidden) { ultimo = performance.now(); cuadro = requestAnimationFrame(ciclo); }
  }

  function quitar() {
    cancelAnimationFrame(cuadro);
    if (activo) document.documentElement.classList.remove("festivo", "festivo-" + activo);
    activo = null; parts = []; chispas = [];
    if (lienzo && lienzo.parentNode) lienzo.parentNode.removeChild(lienzo);
    lienzo = ctx = null;
    window.removeEventListener("resize", medir);
    document.removeEventListener("visibilitychange", alCambiarVisibilidad);
  }

  function poner(tema) {
    tema = normal(tema);
    quitar();
    var t = TEMAS[tema];
    if (!t || !document.body) return false;
    lienzo = document.createElement("canvas");
    lienzo.id = "festivo-lienzo";
    lienzo.setAttribute("aria-hidden", "true");
    // Encima del contenido, debajo del encabezado, menús y ventanas. No estorba los clics.
    lienzo.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:993;";
    ctx = lienzo.getContext("2d");
    if (!ctx) { lienzo = null; return false; }
    if (t.forma === "brasa" && !t.luces) {
      brillo = brillo || hacerBrillo(); t.luces = {};
      t.colores.forEach(function (c) { t.luces[c] = luzDeColor(c); });
    }
    document.body.appendChild(lienzo);
    activo = tema;
    document.documentElement.classList.add("festivo", "festivo-" + tema);
    medir(); ultimo = performance.now(); proximoFuego = 0;
    window.addEventListener("resize", medir);
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    if (!document.hidden) cuadro = requestAnimationFrame(ciclo);
    return true;
  }

  function iniciar() {
    var r = decidir();
    if (r.tema === "apagado") return;
    // Respeta a quien pidió "reducir movimiento" en su sistema (salvo que estés probando con ?festivo=)
    var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto && !r.forzado) return;
    poner(r.tema);
  }

  // Para probar desde la consola del navegador:  Festivo.poner("diablo")  ·  Festivo.quitar()
  window.Festivo = { poner: poner, quitar: quitar, temas: Object.keys(TEMAS), temaDeHoy: temaDeHoy,
                     actual: function () { return activo; } };

  try {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
    else iniciar();
  } catch (x) { /* un adorno nunca debe romper la tienda */ }
})();
