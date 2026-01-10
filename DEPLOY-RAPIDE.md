# ⚡ Commandes Rapides - Spectra Deploy

## 🚀 Premier Déploiement (À faire UNE fois)

### 1. Sur GitHub.com
```
1. Allez sur https://github.com/new
2. Nom : spectra-esport
3. Public
4. Create repository
```

### 2. Dans votre terminal
```bash
cd spectra-esport
git init
git add .
git commit -m "Initial commit - Spectra Esport"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/spectra-esport.git
git push -u origin main
```

### 3. Sur Vercel.com
```
1. https://vercel.com/signup
2. Import project
3. Choisir spectra-esport
4. Deploy
```

---

## 🔄 Workflow Quotidien (Chaque mise à jour)

### Après avoir modifié le site :

```bash
# Sauvegarder les changements
git add .

# Décrire ce que vous avez fait
git commit -m "Description de vos changements"

# Envoyer sur GitHub (Vercel déploie automatiquement)
git push
```

**C'est tout ! 2 minutes et votre site est à jour !**

---

## 📝 Exemples de Messages de Commit

```bash
git commit -m "Added R6S Main roster"
git commit -m "Updated match results"
git commit -m "Added coach photos"
git commit -m "Fixed navbar links"
git commit -m "Updated sponsor logos"
```

---

## 🔧 Commandes Git Utiles

### Voir l'état actuel
```bash
git status
```

### Voir l'historique
```bash
git log --oneline
```

### Annuler des modifications (avant commit)
```bash
git checkout -- fichier.tsx
```

### Récupérer les derniers changements
```bash
git pull
```

---

## 🖼️ Images : Workflow Imgur

```
1. Upload sur imgur.com
2. Clic droit → Copier l'adresse : https://i.imgur.com/abc123.jpg
3. Mettre l'URL dans l'admin
4. git add . && git commit -m "Added player photos" && git push
```

---

## 🐛 Problèmes Courants

### "Authentication failed"
→ Utilisez un Personal Access Token comme mot de passe
→ GitHub → Settings → Developer settings → Tokens

### "Build failed" sur Vercel
→ Vérifier les logs Vercel
→ Tester en local : `npm run build`
→ Corriger et re-push

### Images ne s'affichent pas
→ Utiliser Imgur pour toutes les photos
→ Ne PAS utiliser /public pour les photos modifiables

---

## 📱 Accès Rapides

- **GitHub Repo** : https://github.com/VOTRE-USERNAME/spectra-esport
- **Vercel Dashboard** : https://vercel.com/dashboard
- **Site Live** : https://spectra-esport.vercel.app
- **Admin** : https://spectra-esport.vercel.app/admin

---

## ✅ Checklist : Prêt à Déployer ?

- [ ] Compte GitHub créé
- [ ] Compte Vercel créé
- [ ] Git installé
- [ ] Repo créé sur GitHub
- [ ] Code pushé
- [ ] Projet importé sur Vercel
- [ ] Premier déploiement réussi
- [ ] Site accessible

---

## 💡 Tips

- Commit souvent (petits changements)
- Messages clairs
- Tester en local avant de push : `npm run dev`
- Utiliser Imgur pour toutes les images
- Vercel déploie automatiquement à chaque push

---

**Besoin du guide complet ? → Lisez DEPLOIEMENT.md** 📖
