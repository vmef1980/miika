import os
import sys

# ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────
# Cambiá esta ruta a la carpeta KOSSINO en tu computadora
CARPETA_RAIZ = r"D:\KOSSINO"

# Extensiones de imagen que va a procesar
EXTENSIONES = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'}

# Modo simulación: True = solo muestra qué haría, sin renombrar nada
#                  False = renombra de verdad
SIMULACION = False
# ──────────────────────────────────────────────────────────────────────────────


def renombrar_imagenes(carpeta_raiz, simulacion):
    if not os.path.exists(carpeta_raiz):
        print(f"❌ No se encontró la carpeta: {carpeta_raiz}")
        sys.exit(1)

    total_renombradas = 0
    total_errores = 0
    carpetas_procesadas = 0

    print(f"\n{'='*60}")
    print(f"  {'[SIMULACIÓN] ' if simulacion else ''}Procesando: {carpeta_raiz}")
    print(f"{'='*60}\n")

    for nombre_folder in sorted(os.listdir(carpeta_raiz)):
        ruta_folder = os.path.join(carpeta_raiz, nombre_folder)

        # Solo procesar carpetas
        if not os.path.isdir(ruta_folder):
            continue

        codigo = nombre_folder.strip()

        # Obtener imágenes dentro del folder
        imagenes = sorted([
            f for f in os.listdir(ruta_folder)
            if os.path.splitext(f)[1].lower() in EXTENSIONES
        ])

        if not imagenes:
            print(f"  📁 {codigo}  →  (sin imágenes, se omite)")
            continue

        carpetas_procesadas += 1
        print(f"  📁 {codigo}  ({len(imagenes)} imagen{'es' if len(imagenes) > 1 else ''})")

        for i, nombre_actual in enumerate(imagenes):
            ext = os.path.splitext(nombre_actual)[1].lower()
            ruta_actual = os.path.join(ruta_folder, nombre_actual)

            # Construir nuevo nombre
            if len(imagenes) == 1:
                nuevo_nombre = f"{codigo}{ext}"
            else:
                nuevo_nombre = f"{codigo}_{i + 1}{ext}"

            ruta_nueva = os.path.join(ruta_folder, nuevo_nombre)

            # Si ya tiene el nombre correcto, saltar
            if nombre_actual == nuevo_nombre:
                print(f"    ✅ {nombre_actual}  (ya tiene el nombre correcto)")
                continue

            # Evitar colisión si el archivo destino ya existe
            if os.path.exists(ruta_nueva) and ruta_actual != ruta_nueva:
                print(f"    ⚠️  {nombre_actual}  →  {nuevo_nombre}  (CONFLICTO: ya existe, se omite)")
                total_errores += 1
                continue

            if simulacion:
                print(f"    🔄 {nombre_actual}  →  {nuevo_nombre}")
            else:
                try:
                    os.rename(ruta_actual, ruta_nueva)
                    print(f"    ✅ {nombre_actual}  →  {nuevo_nombre}")
                    total_renombradas += 1
                except Exception as e:
                    print(f"    ❌ {nombre_actual}  →  ERROR: {e}")
                    total_errores += 1

    print(f"\n{'='*60}")
    if simulacion:
        print(f"  [SIMULACIÓN] No se renombró nada.")
        print(f"  Carpetas con imágenes encontradas: {carpetas_procesadas}")
        print(f"  Cambiá SIMULACION = False para ejecutar de verdad.")
    else:
        print(f"  ✅ Renombradas: {total_renombradas}")
        print(f"  ❌ Errores / omitidas: {total_errores}")
        print(f"  📁 Carpetas procesadas: {carpetas_procesadas}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    renombrar_imagenes(CARPETA_RAIZ, SIMULACION)
    input("Presioná Enter para cerrar...")