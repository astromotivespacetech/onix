# Public website

A static single-viewport landing. No build step.

| File | Role |
| --- | --- |
| `index.html` | Landing stage |
| `styles.css` | Design system |
| `main.js` | Metrics + contact modal |
| `data/site.data.js` | Generated. Every number on the page. |
| `assets/hero-*.{jpg,webp}` | Generated hero plate |
| `privacy.html` | Privacy note |
| `archive/` | Prior multi-section landing |

## Company name

Working name: **Onix Lunar Corp**. Header uses the custom ONIX wordmark from `dataroom/08_media/` (built by `scripts/build_onix_logo.py`). Hero display face is **TASA Orbiter** (Taiwan Space Agency type system, Google Fonts).

## Numbers

Public KPIs use the website scale case from the model. Regenerate with:

```
cd backend
python -m lunar_gun.cli generate site
```

## Run

```
python -m http.server 4173 --directory website
```
