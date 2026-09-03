import json
import os
import requests

# Si usas Google Places API o un scraper ligero como Outscraper / SerpApi
# Ejemplo usando Google Places API (New):
API_KEY = os.environ.get("GOOGLE_PLACES_KEY")

# IDs o coordenadas/búsquedas de tus sucursales
BRANCHES = [
    {"name": "Granjas Cabrera", "place_id": "TU_PLACE_ID_CABRERA"},
    {"name": "Del Mar", "place_id": "TU_PLACE_ID_DEL_MAR"}
]

all_reviews = []

for branch in BRANCHES:
    if not API_KEY or "TU_PLACE_ID" in branch["place_id"]:
        continue

    url = f"https://places.googleapis.com/v1/places/{branch['place_id']}?fields=displayName,reviews&key={API_KEY}"
    res = requests.get(url)
    
    if res.status_code == 200:
        data = res.json()
        reviews = data.get("reviews", [])
        
        for r in reviews:
            # Filtramos solo reseñas de 5 estrellas
            if r.get("rating") == 5:
                all_reviews.append({
                    "sucursal": branch["name"],
                    "autor": r.get("authorAttribution", {}).get("displayName", "Cliente"),
                    "avatar": r.get("authorAttribution", {}).get("photoUri", ""),
                    "comentario": r.get("text", {}).get("text", ""),
                    "puntuacion": r.get("rating", 5),
                    "fecha": r.get("relativePublishTimeDescription", "Reciente"),
                    # Si la reseña tiene foto asociada
                    "foto": r.get("photos", [{}])[0].get("name", "") if r.get("photos") else None
                })

# Guardar en archivo estático para la web
with open("reviews.json", "w", encoding="utf-8") as f:
    json.dump(all_reviews, f, ensure_ascii=False, indent=2)

print(f"Sincronización completada: {len(all_reviews)} reseñas guardadas.")
