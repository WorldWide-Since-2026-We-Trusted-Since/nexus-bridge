# 🚀 Deployment Guide - HNOSS Reference Governance System

## Netlify Deployment (Empfohlen)

### Option 1: GitHub → Netlify (Auto-Deploy)

1. **Repository auf GitHub pushen**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Netlify Account erstellen**
   - Gehe zu [netlify.com](https://www.netlify.com)
   - Registriere dich mit GitHub

3. **Site importieren**
   - Klicke "Add new site" → "Import an existing project"
   - Wähle "GitHub" → Autorisiere Netlify
   - Wähle Repository: `WorldWide-Since-2026-We-Trusted-Since/nexus-bridge`

4. **Build Settings konfigurieren**
   
   | Setting | Value |
   |---------|-------|
   | **Build command** | `npm install && npm run build` |
   | **Publish directory** | `dist` |
   | **Node version** | `20` |

5. **Environment Variables (Optional)**
   ```
   VITE_API_URL=https://dein-backend-url.com  # Wenn Backend deployed
   ```

6. **Deploy!**
   - Klicke "Deploy site"
   - Netlify baut automatisch bei jedem GitHub Push neu

---

### Option 2: GitHub Actions + Netlify

1. **Netlify Tokens holen:**
   - Netlify UI → User Settings → Applications → Personal Access Tokens
   - Site Settings → General → Site ID

2. **GitHub Secrets hinzufügen:**
   - Repository → Settings → Secrets → Actions
   - `NETLIFY_AUTH_TOKEN` = Dein Personal Access Token
   - `NETLIFY_SITE_ID` = Deine Site ID

3. **Die GitHub Action ist bereits konfiguriert in:**
   `.github/workflows/deploy.yml`

4. **Push zu main → Automatischer Deploy:**
   ```bash
   git push origin main
   ```

---

## ⚠️ Wichtig: Backend API

Das **Frontend** läuft auf Netlify, das **Backend (API)** läuft aktuell lokal (Port 3002).

### Lösungen:

| Option | Beschreibung | Setup |
|--------|--------------|-------|
| **A** | Backend auf **Render/Railway** deployen | 1. Server-Code auf Render deployen<br>2. `VITE_API_URL` in Netlify setzen |
| **B** | **Netlify Functions** für API | Erfordert Code-Änderung |
| **C** | API lokal lassen | Nur Frontend auf Netlify, API auf lokalem Server |

### Option A - Backend auf Render (Empfohlen):

1. Gehe zu [render.com](https://render.com)
2. "New Web Service" → Verbinde GitHub Repo
3. Wähle `server/` Ordner als Root
4. Build Command: `cd server && npm install`
5. Start Command: `node server.js`
6. Environment Variables: `PORT=10000`, `JWT_SECRET=dein-secret`
7. Kopiere die Render URL (z.B. `https://hnoss-api.onrender.com`)
8. In Netlify: `VITE_API_URL=https://hnoss-api.onrender.com`

---

## 🔧 Lokale Entwicklung

```bash
# Terminal 1 - Backend
cd server
npm install
node server.js
# → API läuft auf http://127.0.0.1:3002

# Terminal 2 - Frontend
cd ..
npm install
npm run dev
# → Frontend läuft auf http://127.0.0.1:3001
```

---

## 📁 Wichtige Dateien

| Datei | Zweck |
|-------|-------|
| `netlify.toml` | Netlify Konfiguration (Redirects, Headers, Build) |
| `.github/workflows/deploy.yml` | Auto-Deploy bei GitHub Push |
| `package.json` | Dependencies & Scripts |
| `vite.config.ts` | Vite/TanStack Konfiguration |

---

## 🐛 Troubleshooting

### "Page Not Found" bei Reload
→ `netlify.toml` enthält bereits SPA Redirects. Prüfe ob Datei committed ist.

### Build fehlgeschlagen
→ Prüfe Node Version (20) in Netlify UI → Site Settings → Build & Deploy

### API nicht erreichbar
→ Backend muss separat deployed werden (siehe Optionen oben)

### CORS Fehler
→ Backend muss CORS Headers senden (in `server/server.js` konfiguriert)

---

## 🔗 Nützliche Links

- [Netlify Docs](https://docs.netlify.com/)
- [TanStack Router Deployment](https://tanstack.com/router/latest/docs/framework/react/guide/deployment)
- [Render Web Services](https://render.com/docs/web-services)
