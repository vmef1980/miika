"""
fill_imagenes_sheets.py
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lee la carpeta KOSSINO en Google Drive, construye las URLs
de cada imagen y rellena las columnas 'imagen' e 'imagenes'
directamente en un archivo de GOOGLE SHEETS.

[ACTUALIZADO]: Ahora reescribe SIEMPRE las celdas para detectar
cambios, adiciones o eliminaciones de fotos en Google Drive.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

# ── CONFIGURACIÓN ─────────────────────────────────────────────────────────────
CREDENTIALS_JSON  = r"D:\Horus\Downloads\CS.json"          # ← archivo descargado de Google Cloud
SPREADSHEET_ID    = "1aqe-RbvdbN6T9-SSWV2Npy1td81C_6q5I9XN9nT17GU"  # ← ID de tu Google Sheet
KOSSINO_FOLDER_ID = "1s0elos0PRRUTuXLqqZfKLSZldlksedh0"    # ← ID de la carpeta KOSSINO en Drive
SHEET_NAME        = "Productos"                             # ← nombre de la pestaña en el Google Sheet

# Nombres exactos de las columnas en tu Google Sheets
ID_COLUMN_NAME      = "id"
IMAGEN_COLUMN_NAME  = "imagen"
IMAGENES_COLUMN_NAME = "imagenes"
# ──────────────────────────────────────────────────────────────────────────────

import os
import sys
import time
import re

def instalar_dependencias():
    import subprocess
    print("📦 Instalando dependencias...")
    subprocess.check_call([sys.executable, "-m", "pip", "install",
        "google-api-python-client", "google-auth-httplib2",
        "google-auth-oauthlib", "-q"])

try:
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
except ImportError:
    instalar_dependencias()
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials

# Scopes de lectura para Drive y escritura para Spreadsheets
SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets"
]
TOKEN_FILE = os.path.join(os.path.dirname(CREDENTIALS_JSON), "token_sheets.json")


def autenticar():
    """Autentica con Google Drive y Sheets. Abre el navegador la primera vez."""
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except Exception as e:
                print(f"   ⚠️ Error refrescando token: {e}")
                os.remove(TOKEN_FILE)
                creds = None
        if not creds:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_JSON, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_FILE, "w") as f:
            f.write(creds.to_json())
            
    drive_service = build("drive", "v3", credentials=creds)
    sheets_service = build("sheets", "v4", credentials=creds)
    return drive_service, sheets_service


def listar_todas_las_carpetas(service, parent_id):
    carpetas = {}
    page_token = None
    while True:
        try:
            resp = service.files().list(
                q=f"'{parent_id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false",
                fields="nextPageToken, files(id, name)",
                pageSize=1000,
                pageToken=page_token
            ).execute()
        except HttpError as e:
            print(f"   ❌ Error de API Drive: {e}")
            break
            
        for f in resp.get("files", []):
            carpetas[f["name"].strip()] = f["id"]
        page_token = resp.get("nextPageToken")
        if not page_token:
            break
    return carpetas


def listar_imagenes(service, folder_id):
    MIME_IMAGENES = ("image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp", "image/tiff", "image/jpg")
    mime_query = " or ".join([f"mimeType='{m}'" for m in MIME_IMAGENES])
    imagenes = []
    page_token = None
    
    while True:
        try:
            resp = service.files().list(
                q=f"'{folder_id}' in parents and ({mime_query}) and trashed=false",
                fields="nextPageToken, files(id, name)",
                pageSize=1000,
                pageToken=page_token
            ).execute()
        except HttpError as e:
            print(f"   ⚠️ Error listando imágenes: {e}")
            break
            
        for f in resp.get("files", []):
            imagenes.append((f["name"].strip(), f["id"]))
        page_token = resp.get("nextPageToken")
        if not page_token:
            break
    
    imagenes.sort(key=lambda x: natural_sort_key(x[0]))
    return imagenes


def natural_sort_key(texto):
    return [int(c) if c.isdigit() else c.lower() for c in re.split(r'(\d+)', texto)]


def url_directa(file_id):
    return f"https://drive.google.com/uc?export=view&id={file_id}"


def col_idx_to_letter(col_idx):
    """Convierte número de columna (base 1) a letras estilo Excel (ej: 1 -> A, 28 -> AB)"""
    result = ""
    while col_idx > 0:
        col_idx, remainder = divmod(col_idx - 1, 26)
        result = chr(65 + remainder) + result
    return result


def normalizar(texto):
    """Limpia textos quitando tildes, espacios y pasando a minúsculas."""
    texto = str(texto).strip().lower()
    texto = texto.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u")
    return texto


def main():
    print("\n" + "="*70)
    print("   🍳 GuateCocina — Sincronización Completa de Imágenes en Google Sheets")
    print("="*70 + "\n")

    if not os.path.exists(CREDENTIALS_JSON):
        print(f"❌ No se encontró credentials.json")
        input("\nPresioná Enter para cerrar...")
        sys.exit(1)

    # 1. Autenticar
    print("🔐 Autenticando con Google Workspace...")
    try:
        drive_service, sheets_service = autenticar()
        print("   ✅ Autenticado en Drive y Sheets\n")
    except Exception as e:
        print(f"   ❌ Error de autenticación: {e}")
        input("\nPresioná Enter para cerrar...")
        sys.exit(1)

    # 2. Leer carpetas de KOSSINO en Drive
    print(f"📁 Leyendo carpetas en Drive (ID: {KOSSINO_FOLDER_ID})...")
    carpetas = listar_todas_las_carpetas(drive_service, KOSSINO_FOLDER_ID)
    print(f"   ✅ {len(carpetas)} carpetas encontradas\n")

    if not carpetas:
        print("❌ No se encontraron subcarpetas. Verificá el KOSSINO_FOLDER_ID.")
        input("\nPresioná Enter para cerrar...")
        sys.exit(1)

    # 3. Leer datos desde Google Sheets
    print(f"📊 Leyendo Google Sheet (ID: {SPREADSHEET_ID})...")
    try:
        rango_lectura = f"'{SHEET_NAME}'!A1:Z"
        result = sheets_service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID, range=rango_lectura
        ).execute()
        rows = result.get('values', [])
    except HttpError as e:
        print(f"   ❌ Error leyendo la hoja de Google Sheets: {e}")
        input("\nPresioná Enter para cerrar...")
        sys.exit(1)

    if not rows:
        print("❌ La hoja de cálculo está vacía o la pestaña no existe.")
        input("\nPresioná Enter para cerrar...")
        sys.exit(1)

    # 4. Detectar columnas usando normalización (Tolera mayúsculas/minúsculas y tildes)
    headers_normalizados = [normalizar(h) for h in rows[0]]
    
    try:
        col_id_idx = headers_normalizados.index(normalizar(ID_COLUMN_NAME))
        col_img_idx = headers_normalizados.index(normalizar(IMAGEN_COLUMN_NAME))
        col_imgs_idx = headers_normalizados.index(normalizar(IMAGENES_COLUMN_NAME))
    except ValueError as e:
        print(f"❌ No se pudo encontrar una de las columnas necesarias en la primera fila.")
        print(f"Buscados: '{ID_COLUMN_NAME}', '{IMAGEN_COLUMN_NAME}', '{IMAGENES_COLUMN_NAME}'")
        print(f"Encabezados actuales detectados en la hoja: {rows[0]}")
        input("\nPresioná Enter para cerrar...")
        sys.exit(1)

    print(f"   📍 Columnas detectadas:")
    print(f"      → ID: columna {col_id_idx + 1} ('{rows[0][col_id_idx]}')")
    print(f"      → Imagen: columna {col_img_idx + 1} ('{rows[0][col_img_idx]}')")
    print(f"      → Imágenes: columna {col_imgs_idx + 1} ('{rows[0][col_imgs_idx]}')\n")

    col_img_letter = col_idx_to_letter(col_img_idx + 1)
    col_imgs_letter = col_idx_to_letter(col_imgs_idx + 1)

    # 5. Recorrer filas y preparar lote de actualización
    actualizados = 0
    sin_carpeta  = 0
    sin_imagenes = 0
    errores      = 0

    total_filas = len(rows) - 1
    print(f"🔄 Procesando e inspeccionando {total_filas} productos...")
    inicio = time.time()
    
    data_updates = []

    for idx, row in enumerate(rows[1:], start=2):
        if len(row) <= col_id_idx:
            continue
            
        producto_id = str(row[col_id_idx]).strip()
        if not producto_id or producto_id == "None":
            continue

        folder_id = carpetas.get(producto_id)
        if not folder_id:
            sin_carpeta += 1
            continue

        # [MODIFICACIÓN CLAVE]: Se removió la condición de "skip/saltar" si la celda ya tenía URL.
        # Ahora siempre lee la carpeta de Drive para detectar imágenes actualizadas o nuevas.
        try:
            imagenes = listar_imagenes(drive_service, folder_id)
        except Exception as e:
            print(f"   ⚠️ Error en carpeta {producto_id}: {e}")
            errores += 1
            continue
            
        if not imagenes:
            sin_imagenes += 1
            continue

        url_principal = url_directa(imagenes[0][1])
        if len(imagenes) > 1:
            resto_urls = " | ".join([url_directa(img[1]) for img in imagenes[1:]])
        else:
            resto_urls = url_principal

        # Agrupar datos en el lote de reescritura masiva
        data_updates.append({
            'range': f"'{SHEET_NAME}'!{col_img_letter}{idx}",
            'values': [[url_principal]]
        })
        data_updates.append({
            'range': f"'{SHEET_NAME}'!{col_imgs_letter}{idx}",
            'values': [[resto_urls]]
        })

        actualizados += 1

    # 6. Guardar en Google Sheets de forma masiva
    elapsed_total = time.time() - inicio
    if data_updates:
        print(f"\n💾 Subiendo {len(data_updates)//2} filas sincronizadas a Google Sheets...")
        try:
            body = {
                'valueInputOption': 'USER_ENTERED',
                'data': data_updates
            }
            sheets_service.spreadsheets().values().batchUpdate(
                spreadsheetId=SPREADSHEET_ID, body=body
            ).execute()
            print("   ✅ Google Sheets actualizado con éxito.")
        except HttpError as e:
            print(f"   ❌ Error crítico guardando datos en Google Sheets: {e}")
            input("\nPresioná Enter para cerrar...")
            sys.exit(1)
    else:
        print("\nℹ️ No se encontraron filas aptas para actualización.")

    # 7. Resumen final
    print(f"\n{'='*70}")
    print(f"   ✅ COMPLETADO en {elapsed_total:.1f} segundos")
    print(f"{'='*70}")
    print(f"   🔄 Productos sincronizados / actualizados : {actualizados}")
    print(f"   📁 Sin carpeta en Drive                    : {sin_carpeta}")
    print(f"   🖼️  Carpeta vacía (sin imágenes)            : {sin_imagenes}")
    print(f"   ⚠️  Errores durante el proceso              : {errores}")
    print(f"   📊 Total filas de datos evaluadas          : {total_filas}")
    print(f"{'='*70}\n")
    
    cobertura = (actualizados) / total_filas * 100 if total_filas > 0 else 0
    print(f"   📈 Cobertura de imágenes actual: {cobertura:.1f}%")
    print(f"\n{'='*70}\n")
    input("Presioná Enter para cerrar...")


if __name__ == "__main__":
    main()