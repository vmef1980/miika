#Ejecuta este script con el navegador Chrome abierto en modo depuración remota:
#"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome_dev_profile"
"""
DescargaImagenesKossino.py
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Descarga imágenes de kossino.com conectándose a una ventana
de Chrome ya abierta (vía CDP), organizándolas por SKU.
Mantiene un "historial": cada vez que corre, las imágenes
nuevas entran en _0, _1... y las que ya existían se recorren
hacia índices más altos (no se pisan ni se pierden).

Soporta JPG, PNG, WEBP, AVIF y GIF, detectando la extensión
real por la URL o, si no es concluyente, por el Content-Type
de la respuesta — así nunca se guarda una imagen webp/avif
con extensión .png.

Pensado para poder reutilizarse en distintos sitios/clientes:
toda la configuración específica del sitio vive en el bloque
CONFIG de más abajo.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

import os
import time
import subprocess
import requests
from playwright.sync_api import sync_playwright
from tqdm import tqdm

# ── CONFIGURACIÓN (todo lo que cambia entre sitios/clientes va acá) ───────────
CONFIG = {
    # Carpeta local donde se guardan las imágenes descargadas
    "BASE_DIR": r"D:\KOSSINO_V1",

    # URL de la tienda a scrapear
    "BASE_URL": "https://kossino.com/shop/",

    # Endpoint de Chrome en modo depuración remota (requiere que ya esté abierto,
    # ver el comando al inicio del archivo)
    "CDP_ENDPOINT": "http://127.0.0.1:9223",
    "DEBUG_PORT": 9223,

    # Si Chrome no está escuchando en el puerto de depuración, el script puede
    # intentar abrirlo automáticamente con estos datos (ajustar según tu instalación).
    "AUTO_LAUNCH_CHROME": True,
    "CHROME_PATH": r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "CHROME_USER_DATA_DIR": r"C:\chrome_dev_profile",

    "USER_AGENT": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    ),
    "REFERER": "https://kossino.com/",
    "ACCEPT_HEADER": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",

    # Filtro de enlaces de categoría: se buscan todos los <a> del sitio y se
    # quedan los que contienen este texto en el href
    "FILTRO_CATEGORIA": "/product-category/",

    # Selector de enlaces de producto dentro de una página de categoría, y
    # filtro adicional sobre el href para descartar enlaces que no sean productos
    "SELECTOR_PRODUCTOS": "a.woocommerce-LoopProduct-link, .box-image a",
    "FILTRO_PRODUCTO": "/product/",

    "SELECTOR_SKU": ".sku",
    "SELECTOR_IMAGENES": ".woocommerce-product-gallery__image a, .woocommerce-product-gallery .wp-post-image",

    # Atributos donde puede venir la URL real de la imagen, en orden de prioridad.
    # Muchos temas usan "lazy loading" y ponen la URL real en data-src en vez de src.
    "ATRIBUTOS_IMAGEN": ["href", "src", "data-src", "data-lazy-src", "data-srcset"],

    # Extensiones de imagen válidas
    "EXTENSIONES_VALIDAS": [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"],

    # Timeout de las descargas de imagen (segundos)
    "REQUEST_TIMEOUT": 15,

    # Reintentos por imagen si falla la descarga
    "MAX_REINTENTOS": 2,

    # Pausa opcional (segundos) entre productos, por si el sitio empieza a
    # bloquear pedidos muy seguidos. 0 = sin pausa (comportamiento original).
    "PAUSA_ENTRE_PRODUCTOS": 0,
}
# ────────────────────────────────────────────────────────────────────────────

HEADERS = {
    "User-Agent": CONFIG["USER_AGENT"],
    "Referer": CONFIG["REFERER"],
    "Accept": CONFIG["ACCEPT_HEADER"],
}

# Mapeo de Content-Type real -> extensión, para cuando la URL no trae extensión
# clara (muy común en imágenes servidas por CDNs o plugins de optimización).
CONTENT_TYPE_A_EXT = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/avif": ".avif",
    "image/gif": ".gif",
}


def obtener_extension_de_url(url):
    """Devuelve la extensión si la URL trae una válida y reconocible, si no None."""
    ruta = url.split("?")[0].split("#")[0]
    ext = os.path.splitext(ruta)[1].lower()
    return ext if ext in CONFIG["EXTENSIONES_VALIDAS"] else None


def obtener_url_imagen(img_element):
    """
    Prueba varios atributos (src, data-src, etc.) hasta encontrar una URL usable.
    Ignora los que sean "data:" URIs (placeholders base64 típicos de lazy loading,
    como data:image/svg+xml,... — no son URLs descargables).
    """
    for attr in CONFIG["ATRIBUTOS_IMAGEN"]:
        valor = img_element.get_attribute(attr)
        if valor and not valor.strip().lower().startswith("data:"):
            # srcset trae varias URLs con tamaños; nos quedamos con la primera
            return valor.split(",")[0].strip().split(" ")[0]
    return None


def shift_existing_files(sku_dir, sku, num_new_images):
    """
    Renombra archivos existentes hacia índices más altos para hacer espacio
    a las imágenes nuevas en _0, _1, etc. Conserva la extensión original de
    cada archivo (antes se forzaba .png y corrompía webp/avif ya guardados).
    """
    existing_files = [f for f in os.listdir(sku_dir) if f.startswith(f"{sku}_")]
    files_to_rename = []
    for f in existing_files:
        nombre_sin_ext, ext = os.path.splitext(f)
        try:
            idx = int(nombre_sin_ext.rsplit("_", 1)[-1])
            files_to_rename.append((idx, f, ext))
        except ValueError:
            continue

    # Ordenamos de mayor a menor para no sobrescribir nombres al renombrar
    files_to_rename.sort(key=lambda x: x[0], reverse=True)

    for idx, filename, ext in files_to_rename:
        new_name = f"{sku}_{idx + num_new_images}{ext}"
        os.rename(os.path.join(sku_dir, filename), os.path.join(sku_dir, new_name))


def descargar_imagen(url, sku_dir, nombre_base):
    """
    Descarga una imagen intentando varias veces. Determina la extensión real
    por la URL o, si no es concluyente, por el Content-Type de la respuesta.
    Devuelve el nombre de archivo guardado, o None si falló.
    """
    ext_url = obtener_extension_de_url(url)

    for intento in range(1, CONFIG["MAX_REINTENTOS"] + 1):
        try:
            response = requests.get(url, headers=HEADERS, timeout=CONFIG["REQUEST_TIMEOUT"])
            if response.status_code != 200:
                continue

            content_type = response.headers.get("Content-Type", "").split(";")[0].strip().lower()

            # Si el Content-Type no es una imagen (ej. una página de error/login
            # devuelta con status 200), no la guardamos.
            if not content_type.startswith("image/"):
                print(f"  [OMITIDO] Respuesta no es una imagen ({content_type}): {url}")
                return None

            ext = ext_url or CONTENT_TYPE_A_EXT.get(content_type, ".jpg")
            filename = f"{nombre_base}{ext}"
            file_path = os.path.join(sku_dir, filename)

            with open(file_path, "wb") as f:
                f.write(response.content)
            return filename

        except Exception as e:
            if intento == CONFIG["MAX_REINTENTOS"]:
                print(f"  [ERROR] Falló {url}: {e}")
            else:
                time.sleep(1)

    return None


def chrome_debug_activo(puerto):
    """Revisa si Chrome ya está escuchando en el puerto de depuración remota."""
    try:
        r = requests.get(f"http://127.0.0.1:{puerto}/json/version", timeout=2)
        return r.status_code == 200
    except Exception:
        return False


def asegurar_chrome_debug():
    """
    Verifica que Chrome esté disponible en modo depuración remota. Si no lo
    está y AUTO_LAUNCH_CHROME está activo, intenta abrirlo automáticamente.
    Devuelve True si al final quedó disponible, False si no.
    """
    puerto = CONFIG["DEBUG_PORT"]
    if chrome_debug_activo(puerto):
        return True

    if not CONFIG["AUTO_LAUNCH_CHROME"]:
        return False

    print(f"[*] Chrome no está escuchando en el puerto {puerto}. Intentando abrirlo automáticamente...")
    try:
        subprocess.Popen([
            CONFIG["CHROME_PATH"],
            f"--remote-debugging-port={puerto}",
            f"--user-data-dir={CONFIG['CHROME_USER_DATA_DIR']}",
        ])
    except FileNotFoundError:
        print(f"[!] No se encontró Chrome en: {CONFIG['CHROME_PATH']}")
        print("    Ajustá CONFIG['CHROME_PATH'] con la ruta correcta de tu instalación.")
        return False

    for _ in range(15):
        time.sleep(1)
        if chrome_debug_activo(puerto):
            print("[OK] Chrome abierto correctamente en modo depuración.")
            return True

    return False


def run_scraper():
    base_dir = CONFIG["BASE_DIR"]
    total_descargadas = 0
    total_fallidas = 0

    if not asegurar_chrome_debug():
        print(f"\n[!] No se pudo conectar a Chrome en modo depuración remota (puerto {CONFIG['DEBUG_PORT']}).")
        print("    Causas más comunes:")
        print("    1. Ya tenías Chrome abierto (incluso en segundo plano) ANTES de correr este script.")
        print("       Cerrá TODAS las ventanas de Chrome — revisá el Administrador de Tareas por si quedó")
        print("       un proceso 'chrome.exe' corriendo — y volvé a intentar.")
        print(f"    2. La ruta en CONFIG['CHROME_PATH'] ('{CONFIG['CHROME_PATH']}') no es la de tu instalación.")
        print("    3. Un firewall o antivirus está bloqueando la conexión a 127.0.0.1.")
        print(f"    Para probar a mano: abrí http://127.0.0.1:{CONFIG['DEBUG_PORT']}/json/version en un navegador")
        print("    (con Chrome ya abierto en modo depuración) y confirmá que devuelve datos, no un error.")
        return

    with sync_playwright() as p:
        try:
            browser = p.chromium.connect_over_cdp(CONFIG["CDP_ENDPOINT"])
            page = browser.contexts[0].pages[0]
        except Exception as e:
            print(f"[!] Error de conexión: {e}")
            return

        page.goto(CONFIG["BASE_URL"])
        cat_links = list(set(page.evaluate(
            f"() => Array.from(document.querySelectorAll('a')).map(a => a.href)"
            f".filter(h => h.includes('{CONFIG['FILTRO_CATEGORIA']}'))"
        )))

        for cat_url in tqdm(cat_links, desc="Progreso Total Categorías"):
            try:
                page.goto(cat_url)
                prod_links = list(set([
                    href for href in page.evaluate(
                        f"() => Array.from(document.querySelectorAll('{CONFIG['SELECTOR_PRODUCTOS']}')).map(a => a.href)"
                    )
                    if CONFIG["FILTRO_PRODUCTO"] in href
                ]))

                for p_url in prod_links:
                    page.goto(p_url)
                    if CONFIG["PAUSA_ENTRE_PRODUCTOS"]:
                        time.sleep(CONFIG["PAUSA_ENTRE_PRODUCTOS"])

                    sku_el = page.query_selector(CONFIG["SELECTOR_SKU"])
                    sku = sku_el.inner_text().strip() if sku_el else "sin_sku"
                    sku_dir = os.path.join(base_dir, sku)

                    if not os.path.exists(sku_dir):
                        os.makedirs(sku_dir)

                    # 1. Identificar imágenes nuevas primero
                    imgs = page.query_selector_all(CONFIG["SELECTOR_IMAGENES"])
                    found_urls = set()
                    new_images_data = []

                    for img in imgs:
                        raw_url = obtener_url_imagen(img)
                        if not raw_url:
                            continue
                        clean_url = raw_url.split("?")[0]

                        es_extension_valida = any(
                            ext in clean_url.lower() for ext in CONFIG["EXTENSIONES_VALIDAS"]
                        )
                        # Si la URL no trae ninguna extensión reconocible (común en CDNs),
                        # igual la intentamos: se resolverá por Content-Type al descargar.
                        sin_extension_en_url = os.path.splitext(clean_url)[1] == ""

                        if (es_extension_valida or sin_extension_en_url) and clean_url not in found_urls:
                            found_urls.add(clean_url)
                            new_images_data.append(clean_url)

                    if not new_images_data:
                        continue

                    # 2. Desplazar archivos antiguos para hacer espacio
                    shift_existing_files(sku_dir, sku, len(new_images_data))

                    # 3. Descargar las nuevas imágenes empezando en _0
                    for i, clean_url in enumerate(new_images_data):
                        nombre_base = f"{sku}_{i}"
                        filename = descargar_imagen(clean_url, sku_dir, nombre_base)
                        if filename:
                            total_descargadas += 1
                            print(f"  [ÉXITO] {sku} | Nueva imagen: {filename}")
                        else:
                            total_fallidas += 1

            except Exception as e:
                print(f"[!] Error en {cat_url}: {e}")
                continue

    print(f"\n{'='*60}")
    print(f"🚀 Proceso terminado. Imágenes guardadas en: {base_dir}")
    print(f"   ✅ Descargadas : {total_descargadas}")
    print(f"   ❌ Fallidas     : {total_fallidas}")
    print(f"{'='*60}")


if __name__ == "__main__":
    run_scraper()