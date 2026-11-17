const CONFIG = {
      nombreNegocio: "Miika",
      tituloPagina: "Miika | Artículos para cocinas, restaurantes, hoteles y bares en Guatemala",
      eslogan: "Soluciones inteligentes y bonitas para tu cocina y tu negocio",
      metaDescripcion: "Miika: utensilios, cristalería, vajilla, desechables, repostería, café y bar para tu cocina o negocio en Guatemala. Entrega en 24 h en la capital, envíos a todo el país y pago contra entrega.",
      copyright: "© 2026",
      developer: "Puzzle Solutions",
      ubicacion: "Ciudad de Guatemala, GT",
      telefonoWhatsApp: "50253410701",
      email: "",   // v9: correo de ventas de Miika. Vacío = no se muestra.
      mensajeWhatsApp: "Hola Miika, deseo más información sobre los productos del catálogo.", 
      simboloMoneda: "Q",
      logoImg: "img/Miika-300.webp",
      seoImage: "https://miika.rompecabezas.online/img/og-miika.jpg",
      urlSitio: "https://miika.rompecabezas.online/",   // v9: base para la etiqueta canonical de cada categoría
      // v10: marcas y siglas que se escriben siempre igual en los nombres (el resto va en "tipo oración")
      marcas: ["Lifetime", "Oster", "Novus", "Aurora", "Bolero", "Alter", "Natividad", "Chemex", "Best", "Whip", "Cambro", "Libbey", "Vollrath", "Miika"],
      siglas: ["NSF", "PP", "PET", "PS", "GN", "BPA", "FIFO", "IPA", "LED", "V60"],
      // v9: ícono del menú lateral según palabras del nombre de la categoría (gana la primera que coincida).
      // Íconos disponibles: https://icons.getbootstrap.com  — si ninguna coincide se usa "iconoCategoriaDefault".
      iconosCategorias: [
        { palabras: ["UTENSILIOS"], icono: "bi-egg-fried" },
        { palabras: ["CRISTALERIA"], icono: "bi-cup-straw" },
        { palabras: ["SOBREMESA"], icono: "bi-cup-hot" },
        { palabras: ["DESECHABLES"], icono: "bi-recycle" },
        { palabras: ["CATERING"], icono: "bi-fire" },
        { palabras: ["REPOSTERIA"], icono: "bi-cake2" },
        { palabras: ["BAR"], icono: "bi-cup" },
        { palabras: ["CAFE"], icono: "bi-cup-hot-fill" },
        { palabras: ["CONTENEDORES"], icono: "bi-box-seam" },
        { palabras: ["ORGANIZACION"], icono: "bi-boxes" },
        { palabras: ["LIQUIDACION"], icono: "bi-percent" },
        { palabras: ["DISTRIBUIDORES"], icono: "bi-patch-check" },
        { palabras: ["LIMPIEZA"], icono: "bi-droplet" },
        { palabras: ["SERVICIO"], icono: "bi-person-badge" },
        { palabras: ["DISPENSADORES"], icono: "bi-funnel" },
        { palabras: ["NUEVOS"], icono: "bi-stars" }
      ],
      iconoCategoriaDefault: "bi-tag-fill",
      // v9: productos frágiles. En este Sheet la columna L es "precio_tienda", por eso "columnaFragil" es null
      // (no se lee ninguna columna) y se detecta solo por estas palabras en el nombre del producto.
      columnaFragil: null,
      palabrasFragil: ["VIDRIO", "CRISTAL", "CERAMICA", "PORCELANA", "ESPEJO"],
      faviconImg: "/favicon.ico?v=2",
      headerBar: {
        habilitado: true,
        logo: "img/Miika-300.webp",
        alt: "Logo Miika",
        titulo: "Catálogo de Productos Miika",
        subtitulo: "Artículos para cocinas, restaurantes, hoteles y bares en Guatemala"
      },
      csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT80KNCGOzydQ0Ww5eSsr_XgI9yr8tX6ZaTluaaRkdiJat5pqSiussvAJCzwKNQykwTzIrJkrHynfqb/pub?output=csv",
      colores: {
        primario: "var(--primary)",
        primarioOscuro: "var(--primary-dark)",
        acento: "var(--accent)",
        highlight: "var(--highlight)",
        fondoGradiente: "var(--fondo-gradiente)"
      },
      redesSociales: [
        // Agrega las redes de Miika cuando existan (no dejar "#": son enlaces rotos para Google y el cliente):
        // { icon: "bi-facebook", url: "https://www.facebook.com/...", label: "Facebook" },
        // { icon: "bi-instagram", url: "https://www.instagram.com/...", label: "Instagram" },
        // { icon: "bi-tiktok", url: "https://www.tiktok.com/@...", label: "TikTok" }
      ],
      // v9.2: PORTADA DINÁMICA. Se arma sola con las categorías reales del Google Sheet: cada diapositiva muestra
      // 3 fotos de productos disponibles de una categoría, y en cada visita del cliente aparecen categorías
      // diferentes (rotan en orden hasta pasar por todas). Si agregas o cambias categorías en el Sheet,
      // la portada se ajusta sola; no hay enlaces que se rompan.
      //   textos: frase según palabras del nombre de la categoría. Variables: {categoria} {disponibles} {precio}
      //   excluir: categorías que nunca deben salir en la portada
      portada: {
        dinamica: true,
        segundos: 5,
        cantidadDiapositivas: 4,
        // principales: la 1ª diapositiva rota entre estas categorías (vacío = las 3 más grandes)
        principales: ["utensilios", "cristaleria", "sobremesa", "reposteria"],
        excluir: [],
        textos: [
          { palabras: ["UTENSILIOS"], titulo: "Utensilios para cocinar mejor", desc: "Ollas, sartenes, coladores y más · desde {precio}" },
          { palabras: ["CRISTALERIA"], titulo: "Cristalería para tu mesa y tu bar", desc: "Copas, vasos y tarros · desde {precio}" },
          { palabras: ["SOBREMESA"], titulo: "Vajilla que se ve bonita", desc: "Platos, bowls y cubiertos · desde {precio}" },
          { palabras: ["REPOSTERIA"], titulo: "Todo para repostería", desc: "Moldes, batidores y decoración · desde {precio}" },
          { palabras: ["CAFE"], titulo: "Café y té como en cafetería", desc: "Tazas, métodos de extracción y accesorios · desde {precio}" },
          { palabras: ["BAR"], titulo: "Arma tu barra", desc: "Cocteleras, jiggers y accesorios · desde {precio}" },
          { palabras: ["DESECHABLES"], titulo: "Desechables para tu negocio", desc: "Contenedores, vasos y empaque · desde {precio}" },
          { palabras: ["CATERING"], titulo: "Catering y banquetes", desc: "Insertos, chafers y servicio · desde {precio}" },
          { palabras: ["LIQUIDACION"], titulo: "Liquidación", desc: "Precios especiales por tiempo limitado · desde {precio}" }
        ],
        textoGenerico: { titulo: "Descubre {categoria}", desc: "{disponibles} productos disponibles · desde {precio}" },
        // Si dinamica = false (o el catálogo no carga) se usa esta diapositiva fija:
        diapositivas: [
          { foto: "img/og-miika.jpg", etiqueta: "Miika", titulo: "Soluciones inteligentes y bonitas para tu cocina y tu negocio", desc: "Artículos para cocinas, restaurantes, hoteles y bares en Guatemala.", boton: "Ver catálogo", enlace: "?ver=todos" }
        ],
        promos: [
          // categoria: "auto" = toma otra categoría de la rotación (cambia en cada visita)
          { categoria: "auto", color: "linear-gradient(135deg,#e07a3f,#b8582a)",
            respaldo: { icon: "bi-grid-3x3-gap", titulo: "Todo el catálogo", desc: "Más de 1,000 productos", boton: "Ver todo", enlace: "?ver=todos", color: "linear-gradient(135deg,#e07a3f,#b8582a)" } },
          { icon: "bi-whatsapp", titulo: "¿Buscas algo en especial?", desc: "Escríbenos y te ayudamos", boton: "WhatsApp", enlace: "https://wa.me/50253410701?text=Hola%20Miika%2C%20estoy%20buscando%20un%20producto.%20%C2%BFMe%20pueden%20ayudar%3F", color: "linear-gradient(135deg,#1fae5b,#0b6b4f)" }
        ]
      },
      // v9: barra de confianza arriba del encabezado. En PC se ven todos; en celular rotan uno por uno.
      // Solo poner datos verdaderos del negocio. "enlace" es opcional (ej. "politicas.html#envios").
      barraConfianza: {
        habilitada: true,
        items: [
          { icon: "bi-truck",            texto: "Envíos a toda Guatemala",           enlace: "politicas.html#envios" },
          { icon: "bi-lightning-charge", texto: "Entrega en 24 horas en la capital", enlace: "politicas.html#envios" },
          { icon: "bi-cash-coin",        texto: "Pago contra entrega",               enlace: "politicas.html#pagos" },
          { icon: "bi-arrow-repeat",     texto: "Cambios y garantía",                enlace: "politicas.html#cambios" }
        ]
      },
      badges: [
        {
          icon: "bi-truck",
          titulo: "Envíos disponibles a toda Guatemala",
          items: ["• Entrega en 24 horas en la capital", "• Rastreo para departamentos"]
        },
        {
          icon: "bi-shield-lock",
          titulo: "Compra fácil y segura",
          items: ["• Efectivo o Transferencia bancaria", "• Pago contra entrega (5% fuera del área metropolitana)", "• Tarjetas Visa (Aplican restricciones)"]
        }
      ]
    };

    let productos = [];
    let categoriaActualProductos = [];
    let subcategoriaSeleccionada = "Todas";
    let filtroDisponibilidad = "todos";

    // ── v9: navegación con URL propia (para que el botón Regresar funcione) ──
    // Vistas: "inicio" (collage de categorías), "categoria", "busqueda", "todos".
    // URLs:  ?cat=tecnologia  ·  ?cat=tecnologia&sub=audio  ·  ?q=audifonos  ·  ?ver=todos  ·  &p=ID (producto abierto)
    let categorias = [];          // [{ id, nombre, slug, items }]
    let vistaActual = "inicio";
    let ultimaVistaKey = null;    // URL sin el producto abierto, para no redibujar al solo abrir/cerrar la ventana
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const slugify = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    function leerURL() {
      const u = new URLSearchParams(location.search);
      return { cat: u.get("cat") || "", sub: u.get("sub") || "", q: u.get("q") || "", p: u.get("p") || "", ver: u.get("ver") || "" };
    }
    function construirURL(e) {
      const u = new URLSearchParams();
      if (e.cat) u.set("cat", e.cat);
      if (e.sub) u.set("sub", e.sub);
      if (e.ver) u.set("ver", e.ver);
      if (e.q) u.set("q", e.q);
      if (e.p) u.set("p", e.p);
      const s = u.toString();
      return location.pathname + (s ? "?" + s : "");
    }
    // Guarda la posición de scroll de la vista actual antes de salir de ella
    function guardarScroll() {
      try { history.replaceState({ ...(history.state || {}), gc: true, scrollY: window.scrollY }, "", location.href); } catch (e) {}
    }
    function navegar(e, { reemplazar = false, desplazar = true, estado = {} } = {}) {
      const url = construirURL(e);
      if (reemplazar) history.replaceState({ gc: true, scrollY: 0, ...estado }, "", url);
      else { guardarScroll(); history.pushState({ gc: true, scrollY: 0, ...estado }, "", url); }
      renderDesdeURL();
      if (desplazar) irArribaCatalogo();
    }
    // v9: la ruta y el título están arriba de todo, así que al cambiar de página se sube al principio
    function irArribaCatalogo() { window.scrollTo(0, 0); }
    // Clic normal → navegación interna; Ctrl/Cmd/clic medio → abre en otra pestaña como un enlace normal
    function enlaceInterno(a, e) {
      a.addEventListener("click", (ev) => {
        if (ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
        ev.preventDefault();
        aside.classList.remove("abierto");
        navegar(e);
      });
    }

    // ── v9: collage por categoría (las fotos cambian una vez al día) ──
    function generadorAleatorio(semilla) {
      let h = 1779033703 ^ semilla.length;
      for (let i = 0; i < semilla.length; i++) { h = Math.imul(h ^ semilla.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
      return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
    }
    function fotosCollage(cat, n = 4) {
      const conFoto = cat.items.filter(p => p.imagen);
      let pool = conFoto.filter(p => p.estado !== "AGOTADO");
      if (pool.length < n) pool = conFoto;
      const vistas = new Set();
      pool = pool.filter(p => !vistas.has(p.imagen) && vistas.add(p.imagen));
      const d = new Date();
      const azar = generadorAleatorio(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}|${cat.id}`);
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(azar() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      return pool.slice(0, n);
    }
    // v9: ícono por categoría — compara palabras completas, sin acentos (ej. "CAFÉ Y TÉ" → CAFE, Y, TE)
    function iconoCategoria(nombre) {
      const palabras = String(nombre || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().split(/[^A-Z0-9]+/);
      const regla = CONFIG.iconosCategorias.find(r => r.palabras.some(k => palabras.some(p => p === k || (k.length > 3 && p.startsWith(k)))));
      return regla ? regla.icono : CONFIG.iconoCategoriaDefault;
    }
    // v9: ¿es frágil? Columna del Sheet ("SI"/"NO") o, si está vacía, palabras del nombre
    function esFragil(columna, titulo) {
      const c = String(columna || "").trim().toUpperCase();
      if (c) return c.startsWith("S");
      const palabras = String(titulo || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(/[^A-Z0-9]+/);
      return CONFIG.palabrasFragil.some(k => palabras.includes(k));
    }
    const etiquetaFragil = () => `<span class="badge-estado estado-fragil" title="Producto frágil: viaja bajo riesgo del cliente"><i class="bi bi-exclamation-triangle-fill"></i> Frágil</span>`;
    // v9: búsqueda sin importar acentos ni mayúsculas; con varias palabras, todas deben aparecer
    // (en nombre, código, categoría, subcategoría o descripción). "cafe termico" encuentra "DISPENSADOR DE CAFÉ TÉRMICO".
    const normalizar = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // v10: nombres alternativos. data/sinonimos.json tiene grupos de palabras equivalentes ("bandeja, charola,
    // azafate"); si un producto contiene una, el buscador también lo encuentra con las otras. La columna
    // opcional "nombres_alternativos" del Sheet agrega nombres propios de cada producto.
    let gruposSinonimos = [];
    const contieneTermino = (texto, t) => new RegExp("(^|[^a-z0-9])" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(s|es)?([^a-z0-9]|$)").test(texto);
    fetch("data/sinonimos.json").then(r => r.ok ? r.json() : null).then(d => {
      if (!d) return;
      gruposSinonimos = (d.grupos || []).map(g => g.map(normalizar).map(s => s.trim()).filter(Boolean));
      productos.forEach(p => { delete p._busqueda; });
      const q = document.getElementById("buscar-producto-central");
      if (q && q.value.trim()) procesarYRenderizarCatalogo();
    }).catch(() => {});
    function coincideBusqueda(p, texto) {
      const terminos = normalizar(texto).split(/\s+/).filter(Boolean);
      if (!terminos.length) return true;
      if (!p._busqueda) {
        const base = normalizar([p.titulo, p.tituloOriginal, p.id, p.categoria.nombre, p.subcategoria, p.descripcion, p.alternos].join(" "));
        const extra = gruposSinonimos.filter(g => g.some(t => contieneTermino(base, t))).flat();
        p._busqueda = base + " " + extra.join(" ");
      }
      return terminos.every(t => p._busqueda.includes(t));
    }

    // v10: cada producto tiene su propia página (p/<producto>/), generada por process/GenerarPaginas.py.
    // p/indice.json dice qué dirección tiene cada código; con eso las tarjetas y la ventana enlazan a la página.
    let paginasProducto = {};
    const urlPagina = (id) => paginasProducto[id] ? "p/" + paginasProducto[id] + "/" : "";
    fetch("p/indice.json").then(r => r.ok ? r.json() : {}).then(d => {
      paginasProducto = d || {};
      document.querySelectorAll(".producto h3[data-id]").forEach(h => {
        const u = urlPagina(h.dataset.id);
        if (u && !h.querySelector("a")) h.innerHTML = `<a class="titulo-enlace" href="${u}">${h.innerHTML}</a>`;
      });
    }).catch(() => {});
    // Pide a Drive una miniatura más pequeña (más rápida y con menos riesgo de bloqueo)
    const miniatura = (url, size = 300) => {
      if (!url) return url;
      if (/cdn\.shopify\.com/.test(url)) return url.replace(/([?&])width=\d+&?/, "$1").replace(/[?&]$/, "") + (url.includes("?") ? "&" : "?") + "width=" + size;
      return url.replace(/([?&]sz=w)\d+/, `$1${size}`);
    };

    function parsearCSV(texto) {
        const lineas = [];
        let actual = [];
        let campo = "";
        let enComillas = false;
        for (let i = 0; i < texto.length; i++) {
            const char = texto[i];
            const prox = texto[i + 1];
            if (char === '"' && enComillas && prox === '"') { campo += '"'; i++; }
            else if (char === '"') { enComillas = !enComillas; }
            else if (char === ',' && !enComillas) { actual.push(campo.trim()); campo = ""; }
            else if ((char === '\r' || char === '\n') && !enComillas) {
                if (campo || actual.length > 0) { actual.push(campo.trim()); lineas.push(actual); }
                actual = []; campo = "";
                if (char === '\r' && prox === '\n') i++;
            } else { campo += char; }
        }
        if (campo || actual.length > 0) { actual.push(campo.trim()); lineas.push(actual); }
        return lineas;
    }

    // Si Drive frena por demasiadas peticiones, reintenta la foto con espera creciente
    // (3 s, 8 s, 20 s) y por la ruta alterna de Google; si aun así falla, deja la imagen de respaldo.
    function reintentarImg(img, respaldo) {
      const n = +(img.dataset.intentos || 0);
      const id = (img.dataset.orig || img.src).match(/[?&]id=([\w-]+)/);
      if (!img.dataset.orig) img.dataset.orig = img.src;
      if (n >= 3 || !id) { img.onerror = null; if (respaldo) img.src = respaldo; return; }
      img.dataset.intentos = n + 1;
      const url = n === 1 ? `https://lh3.googleusercontent.com/d/${id[1]}=w400` : `${img.dataset.orig}&r=${n + 1}`;
      setTimeout(() => { img.src = url; }, [3000, 8000, 20000][n]);
    }
    window.reintentarImg = reintentarImg;
    // Imagen para productos sin foto (o cuya foto no cargó después de 3 intentos)
    const SIN_FOTO = "img/Miika-300.webp";
    window.SIN_FOTO = SIN_FOTO;

    function driveThumb(url, size = 400) {
        if (!url) return url;
        let m = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (!m) m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w${size}`;
        return url;
    }

    // v9 (velocidad): el catálogo se guarda en el navegador del cliente. Al regresar, la página se dibuja
    // al instante con la copia guardada y en segundo plano descarga la versión nueva del Google Sheet.
    const CLAVE_CATALOGO = "tech-catalogo";
    const DIAS_COPIA = 7;   // después de estos días se ignora la copia y se espera la descarga
    function leerCopiaCatalogo() {
        try {
            const c = JSON.parse(localStorage.getItem(CLAVE_CATALOGO) || "null");
            if (c && c.url === CONFIG.csvUrl && c.texto && Date.now() - c.fecha < DIAS_COPIA * 864e5) return c.texto;
        } catch (e) {}
        return null;
    }
    function guardarCopiaCatalogo(texto) {
        try { localStorage.setItem(CLAVE_CATALOGO, JSON.stringify({ url: CONFIG.csvUrl, fecha: Date.now(), texto })); } catch (e) {}
    }
    async function descargarCSV() {
        const res = await fetch(CONFIG.csvUrl);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const texto = await res.text();
        if (!texto || texto.trim().startsWith("<")) throw new Error("respuesta no es CSV");
        return texto;
    }

    async function cargarDatos() {
        const copia = leerCopiaCatalogo();
        if (copia) {
            try { procesarCSV(copia); iniciarApp(); } catch (e) { console.warn("Copia del catálogo dañada", e); }
            // Actualiza en segundo plano; solo redibuja si el cliente todavía no empezó a navegar
            const inicio = Date.now(), urlInicial = location.href;
            descargarCSV().then(nuevo => {
                if (nuevo === copia) { guardarCopiaCatalogo(nuevo); return; }
                guardarCopiaCatalogo(nuevo);
                procesarCSV(nuevo);
                const quieto = location.href === urlInicial && window.scrollY < 150 && Date.now() - inicio < 6000 && modal.style.display !== "flex";
                if (quieto) iniciarApp();
            }).catch(e => console.warn("No se pudo actualizar el catálogo; se usa la copia guardada", e));
            return;
        }
        try {
            const rawText = await descargarCSV();
            procesarCSV(rawText);
            guardarCopiaCatalogo(rawText);
            iniciarApp();
        } catch (e) {
            console.error("Error cargando Google Sheets:", e);
            document.getElementById("contenedor-productos").innerHTML = `
              <div style="text-align:center; padding:2rem; max-width:700px; margin:0 auto;">
                <p style="font-weight:600; margin-bottom:0.5rem;">No pudimos cargar el catálogo en este momento.</p>
                <p>Miika es tu tienda de tecnología, hogar, belleza, salud, herramientas y mucho más en Guatemala,
                  con envíos a todo el país y pago contra entrega.
                  Escribinos por WhatsApp para consultar el catálogo completo.</p>
              </div>`;
        }
    }

    // ═══ v10: TEXTO COHERENTE ═══════════════════════════════════════════════════════════
    // Regla única del sitio: "tipo oración" (solo la primera letra en mayúscula), como Google, Apple o Shopify.
    // Se aplica al MOSTRAR; el Sheet no se toca. Marcas, siglas y medidas se respetan.
    // Si agregás una marca nueva, ponela aquí (y en process/GenerarPaginas.py → MARCAS).
    // Las marcas de cada tienda van en CONFIG.marcas (arriba); estas listas son comunes a todos los sitios.
    const MARCAS = CONFIG.marcas || [];
    const SIGLAS = ["NSF", "PVC", "LED", "USB", "GN", "PP", "PET", "PS", "EPS", "XL", "XXL", "XS", "BPA", "II", "III", "IV", "FIFO", "IPA", "BBQ", "CO2", "V60",
        "HDMI", "RGB", "HD", "UV", "TV", "PC", "NFC", "GPS", "DVD", "MDF", "PVA", "ABS", "PLA", "DIY", "LCD", "AC", "DC", "SPF", "MDF", "3D", "4K", "8K", ...(CONFIG.siglas || [])];
    const ACENTOS = { metodos: "métodos", espatulas: "espátulas", cafe: "café", zepelin: "zepelín", tulipan: "tulipán", division: "división", maquina: "máquina",
        souffle: "soufflé", lampara: "lámpara", decoracion: "decoración", organizacion: "organización", tecnologia: "tecnología", vehiculos: "vehículos",
        rotulos: "rótulos", rotulacion: "rotulación", bano: "baño", banos: "baños", audifonos: "audífonos", movil: "móvil", articulos: "artículos",
        medicos: "médicos", nino: "niño", ninos: "niños", libreria: "librería", jardin: "jardín", carpinteria: "carpintería", iluminacion: "iluminación",
        electrico: "eléctrico", electrica: "eléctrica", plastico: "plástico", plastica: "plástica", ceramica: "cerámica", bambu: "bambú", fantasia: "fantasía",
        didacticos: "didácticos", peliculas: "películas", vehiculo: "vehículo",
        galon: "galón", metalico: "metálico", metalica: "metálica", magnetico: "magnético", magnetica: "magnética", inalambrico: "inalámbrico", inalambrica: "inalámbrica", locion: "loción", termico: "térmico", termica: "térmica", tonico: "tónico", colageno: "colágeno", capsulas: "cápsulas", maletin: "maletín", compresion: "compresión", botiquin: "botiquín", digitos: "dígitos", rigida: "rígida", rigido: "rígido", arnes: "arnés", telefono: "teléfono", simbolos: "símbolos", zoologico: "zoológico", emblematicos: "emblemáticos", mediterranea: "mediterránea", termometro: "termómetro", pizarron: "pizarrón", acrilico: "acrílico", acrilicos: "acrílicos", ortopedica: "ortopédica", higienico: "higiénico", audifono: "audífono", proteina: "proteína", cuadricula: "cuadrícula", lineas: "líneas", mensula: "ménsula", niquel: "níquel", formula: "fórmula", hungara: "húngara", opticas: "ópticas", pajaro: "pájaro", arbol: "árbol", musica: "música", pagina: "página", camara: "cámara", bateria: "batería", energia: "energía", fotografico: "fotográfico", electronica: "electrónica", electronico: "electrónico", automatico: "automático", automatica: "automática", ...(CONFIG.acentos || {}) };
    const UNIDADES = { oz: "oz", onz: "oz", ml: "ml", l: "L", lt: "L", lts: "L", ltr: "L", cm: "cm", cms: "cm", mm: "mm",
        plg: "″", pulg: "″", qt: "qt", w: "W", kg: "kg", g: "g", gr: "g", grs: "g", grms: "g", m: "m", mts: "m",
        gb: "GB", tb: "TB", mb: "MB", mah: "mAh", hz: "Hz", ghz: "GHz", v: "V", mp: "MP", pzs: "pzs", pz: "pz", lb: "lb", lbs: "lb" };
    const mapaMarcas = new Map(MARCAS.map(m => [m.toLowerCase(), m]));
    const LETRA_DESPUES = new Set(["vitamina", "vitaminas", "talla", "tipo", "letra", "clase", "grado", "modelo", "serie"]);
    const setSiglas = new Set(SIGLAS);
    const NUM = String.raw`\d+(?:[.,]\d+)?`;
    const reMedida = new RegExp(`^(${NUM})(${Object.keys(UNIDADES).join("|")})\\.?$`, "i");
    const reDimension = new RegExp(`^(${NUM})[xX×](${NUM})(?:[xX×](${NUM}))?(cm|cms|mm|plg|m|″)?$`, "i");
    const conUnidad = (n, u) => { const x = UNIDADES[u.toLowerCase()]; return x === "″" ? n + "″" : `${n} ${x}`; };

    function palabraBonita(p, primera, anterior) {
        const m = p.match(/^([("“¿¡#]*)(.*?)([)"”.,;:!?]*)$/);
        const [, pre, base, post] = m || ["", "", p, ""];
        if (!base) return p;
        const sinAc = base.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
        let r;
        if (setSiglas.has(base.toUpperCase())) r = base.toUpperCase();
        else if (mapaMarcas.has(base.toLowerCase())) r = mapaMarcas.get(base.toLowerCase());
        else if (reMedida.test(base)) r = base.replace(reMedida, (_, n, u) => conUnidad(n, u));
        else if (reDimension.test(base)) r = base.replace(reDimension, (_, a, b, c, u) => [a, b, c].filter(Boolean).join(" x ") + (u ? (u === "″" || UNIDADES[u.toLowerCase()] === "″" ? "″" : " " + UNIDADES[u.toLowerCase()]) : ""));
        else if (UNIDADES[sinAc] && /\d$/.test(anterior || "")) r = UNIDADES[sinAc] === "″" ? "″" : UNIDADES[sinAc];
        else if (/\d/.test(base)) r = base;                                   // códigos: Q75, #2, 3101…
        else if (/^[A-ZÁÉÍÓÚÑÜ]$/.test(base) && (!/^[YAOEXUP]$/.test(base) || LETRA_DESPUES.has((anterior || "").toLowerCase()))) r = base;   // tallas: S, M, L; vitamina E
        else r = (ACENTOS[base.toLowerCase()] || base.toLowerCase());
        if (primera && r === r.toLowerCase()) r = r.charAt(0).toUpperCase() + r.slice(1);
        return pre + r + post;
    }
    // "OLLA DE ACERO INOXIDABLE DE 12LTS" / "Olla de Acero Inoxidable de 12 Litros" → "Olla de acero inoxidable de 12 L"
    function textoBonito(t) {
        const pal = String(t || "").replace(/ /g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
        const out = [];
        pal.forEach((p, i) => {
            const r = palabraBonita(p, i === 0, pal[i - 1]);
            if (r === "″" && out.length) out[out.length - 1] += "″"; else out.push(r);
        });
        return out.join(" ");
    }
    // Descripción: separa "CARACTERÍSTICAS ⇥ BENEFICIOS" y la ficha "CLAVE: valor".
    const RE_FICHA = /\s{2,}(?=[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ ]{2,}:)/;
    const claveBonita = (k) => { k = k.trim().toLowerCase(); return k.charAt(0).toUpperCase() + k.slice(1); };
    function separarDescripcion(texto) {
        const t = String(texto || "").replace(/ /g, " ").trim();
        const beneficios = [], ficha = []; let libre = "";
        let partes = t.split(RE_FICHA), cuerpo = partes[0], resto = partes.slice(1);
        if (/^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ ]{2,}:/.test(cuerpo)) { resto = [cuerpo, ...resto]; cuerpo = ""; }
        resto.forEach(b => b.split(/\s{2,}/).forEach(s => {
            const i = s.indexOf(":");
            if (i > 0 && s.slice(i + 1).trim()) ficha.push([claveBonita(s.slice(0, i)), s.slice(i + 1).trim()]);
            else if (s.trim()) ficha.push(["", s.trim()]);
        }));
        const m = cuerpo.match(/^CARACTER[IÍ]STICAS\s*\t\s*BENEFICIOS\s*/i);
        if (m) {
            const seg = cuerpo.slice(m[0].length).split("\t");
            if (seg.length >= 2) {
                let caract = seg[0].trim();
                seg.slice(1, -1).forEach(s => {
                    s = s.trim();
                    let corte = /([\w)”"%.,]) (?=[A-ZÁÉÍÓÚÑ])/.exec(s), pos = corte ? corte.index + corte[1].length : -1;
                    if (pos < 0) { const todos = [...s.matchAll(/[a-záéíóúñ] (?=\d)/g)]; if (todos.length) pos = todos[todos.length - 1].index + 1; }
                    if (pos >= 0) { beneficios.push([caract, s.slice(0, pos).trim()]); caract = s.slice(pos + 1).trim(); }
                    else { beneficios.push([caract, s]); caract = ""; }
                });
                beneficios.push([caract, seg[seg.length - 1].trim()]);
            } else libre = cuerpo.replace(/^CARACTER[IÍ]STICAS\s*\t\s*BENEFICIOS\s*/i, "");
        } else libre = cuerpo.trim();
        return { beneficios: beneficios.filter(([a, b]) => a || b), ficha, libre };
    }
    // Texto corto para la tarjeta: "Material: silicón · Medidas: 24 x 7 cm"
    function resumenDescripcion(texto) {
        const d = separarDescripcion(texto);
        if (d.libre) return d.libre.replace(/\s+/g, " ");
        if (d.beneficios.length) return d.beneficios.map(([a, b]) => a || b).join(" · ");
        return d.ficha.map(([k, v]) => k ? `${k}: ${v}` : v).join(" · ");
    }
    // HTML ordenado para la ventana del producto
    function descripcionHTML(texto) {
        const d = separarDescripcion(texto);
        let h = "";
        if (d.libre) h += `<p>${esc(d.libre)}</p>`;
        if (d.beneficios.length) h += `<ul class="desc-lista">${d.beneficios.map(([a, b]) =>
            `<li>${a ? `<strong>${esc(a)}</strong>` : ""}${a && b ? " — " : ""}${esc(b)}</li>`).join("")}</ul>`;
        if (d.ficha.length) h += `<dl class="desc-ficha">${d.ficha.map(([k, v]) =>
            k ? `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>` : `<div><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
        return h;
    }

    function procesarCSV(rawText) {
            const filas = parsearCSV(rawText);
            // v10: las columnas se buscan por su NOMBRE en la fila 1 del Sheet (no por posición), así agregar o
            // mover columnas no rompe el sitio. Si un nombre no existe se usa la posición de siempre.
            const cab = (filas[0] || []).map(c => slugify(c).replace(/-/g, "_"));
            const col = (nombre, porDefecto) => { const i = cab.indexOf(nombre); return i >= 0 ? i : porDefecto; };
            const C = { id: col("id", 0), titulo: col("titulo", 1), imagen: col("imagen", 2), imagenes: col("imagenes", 3),
                        catId: col("categoria_id", 4), catNombre: col("categoria_nombre", 5), sub: col("subcategoria_nombre", 7),
                        desc: col("producto_descripcion", 8), precio: col("precio", 9), estado: col("estado", 10),
                        fragil: col("fragil", -1), alternos: col("nombres_alternativos", -1) };
            const v = (f, i) => (i >= 0 ? f[i] || "" : "");

            productos = filas.slice(1).map(f => {
                let precioLimpio = v(f, C.precio).replace(/[^0-9.]/g, '') || "0";
                return {
                    id: v(f, C.id),
                    titulo: textoBonito(v(f, C.titulo)),
                    tituloOriginal: v(f, C.titulo),
                    imagen: driveThumb(v(f, C.imagen)),
                    imagenes: v(f, C.imagenes) ? v(f, C.imagenes).split('|').map(i => driveThumb(i.trim())).filter(Boolean) : [],
                    categoria: { id: v(f, C.catId), nombre: textoBonito(v(f, C.catNombre)) },
                    subcategoria: textoBonito(v(f, C.sub)),
                    descripcion: v(f, C.desc),
                    precio: parseFloat(precioLimpio) || 0,
                    estado: (v(f, C.estado) || "DISPONIBLE").toUpperCase(),
                    fragil: esFragil(CONFIG.columnaFragil === null ? "" : v(f, C.fragil), v(f, C.titulo)),
                    alternos: v(f, C.alternos)
                };
            }).filter(p => p.id);

            categoriaActualProductos = [...productos];
    }

    // v9: barra de confianza
    function renderBarraConfianza() {
      const cfg = CONFIG.barraConfianza;
      const barra = document.getElementById("barra-confianza");
      if (!barra || !cfg || !cfg.habilitada || !cfg.items?.length) {
        if (barra) barra.hidden = true;
        document.body.classList.remove("con-barra-confianza");
        return;
      }
      barra.innerHTML = `<div class="barra-confianza-inner">${cfg.items.map((it, i) => {
        const contenido = `<i class="bi ${it.icon}" aria-hidden="true"></i><span>${esc(it.texto)}</span>`;
        return it.enlace
          ? `<a class="bc-item${i === 0 ? " activo" : ""}" href="${esc(it.enlace)}">${contenido}</a>`
          : `<span class="bc-item${i === 0 ? " activo" : ""}">${contenido}</span>`;
      }).join("")}</div>`;
      barra.hidden = false;
      document.body.classList.add("con-barra-confianza");
      // En celular se muestra un mensaje a la vez (rota cada 3.5 s; no rota si el usuario pidió menos movimiento)
      const reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = barra.querySelectorAll(".bc-item");
      if (items.length > 1 && !reducido) {
        let i = 0;
        setInterval(() => {
          if (document.hidden) return;
          items[i].classList.remove("activo");
          i = (i + 1) % items.length;
          items[i].classList.add("activo");
        }, 3500);
      }
    }


    // ── v9.2: portada del Inicio (carrusel + banners) ──
    // Con CONFIG.portada.dinamica = true se arma sola con las categorías reales del Google Sheet:
    // cada diapositiva muestra fotos de productos disponibles de esa categoría, y en cada visita
    // del cliente se presentan categorías diferentes (rotan en orden hasta pasar por todas).
    const portadaEstado = { timer: null, pausa: false, listo: false, seleccion: null };
    const escP = (s) => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

    function numeroVisita() {
      // Cuenta visitas (no recargas): se suma 1 la primera vez que se abre la página en cada sesión del navegador
      try {
        let n = parseInt(localStorage.getItem(CLAVE_CATALOGO + "-visitas") || "0", 10) || 0;
        if (!sessionStorage.getItem(CLAVE_CATALOGO + "-sesion")) {
          n++; localStorage.setItem(CLAVE_CATALOGO + "-visitas", n); sessionStorage.setItem(CLAVE_CATALOGO + "-sesion", "1");
        }
        return n;
      } catch (e) { return Math.floor(Math.random() * 1000); }
    }

    function textoPortada(cat) {
      const cfg = CONFIG.portada;
      const palabras = slugify(cat.nombre).toUpperCase().split("-");
      const num = (cat.nombre.match(/\d+/) || [])[0];
      const piezas = num ? parseInt(num, 10) : null;
      const frase = " " + palabras.join(" ") + " ";
      const regla = (cfg.textos || []).find(r =>
        (r.palabras && r.palabras.some(k => k.includes(" ")
          ? frase.includes(" " + slugify(k).toUpperCase().replace(/-/g, " ") + " ")
          : palabras.some(p => p === k || (k.length > 3 && p.startsWith(k))))) ||
        (r.piezas && piezas !== null && piezas >= r.piezas[0] && piezas <= r.piezas[1]));
      return regla || cfg.textoGenerico || { titulo: "Descubre {categoria}", desc: "{disponibles} modelos disponibles · desde {precio}" };
    }
    // Nombres escritos TODO EN MAYÚSCULAS en el Sheet se muestran en la portada como "Accesorios de Maletas"
    const nombreBonito = (s) => s && s === s.toUpperCase() && /\p{L}{3}/u.test(s)
      ? s.toLowerCase().replace(/(^|[\s(/-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/ (De|Del|Y|E|Tu|Para|La|El|Los|Las|En|A) /g, m => m.toLowerCase())
      : s;
    function rellenar(txt, cat) {
      const disp = cat.items.filter(p => p.estado !== "AGOTADO");
      const precios = (disp.length ? disp : cat.items).map(p => p.precio).filter(x => x > 0);
      const min = precios.length ? Math.min(...precios) : 0;
      return String(txt || "")
        .replace(/\{categoria\}/g, nombreBonito(cat.nombre))
        .replace(/\{disponibles\}/g, disp.length || cat.items.length)
        .replace(/\{precio\}/g, min ? `${CONFIG.simboloMoneda}${min.toFixed(2)}` : "")
        .replace(/\s*·\s*desde\s*$/, "");
    }

    function elegirCategoriasPortada() {
      const cfg = CONFIG.portada;
      const excluir = new Set((cfg.excluir || []).map(slugify));
      const nFotos = (c) => new Set(c.items.filter(p => p.imagen && p.estado !== "AGOTADO").map(p => p.imagen)).size;
      // Solo categorías con fotos de productos disponibles; las más grandes primero
      const candidatas = categorias
        .filter(c => !excluir.has(c.slug) && !excluir.has(slugify(c.id)) && nFotos(c) > 0)
        .sort((a, b) => b.items.length - a.items.length || a.slug.localeCompare(b.slug));
      // Se prefieren categorías con 3 fotos o más (el collage se ve completo); las demás solo si faltan
      const conTres = candidatas.filter(c => nFotos(c) >= 3);
      const aptas = conTres.length >= 2 ? conTres : candidatas;
      if (!aptas.length) return { slides: [], promo: [] };
      const nPromo = (cfg.promos || []).filter(p => p.categoria === "auto").length;
      const total = Math.min(aptas.length, (cfg.cantidadDiapositivas || 3) + nPromo);
      const v = Math.max(0, numeroVisita() - 1);
      // 1ª diapositiva: rota entre las "principales" de CONFIG (o, si no hay, las 3 categorías más grandes)
      const principales = (cfg.principales || []).map(slugify)
        .map(s => aptas.find(c => c.slug === s || slugify(c.id) === s)).filter(Boolean);
      const top = principales.length ? principales : aptas.slice(0, Math.min(3, aptas.length));
      const primera = top[v % top.length];
      // Las demás rotan por todo el catálogo, sin repetir el mismo tipo de mensaje si se puede
      const otras = aptas.filter(c => c !== primera);
      const desde = otras.length ? (v * (total - 1)) % otras.length : 0;
      const ronda = otras.map((_, i) => otras[(desde + i) % otras.length]);
      const elegidas = [primera], usados = new Set([textoPortada(primera)]);
      for (const c of ronda) { if (elegidas.length >= total) break; const t = textoPortada(c); if (!usados.has(t)) { elegidas.push(c); usados.add(t); } }
      for (const c of ronda) { if (elegidas.length >= total) break; if (!elegidas.includes(c)) elegidas.push(c); }
      const nSlides = Math.max(1, elegidas.length - nPromo);
      return { slides: elegidas.slice(0, nSlides), promo: elegidas.slice(nSlides) };
    }

    function diapositivasDinamicas(cats) {
      return cats.map(cat => {
        const t = textoPortada(cat);
        return {
          etiqueta: nombreBonito(cat.nombre),
          titulo: rellenar(t.titulo, cat),
          desc: rellenar(t.desc || (CONFIG.portada.textoGenerico || {}).desc, cat),
          boton: rellenar(t.boton || "Ver {categoria}", cat),
          enlace: "?cat=" + cat.slug,
          fotos: fotosCollage(cat, 3).map(p => miniatura(p.imagen, 500))
        };
      });
    }

    function renderPortada() {
      const cfg = CONFIG.portada, pista = document.getElementById("pt-pista");
      if (!cfg || !pista) return;
      const dinamica = cfg.dinamica && categorias.length;
      if (cfg.dinamica && !categorias.length) {   // aún no llega el catálogo: esqueleto sin enlaces
        pista.innerHTML = '<div class="pt-slide pt-cargando"></div>';
        document.getElementById("pt-promos").innerHTML = (cfg.promos || []).map(() => '<div class="pt-promo pt-cargando"></div>').join("");
        return;
      }
      if (dinamica && !portadaEstado.seleccion) portadaEstado.seleccion = elegirCategoriasPortada();
      const sel = portadaEstado.seleccion || { slides: [], promo: [] };
      const diapositivas = dinamica && sel.slides.length ? diapositivasDinamicas(sel.slides) : (cfg.diapositivas || []);

      const enlazar = (a) => {
        if (!a.getAttribute("href").startsWith("?")) return;
        a.addEventListener("click", (ev) => {
          if (ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
          ev.preventDefault();
          guardarScroll(); history.pushState({ gc: true, scrollY: 0 }, "", location.pathname + a.getAttribute("href"));
          renderDesdeURL(); irArribaCatalogo();
        });
      };
      const n = diapositivas.length;
      pista.innerHTML = diapositivas.map((d, i) => `
        <a class="pt-slide${d.fotos ? " pt-con-collage" : ""}" href="${escP(d.enlace)}">
          ${d.fotos ? `<div class="pt-collage" aria-hidden="true">${d.fotos.map((u, k) => `<img src="${escP(u)}" alt="" ${i === 0 && k === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} onerror="this.remove()">`).join("")}</div>`
            : `<img src="${escP(d.foto)}" alt="" style="object-position:${escP(d.enfoque || "center 30%")};${d.enfoqueMovil ? "--enfoque-movil:" + escP(d.enfoqueMovil) : ""}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} onerror="this.remove()">`}
          <div class="pt-texto">
            <div class="pt-etiqueta">${escP(d.etiqueta)}</div>
            <${i === 0 ? "h2" : "p"} class="pt-titulo">${escP(d.titulo)}</${i === 0 ? "h2" : "p"}>
            <p class="pt-desc">${escP(d.desc)}</p>
            <span class="pt-boton">${escP(d.boton)} <i class="bi bi-arrow-right"></i></span>
          </div>
        </a>`).join("");
      pista.querySelectorAll("a").forEach(enlazar);
      pista.scrollTo({ left: 0, behavior: "instant" });

      // Banners: los que dicen categoria:"auto" toman otra categoría de la rotación; los demás son fijos
      let k = 0;
      const promos = (cfg.promos || []).map(p => {
        if (p.categoria !== "auto") return p;
        const cat = dinamica ? sel.promo[k++] : null;
        if (!cat) return p.respaldo || null;
        const t = textoPortada(cat);
        return { ...p, icon: iconoCategoria(cat.nombre), titulo: rellenar(t.promoTitulo || "{categoria}", cat),
                 desc: rellenar(t.promoDesc || "{disponibles} productos · desde {precio}", cat), boton: cat.nombre.length <= 14 ? "Ver " + nombreBonito(cat.nombre) : "Ver más", enlace: "?cat=" + cat.slug };
      }).filter(Boolean);
      document.getElementById("pt-promos").innerHTML = promos.map(p => `
        <a class="pt-promo" href="${escP(p.enlace)}"${/^https?:/i.test(p.enlace) ? ' target="_blank" rel="noopener"' : ""} style="background:${escP(p.color)}">
          <i class="bi ${escP(p.icon)} pt-promo-icono" aria-hidden="true"></i>
          <strong>${escP(p.titulo)}</strong><span class="pt-promo-desc">${escP(p.desc)}</span>
          <span class="pt-boton">${escP(p.boton)}</span>
        </a>`).join("");
      document.querySelectorAll("#pt-promos a").forEach(enlazar);

      const puntos = document.getElementById("pt-puntos");
      puntos.innerHTML = diapositivas.map(d => `<button type="button" role="tab" aria-label="${escP(d.etiqueta)}"></button>`).join("");
      puntos.hidden = n < 2;
      document.querySelectorAll(".pt-flecha").forEach(b => b.hidden = n < 2);
      const actual = () => Math.round(pista.scrollLeft / Math.max(1, pista.clientWidth));
      const ir = (i) => pista.scrollTo({ left: ((i + n) % n) * pista.clientWidth });
      const marcar = () => { const a = actual(); puntos.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-selected", i === a)); };
      const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const reiniciar = () => { clearInterval(portadaEstado.timer); if (reducir || n < 2) return;
        portadaEstado.timer = setInterval(() => { if (!portadaEstado.pausa && !document.hidden && document.body.classList.contains("vista-inicio")) ir(actual() + 1); }, (cfg.segundos || 5) * 1000); };
      puntos.querySelectorAll("button").forEach((b, i) => b.onclick = () => { ir(i); reiniciar(); });
      document.querySelector(".pt-prev").onclick = () => { ir(actual() - 1); reiniciar(); };
      document.querySelector(".pt-next").onclick = () => { ir(actual() + 1); reiniciar(); };
      marcar();
      if (!portadaEstado.listo) {   // estos eventos se registran una sola vez
        portadaEstado.listo = true;
        let t = 0; pista.addEventListener("scroll", () => { clearTimeout(t); t = setTimeout(() => {
          const a = Math.round(pista.scrollLeft / Math.max(1, pista.clientWidth));
          document.querySelectorAll("#pt-puntos button").forEach((b, i) => b.setAttribute("aria-selected", i === a)); }, 60); }, { passive: true });
        const carrusel = pista.parentElement;
        carrusel.addEventListener("mouseenter", () => portadaEstado.pausa = true); carrusel.addEventListener("mouseleave", () => portadaEstado.pausa = false);
        carrusel.addEventListener("touchstart", () => { portadaEstado.pausa = true; setTimeout(() => portadaEstado.pausa = false, 8000); }, { passive: true });
      }
      reiniciar();
    }

    const aplicarConfig = () => {
      renderBarraConfianza();
      renderPortada();
      document.title = CONFIG.tituloPagina; 
      document.getElementById("page-title").textContent = CONFIG.tituloPagina;
      

      document.getElementById("meta-desc").content = CONFIG.metaDescripcion;
      document.getElementById("meta-og-title").content = CONFIG.tituloPagina;
      document.getElementById("meta-og-description").content = CONFIG.metaDescripcion;
      document.getElementById("meta-og-image").content = CONFIG.seoImage;
      document.getElementById("meta-theme-color").content = "#003772";
      document.getElementById("texto-subtitulo").textContent = CONFIG.eslogan;
      document.getElementById("logo-sidebar").src = CONFIG.logoImg;
      
      const headerBar = document.getElementById("page-header");
      if (headerBar) {
        document.getElementById("header-logo").src = CONFIG.headerBar.logo;
        document.getElementById("header-logo").alt = CONFIG.headerBar.alt;
        document.getElementById("header-title").textContent = CONFIG.headerBar.titulo;
        document.getElementById("header-subtitle").textContent = CONFIG.headerBar.subtitulo;
      }

      const whatsappURL = `https://wa.me/${CONFIG.telefonoWhatsApp}?text=${encodeURIComponent(CONFIG.mensajeWhatsApp)}`;

      document.getElementById("aside-footer-container").innerHTML = `
        <div class="social-icons">
          ${CONFIG.redesSociales.map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(r.label || "Red social")}"><i class="${r.icon}" aria-hidden="true"></i></a>`).join('')}
          <a href="${whatsappURL}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="bi bi-whatsapp" aria-hidden="true"></i></a>
          ${CONFIG.email ? `<a href="mailto:${CONFIG.email}" aria-label="Correo"><i class="bi bi-envelope"></i></a>` : ""}
        </div>
        <p><strong>${CONFIG.nombreNegocio}</strong></p>
        <p style="opacity:0.7">${CONFIG.copyright}</p>
      `;

      document.getElementById("footer-social-links").innerHTML = `
        ${CONFIG.redesSociales.map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer"><i class="${r.icon}"></i> ${r.label}</a>`).join('')}
        <a href="${whatsappURL}" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp"></i> WhatsApp</a>
        ${CONFIG.email ? `<a href="mailto:${CONFIG.email}"><i class="bi bi-envelope"></i> ${CONFIG.email}</a>` : ""}
      `;
      
      document.getElementById("f-copy").textContent = CONFIG.copyright;
      document.getElementById("f-loc").textContent = CONFIG.ubicacion;
      document.getElementById("f-dev").innerHTML = `Desarrollado por <strong><a href="https://links.rompecabezas.online" target="_blank">${CONFIG.developer}</a></strong>`;

      document.getElementById("wa-animado").href = whatsappURL;
      

      document.getElementById("container-badges").innerHTML = CONFIG.badges.map(b => `
        <div class="badge-card">
          <i class="bi ${b.icon}"></i>
          <div class="badge-text">
            <h3 class="badge-titulo">${b.titulo}</h3>
            <div>${b.items.map(i => `<span>${i}</span>`).join('')}</div>
          </div>
        </div>
      `).join('');
    };

    let fotosActuales = [];
    let indexActual = 0;
    const contador = document.getElementById("contador-carrito");
    const modal = document.getElementById("modal-producto");
    const aside = document.getElementById("aside-menu");
    const subContainer = document.getElementById("contenedor-filtros-sub");
    const txtContadorResultados = document.getElementById("contador-resultados");
    const btnVolverFloat = document.getElementById("btn-volver-float");

    window.toggleDescripcion = (id) => {
      const txt = document.getElementById(`desc-${id}`);
      const link = document.getElementById(`link-${id}`);
      txt.classList.toggle('completa');
      link.textContent = txt.classList.contains('completa') ? "Ver menos" : "Leer más...";
    };

    window.cambiarFoto = (idx) => {
      indexActual = idx;
      const mainImg = document.getElementById("img-modal-principal");
      mainImg.src = fotosActuales[indexActual];
      document.querySelectorAll(".thumb").forEach((t, i) => {
        t.style.borderColor = i === idx ? 'var(--accent)' : '#eee';
        t.style.opacity = i === idx ? '1' : '0.6';
      });
    };

    // v9: abrir un producto agrega "&p=ID" a la URL, así Regresar cierra la ventana
    window.openModalDirectly = (id) => {
      const e = leerURL();
      if (e.p === id) return;
      guardarScroll();
      history.pushState({ gc: true, modal: true, scrollY: window.scrollY }, "", construirURL({ ...e, p: id }));
      abrirModal(id);
    };

    function abrirModal(id) {
      const p = productos.find(x => x.id === id);
      if(!p) return;
      let urls = [p.imagen, ...p.imagenes].filter(u => u);
      if (!urls.length) urls = [SIN_FOTO];
      fotosActuales = [...new Set(urls)]; 
      indexActual = 0;
      
      const isAgotado = p.estado === "AGOTADO";
      
      document.getElementById("modal-titulo").textContent = p.titulo;
      document.getElementById("modal-titulo").dataset.id = p.id;
      document.getElementById("modal-descripcion").innerHTML = descripcionHTML(p.descripcion) || "<p>Sin descripción disponible.</p>";
      document.getElementById("modal-precio").textContent = `Q${p.precio.toFixed(2)}`;
      const enlacePagina = document.getElementById("modal-pagina");
      if (enlacePagina) { const u = urlPagina(p.id); enlacePagina.hidden = !u; if (u) enlacePagina.href = u; }
      
      document.getElementById("modal-badge-estado").innerHTML = `
        <span class="badge-estado ${isAgotado ? 'estado-agotado' : 'estado-disponible'}">
            ${isAgotado ? 'Agotado' : 'Disponible'}
        </span>${p.fragil ? ` ${etiquetaFragil()}
        <p class="nota-fragil"><i class="bi bi-exclamation-triangle"></i> Producto frágil: lo empacamos con protección reforzada, pero viaja <strong>bajo tu riesgo</strong>. <a href="politicas.html#fragiles" target="_blank" rel="noopener">Ver condiciones</a></p>` : ""}`;

      const thumbContainer = document.getElementById("modal-thumbnails");
      thumbContainer.innerHTML = "";
      fotosActuales.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.className = "thumb";
        img.style = "width:50px; height:50px; object-fit:contain; border:2px solid #eee; cursor:pointer; border-radius:6px; background:#fff; flex-shrink:0; transition:var(--transition);";
        img.onclick = (e) => { e.stopPropagation(); window.cambiarFoto(i); };
        thumbContainer.appendChild(img);
      });
      document.getElementById("nav-modal-fotos").style.display = fotosActuales.length > 1 ? "flex" : "none";
      window.cambiarFoto(0);
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      const btnModal = document.getElementById("btn-agregar-modal");
      btnModal.disabled = isAgotado;
      btnModal.textContent = isAgotado ? "Producto Agotado" : "Agregar al pedido";
      
      btnModal.onclick = () => {
        if (isAgotado) return;
        addToCart(p);
        btnModal.classList.add("success-state");
        btnModal.textContent = "¡Añadido!";
        setTimeout(() => { cerrarModal(); btnModal.classList.remove("success-state"); }, 600);
      };
    }

    function addToCart(p) {
        const cart = JSON.parse(localStorage.getItem("carrito") || "[]");
        cart.push(p);
        localStorage.setItem("carrito", JSON.stringify(cart));
        updateCart();
    }

    function updateCart() {
        const cant = JSON.parse(localStorage.getItem("carrito") || "[]").length;
        contador.textContent = cant;
        const ni = document.getElementById("ni-contador");
        if (ni) { ni.textContent = cant > 99 ? "99+" : cant; ni.hidden = cant === 0; }
    }

    window.setFiltroDisponibilidad = (filtro) => {
      filtroDisponibilidad = filtro;
      document.getElementById("solo-disponibles").checked = filtro === "disponibles";
      procesarYRenderizarCatalogo();
    };

    function procesarYRenderizarCatalogo() {
      if (vistaActual === "inicio") { renderInicio(); return; }
      if (vistaActual === "subcategorias" && categoriaActual) { renderSubcategorias(categoriaActual); return; }
      const busquedaCentral = document.getElementById("buscar-producto-central").value;
      const criterioOrden = document.getElementById("ordenar-productos").value;
      const cumpleDisponibilidad = (p) => {
        const isAgotado = p.estado === "AGOTADO";
        return filtroDisponibilidad === "todos" ||
               (filtroDisponibilidad === "disponibles" && !isAgotado) ||
               (filtroDisponibilidad === "agotados" && isAgotado);
      };
      const ordenar = (lista) => {
        if (criterioOrden === "precio-asc") lista.sort((a, b) => a.precio - b.precio);
        else if (criterioOrden === "precio-desc") lista.sort((a, b) => b.precio - a.precio);
        else if (criterioOrden === "alfa-asc") lista.sort((a, b) => a.titulo.localeCompare(b.titulo));
        else if (criterioOrden === "alfa-desc") lista.sort((a, b) => b.titulo.localeCompare(a.titulo));
        return lista;
      };

      let resultado = ordenar(categoriaActualProductos.filter(p => {
        const cumpleSub = (subcategoriaSeleccionada === "Todas" || p.subcategoria === subcategoriaSeleccionada);
        return cumpleSub && coincideBusqueda(p, busquedaCentral) && cumpleDisponibilidad(p);
      }));

      // v10: la búsqueda SIEMPRE es en todo el catálogo. Si el cliente está dentro de una categoría,
      // esa categoría sale primero; el resto aparece debajo, agrupado por categoría con su contador.
      const q = busquedaCentral.trim();
      if (q && categoriaActual) {
        const aqui = resultado;   // ya filtrado por la categoría (y la pestaña, si el cliente eligió una)
        const enDonde = subcategoriaSeleccionada !== "Todas" ? nombreSub(subcategoriaSeleccionada) : categoriaActual.nombre;
        const fuera = ordenar(productos.filter(p => !aqui.includes(p) && coincideBusqueda(p, q) && cumpleDisponibilidad(p)));
        const total = aqui.length + fuera.length;
        txtContadorResultados.textContent = `${total} resultado${total === 1 ? "" : "s"} en total`;
        renderProductos([...aqui, ...fuera], { agrupar: true, primero: aqui.length ? aqui[0].categoria.id : null });
        const cont = document.getElementById("contenedor-productos");
        if (total) {
          const div = document.createElement("div");
          div.className = "resumen-busqueda" + (aqui.length ? "" : " sin-aqui");
          div.innerHTML = aqui.length
            ? `<i class="bi bi-search"></i> <strong>${total}</strong> resultado${total === 1 ? "" : "s"} para “${esc(q)}”: <strong>${aqui.length}</strong> en ${esc(enDonde)}` +
              (fuera.length ? ` y <a href="#otras-categorias" class="resumen-salto"><strong>${fuera.length}</strong> en otras categorías <i class="bi bi-arrow-down"></i></a>` : "")
            : `<i class="bi bi-arrow-down-circle-fill"></i> No hay “${esc(q)}” en ${esc(enDonde)}, <strong>pero encontramos ${fuera.length}</strong> en otras categorías`;
          cont.prepend(div);
          const salto = div.querySelector(".resumen-salto");
          if (salto) salto.onclick = (ev) => { ev.preventDefault(); const s = document.getElementById("otras-categorias"); if (s) s.scrollIntoView({ behavior: "smooth", block: "start" }); };
        }
        const detalleVista = document.querySelector("#encabezado-vista .detalle-vista");
        if (detalleVista) detalleVista.textContent = aqui.length ? `en ${enDonde} y en todo el catálogo` : "en todo el catálogo";
        return;
      }

      txtContadorResultados.textContent = `Mostrando ${resultado.length} productos`;
      renderProductos(resultado);
    }

    function crearCardProducto(p) {
      const isAgotado = p.estado === "AGOTADO";
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <div class="imagen-contenedor" onclick="window.openModalDirectly('${p.id}')">
          <img src="${p.imagen || SIN_FOTO}" alt="${p.titulo}" loading="lazy" decoding="async" onerror="reintentarImg(this, SIN_FOTO)"${p.imagen ? "" : ' class="sin-foto"'}>
        </div>
        <div class="contenido">
          <h3 data-id="${esc(p.id)}">${urlPagina(p.id) ? `<a class="titulo-enlace" href="${urlPagina(p.id)}">${esc(p.titulo)}</a>` : esc(p.titulo)}</h3>
          <div class="descripcion-container">
              <p class="descripcion-texto" id="desc-${p.id}">${esc(resumenDescripcion(p.descripcion))}</p>
              ${p.descripcion && p.descripcion.length > 40 ? `<span class="link-leer-mas" id="link-${p.id}" onclick="window.toggleDescripcion('${p.id}')">Leer más...</span>` : ''}
          </div>
          <span class="badge-estado ${isAgotado ? 'estado-agotado' : 'estado-disponible'}">
              ${isAgotado ? 'Agotado' : 'Disponible'}
          </span>${p.fragil ? " " + etiquetaFragil() : ""}
          <p class="precio">Q${p.precio.toFixed(2)}</p>
          <button class="btn-add" data-id="${p.id}" ${isAgotado ? 'disabled' : ''}>
              <i class="bi bi-bag-plus"></i> ${isAgotado ? 'Agotado' : 'Agregar'}
          </button>
        </div>
      `;
      return div;
    }

    function renderProductos(lista, opciones = {}) {
      const contenedor = document.getElementById("contenedor-productos");
      contenedor.innerHTML = "";
      if (lista && lista.length > 0) {
        const seoStatic = document.getElementById('seo-static-content');
        if (seoStatic) seoStatic.style.display = 'none';
      }

      if (lista.length === 0) {
        const e = leerURL();
        // v10: si la palabra no aparece en ningún lado, se dice "en el catálogo" y no se ofrece buscar en todo
        const hayEnOtrasCats = categoriaActual && e.q && productos.some(p => p.categoria.id !== categoriaActual.id && coincideBusqueda(p, e.q));
        contenedor.innerHTML = `<div class="sin-resultados"><i class="bi bi-search" aria-hidden="true"></i>
          <p>No encontramos productos${e.q ? ` para “${esc(e.q)}”` : ""}${hayEnOtrasCats ? ` en ${esc(categoriaActual.nombre)}` : (e.q ? " en el catálogo" : "")}.</p></div>`;
        if (e.q && !hayEnOtrasCats) {
          contenedor.querySelector(".sin-resultados p").insertAdjacentHTML("beforeend", `<br>Prueba con otra palabra o <a href="https://wa.me/${CONFIG.telefonoWhatsApp}?text=${encodeURIComponent("Hola, estoy buscando: " + e.q)}" target="_blank" rel="noopener">pregúntanos por WhatsApp</a>.`);
        } else if (hayEnOtrasCats) {
          const a = document.createElement("a");
          a.className = "btn-ver-todos-productos";
          a.href = construirURL({ q: e.q });
          a.innerHTML = `<i class="bi bi-search"></i> Buscar “${esc(e.q)}” en todo el catálogo`;
          enlaceInterno(a, { q: e.q });
          contenedor.querySelector(".sin-resultados").appendChild(a);
        } else if (filtroDisponibilidad === "disponibles") {
          contenedor.querySelector(".sin-resultados p").insertAdjacentText("beforeend", " Prueba apagando “Solo disponibles”.");
        }
        return;
      }

      // Vista "Ver todos los productos" (?ver=todos): agrupar por categoría, como en la v8
      const esTodo = vistaActual === "todos" || opciones.agrupar;

      if (esTodo) {
        const porCategoria = {};
        lista.forEach(p => {
          const key = p.categoria.id;
          if (!porCategoria[key]) porCategoria[key] = { id: key, nombre: p.categoria.nombre, items: [] };
          porCategoria[key].items.push(p);
        });

        Object.values(porCategoria).forEach((cat, idx) => {
          const seccion = document.createElement("div");
          // Primera categoría expandida, el resto colapsadas en móvil
          const isMobile = window.innerWidth < 768;
          const colapsar = isMobile && idx > 0 && !opciones.agrupar;
          const esPrimera = opciones.agrupar && opciones.primero && cat.id === opciones.primero;
          seccion.className = "seccion-categoria" + (colapsar ? " colapsada" : "") + (opciones.agrupar && !esPrimera ? " seccion-otra" : "") + (esPrimera ? " seccion-aqui" : "");
          if (opciones.agrupar && !esPrimera && !document.getElementById("otras-categorias")) seccion.id = "otras-categorias";

          const header = document.createElement("div");
          header.className = "seccion-categoria-header";
          header.setAttribute("role", "button");
          header.setAttribute("aria-expanded", colapsar ? "false" : "true");
          header.innerHTML = `
            <h2><i class="bi bi-tag-fill" style="font-size:0.8rem; opacity:0.5; margin-right:6px;"></i>${cat.nombre}</h2>
            ${esPrimera ? '<span class="cat-aqui"><i class="bi bi-geo-alt-fill"></i> Estás aquí</span>' : ""}
            <span class="cat-badge">${cat.items.length} producto${cat.items.length !== 1 ? 's' : ''}</span>
            <i class="bi bi-chevron-down cat-chevron"></i>
          `;
          header.addEventListener("click", () => {
            const colapsada = seccion.classList.toggle("colapsada");
            header.setAttribute("aria-expanded", String(!colapsada));
          });
          seccion.appendChild(header);

          const body = document.createElement("div");
          body.className = "cat-body";
          const inner = document.createElement("div");
          inner.className = "cat-body-inner";
          const grid = document.createElement("div");
          grid.className = "grid-categoria";
          cat.items.forEach(p => grid.appendChild(crearCardProducto(p)));
          inner.appendChild(grid);
          body.appendChild(inner);
          seccion.appendChild(body);
          contenedor.appendChild(seccion);
        });
      } else {
        // Vista filtrada: grid plano sin segmentación
        const grid = document.createElement("div");
        grid.className = "grid-categoria";
        lista.forEach(p => grid.appendChild(crearCardProducto(p)));
        contenedor.appendChild(grid);
      }

      document.querySelectorAll(".btn-add").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const p = productos.find(x => x.id === btn.dataset.id);
          addToCart(p);
          btn.classList.add("success-state");
          btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡Listo!';
          setTimeout(() => { btn.classList.remove("success-state"); btn.innerHTML = '<i class="bi bi-bag-plus"></i> Agregar'; }, 900);
        };
      });
    }

    // ── v9: subcategorías ──
    // Productos sin subcategoría se agrupan como "OTROS" (valor interno "", URL &sub=otros)
    const nombreSub = (s) => s === "" ? "Otros" : s;
    const slugSub = (s) => s === "" ? "otros" : slugify(s);
    function gruposSub(cat) {
        const m = new Map();
        cat.items.forEach(p => { const k = p.subcategoria || ""; if (!m.has(k)) m.set(k, []); m.get(k).push(p); });
        const reales = [...m.keys()].filter(k => k).sort();
        const grupos = reales.map(k => ({ sub: k, items: m.get(k) }));
        if (m.has("") && reales.length) grupos.push({ sub: "", items: m.get("") });
        return grupos;
    }
    // Tarjetas de subcategoría solo si hay 2+ subcategorías con 3+ productos en promedio
    function usaTarjetasSub(cat) {
        const g = gruposSub(cat);
        return g.length >= 2 && cat.items.length / g.length >= 3;
    }

    // v9: los botones de subcategoría cambian la URL (?cat=…&sub=…)
    function generarSubfiltros(cat, subActiva = "Todas") {
        subContainer.innerHTML = "";
        const grupos = gruposSub(cat);
        // Con una sola subcategoría (o ninguna) los botones no aportan nada
        if (grupos.length < 2) return;
        const conTarjetas = usaTarjetasSub(cat);
        // v10: chips con mini foto y contador; el elegido se rellena con un pequeño rebote
        const crear = (texto, sub, n, items) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn-subfiltro" + (sub === subActiva ? " activo" : "");
            btn.setAttribute("role", "tab");
            btn.setAttribute("aria-selected", String(sub === subActiva));
            const conFoto = items && items.find(p => p.imagen && p.estado !== "AGOTADO") || (items || []).find(p => p.imagen);
            btn.innerHTML = (conFoto
                ? `<img src="${esc(miniatura(conFoto.imagen, 80))}" alt="" loading="lazy" width="28" height="28" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'bi bi-tag'}))">`
                : `<i class="bi bi-grid-3x3-gap" aria-hidden="true"></i>`)
              + `<span>${esc(texto)}</span><b>${n}</b>`;
            btn.onclick = () => {
                const e = leerURL();
                const destino = sub === "Todas"
                  ? { cat: cat.slug, ver: conTarjetas ? "todos" : "", q: e.q }
                  : { cat: cat.slug, sub: slugSub(sub), q: e.q };
                navegar(destino, { desplazar: false });
            };
            subContainer.appendChild(btn);
        };
        crear("Todas", "Todas", cat.items.length, null);
        grupos.forEach(g => crear(nombreSub(g.sub), g.sub, g.items.length, g.items));
        // Flecha "›" cuando hay más chips de los que caben
        const mas = document.createElement("button");
        mas.type = "button";
        mas.className = "sub-mas";
        mas.setAttribute("aria-label", "Ver más subcategorías");
        mas.innerHTML = '<i class="bi bi-chevron-right" aria-hidden="true"></i>';
        mas.onclick = () => subContainer.scrollBy({ left: subContainer.clientWidth * 0.7, behavior: "smooth" });
        subContainer.appendChild(mas);
        // Flecha "‹" para regresar cuando la fila ya se deslizó
        const menos = document.createElement("button");
        menos.type = "button";
        menos.className = "sub-mas sub-menos oculto";
        menos.setAttribute("aria-label", "Ver subcategorías anteriores");
        menos.innerHTML = '<i class="bi bi-chevron-left" aria-hidden="true"></i>';
        menos.onclick = () => subContainer.scrollBy({ left: -subContainer.clientWidth * 0.7, behavior: "smooth" });
        subContainer.prepend(menos);
        const revisarMas = () => {
            const hayMas = subContainer.scrollWidth - subContainer.clientWidth - subContainer.scrollLeft > 8;
            mas.classList.toggle("oculto", !hayMas);
            menos.classList.toggle("oculto", subContainer.scrollLeft <= 8);
            subContainer.classList.toggle("con-mas", hayMas);
        };
        subContainer.onscroll = revisarMas;
        // Desliza la fila para que el chip activo quede a la vista (sin mover la página)
        requestAnimationFrame(() => {
            const activa = subContainer.querySelector(".btn-subfiltro.activo");
            if (activa && activa !== subContainer.querySelector(".btn-subfiltro")) subContainer.scrollLeft = Math.max(0, activa.offsetLeft - subContainer.offsetLeft - (subContainer.clientWidth - activa.offsetWidth) / 2);
            revisarMas();
            // La primera vez que el cliente ve una fila que no cabe, se desliza un poco para mostrar que hay más
            let yaMostrado = false;
            try { yaMostrado = sessionStorage.getItem("gc-sub-pista") === "1"; } catch (e) {}
            const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (!yaMostrado && !reducir && subContainer.scrollLeft === 0 && subContainer.scrollWidth > subContainer.clientWidth + 40) {
                try { sessionStorage.setItem("gc-sub-pista", "1"); } catch (e) {}
                setTimeout(() => {
                    subContainer.scrollTo({ left: 90, behavior: "smooth" });
                    setTimeout(() => subContainer.scrollTo({ left: 0, behavior: "smooth" }), 700);
                }, 600);
            }
        });
    }

    function renderMigas(e, cat) {
        const migas = document.getElementById("migas");
        if (!migas) return;
        migas.innerHTML = "";
        // v9: en el Inicio la ruta muestra "⌂ Inicio" resaltado como página actual (estás aquí)
        migas.classList.toggle("en-inicio", vistaActual === "inicio");
        if (vistaActual === "inicio") {
          migas.innerHTML = '<span class="migas-actual migas-aqui" aria-current="page"><i class="bi bi-house-door-fill" aria-hidden="true"></i> Inicio</span>';
          return;
        }
        const partes = [{ texto: "Inicio", estado: {}, icono: "bi-house-door-fill" }];
        if (cat) {
            partes.push({ texto: cat.nombre, estado: { cat: cat.slug } });
            if (subcategoriaSeleccionada !== "Todas") partes.push({ texto: nombreSub(subcategoriaSeleccionada), estado: { cat: cat.slug, sub: e.sub } });
            else if (e.ver === "todos" && usaTarjetasSub(cat)) partes.push({ texto: "Todos los productos", estado: { cat: cat.slug, ver: "todos" } });
        } else if (vistaActual === "todos") {
            partes.push({ texto: "Todos los productos", estado: { ver: "todos" } });
        }
        if (e.q) partes.push({ texto: `Búsqueda: "${e.q}"`, estado: null });
        partes.pop();   // v9: la página actual no se repite en la ruta; se muestra como título
        partes.forEach((parte, i) => {
            if (i > 0) migas.insertAdjacentHTML("beforeend", ' <i class="bi bi-chevron-right migas-sep" aria-hidden="true"></i> ');   // espacios: Google lee "Inicio Utensilios", no "InicioUtensilios"
            if (!parte.estado) {
                const span = document.createElement("span");
                span.className = "migas-actual";
                span.textContent = parte.texto;
                migas.appendChild(span);
            } else {
                const a = document.createElement("a");
                a.href = construirURL(parte.estado);
                a.innerHTML = (parte.icono ? `<i class="bi ${parte.icono}"></i> ` : "") + esc(parte.texto);
                enlaceInterno(a, parte.estado);
                migas.appendChild(a);
            }
        });
    }

    // v9: franja de "Destacados" en Inicio — productos al azar (cambian en cada visita),
    // avanza sola cada 3.5 s, se detiene al tocarla/pasar el mouse y se puede deslizar.
    let destacadosActuales = null;      // misma selección durante la visita (al regresar a Inicio no cambia)
    let temporizadorDestacados = null;
    function detenerDestacados() { clearInterval(temporizadorDestacados); temporizadorDestacados = null; }

    function crearDestacados(cantidad = 12) {
        if (!destacadosActuales) {
            const pool = productos.filter(p => p.imagen && p.estado !== "AGOTADO");
            for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
            destacadosActuales = pool.slice(0, cantidad);
        }
        if (destacadosActuales.length < 3) return null;

        const seccion = document.createElement("section");
        seccion.className = "destacados";
        seccion.setAttribute("aria-label", "Productos destacados");
        seccion.innerHTML = `
          <div class="destacados-cabecera">
            <h2 class="titulo-collage"><i class="bi bi-stars" aria-hidden="true"></i> Productos <span>destacados</span></h2>
            <div class="destacados-flechas">
              <button type="button" class="destacados-flecha" data-dir="-1" aria-label="Anteriores"><i class="bi bi-chevron-left"></i></button>
              <button type="button" class="destacados-flecha" data-dir="1" aria-label="Siguientes"><i class="bi bi-chevron-right"></i></button>
            </div>
          </div>
          <div class="destacados-pista"></div>`;
        const pista = seccion.querySelector(".destacados-pista");
        destacadosActuales.forEach(p => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "destacado-card";
            b.setAttribute("aria-label", `${p.titulo}, Q${p.precio.toFixed(2)}`);
            b.innerHTML = `
              <img src="${miniatura(p.imagen)}" alt="" loading="lazy" decoding="async" onerror="reintentarImg(this, SIN_FOTO)">
              <span class="destacado-titulo">${esc(p.titulo)}</span>
              <span class="destacado-precio">Q${p.precio.toFixed(2)}</span>`;
            b.onclick = () => window.openModalDirectly(p.id);
            pista.appendChild(b);
        });

        let encima = false, pausaHasta = 0;
        const pausar = () => { pausaHasta = Date.now() + 6000; };
        const avanzar = (dir) => {
            const tarjeta = pista.firstElementChild;
            if (!tarjeta) return;
            const paso = tarjeta.offsetWidth + (parseFloat(getComputedStyle(pista).columnGap) || 0);
            const alFinal = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 5;
            if (dir > 0 && alFinal) pista.scrollTo({ left: 0, behavior: "smooth" });
            else pista.scrollBy({ left: dir * paso, behavior: "smooth" });
        };
        seccion.querySelectorAll(".destacados-flecha").forEach(btn => btn.onclick = () => { pausar(); avanzar(+btn.dataset.dir); });
        ["pointerdown", "touchstart", "wheel", "focusin"].forEach(ev => pista.addEventListener(ev, pausar, { passive: true }));
        pista.addEventListener("mouseenter", () => { encima = true; });
        pista.addEventListener("mouseleave", () => { encima = false; });

        detenerDestacados();
        const movimientoReducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!movimientoReducido) {
            temporizadorDestacados = setInterval(() => {
                if (!pista.isConnected) { detenerDestacados(); return; }
                if (encima || document.hidden || Date.now() < pausaHasta || modal.style.display === "flex") return;
                avanzar(1);
            }, 3500);
        }
        return seccion;
    }

    // v9: tarjeta con collage de 4 fotos (se usa para categorías y para subcategorías)
    function crearTarjetaCollage(nombre, items, semilla, estado) {
        const fotos = fotosCollage({ id: semilla, items });
        const a = document.createElement("a");
        a.className = "cat-tile";
        a.href = construirURL(estado);
        a.setAttribute("aria-label", `${nombre}: ${items.length} productos`);
        const imgs = fotos.length
          ? fotos.map(p => `<img src="${miniatura(p.imagen)}" alt="" loading="lazy" decoding="async" onerror="reintentarImg(this, SIN_FOTO)">`).join("")
          : `<img src="${SIN_FOTO}" alt="" class="sin-foto">`;
        a.innerHTML = `
          <div class="cat-collage n${Math.max(1, fotos.length)}">${imgs}</div>
          <div class="cat-tile-info">
            <div class="cat-tile-texto">
              <span class="cat-tile-nombre">${esc(nombre)}</span>
              <span class="cat-tile-cuenta">${items.length} producto${items.length !== 1 ? "s" : ""}</span>
            </div>
            <i class="bi bi-arrow-right-circle-fill" aria-hidden="true"></i>
          </div>`;
        enlaceInterno(a, estado);
        return a;
    }

    // v9: al entrar a una categoría — una tarjeta por subcategoría + botón "Ver todos los productos de …"
    let categoriaActual = null;
    function renderSubcategorias(cat) {
        const contenedor = document.getElementById("contenedor-productos");
        contenedor.innerHTML = "";
        const seoStatic = document.getElementById("seo-static-content");
        if (seoStatic) seoStatic.style.display = "none";
        const grupos = gruposSub(cat);
        txtContadorResultados.textContent = `${grupos.length} subcategorías · ${cat.items.length} productos`;

        const grid = document.createElement("div");
        grid.className = "grid-collage";
        grupos.forEach(g => grid.appendChild(
            crearTarjetaCollage(nombreSub(g.sub), g.items, `${cat.id}|${g.sub}`, { cat: cat.slug, sub: slugSub(g.sub) })));
        contenedor.appendChild(grid);

        const verTodo = document.createElement("a");
        verTodo.className = "btn-ver-todos-productos";
        verTodo.href = construirURL({ cat: cat.slug, ver: "todos" });
        verTodo.innerHTML = `<i class="bi bi-grid-3x3-gap-fill"></i> Ver todos los productos de ${esc(cat.nombre)}`;
        enlaceInterno(verTodo, { cat: cat.slug, ver: "todos" });
        contenedor.appendChild(verTodo);
    }

    // v9: pantalla inicial — una tarjeta por categoría con collage de 4 fotos
    function renderInicio() {
        const contenedor = document.getElementById("contenedor-productos");
        contenedor.innerHTML = "";
        const destacados = crearDestacados();
        if (destacados) contenedor.appendChild(destacados);
        const seoStatic = document.getElementById("seo-static-content");
        if (seoStatic && productos.length) seoStatic.style.display = "none";
        txtContadorResultados.textContent = `${categorias.length} categorías · ${productos.length} productos`;

        const titulo = document.createElement("h2");
        titulo.className = "titulo-collage";
        titulo.innerHTML = 'Explora por <span>categoría</span>';
        contenedor.appendChild(titulo);

        const grid = document.createElement("div");
        grid.className = "grid-collage";
        categorias.forEach(cat => grid.appendChild(crearTarjetaCollage(cat.nombre, cat.items, cat.id, { cat: cat.slug })));
        contenedor.appendChild(grid);

        const verTodo = document.createElement("a");
        verTodo.className = "btn-ver-todos-productos";
        verTodo.href = construirURL({ ver: "todos" });
        verTodo.innerHTML = '<i class="bi bi-grid-3x3-gap-fill"></i> Ver todos los productos';
        enlaceInterno(verTodo, { ver: "todos" });
        contenedor.appendChild(verTodo);
    }

    // v9: dibuja la vista que indica la URL. Se llama al cargar, al navegar y al presionar Regresar/Adelante.
    // v9.1: encuentra la categoría aunque el enlace no coincida exacto con el Sheet
    // (ej. ?cat=1000-piezas encuentra "1000 Piezas", "1000_piezas" o "Rompecabezas 1000 piezas").
    function buscarCategoria(valor) {
        if (!valor || !categorias.length) return null;
        const v = slugify(valor);
        const exacta = categorias.find(c => c.slug === v) || categorias.find(c => slugify(c.id) === v);
        if (exacta) return exacta;
        const palabras = v.split("-").filter(Boolean);
        const numeros = palabras.filter(w => /^\d+$/.test(w));
        const candidatas = categorias.filter(c => {
            const ps = new Set([...c.slug.split("-"), ...slugify(c.id).split("-")]);
            return numeros.length ? numeros.every(n => ps.has(n)) : palabras.every(w => ps.has(w) || c.slug.includes(w));
        });
        if (candidatas.length) return candidatas.sort((x, y) => x.slug.length - y.slug.length)[0];
        console.warn(`[v9] La categoría "${valor}" no existe en el Sheet. Disponibles:`, categorias.map(c => "?cat=" + c.slug).join("  "));
        return null;
    }

    function renderDesdeURL({ restaurarScroll = null } = {}) {
        const e = leerURL();
        const busqueda = document.getElementById("buscar-producto-central");
        if (busqueda.value !== e.q) busqueda.value = e.q;

        const vistaKey = construirURL({ ...e, p: "" });
        if (vistaKey !== ultimaVistaKey) {
            ultimaVistaKey = vistaKey;
            const cat = buscarCategoria(e.cat);
            categoriaActual = cat || null;
            if (cat) {
                categoriaActualProductos = cat.items;
                const grupos = gruposSub(cat);
                const grupo = (e.sub && !e.q) ? (grupos.find(g => g.sub && slugify(g.sub) === e.sub) || grupos.find(g => g.sub === "" && e.sub === "otros")) : null;
                subcategoriaSeleccionada = grupo ? grupo.sub : "Todas";
                // Sin subcategoría elegida, sin búsqueda y sin "ver todos" → tarjetas de subcategorías
                vistaActual = (!grupo && !e.q && e.ver !== "todos" && usaTarjetasSub(cat)) ? "subcategorias" : "categoria";
                if (vistaActual === "subcategorias") subContainer.innerHTML = "";
                else if (e.q) subContainer.innerHTML = "";   // v10: con búsqueda no hay pestañas (se busca en todo)
                else generarSubfiltros(cat, subcategoriaSeleccionada);
                document.title = `${grupo ? nombreSub(grupo.sub) + " · " : ""}${cat.nombre} | ${CONFIG.nombreNegocio}`;
            } else {
                if (e.cat && categorias.length && !e.q) {   // v9.1: categoría inexistente → buscar por su nombre
                    e.q = e.cat.replace(/-/g, " ");
                    if (busqueda.value !== e.q) busqueda.value = e.q;
                }
                vistaActual = e.q ? "busqueda" : (e.ver === "todos" ? "todos" : "inicio");
                categoriaActualProductos = [...productos];
                subcategoriaSeleccionada = "Todas";
                subContainer.innerHTML = "";
                document.title = vistaActual === "todos" ? `Todos los productos | ${CONFIG.nombreNegocio}` : CONFIG.tituloPagina;
            }
            document.body.classList.toggle("vista-inicio", vistaActual === "inicio");
            document.body.classList.toggle("vista-tarjetas", vistaActual === "inicio" || vistaActual === "subcategorias");
            if (vistaActual !== "inicio") detenerDestacados();
            document.querySelectorAll("#menu-categorias .boton-categoria").forEach(b => {
                b.classList.toggle("activo", b.dataset.vista === (cat ? "cat:" + cat.slug : vistaActual));
            });
            renderMigas(e, cat);
            renderEncabezado(e, cat);
            actualizarSEO(e, cat);
            actualizarBotonVolver();
            marcarNavInferior();
            procesarYRenderizarCatalogo();
            if (restaurarScroll !== null) requestAnimationFrame(() => window.scrollTo(0, restaurarScroll));
        }

        // Ventana del producto
        if (e.p && productos.some(x => x.id === e.p)) {
            if (modal.style.display !== "flex" || document.getElementById("modal-titulo").dataset.id !== e.p) abrirModal(e.p);
            document.getElementById("modal-titulo").dataset.id = e.p;
        } else if (modal.style.display === "flex") {
            ocultarModal();
        }
    }

    // v9: título visible de la página (en Inicio se usa el título grande de Miika)
    function renderEncabezado(e, cat) {
      const cont = document.getElementById("encabezado-vista");
      const buscador = document.getElementById("buscar-producto-central");
      buscador.placeholder = cat ? "Buscar en todo el catálogo…" : "Buscar por nombre, código o palabra clave...";   // v10: la búsqueda siempre es en todo
      if (!cont) return;
      if (vistaActual === "inicio") { cont.innerHTML = ""; return; }
      let titulo, detalle = "", icono = "";
      if (e.q) {
        titulo = `Resultados para “${esc(e.q)}”`;
        detalle = cat ? `en ${subcategoriaSeleccionada !== "Todas" ? esc(nombreSub(subcategoriaSeleccionada)) + " · " : ""}${esc(cat.nombre)}` : "en todo el catálogo";
        icono = "bi-search";
      } else if (cat) {
        icono = iconoCategoria(cat.nombre);
        if (vistaActual === "subcategorias") {
          titulo = esc(cat.nombre);
          detalle = "Elige una subcategoría";
        } else if (subcategoriaSeleccionada !== "Todas") {
          titulo = esc(nombreSub(subcategoriaSeleccionada));
        } else {
          titulo = esc(cat.nombre);
          detalle = usaTarjetasSub(cat) ? "Todos los productos" : "";
        }
      } else {
        titulo = "Todos los productos"; icono = "bi-grid-3x3-gap";
      }
      cont.innerHTML = `<h1 class="titulo-vista">${icono ? `<i class="bi ${icono}" aria-hidden="true"></i>` : ""}<span>${titulo}</span></h1>${detalle ? `<p class="detalle-vista">${detalle}</p>` : ""}`;
    }

    // v9: canonical y descripción por vista. Las categorías y subcategorías tienen su propia URL oficial;
    // búsquedas y "ver todos" apuntan al inicio para no crear páginas duplicadas en Google.
    function actualizarSEO(e, cat) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
      // v10: la versión oficial de cada categoría es su página fija c/<categoría>/<subcategoría>/ (la genera
      // process/GenerarPaginas.py). Así Google no ve "?cat=…" como copia del inicio.
      let ruta = "";
      if (cat && !e.q) {
        ruta = "c/" + cat.slug + "/";
        const sub = subcategoriaSeleccionada;
        if (sub !== "Todas" && sub && slugify(sub) !== cat.slug) ruta += slugify(sub) + "/";
      }
      link.href = CONFIG.urlSitio + ruta;
      // (en Inicio no hay categoría: cat es null)
      const enSub = !!cat && subcategoriaSeleccionada !== "Todas";
      const delGrupo = cat ? (enSub ? cat.items.filter(p => (p.subcategoria || "") === subcategoriaSeleccionada) : cat.items) : [];
      const cuantos = delGrupo.length;
      const ejemplos = delGrupo.filter(p => p.estado !== "AGOTADO").slice(0, 3).map(p => p.titulo.toLowerCase()).join(", ");
      const desc = cat && !e.q
        ? `${enSub ? nombreSub(subcategoriaSeleccionada) + " – " : ""}${cat.nombre} en ${CONFIG.nombreNegocio}: ${cuantos} productos con precio y disponibilidad${ejemplos ? ", como " + ejemplos : ""}. Envíos a toda Guatemala.`
        : CONFIG.metaDescripcion;
      document.getElementById("meta-desc").content = desc;
      document.getElementById("meta-og-description").content = desc;
      document.getElementById("meta-og-title").content = document.title;
    }

    // v9: resalta en la barra inferior la sección donde está el cliente
    function marcarNavInferior() {
      const actual = leerURL().q ? "buscar" : (vistaActual === "inicio" ? "inicio" : "categorias");
      document.querySelectorAll("#nav-inferior .ni-item").forEach(el => {
        const activo = el.dataset.ni === actual;
        el.classList.toggle("activo", activo);
        if (activo) el.setAttribute("aria-current", "page"); else el.removeAttribute("aria-current");
      });
    }
    (function iniciarNavInferior() {
      const nav = document.getElementById("nav-inferior");
      if (!nav) return;
      nav.querySelector('[data-ni="inicio"]').addEventListener("click", (ev) => {
        if (ev.ctrlKey || ev.metaKey) return;
        ev.preventDefault();
        if (vistaActual === "inicio" && !leerURL().q) window.scrollTo({ top: 0, behavior: "smooth" }); else irAlInicio();
      });
      nav.querySelector('[data-ni="categorias"]').onclick = () => aside.classList.add("abierto");
      // Buscar: abre el teclado de inmediato (en iPhone solo se abre si es en el mismo toque)
      // y deja la caja justo debajo del encabezado, para que el teclado no la tape
      nav.querySelector('[data-ni="buscar"]').onclick = () => {
        const caja = document.getElementById("buscar-producto-central");
        caja.focus({ preventScroll: true });
        const alto = document.getElementById("page-header").getBoundingClientRect().bottom;
        window.scrollTo({ top: Math.max(0, caja.getBoundingClientRect().top + window.scrollY - alto - 14), behavior: "smooth" });
      };
      // WhatsApp: mismo enlace que el botón de chat
      const wa = nav.querySelector('[data-ni="whatsapp"]');
      const sincronizar = () => { const o = document.getElementById("wa-animado"); if (o && o.getAttribute("href") && o.getAttribute("href") !== "#") wa.href = o.href; };
      sincronizar(); setTimeout(sincronizar, 800);
    })();

    // Deja ordenar y disponibilidad como al inicio (sin redibujar)
    function resetearControles() {
      document.getElementById("ordenar-productos").value = "predeterminado";
      filtroDisponibilidad = "todos";
      document.getElementById("solo-disponibles").checked = false;
    }
    // v9: botón flotante "volver" — sube un nivel según la página actual
    //   Inicio → Volver arriba · Subcategoría / "ver todos" de una categoría con tarjetas → ← CATEGORÍA
    //   Búsqueda → ← Volver (quita la búsqueda) · Lo demás → ← Inicio
    // El filtro "Solo disponibles" y el orden se conservan; solo se reinician al ir al Inicio.
    let accionVolver = null;
    function actualizarBotonVolver() {
      const e = leerURL();
      const cat = categoriaActual;
      let texto, icono = "bi-arrow-left", aria;
      if (vistaActual === "inicio") {
        texto = "Volver arriba"; icono = "bi-arrow-up"; aria = "Volver arriba";
        accionVolver = () => window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.q) {
        texto = "Volver"; aria = "Quitar la búsqueda y volver";
        accionVolver = () => {
          if (history.state && history.state.busqueda) history.back();
          else navegar({ cat: e.cat, sub: e.sub, ver: e.cat ? e.ver : "" });
        };
      } else if (cat && vistaActual === "categoria" && usaTarjetasSub(cat)) {
        texto = cat.nombre; aria = `Volver a ${cat.nombre}`;
        accionVolver = () => navegar({ cat: cat.slug });
      } else {
        texto = "Inicio"; aria = "Volver al Inicio";
        accionVolver = irAlInicio;
      }
      btnVolverFloat.innerHTML = `<i class="bi ${icono}" aria-hidden="true"></i><span>${esc(texto)}</span>`;
      // La casita solo aparece cuando el botón principal NO lleva ya al Inicio
      document.getElementById("btn-inicio-float").hidden = vistaActual === "inicio" || texto === "Inicio";
      btnVolverFloat.setAttribute("aria-label", aria);
      btnVolverFloat.title = aria;
    }

    function irAlInicio() {
      resetearControles();
      aside.classList.remove("abierto");
      const e = leerURL();
      if (!e.cat && !e.q && !e.ver && !e.p) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      navegar({});
    }

    function iniciarApp() {
        // Agrupar productos por categoría (ya vienen sin espacios sobrantes desde parsearCSV)
        const mapa = new Map();
        productos.forEach(p => {
            if (!p.categoria.id) return;
            if (!mapa.has(p.categoria.id)) mapa.set(p.categoria.id, { id: p.categoria.id, nombre: p.categoria.nombre || p.categoria.id, items: [] });
            mapa.get(p.categoria.id).items.push(p);
        });
        const usados = new Set();
        categorias = [...mapa.values()].sort((a, b) => a.id.localeCompare(b.id)).map(c => {
            let slug = slugify(c.nombre) || slugify(c.id) || "categoria";
            const base = slug; let n = 2;
            while (usados.has(slug)) slug = `${base}-${n++}`;
            usados.add(slug);
            return { ...c, slug };
        });

        const menuCat = document.getElementById("menu-categorias");
        menuCat.innerHTML = "";
        const agregarBoton = (html, estado, clave, extraClase = "") => {
            const a = document.createElement("a");
            a.className = "boton-categoria " + extraClase;
            a.href = construirURL(estado);
            a.dataset.vista = clave;
            a.innerHTML = html;
            enlaceInterno(a, estado);
            menuCat.appendChild(a);
        };
        agregarBoton('<i class="bi bi-house-door-fill"></i> INICIO', {}, "inicio", "btn-ver-todo");
        agregarBoton('<i class="bi bi-grid-fill"></i> VER TODOS LOS PRODUCTOS', { ver: "todos" }, "todos", "btn-ver-todo");
        categorias.forEach(cat => agregarBoton(
            `<i class="bi ${iconoCategoria(cat.nombre)} icono-cat" aria-hidden="true"></i><span>${esc(cat.nombre)}</span>`,
            { cat: cat.slug }, "cat:" + cat.slug));

        const st = history.state || {};
        history.replaceState({ ...st, gc: true, scrollY: st.scrollY || 0 }, "", location.href);
        renderPortada();          // v9.2: portada con las categorías reales del Sheet
        ultimaVistaKey = null;   // v9.1: si el usuario tocó un botón antes de que cargara el catálogo, volver a dibujar
        renderDesdeURL({ restaurarScroll: st.scrollY || null });
        updateCart();
    }

    function ocultarModal() { modal.style.display = "none"; document.body.style.overflow = "auto"; }
    // v9: cerrar la ventana = regresar un paso (si la abrimos nosotros); si entraron con el enlace directo, solo quita "&p="
    function cerrarModal() {
      const e = leerURL();
      if (!e.p) { ocultarModal(); return; }
      if (history.state && history.state.modal) { history.back(); return; }
      history.replaceState({ gc: true, scrollY: window.scrollY }, "", construirURL({ ...e, p: "" }));
      ocultarModal();
    }
    modal.onclick = (e) => { if(e.target === modal) cerrarModal(); };
    document.getElementById("cerrar-modal-btn").onclick = cerrarModal;
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.style.display === "flex") cerrarModal(); });

    window.addEventListener("popstate", (ev) => {
      if (!productos.length) return;
      const y = ev.state && typeof ev.state.scrollY === "number" ? ev.state.scrollY : 0;
      renderDesdeURL({ restaurarScroll: y });
    });

    document.getElementById("prev-foto").onclick = (e) => {
      e.stopPropagation();
      indexActual = (indexActual - 1 + fotosActuales.length) % fotosActuales.length;
      window.cambiarFoto(indexActual);
    };
    document.getElementById("next-foto").onclick = (e) => {
      e.stopPropagation();
      indexActual = (indexActual + 1) % fotosActuales.length;
      window.cambiarFoto(indexActual);
    };

    document.getElementById("toggle-menu").onclick = () => aside.classList.add("abierto");
    document.getElementById("cerrar-menu").onclick = () => aside.classList.remove("abierto");

    // v9: la búsqueda se guarda en la URL (?q=). La primera letra crea un paso en el historial;
    // las siguientes solo lo actualizan, para que Regresar no tenga que borrar letra por letra.
    let temporizadorBusqueda;
    function buscar(valor) {
      clearTimeout(temporizadorBusqueda);
      temporizadorBusqueda = setTimeout(() => {
        const e = leerURL();
        const q = valor.trim() ? valor : "";
        if (q === e.q) return;
        if (!q && history.state && history.state.busqueda) { history.back(); return; }
        // v10: la búsqueda cubre la categoría completa (sale primero) y todo el catálogo; se quita la pestaña
        const nuevo = { cat: e.cat, sub: "", ver: e.cat ? "" : e.ver, q };
        // v9: mantener la caja de búsqueda en el mismo lugar de la pantalla mientras cambia la página
        // (al pasar del Inicio a resultados desaparece el banner; en iPhone la caja quedaba escondida arriba)
        const caja = document.getElementById("buscar-producto-central");
        const antes = document.activeElement === caja ? caja.getBoundingClientRect().top : null;
        if (e.q) navegar(nuevo, { reemplazar: true, desplazar: false, estado: { busqueda: true } });
        else navegar(nuevo, { desplazar: false, estado: { busqueda: true } });
        if (antes !== null) {
          const ajuste = caja.getBoundingClientRect().top - antes;
          if (Math.abs(ajuste) > 1) window.scrollTo(0, Math.max(0, window.scrollY + ajuste));
        }
      }, 350);
    }
    document.getElementById("buscar-producto-central").oninput = (e) => buscar(e.target.value);
    document.getElementById("ordenar-productos").onchange = () => procesarYRenderizarCatalogo();
    // v9: interruptor "Solo disponibles" (reemplaza los botones Todos / Disponibles / Agotados)
    document.getElementById("solo-disponibles").onchange = (e) => window.setFiltroDisponibilidad(e.target.checked ? "disponibles" : "todos");

    const btnInicioBarra = document.getElementById("btn-limpiar-filtros");
    if (btnInicioBarra) btnInicioBarra.onclick = irAlInicio;

    // v9: el buscador del menú lateral busca PRODUCTOS en todo el catálogo.
    // Muestra hasta 6 coincidencias (primero las que tienen la palabra en el nombre) y un botón para ver todas.
    const inputMenu = document.getElementById("buscar-categoria");
    const sugMenu = document.getElementById("sugerencias-menu");
    let temporizadorMenu;
    const resultadosMenu = (q) => {
      const n = normalizar(q);
      return productos.filter(p => coincideBusqueda(p, q))
        .sort((a, b) => (normalizar(b.titulo).includes(n) - normalizar(a.titulo).includes(n)) || ((a.estado === "AGOTADO") - (b.estado === "AGOTADO")));
    };
    const verTodosMenu = (q) => {
      aside.classList.remove("abierto");
      document.getElementById("buscar-producto-central").value = q;
      navegar({ q });
    };
    function pintarSugerencias() {
      const q = inputMenu.value.trim();
      if (q.length < 2) { sugMenu.hidden = true; sugMenu.innerHTML = ""; return; }
      const lista = resultadosMenu(q);
      sugMenu.hidden = false;
      if (!lista.length) {
        sugMenu.innerHTML = `<p class="sug-vacio">No encontramos productos para “${esc(q)}”.<br>Prueba con otra palabra o elige una categoría.</p>`;
        return;
      }
      sugMenu.innerHTML = lista.slice(0, 6).map(p => `
        <button type="button" class="sug-item" data-id="${esc(p.id)}">
          <img src="${miniatura(p.imagen, 120) || SIN_FOTO}" alt="" loading="lazy" onerror="reintentarImg(this, SIN_FOTO)">
          <span class="sug-texto"><span class="sug-nombre">${esc(p.titulo)}</span>
          <span class="sug-meta">${p.estado === "AGOTADO" ? '<span class="sug-agotado">Agotado</span>' : `Q${p.precio.toFixed(2)}`} · ${esc(p.categoria.nombre)}</span></span>
        </button>`).join("") +
        `<button type="button" class="sug-todos"><i class="bi bi-search"></i> Ver todos los resultados (${lista.length})</button>`;
      sugMenu.querySelectorAll(".sug-item").forEach(b => b.onclick = () => { aside.classList.remove("abierto"); window.openModalDirectly(b.dataset.id); });
      sugMenu.querySelector(".sug-todos").onclick = () => verTodosMenu(q);
    }
    inputMenu.addEventListener("input", () => { clearTimeout(temporizadorMenu); temporizadorMenu = setTimeout(pintarSugerencias, 150); });
    inputMenu.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && inputMenu.value.trim()) { e.preventDefault(); verTodosMenu(inputMenu.value.trim()); }
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        document.getElementById("volver-flotante").classList.add("visible");
      } else {
        document.getElementById("volver-flotante").classList.remove("visible");
      }
    });

    // v9: el botón flotante sube UN nivel y dice a dónde va (ver actualizarBotonVolver)
    btnVolverFloat.onclick = () => { if (accionVolver) accionVolver(); };
    document.getElementById("btn-inicio-float").onclick = irAlInicio;
    // v9: el logo y el nombre del encabezado llevan al Inicio (con Ctrl/clic medio se abre en otra pestaña)
    document.getElementById("link-inicio-header").addEventListener("click", (ev) => {
      if (ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
      ev.preventDefault();
      irAlInicio();
    });

    aplicarConfig();
    cargarDatos();

// ── Visor de zoom / pan de imagen de producto ──
(function(){
let img,scale=1,x=0,y=0,startX=0,startY=0,drag=false;
function apply(){if(img)img.style.transform=`translate(${x}px,${y}px) scale(${scale})`;}
function reset(){scale=1;x=0;y=0;apply();}
document.addEventListener('DOMContentLoaded',()=>{
 img=document.getElementById('img-modal-principal');
 const box=document.querySelector('.visor-principal');
 if(!img||!box)return;
 box.addEventListener('wheel',e=>{e.preventDefault();const d=e.deltaY<0?0.2:-0.2;scale=Math.max(1,Math.min(5,scale+d));if(scale===1){x=0;y=0;}apply();},{passive:false});
 img.addEventListener('dblclick',()=>{if(scale===1)scale=2.5;else{scale=1;x=0;y=0;}apply();});
 img.addEventListener('pointerdown',e=>{if(scale<=1)return;drag=true;img.classList.add('dragging');startX=e.clientX-x;startY=e.clientY-y;img.setPointerCapture(e.pointerId);});
 img.addEventListener('pointermove',e=>{if(!drag)return;x=e.clientX-startX;y=e.clientY-startY;apply();});
 ['pointerup','pointercancel'].forEach(ev=>img.addEventListener(ev,()=>{drag=false;img.classList.remove('dragging');}));
 const old=window.cambiarFoto; if(old) window.cambiarFoto=function(i){old(i); img=document.getElementById('img-modal-principal'); reset();};
 const m=document.getElementById('modal-producto');
 new MutationObserver(()=>{if(getComputedStyle(m).display==='none')reset();}).observe(m,{attributes:true,attributeFilter:['style']});
});
})();