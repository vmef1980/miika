import csv
import json
import os

# Rutas de entrada/salidas
csv_file = './data/GuateCocina-v4.csv'
json_file = './data/GuateCocina-v4.json'
js_file = './js/productos.js'  # ¡NUEVO! Generamos directamente el .js

# Validar existencia del archivo CSV
if not os.path.exists(csv_file):
    raise FileNotFoundError(f"Archivo CSV no encontrado: {csv_file}")

productos = []

with open(csv_file, mode='r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)

    # Limpiar nombres de columnas
    reader.fieldnames = [name.strip().lower() for name in reader.fieldnames]

    # Columnas requeridas (imagenes es OPCIONAL)
    requeridos = [
        'id', 'titulo', 'imagen',
        'categoria_id', 'categoria_nombre',
        'subcategoria_id', 'subcategoria_nombre',
        'producto_descripcion', 'precio'
    ]
    faltantes = [campo for campo in requeridos if campo not in reader.fieldnames]
    if faltantes:
        raise KeyError(f"Faltan columnas requeridas en el CSV: {faltantes}")

    for i, row in enumerate(reader, start=2):  # start=2 para mostrar número de fila real
        try:
            # Limpiar valores
            row = {k: v.strip() for k, v in row.items()}

            # === PROCESAR IMÁGENES MÚLTIPLES ===
            imagenes_raw = row.get("imagenes", "")
            if imagenes_raw:
                # Soporta separadores: | , ; o saltos de línea
                separadores = ["|", ",", ";"]
                imagenes_limpias = imagenes_raw
                for sep in separadores:
                    if sep in imagenes_limpias:
                        imagenes_limpias = imagenes_limpias.split(sep)
                        break
                else:
                    imagenes_limpias = [imagenes_limpias] if imagenes_limpias else []

                # Limpiar espacios de cada imagen
                imagenes_final = [img.strip() for img in imagenes_limpias if img.strip()]
            else:
                imagenes_final = []

            # Si no hay imágenes múltiples, al menos usar la principal como fallback
            if not imagenes_final and row["imagen"]:
                imagenes_final = [row["imagen"]]

            producto = {
                "id": row["id"],
                "titulo": row["titulo"],
                "descripcion": row["producto_descripcion"] or "Sin descripción disponible.",
                "precio": float(row["precio"]),
                "imagen": row["imagen"],  # sigue siendo la imagen principal para la grilla
                "categoria": {
                    "id": row["categoria_id"],
                    "nombre": row["categoria_nombre"]
                }
            }

            # Solo agregar subcategoria si existe y no está vacía
            if row["subcategoria_id"] and row["subcategoria_nombre"]:
                producto["subcategoria"] = {
                    "id": row["subcategoria_id"],
                    "nombre": row["subcategoria_nombre"]
                }

            # ¡AQUÍ ESTÁ LO NUEVO! → Agregar el array de imágenes si existe
            if imagenes_final:
                producto["imagenes"] = imagenes_final

            productos.append(producto)

        except Exception as e:
            print(f"Error en la fila {i}: {row}")
            print(f"   → {e}")

# === GUARDAR COMO JSON (opcional, para debug) ===
with open(json_file, mode='w', encoding='utf-8') as f:
    json.dump(productos, f, indent=4, ensure_ascii=False)

# === GUARDAR COMO ARCHIVO .JS (para usar directamente en tu web) ===
js_content = f"""// productos.js - Generado automáticamente el {__import__('datetime').datetime.now().strftime("%d/%m/%Y %H:%M")}
// No editar manualmente → se sobrescribe con el script Python

export const productos = {json.dumps(productos, indent=4, ensure_ascii=False)};
"""

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Conversión completada con éxito!")
print(f"   → {len(productos)} productos procesados")
print(f"   → JSON guardado en: {json_file}")
print(f"   → JS listo para web en: {js_file}")
print(f"   → Listo para carrusel: {sum(1 for p in productos if 'imagenes' in p and len(p['imagenes']) > 1)} productos con múltiples imágenes")