# Brussels Trip — Bruselas & Ámsterdam

App de itinerario de viaje (18–22 de agosto de 2026) para Bruselas, Brujas, Gante, Ámsterdam, Dinant y Luxemburgo.

Aplicación web de una sola página (HTML + CSS + JS, sin dependencias ni build). Pensada para
usarse desde el móvil durante el viaje: navegación por días, mapas de Google Maps, fichas
con foto e información de Wikipedia por sitio, y gestos de deslizar para marcar paradas
como visitadas.

## 🔗 Ver la app en vivo

Una vez publicada con GitHub Pages (ver más abajo), estará disponible en:

```
https://<TU-USUARIO-DE-GITHUB>.github.io/Brussels_Trip/
```

## 📱 Uso en iPhone

Abre esa URL en Safari y usa **Compartir → Añadir a pantalla de inicio** para tener un
icono como el de una app nativa, con pantalla completa.

Al estar en un dominio real (no un archivo local), las paradas marcadas como "hechas" y
las fotos de Wikipedia ya vistas **sí se guardan** entre visitas.

## 🛠 Estructura

```
Brussels_Trip/
├── index.html     ← toda la app (HTML + CSS + JS embebidos)
├── .nojekyll      ← desactiva el procesado Jekyll de GitHub Pages (no hace falta aquí)
├── .gitignore
└── README.md
```

No hay proceso de build: `index.html` es el archivo final tal cual se sirve.

## 🚀 Publicar con GitHub Pages

Ver la guía paso a paso más abajo en la conversación, o resumidamente:

1. Sube este contenido a un repositorio de GitHub llamado `Brussels_Trip`.
2. En GitHub → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` /
   carpeta `/ (root)` → Save.
3. Espera 1–2 minutos y la URL de arriba estará activa.

## ✏️ Actualizar el contenido

Todo el contenido del itinerario (horarios, paradas, enlaces, textos) está en el array
`DAYS` dentro de la etiqueta `<script>` de `index.html`. Edita ahí, haz commit y push —
GitHub Pages se actualiza solo en 1–2 minutos.
