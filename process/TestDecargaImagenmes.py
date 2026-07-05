#Ejecuta este script con el navegador Chrome abierto en modo depuración remota:
#"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome_dev_profile"

import os
import requests
from playwright.sync_api import sync_playwright
from tqdm import tqdm

# --- CONFIGURACIÓN ---
BASE_DIR = r"D:\EKIIPA"
CDP_ENDPOINT = "http://127.0.0.1:9222"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Referer": "https://ekiipa.com/",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
}

def shift_existing_files(sku_dir, sku, num_new_images):
    """Renombra archivos existentes hacia arriba para hacer espacio a los nuevos."""
    existing_files = [f for f in os.listdir(sku_dir) if f.startswith(f"{sku}_")]
    # Ordenamos de mayor a menor para no sobrescribir nombres al renombrar
    files_to_rename = []
    for f in existing_files:
        try:
            idx = int(f.rsplit('_', 1)[-1].split('.')[0])
            files_to_rename.append((idx, f))
        except: continue
    
    files_to_rename.sort(key=lambda x: x[0], reverse=True)
    
    for idx, filename in files_to_rename:
        new_name = f"{sku}_{idx + num_new_images}.png"
        os.rename(os.path.join(sku_dir, filename), os.path.join(sku_dir, new_name))

def run_scraper():
    with sync_playwright() as p:
        try:
            browser = p.chromium.connect_over_cdp(CDP_ENDPOINT)
            page = browser.contexts[0].pages[0]
        except Exception as e:
            print(f"[!] Error de conexión: {e}")
            return
        
        page.goto("https://kossino.com/shop/")
        cat_links = list(set(page.evaluate("() => Array.from(document.querySelectorAll('a')).map(a => a.href).filter(h => h.includes('/product-category/'))")))
        
        for cat_url in tqdm(cat_links, desc="Progreso Total Categorías"):
            try:
                page.goto(cat_url)
                prod_links = list(set([p for p in page.evaluate("() => Array.from(document.querySelectorAll('a.woocommerce-LoopProduct-link, .box-image a')).map(a => a.href)") if '/product/' in p]))
                
                for p_url in prod_links:
                    page.goto(p_url)
                    sku_el = page.query_selector('.sku')
                    sku = sku_el.inner_text().strip() if sku_el else "sin_sku"
                    sku_dir = os.path.join(BASE_DIR, sku)
                    
                    if not os.path.exists(sku_dir):
                        os.makedirs(sku_dir)
                    
                    # 1. Identificar imágenes nuevas primero
                    imgs = page.query_selector_all('.woocommerce-product-gallery__image a, .wp-post-image')
                    found_urls = set()
                    new_images_data = []
                    
                    for img in imgs:
                        raw_url = img.get_attribute('href') or img.get_attribute('src')
                        if not raw_url: continue
                        clean_url = raw_url.split('?')[0]
                        
                        if any(ext in clean_url.lower() for ext in ['.jpg', '.png', '.jpeg']) and clean_url not in found_urls:
                            found_urls.add(clean_url)
                            new_images_data.append(clean_url)
                    
                    if not new_images_data: continue
                    
                    # 2. Desplazar archivos antiguos para hacer espacio
                    shift_existing_files(sku_dir, sku, len(new_images_data))
                    
                    # 3. Descargar las nuevas imágenes empezando en _0
                    for i, clean_url in enumerate(new_images_data):
                        filename = f"{sku}_{i}.png"
                        file_path = os.path.join(sku_dir, filename)
                        try:
                            response = requests.get(clean_url, headers=HEADERS, timeout=15)
                            if response.status_code == 200:
                                with open(file_path, 'wb') as f:
                                    f.write(response.content)
                                print(f"  [ÉXITO] {sku} | Nueva imagen: {filename}")
                        except Exception as e:
                            print(f"  [ERROR] {sku} | Falló: {e}")
                                
            except Exception as e:
                print(f"[!] Error en {cat_url}: {e}")
                continue

if __name__ == "__main__":
    run_scraper()