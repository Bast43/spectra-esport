# 🎮 Spectra Esport - Site Web Officiel

Site web professionnel pour l'organisation esport Spectra avec zone d'administration intégrée.

## ✨ Fonctionnalités

- 🎯 Design dark moderne avec accents néon violet/mauve
- 📱 Responsive (mobile, tablette, desktop)
- ⚡ Performance optimale avec Next.js 14
- 🔐 Zone admin sécurisée par mot de passe
- 📊 Gestion facile des équipes, actualités, résultats et partenaires
- 🎨 Animations fluides et effets visuels
- 🔗 Intégration des réseaux sociaux

## 🚀 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Visual Studio Code (recommandé)

### Étapes d'installation

1. **Ouvrir le projet dans VS Code**
   ```bash
   cd spectra-esport
   code .
   ```

2. **Installer les dépendances**
   
   Ouvrez un terminal dans VS Code (Terminal → New Terminal) et exécutez :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Accéder au site**
   
   Ouvrez votre navigateur et allez sur : `http://localhost:3000`

Le site est maintenant accessible en local ! 🎉

## 📁 Structure du projet

```
spectra-esport/
├── app/                    # Pages Next.js
│   ├── admin/             # Page d'administration
│   ├── api/               # Routes API
│   ├── news/              # Page actualités
│   ├── results/           # Page palmarès
│   ├── sponsors/          # Page partenaires
│   ├── teams/             # Page équipes
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants réutilisables
│   ├── Footer.tsx
│   └── Navbar.tsx
├── data/                  # Fichiers de données JSON
│   ├── admin-config.json  # Configuration admin
│   ├── news.json          # Actualités
│   ├── results.json       # Résultats
│   ├── sponsors.json      # Partenaires
│   └── teams.json         # Équipes
├── public/                # Fichiers statiques
│   └── logo.png           # Logo Spectra
└── package.json           # Dépendances
```

## 🔐 Zone d'administration

### Accès

1. Cliquez sur le bouton **Admin** dans la navigation
2. Connectez-vous avec le mot de passe par défaut : `Spectra2025!`

⚠️ **Important** : Changez ce mot de passe après la première utilisation dans `data/admin-config.json`

### Fonctionnalités de l'admin

#### 📋 Équipes
- Modifier les noms des joueurs
- Changer les rôles
- Ajouter les liens vers les réseaux sociaux (Twitter, Twitch, Instagram)

#### 📰 Actualités
- Créer de nouvelles actualités
- Modifier le contenu existant
- Supprimer des articles
- Gérer les catégories et dates

#### 🏆 Résultats
- Ajouter des résultats de tournois
- Spécifier le placement et les gains
- Organiser par jeu et équipe
- Supprimer d'anciens résultats

#### 🤝 Partenaires
- Gérer la liste des sponsors
- Ajouter/supprimer des partenaires
- Modifier les informations de contact
- Définir les sponsors premium

### Sauvegarde des modifications

Après chaque modification, cliquez sur le bouton **"Sauvegarder"** en bas de chaque section. Les données sont enregistrées dans les fichiers JSON du dossier `data/`.

## 🎨 Personnalisation

### Couleurs

Les couleurs Spectra sont définies dans `tailwind.config.js` :
```javascript
colors: {
  spectra: {
    violet: '#8B5CF6',   // Violet principal
    purple: '#A855F7',   // Violet intermédiaire
    mauve: '#C084FC',    // Mauve clair
    dark: '#0A0A0F',     // Fond dark
    darker: '#050508',   // Fond encore plus dark
  }
}
```

### Modifier le logo

Remplacez le fichier `public/logo.png` par votre nouveau logo.

### Ajouter des images

1. Placez vos images dans le dossier `public/images/`
2. Référencez-les dans les fichiers JSON avec le chemin `/images/nom-image.jpg`

## 📤 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. **Créer un compte sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub, GitLab ou Bitbucket

2. **Créer un dépôt Git**
   
   Dans le terminal de VS Code :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Site Spectra"
   ```

3. **Pousser vers GitHub**
   - Créez un nouveau repository sur GitHub
   - Suivez les instructions pour pousser votre code :
   ```bash
   git remote add origin https://github.com/votre-username/spectra-esport.git
   git branch -M main
   git push -u origin main
   ```

4. **Importer sur Vercel**
   - Sur Vercel, cliquez sur "Add New Project"
   - Importez votre repository GitHub
   - Vercel détectera automatiquement Next.js
   - Cliquez sur "Deploy"

5. **Votre site est en ligne ! 🎉**
   - Vous recevrez une URL du type : `spectra-esport.vercel.app`
   - Vercel redéploiera automatiquement à chaque push sur GitHub

### Méthode 2 : Via la CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel

# Suivre les instructions dans le terminal
```

### Ajouter un nom de domaine personnalisé

1. Dans Vercel, allez dans votre projet → Settings → Domains
2. Ajoutez votre domaine (ex: `spectra-esport.gg`)
3. Suivez les instructions pour configurer les DNS

## 🔄 Mise à jour du site

### Modifications locales

1. Faites vos modifications dans VS Code
2. Testez en local avec `npm run dev`
3. Une fois satisfait, committez :
   ```bash
   git add .
   git commit -m "Description des modifications"
   git push
   ```
4. Vercel redéploiera automatiquement

### Mise à jour des données via l'admin

Les modifications via la zone admin sont sauvegardées localement. Pour les déployer sur Vercel :

1. Committez les changements dans `data/` :
   ```bash
   git add data/
   git commit -m "Mise à jour des données"
   git push
   ```

## 🛠️ Commandes utiles

```bash
# Développement local
npm run dev

# Build de production (pour tester avant déploiement)
npm run build

# Lancer la version de production localement
npm start

# Vérifier les erreurs
npm run lint
```

## 📱 Réseaux sociaux Spectra

- Twitter/X: [https://x.com/SpectraEU](https://x.com/SpectraEU)
- Twitch: [https://www.twitch.tv/spectraqg](https://www.twitch.tv/spectraqg)
- Instagram: [https://www.instagram.com/spectraeu/](https://www.instagram.com/spectraeu/)
- Linktree: [https://linktr.ee/spectraeu](https://linktr.ee/spectraeu)

## 🆘 Support

### Problèmes courants

**Le site ne démarre pas**
- Vérifiez que Node.js est installé : `node --version`
- Supprimez `node_modules` et réinstallez : `rm -rf node_modules && npm install`

**Les modifications ne s'affichent pas**
- Rechargez la page avec CTRL+F5 (force refresh)
- Vérifiez que vous avez bien sauvegardé les fichiers

**Erreur lors du build**
- Vérifiez la syntaxe de vos modifications
- Regardez les messages d'erreur dans le terminal

## 📝 Notes importantes

- ⚠️ Changez le mot de passe admin par défaut
- 💾 Committez régulièrement vos modifications
- 🔄 Testez toujours en local avant de déployer
- 📸 Optimisez vos images avant de les ajouter (max 500KB)

## 🎯 Prochaines étapes

- [ ] Changer le mot de passe admin
- [ ] Ajouter les vraies informations des joueurs
- [ ] Uploader des photos de profil
- [ ] Créer du contenu pour les actualités
- [ ] Ajouter vos premiers résultats
- [ ] Déployer sur Vercel
- [ ] Configurer un nom de domaine

---

**Créé avec ❤️ pour Spectra Esport**

*Silent Impact* 🎮
