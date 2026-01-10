# 🚀 Déployer Spectra sur GitHub et Vercel

## 📋 Ce dont vous avez besoin

- ✅ Compte GitHub (gratuit) → https://github.com/signup
- ✅ Compte Vercel (gratuit) → https://vercel.com/signup
- ✅ Git installé sur votre ordinateur

---

## 🎯 Étape 1 : Préparer le Projet

### 1. Extraire le projet

```bash
# Extraire le ZIP
unzip spectra-esport.zip

# Aller dans le dossier
cd spectra-esport
```

### 2. Vérifier les fichiers

Assurez-vous que vous avez :
```
spectra-esport/
├── .gitignore          ← Important !
├── package.json
├── next.config.js
├── app/
├── components/
├── data/
├── public/
└── ...
```

---

## 🐙 Étape 2 : Créer un Repo GitHub

### Sur GitHub.com :

1. **Allez sur** : https://github.com/new
2. **Nom du repo** : `spectra-esport` (ou ce que vous voulez)
3. **Visibilité** : 
   - ✅ **Public** (recommandé pour Vercel gratuit)
   - ⚠️ Private (fonctionne aussi, mais limité)
4. **N'initialisez PAS avec** :
   - ❌ README
   - ❌ .gitignore
   - ❌ License
5. **Cliquez** : "Create repository"

### Vous obtenez des commandes comme :

```bash
git remote add origin https://github.com/votre-username/spectra-esport.git
git branch -M main
git push -u origin main
```

**Gardez cette page ouverte !** On va utiliser ces commandes.

---

## 💻 Étape 3 : Push sur GitHub

### Dans votre terminal (dossier spectra-esport) :

```bash
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Faire le premier commit
git commit -m "Initial commit - Spectra Esport website"

# 4. Renommer la branche en main
git branch -M main

# 5. Ajouter le remote GitHub (REMPLACEZ avec VOTRE URL)
git remote add origin https://github.com/VOTRE-USERNAME/spectra-esport.git

# 6. Push sur GitHub
git push -u origin main
```

### 🔐 Authentification GitHub

Si c'est la première fois, Git va demander vos identifiants :

**Option A : Token (Recommandé)**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Nom : "Vercel Deploy"
4. Permissions : Cocher **repo** (tout)
5. Generate token
6. Copier le token (vous ne le reverrez plus !)
7. Utiliser comme mot de passe

**Option B : SSH** (Plus avancé)
- Suivez : https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### ✅ Vérification

Allez sur `https://github.com/VOTRE-USERNAME/spectra-esport`

Vous devez voir tous vos fichiers ! 🎉

---

## ☁️ Étape 4 : Déployer sur Vercel

### 1. Créer un compte Vercel

1. Allez sur https://vercel.com/signup
2. **Connectez-vous avec GitHub** (recommandé)
3. Autorisez Vercel à accéder à vos repos

### 2. Importer le projet

1. **Dashboard Vercel** → "Add New" → "Project"
2. Trouvez votre repo **spectra-esport**
3. Cliquez sur **"Import"**

### 3. Configurer le projet

**Framework Preset** : Next.js ✅ (détecté automatiquement)

**Root Directory** : `./` (par défaut)

**Build Command** : 
```bash
npm run build
```

**Output Directory** : 
```
.next
```

**Install Command** : 
```bash
npm install
```

### 4. Variables d'environnement (optionnel)

Si vous avez des secrets (API keys, etc.) :

- Cliquez "Environment Variables"
- Ajoutez vos variables (pour l'instant, vous n'en avez pas besoin)

### 5. Déployer !

**Cliquez sur "Deploy"** 🚀

Vercel va :
1. ✅ Cloner votre repo
2. ✅ Installer les dépendances (`npm install`)
3. ✅ Builder le projet (`npm run build`)
4. ✅ Déployer sur leur CDN

**Durée** : 2-3 minutes

---

## 🎉 Étape 5 : C'est En Ligne !

### Votre site est maintenant accessible !

Vercel vous donne une URL comme :
```
https://spectra-esport-abc123.vercel.app
```

**C'est votre site en production ! 🌍**

### Configurer un domaine personnalisé (optionnel)

Plus tard, vous pourrez ajouter :
- `spectra-esport.com`
- `www.spectra-esport.com`

Dans : **Settings** → **Domains**

---

## 🔄 Workflow de Mise à Jour

### Après avoir rempli le site, pour mettre à jour :

```bash
# 1. Sauvegarder vos changements
git add .

# 2. Commit avec un message
git commit -m "Update teams and add player photos"

# 3. Push sur GitHub
git push
```

**Et c'est tout !** Vercel détecte automatiquement et redéploie ! ✨

**Durée** : 1-2 minutes par déploiement

---

## 📁 Structure Git (Important)

### Fichiers IGNORÉS par Git (.gitignore)

Ces fichiers ne seront PAS sur GitHub :
```
node_modules/          ← Trop gros, recréé à chaque fois
.next/                 ← Build, recréé à chaque fois
.env.local             ← Secrets, ne JAMAIS commit
```

### Fichiers INCLUS sur GitHub

```
✅ app/                ← Code source
✅ components/         ← Composants
✅ data/              ← JSON (teams, results, etc.)
✅ public/            ← Images locales
✅ package.json       ← Dépendances
✅ next.config.js     ← Config
```

---

## 🖼️ Gestion des Images en Production

### ⚠️ IMPORTANT : Images sur Vercel

Les images dans `/public` sont **statiques** :
- ✅ OK pour : logo, images fixes
- ❌ PAS OK pour : photos de joueurs/staff (vous ne pouvez pas les modifier après déploiement)

### Solutions :

**1. Imgur** (Recommandé) ⭐⭐⭐⭐⭐
```
1. Upload sur imgur.com
2. Copier l'URL : https://i.imgur.com/abc123.jpg
3. Mettre l'URL dans l'admin
4. Git add, commit, push
5. Vercel redéploie automatiquement
```

**2. Cloudinary** (Pro)
```
Même principe qu'Imgur, mais plus puissant
```

**3. Images dans /public** (Pour le logo uniquement)
```
1. Mettre l'image dans public/images/
2. Git add, commit, push
3. Référence : /images/logo.png
```

---

## 🔧 Commandes Git Utiles

### Voir l'état des fichiers
```bash
git status
```

### Voir l'historique
```bash
git log --oneline
```

### Annuler des changements (avant commit)
```bash
git checkout -- fichier.tsx
```

### Voir les différences
```bash
git diff
```

### Créer une branche (pour tester)
```bash
git checkout -b test-feature
```

---

## 🐛 Résolution de Problèmes

### Problème 1 : "Authentication failed"

**Solution** : Utilisez un Personal Access Token
1. GitHub → Settings → Developer settings → Tokens
2. Generate token
3. Utilisez-le comme mot de passe

### Problème 2 : "Build failed" sur Vercel

**Causes possibles** :
- Erreur de syntaxe TypeScript
- Dépendance manquante
- Erreur dans le code

**Solution** :
1. Vérifier les logs Vercel (très détaillés)
2. Corriger l'erreur en local : `npm run build`
3. Re-push une fois corrigé

### Problème 3 : Images ne s'affichent pas

**Solution** :
- Vérifier que les URLs sont correctes
- Utiliser Imgur/Cloudinary pour les photos
- Ne PAS utiliser de chemins absolus locaux

### Problème 4 : "This branch is X commits behind main"

**Solution** :
```bash
git pull origin main
```

---

## 📊 Dashboard Vercel

### Ce que vous pouvez voir :

- ✅ **Deployments** : Historique de tous les déploiements
- ✅ **Analytics** : Visiteurs, performance
- ✅ **Logs** : Erreurs en temps réel
- ✅ **Settings** : Config, domaines, variables

### URLs Vercel

Vercel génère 3 types d'URLs :

1. **Production** : `spectra-esport.vercel.app`
   - Toujours la version de la branche `main`

2. **Preview** : URLs uniques par commit
   - Pour tester avant de merger

3. **Custom Domain** : `spectra-esport.com`
   - Votre domaine personnalisé (optionnel)

---

## 🎯 Checklist Complète

### Avant de commencer :
- [ ] Compte GitHub créé
- [ ] Compte Vercel créé
- [ ] Git installé
- [ ] Projet extrait

### GitHub :
- [ ] Repo créé sur GitHub
- [ ] `git init` fait
- [ ] `git add .` fait
- [ ] `git commit` fait
- [ ] `git push` fait
- [ ] Code visible sur GitHub

### Vercel :
- [ ] Projet importé sur Vercel
- [ ] Framework détecté (Next.js)
- [ ] Premier déploiement réussi
- [ ] Site accessible via URL Vercel

### Workflow :
- [ ] Je sais faire : `git add . && git commit -m "message" && git push`
- [ ] Je comprends que Vercel redéploie automatiquement
- [ ] Je sais où mettre mes images (Imgur)

---

## 🚀 Workflow Quotidien

### Matin : Modifier le site

```bash
# 1. Ouvrir le projet
cd spectra-esport
code .  # Si vous utilisez VS Code

# 2. Modifier via l'admin ou directement les JSON
# - Ajouter joueurs
# - Modifier résultats
# - Uploader photos sur Imgur
```

### Soir : Déployer les changements

```bash
# 1. Vérifier ce qui a changé
git status

# 2. Ajouter tout
git add .

# 3. Commit
git commit -m "Added R6S players and match results"

# 4. Push
git push

# 5. Vercel déploie automatiquement ! ✅
```

**Et voilà ! Le site est à jour en 2 minutes !**

---

## 💡 Conseils Pro

### 1. Messages de commit clairs
```bash
✅ "Added coach photos and R6S results"
✅ "Updated CS2 roster"
✅ "Fixed navbar styling"

❌ "update"
❌ "changes"
❌ "fix"
```

### 2. Commits fréquents
Ne commitez pas tout d'un coup. Faites des petits commits :
```bash
git commit -m "Added R6S Main players"
git commit -m "Added R6S Academy players"
git commit -m "Added CS2 players"
```

### 3. Branches pour tester
```bash
# Créer une branche de test
git checkout -b test-new-design

# Faire des changements
# ...

# Si ça marche, merger dans main
git checkout main
git merge test-new-design
git push
```

### 4. Sauvegardes
GitHub = Sauvegarde automatique de tout votre code ! 🎉

---

## 📞 Ressources

- **GitHub Docs** : https://docs.github.com
- **Vercel Docs** : https://vercel.com/docs
- **Git Tutorial** : https://git-scm.com/docs/gittutorial
- **Next.js Deployment** : https://nextjs.org/docs/deployment

---

## 🎉 Résumé

### Ce que vous allez faire :

```
1. Git init, add, commit           → Code prêt
2. Git push                        → Code sur GitHub
3. Vercel import                   → Premier déploiement
4. Site en ligne ! 🌍              → https://spectra-esport.vercel.app
```

### Ensuite, pour chaque modification :

```
1. Modifier le site localement     → Admin ou JSON
2. git add, commit, push           → GitHub mis à jour
3. Vercel redéploie auto          → Site à jour !
```

---

**Temps total : 15-20 minutes pour le premier déploiement**
**Mises à jour suivantes : 2-3 minutes par déploiement**

**Vous êtes prêt ! Bonne chance ! 🚀**
