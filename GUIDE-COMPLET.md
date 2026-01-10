# 🎮 Guide Complet - Site Spectra

## 📋 Résumé des Fonctionnalités

### ✅ Ce qui a été implémenté

1. **Équipes avec onglets** - R6S Main, R6S Academy, CS2 Main + Staff séparé
2. **Palmarès par équipe** - Chaque équipe a ses propres résultats de matchs
3. **Résultats format matchs** - Win/Loss avec score, adversaire, compétition
4. **Admin SECRET** - Plus de bouton visible, accès uniquement par URL
5. **Photos de profil** - Modifiables dans l'admin pour joueurs et staff
6. **Twitter automatique** - Actualités en direct depuis @SpectraEU

---

## 🔐 Accès Admin SECRET

### Comment accéder à l'admin ?

**Le bouton Admin a été RETIRÉ du menu** pour qu'il reste secret.

**Pour y accéder :**
1. Tapez manuellement l'URL : `http://localhost:3000/admin`
2. En production : `https://votresite.com/admin`

**Mot de passe par défaut :** `Spectra2025!`

**⚠️ IMPORTANT :** Changez ce mot de passe dans `/data/admin-config.json`

### Pourquoi c'est secret ?

- Les visiteurs ne voient pas le bouton
- Seul l'admin connaît l'URL
- Évite les clics inutiles
- Sécurité par obscurité

---

## 📸 Gestion des Photos de Profil

### Comment ajouter des photos ?

#### Étape 1 : Préparer les images

1. **Format recommandé :** JPG ou PNG
2. **Résolution :** 400x400px minimum (carré de préférence)
3. **Nommage :** Utilisez des noms simples (ex: `joueur1.jpg`, `staff1.jpg`)

#### Étape 2 : Uploader les images

**Option A : Via public/images/**
```bash
# Copiez vos images dans ce dossier
public/images/joueur1.jpg
public/images/joueur2.jpg
public/images/staff1.jpg
```

**Option B : Hébergement externe**
- Imgur : https://imgur.com
- Cloudinary : https://cloudinary.com
- Google Drive (public)
- Ou n'importe quel hébergeur d'images

#### Étape 3 : Ajouter les URLs dans l'admin

1. Allez sur `/admin`
2. Connectez-vous
3. Onglet **Équipes**
4. Pour chaque joueur/staff, remplissez le champ **"URL de la photo de profil"**

**Exemples d'URLs :**
```
/images/joueur1.jpg                           (local)
https://i.imgur.com/abc123.jpg                (Imgur)
https://res.cloudinary.com/mon-id/image.jpg   (Cloudinary)
```

#### Comportement

- **Si photo existe** → Affiche l'image
- **Si URL vide ou erreur** → Affiche les initiales (fallback automatique)

---

## 🎯 Résultats & Matchs

### Format des résultats

Les résultats sont maintenant des **matchs** et non des placements de tournoi.

**Informations à renseigner :**
- **Adversaire** : Nom de l'équipe adverse (ex: "Team Vitality")
- **Équipe** : Sélection automatique (R6S Main, R6S Academy, CS2 Main)
- **Jeu** : Se remplit automatiquement selon l'équipe
- **Date** : Date du match
- **Compétition** : Nom du tournoi/ligue (ex: "ESL Challenger")
- **Score** : Score du match (ex: "2-1", "13-16")
- **Résultat** : Win ou Loss

### Exemple de match

```
Adversaire: Team Vitality
Équipe: R6S Main
Jeu: Rainbow Six Siege (auto)
Date: 2025-01-15
Compétition: ESL Challenger League
Score: 2-1
Résultat: Win
```

### Affichage

**Page Résultats (/results) :**
- Badge **W** (vert) ou **L** (rouge)
- Score affiché
- Tous les détails du match

**Page Équipes (/teams) :**
- Onglet de chaque équipe
- Section "Derniers matchs"
- Historique spécifique à l'équipe

---

## 📂 Structure des Fichiers

```
spectra-esport/
├── public/
│   └── images/              ← Mettez vos photos ici !
│       ├── joueur1.jpg
│       ├── joueur2.jpg
│       └── staff1.jpg
├── data/
│   ├── teams.json           ← Équipes + Staff
│   ├── results.json         ← Matchs Win/Loss
│   ├── sponsors.json        ← Partenaires
│   └── admin-config.json    ← Mot de passe admin
└── app/
    └── admin/               ← Page admin (secret)
```

---

## 🚀 Workflow Complet

### 1. Configuration Initiale

```bash
# Installation
npm install
npm run dev

# Site accessible sur http://localhost:3000
# Admin sur http://localhost:3000/admin
```

### 2. Première Configuration Admin

1. Allez sur `/admin`
2. Connectez-vous avec `Spectra2025!`
3. **Changez le mot de passe** dans `data/admin-config.json`

### 3. Remplir les Informations

**Équipes :**
- Noms des joueurs (remplacer "Joueur1", "Joueur2"...)
- Rôles spécifiques
- Photos de profil (URLs)
- Réseaux sociaux (Twitter, Twitch, Instagram)

**Staff :**
- Noms du staff
- Rôles (Manager, Coach...)
- Photos de profil (URLs)
- Réseaux sociaux (Twitter, LinkedIn)

**Résultats :**
- Ajouter les matchs récents
- Format Win/Loss avec scores
- Lier à la bonne équipe

**Sponsors :**
- Ajouter vos partenaires
- Site web
- Contact (email, Discord)

### 4. Actualités

**Aucune gestion nécessaire !**
- Postez sur Twitter @SpectraEU
- Les tweets apparaissent automatiquement sur le site
- Page `/news`

---

## 💡 Conseils & Astuces

### Photos de Profil

**✅ Bonnes pratiques :**
- Images carrées (même ratio largeur/hauteur)
- Fond uni ou avec logo de l'orga
- Qualité professionnelle
- Format JPG (plus léger que PNG)
- Compression recommandée

**❌ À éviter :**
- Images rectangulaires (seront coupées)
- Trop lourdes (> 1MB)
- Mauvaise qualité
- Fond distrayant

### Organisation des Photos

**Nommage clair :**
```
public/images/
├── r6s-main/
│   ├── joueur1.jpg
│   ├── joueur2.jpg
│   └── ...
├── r6s-academy/
│   └── ...
├── cs2-main/
│   └── ...
└── staff/
    └── ...
```

### Résultats

**Ordre chronologique :**
- Les résultats les plus récents en premier
- Gardez l'historique complet
- Supprimez les très anciens si nécessaire

**Score clair :**
- `2-1` pour R6S (maps gagnées)
- `13-16` pour CS2 (rounds)
- Toujours format : `score_nous-score_eux`

---

## 🔧 Maintenance

### Ajouter un match

1. `/admin` → Résultats
2. "Ajouter un match"
3. Remplir les infos
4. Sauvegarder

### Modifier un joueur

1. `/admin` → Équipes
2. Sélectionner l'équipe (R6S Main, etc.)
3. Modifier nom, rôle, photo
4. Sauvegarder

### Changer le mot de passe admin

Éditez `/data/admin-config.json` :
```json
{
  "password": "VotreNouveauMotDePasse"
}
```

---

## 📱 URLs Importantes

- **Site** : http://localhost:3000
- **Équipes** : http://localhost:3000/teams
- **Résultats** : http://localhost:3000/results
- **Actualités** : http://localhost:3000/news
- **Sponsors** : http://localhost:3000/sponsors
- **🔐 Admin (SECRET)** : http://localhost:3000/admin

---

## 🎉 Checklist de Lancement

Avant de déployer sur Vercel :

- [ ] Changer le mot de passe admin
- [ ] Remplir tous les noms de joueurs
- [ ] Ajouter toutes les photos de profil
- [ ] Ajouter les liens réseaux sociaux
- [ ] Renseigner le staff complet
- [ ] Ajouter les résultats récents
- [ ] Ajouter les sponsors
- [ ] Tester toutes les pages
- [ ] Vérifier que `/admin` fonctionne
- [ ] Push sur GitHub
- [ ] Déployer sur Vercel

---

## ❓ FAQ

**Q : Les photos ne s'affichent pas ?**
R : Vérifiez l'URL, utilisez le chemin complet, testez l'image dans le navigateur.

**Q : Comment protéger davantage l'admin ?**
R : Changez régulièrement le mot de passe, utilisez un mot de passe complexe.

**Q : Peut-on ajouter plus de 4 membres au staff ?**
R : Oui, éditez directement `/data/teams.json` et ajoutez des entrées dans `"staff"`.

**Q : Les tweets ne s'affichent pas ?**
R : Normal en local, rechargez la page, attendez 15s, ou testez en production.

**Q : Comment ajouter une 4e équipe ?**
R : Éditez `/data/teams.json` et ajoutez une nouvelle équipe dans le tableau.

---

**Voilà ! Vous avez toutes les infos pour gérer votre site Spectra comme un pro ! 🚀**
