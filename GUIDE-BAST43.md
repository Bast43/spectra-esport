# 🎯 Guide Pas à Pas - Spectra Deploy

## ✅ Votre Repo GitHub : https://github.com/Bast43/spectra-esport.git

---

## 📍 ÉTAPE 1 : Extraire le Projet (5 min)

### Sur votre ordinateur :

1. **Trouvez** le fichier `spectra-esport.zip`
2. **Clic droit** → Extraire tout
3. **Vous obtenez** un dossier `spectra-esport`

---

## 📍 ÉTAPE 2 : Ouvrir le Terminal (2 min)

### Sur Windows :
1. **Ouvrez** le dossier `spectra-esport`
2. **Shift + Clic droit** dans le dossier (dans l'espace vide)
3. **Cliquez** "Ouvrir dans Terminal" ou "Ouvrir PowerShell ici"

### Sur Mac :
1. **Ouvrez** Terminal (Applications → Utilitaires → Terminal)
2. **Tapez** : `cd ` (avec un espace après cd)
3. **Glissez** le dossier `spectra-esport` dans le Terminal
4. **Appuyez** sur Entrée

### Vous devez voir quelque chose comme :
```
C:\Users\VotreNom\spectra-esport>
```
ou
```
~/spectra-esport $
```

---

## 📍 ÉTAPE 3 : Envoyer sur GitHub (5 min)

### Copiez-collez ces commandes UNE PAR UNE :

```bash
git init
```
**Appuyez sur Entrée** ✅
Vous voyez : `Initialized empty Git repository...`

---

```bash
git add .
```
**Appuyez sur Entrée** ✅
(Rien ne s'affiche, c'est normal)

---

```bash
git commit -m "Initial commit - Spectra Esport website"
```
**Appuyez sur Entrée** ✅
Vous voyez plein de lignes qui défilent

---

```bash
git branch -M main
```
**Appuyez sur Entrée** ✅
(Rien ne s'affiche, c'est normal)

---

```bash
git remote add origin https://github.com/Bast43/spectra-esport.git
```
**Appuyez sur Entrée** ✅
(Rien ne s'affiche, c'est normal)

---

```bash
git push -u origin main
```
**Appuyez sur Entrée** ✅

### ⚠️ Git va demander vos identifiants GitHub :

**Username** : `Bast43`
**Password** : VOTRE TOKEN (voir ci-dessous)

---

### 🔑 Comment Obtenir un Token (Première fois)

1. **Allez sur** : https://github.com/settings/tokens
2. **Cliquez** : "Generate new token" → "Generate new token (classic)"
3. **Note** : `Spectra Deploy`
4. **Expiration** : 90 days (ou No expiration)
5. **Cochez** : `repo` (toutes les cases sous repo)
6. **Scrollez en bas** → "Generate token"
7. **COPIEZ** le token (vous ne le reverrez plus !)
8. **Collez** comme mot de passe dans le terminal

---

### ✅ Si tout a marché :

Vous voyez :
```
Enumerating objects: ...
Counting objects: ...
Writing objects: 100%
```

**BRAVO ! Votre code est sur GitHub ! 🎉**

---

## 📍 ÉTAPE 4 : Vérifier sur GitHub (1 min)

1. **Allez sur** : https://github.com/Bast43/spectra-esport
2. **Vous devez voir** tous vos fichiers :
   - app/
   - components/
   - data/
   - public/
   - etc.

**Si vous les voyez → Parfait ! ✅**

---

## 📍 ÉTAPE 5 : Déployer sur Vercel (5 min)

### 1. Créer un compte Vercel

1. **Allez sur** : https://vercel.com/signup
2. **Cliquez** : "Continue with GitHub"
3. **Connectez-vous** avec votre compte GitHub
4. **Autorisez** Vercel

---

### 2. Importer le projet

Vous êtes sur le Dashboard Vercel :

1. **Cliquez** : "Add New..." → "Project"
2. **Vous voyez** une liste de repos
3. **Trouvez** : `Bast43/spectra-esport`
4. **Cliquez** : "Import" (à droite)

---

### 3. Configurer (ne touchez à RIEN)

Vous voyez une page de configuration :

**Framework Preset** : Next.js ✅ (détecté automatiquement)

**Root Directory** : `./` ✅

**Build Command** : `npm run build` ✅

**Output Directory** : `.next` ✅

**Install Command** : `npm install` ✅

---

### 4. Déployer !

**Cliquez sur le gros bouton "Deploy"** 🚀

Vercel va :
- ⏳ Télécharger votre code (30 secondes)
- ⏳ Installer les dépendances (1 minute)
- ⏳ Builder le site (1 minute)
- ✅ Déployer !

**ATTENDEZ 2-3 MINUTES**

---

### 5. C'est en ligne ! 🎉

Vous voyez une page avec des confettis ! 🎊

**Votre URL** : `https://spectra-esport-xxx.vercel.app`

**Cliquez sur "Visit"** → Votre site est en ligne ! 🌍

---

## 📍 ÉTAPE 6 : Accéder à l'Admin (1 min)

1. **Ajoutez** `/admin` à votre URL :
   ```
   https://spectra-esport-xxx.vercel.app/admin
   ```

2. **Mot de passe** : `Spectra2025!`

3. **Vous êtes dans l'admin !** ✅

---

## 🎯 RÉCAPITULATIF - Vous avez fait :

✅ Extrait le projet
✅ Ouvert le terminal
✅ Envoyé le code sur GitHub
✅ Connecté Vercel à GitHub
✅ Déployé le site
✅ Site en ligne !

**Votre site** : `https://spectra-esport-xxx.vercel.app`
**Votre admin** : `https://spectra-esport-xxx.vercel.app/admin`

---

## 🔄 Pour MODIFIER le Site Plus Tard

### 1. Modifier en local

```bash
# Ouvrir le terminal dans spectra-esport
cd spectra-esport

# Lancer le site en local
npm install
npm run dev

# Ouvrir : http://localhost:3000/admin
# Modifier via l'admin
```

---

### 2. Envoyer les modifications

```bash
# Dans le terminal, tapez :
git add .
git commit -m "Updated teams and results"
git push
```

**Et c'est tout !** Vercel redéploie automatiquement en 2 minutes ! ✅

---

## 🖼️ IMPORTANT : Images

**Pour toutes les photos (joueurs, staff, sponsors)** :

### Option 1 : Imgur (RECOMMANDÉ)

```
1. Allez sur : https://imgur.com
2. Cliquez "New post"
3. Glissez votre image
4. Une fois uploadée, CLIC DROIT sur l'image
5. "Copier l'adresse de l'image"
6. Vous obtenez : https://i.imgur.com/abc123.jpg
7. Collez cette URL dans l'admin
```

### Option 2 : Google Drive

Voir le fichier `GOOGLE-DRIVE-IMAGES.md` dans le projet.

---

## 🐛 Problèmes ?

### Le `git push` demande username/password à chaque fois

**Solution** :
```bash
git config credential.helper store
git push
# Entrez username/token UNE dernière fois
# Ensuite c'est mémorisé !
```

---

### Le build Vercel échoue

**Solution** :
1. Regardez les logs (très détaillés)
2. Testez en local : `npm run build`
3. Si ça marche en local mais pas sur Vercel, contactez-moi

---

### Je ne trouve plus mon URL Vercel

**Solution** :
1. Allez sur : https://vercel.com/dashboard
2. Cliquez sur votre projet "spectra-esport"
3. L'URL est affichée en haut

---

## ✅ Checklist de Vérification

Après avoir tout fait :

- [ ] Code visible sur https://github.com/Bast43/spectra-esport
- [ ] Site accessible sur https://spectra-esport-xxx.vercel.app
- [ ] Admin accessible sur .../admin avec mot de passe
- [ ] Je peux modifier le site en local
- [ ] Je sais faire `git add . && git commit -m "message" && git push`

---

## 🎉 VOUS AVEZ RÉUSSI !

Votre site Spectra est maintenant :
- ✅ Sur GitHub (code sauvegardé)
- ✅ En ligne sur Vercel (accessible à tous)
- ✅ Modifiable facilement (git push)

**Maintenant vous pouvez remplir le site ! 🎮**

---

## 📞 Besoin d'Aide ?

Si vous êtes bloqué à une étape précise, dites-moi :
- À quelle étape vous êtes
- Quel message d'erreur vous voyez
- Ce que vous avez fait

Je vous aiderai ! 🚀
