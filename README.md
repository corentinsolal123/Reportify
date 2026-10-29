# Reportify

> Make reporting great again.

Reportify est une application web moderne pour simplifier la création de rapports quotidiens et hebdomadaires. Générez facilement des tableaux HTML formatés prêts à être copiés dans vos emails professionnels.

## ✨ Fonctionnalités

- 📊 **Rapports quotidiens** : ce qui a été fait hier et ce qui est prévu aujourd'hui, pour toute l'équipe
- 📅 **Rapports hebdomadaires** : tâches, observations et évaluation d'une personne
- 👀 **Aperçu en direct** : l'email s'affiche tel qu'il sera collé
- 📋 **Copie en un clic** : HTML (tableau dans Outlook) + texte brut en repli
- ✉️ **Ouverture d'Outlook** : copie le rapport et ouvre un nouvel email vierge
- 💾 **Brouillon automatique** : la saisie est conservée dans le navigateur (localStorage)
- 🌓 **Thème clair / sombre** : suit le système, basculable depuis la navigation

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20.9+
- npm

### Installation

```bash
git clone https://github.com/corentinsolal123/Reportify.git
cd Reportify
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠️ Stack technique

- **Framework** : Next.js 16 (App Router, Turbopack)
- **UI** : React 19, HeroUI v3 + Tailwind CSS v4
- **Icônes** : Gravity UI Icons
- **Langage** : TypeScript 7
- **Thème** : next-themes

## 📁 Structure du projet

```
Reportify/
├── app/
│   ├── daily/            # Page des rapports quotidiens
│   ├── weekly/           # Page des rapports hebdomadaires
│   ├── layout.tsx        # Layout principal
│   ├── providers.tsx     # Thème + toasts
│   └── page.tsx          # Page d'accueil
├── components/
│   ├── Form/             # Formulaires Daily / Weekly
│   ├── ReportPreview.tsx # Aperçu + copie
│   ├── Navbar.tsx
│   └── Footer.tsx
├── hooks/                # usePersistentState (brouillons)
├── lib/                  # Génération HTML/texte, presse-papiers
├── types/                # Définitions TypeScript
├── config/               # Config du site et des fonts
└── styles/               # Styles globaux (Tailwind + HeroUI)
```

## 🎯 Utilisation

1. Choisissez **Daily** ou **Weekly** depuis l'accueil ou la navigation
2. Remplissez le formulaire : l'aperçu se met à jour en direct
3. Cliquez sur **Ouvrir dans Outlook** : le rapport est copié et un nouvel email s'ouvre dans votre messagerie par défaut, il ne reste qu'à coller (Ctrl/Cmd + V). **Copier** copie seulement le rapport
4. **Réinitialiser** vide le formulaire (annulable depuis la notification)

Les anciennes URLs `/Form/Daily` et `/Form/Weekly` redirigent vers `/daily` et `/weekly`.

## 🔧 Scripts disponibles

```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run start      # Serveur de production
npm run typecheck  # Vérification TypeScript
npm run format     # Formatage Prettier
```

## 🎨 Personnalisation

Les couleurs sont des variables CSS HeroUI surchargées dans `styles/globals.css` (accent violet par défaut).

## 🔐 Sécurité

- **Échappement HTML** : toutes les saisies sont échappées avant d'être insérées dans le rapport généré
- **TypeScript strict** : mode strict activé

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Corentin Solal**

- GitHub: [@corentinsolal123](https://github.com/corentinsolal123)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [HeroUI](https://heroui.com/)
- [Gravity UI Icons](https://gravity-ui.com/icons)
- [Tailwind CSS](https://tailwindcss.com/)
