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

## Host

GitHub Pages hosts this folder. The workflow is `.github/workflows/pages.yml`. It runs when this folder is the root of a public GitHub repo.

Do not publish the Lunar Project repo. That repo holds the model, the investor list, and the dataroom.

1. Create a new public GitHub repo.
2. Push only the files in this `website` folder. The repo root must contain `index.html` and `.github/workflows/pages.yml`.
3. In the repo, open Settings, then Pages. Set the source to GitHub Actions.
4. Wait for the Deploy site workflow. The site URL is in the workflow log.

`CNAME` sets the domain to `onixlunar.com`. Point DNS at GitHub before you remove the old host.

Apex (`onixlunar.com`):

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

`www`: one CNAME. Name `www`. Value is `<github-user>.github.io`.

After DNS resolves, turn on Enforce HTTPS in the Pages settings. Then stop the Netlify site.

## Contact form

GitHub Pages does not store form posts. `FORM_ENDPOINT` in `main.js` is the Formspree URL. The form posts there, and Formspree emails the message.
