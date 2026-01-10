# 🚀 GUIDE DE DÉMARRAGE RAPIDE

## Installation en 3 étapes

### 1️⃣ Installer les dépendances
```bash
npm install
```

### 2️⃣ Lancer le serveur
```bash
npm run dev
```

### 3️⃣ Ouvrir dans le navigateur
Allez sur : http://localhost:3000

---

## 🔐 Accès Admin

URL : http://localhost:3000/admin
Mot de passe : `Spectra2025!`

**⚠️ Changez ce mot de passe après la première utilisation !**

---

## 📝 Modifier le contenu

### Via l'admin (Recommandé)
1. Connectez-vous à l'admin
2. Choisissez la section à modifier (Équipes, News, Résultats, Partenaires)
3. Modifiez les informations
4. Cliquez sur "Sauvegarder"

### Via les fichiers JSON (Avancé)
Modifiez directement les fichiers dans `data/` :
- `teams.json` → Équipes et joueurs
- `news.json` → Actualités
- `results.json` → Résultats de tournois
- `sponsors.json` → Partenaires et contact
- `admin-config.json` → Mot de passe admin

---

## 🌐 Déployer sur Vercel

### Option 1 : Déploiement automatique
1. Poussez votre code sur GitHub
2. Connectez-vous sur vercel.com
3. Importez votre repository
4. Cliquez sur "Deploy"

### Option 2 : CLI Vercel
```bash
npm install -g vercel
vercel
```

---

## 📁 Structure des fichiers importants

```
spectra-esport/
├── app/
│   ├── page.tsx           ← Page d'accueil
│   ├── admin/page.tsx     ← Zone admin
│   ├── teams/page.tsx     ← Page équipes
│   ├── news/page.tsx      ← Page actualités
│   ├── results/page.tsx   ← Page résultats
│   └── sponsors/page.tsx  ← Page partenaires
├── data/
│   ├── teams.json         ← Données des équipes
│   ├── news.json          ← Données des news
│   ├── results.json       ← Données des résultats
│   ├── sponsors.json      ← Données des sponsors
│   └── admin-config.json  ← Configuration admin
└── public/
    └── logo.png           ← Logo Spectra
```

---

## 🎨 Personnalisation rapide

### Changer les couleurs
Fichier : `tailwind.config.js`
```javascript
colors: {
  spectra: {
    violet: '#8B5CF6',  // Changez cette valeur
    purple: '#A855F7',  // Et celle-ci
    mauve: '#C084FC',   // Et celle-là
  }
}
```

### Changer le logo
Remplacez `public/logo.png` par votre nouveau logo

### Ajouter des images
Placez vos images dans `public/images/`

---

## ⚡ Commandes essentielles

```bash
npm run dev      # Lancer en développement
npm run build    # Créer une version de production
npm start        # Lancer la version de production
```

---

## 🆘 Besoin d'aide ?

### Problèmes courants

**"npm: command not found"**
→ Installez Node.js depuis nodejs.org

**Le site ne se lance pas**
→ `rm -rf node_modules && npm install`

**Les modifications ne s'affichent pas**
→ CTRL+F5 pour forcer le rechargement

---

## ✅ Checklist première utilisation

- [ ] `npm install` pour installer les dépendances
- [ ] `npm run dev` pour lancer le site
- [ ] Accéder à l'admin et changer le mot de passe
- [ ] Modifier les infos des joueurs
- [ ] Ajouter les premières news
- [ ] Tester sur mobile/tablette
- [ ] Déployer sur Vercel
- [ ] Configurer le nom de domaine

---

**Prêt à démarrer ? Lancez `npm install` puis `npm run dev` ! 🚀**
