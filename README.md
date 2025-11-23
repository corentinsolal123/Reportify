# Reportify

> Make reporting great again.

Reportify est une application web moderne pour simplifier la création de rapports quotidiens et hebdomadaires. Générez facilement des tableaux HTML formatés prêts à être copiés dans vos emails professionnels.

## ✨ Fonctionnalités

- 📊 **Rapports quotidiens** : Suivez ce qui a été fait hier et ce qui est prévu aujourd'hui
- 📅 **Rapports hebdomadaires** : Créez des revues hebdomadaires complètes avec tâches et évaluations
- 🎨 **Interface moderne** : UI élégante avec support du mode sombre
- 📋 **Copie en un clic** : Copiez les tableaux HTML directement dans Outlook
- 🔒 **Sécurisé** : Sanitization automatique des entrées utilisateur
- 🎯 **TypeScript** : Code entièrement typé pour une meilleure maintenabilité

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/corentinsolal123/Reportify.git
cd Reportify

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠️ Stack technique

- **Framework** : Next.js 15 (App Router)
- **UI** : HeroUI 2.6 + Tailwind CSS
- **Langage** : TypeScript 5.7
- **Animations** : Framer Motion
- **Thème** : next-themes
- **Notifications** : react-hot-toast
- **Sécurité** : isomorphic-dompurify

## 📁 Structure du projet

```
Reportify/
├── app/                    # Pages Next.js (App Router)
│   ├── Form/
│   │   ├── Daily/         # Page des rapports quotidiens
│   │   └── Weekly/        # Page des rapports hebdomadaires
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React réutilisables
│   ├── Form/             # Composants de formulaires
│   ├── Navbar.tsx        # Navigation
│   └── Footer.tsx        # Pied de page
├── lib/                   # Utilitaires
│   ├── htmlGenerator.ts  # Génération de HTML sécurisé
│   └── toast.tsx         # Notifications toast
├── types/                 # Définitions TypeScript
│   └── index.ts
├── config/               # Configuration
│   ├── site.ts          # Config du site
│   └── fonts.ts         # Config des fonts
└── styles/              # Styles globaux
    └── globals.css
```

## 🎯 Utilisation

### Rapports quotidiens

1. Accédez à la page "Daily" depuis la navigation
2. Remplissez les champs : Nom, Ce qui a été fait hier, Ce qui est prévu aujourd'hui
3. Ajoutez plusieurs lignes si nécessaire avec le bouton +
4. Cliquez sur "Générer le tableau"
5. Cliquez sur "Transférer dans Outlook" pour copier le HTML

### Rapports hebdomadaires

1. Accédez à la page "Weekly" depuis la navigation
2. Remplissez le nom de la personne
3. Ajoutez les tâches réalisées avec observations
4. Évaluez les différents aspects (rendu, organisation, compréhension, motivation)
5. Cliquez sur "Générer le tableau" pour prévisualiser
6. Copiez et collez le contenu dans votre email

## 🔧 Scripts disponibles

```bash
npm run dev      # Lancer le serveur de développement
npm run build    # Créer un build de production
npm run start    # Lancer le serveur de production
```

## 🎨 Personnalisation

### Thème

Le thème par défaut est sombre. L'utilisateur peut basculer entre les modes clair/sombre via le bouton dans la navigation.

### Couleurs

Les couleurs sont configurées dans `tailwind.config.js` et peuvent être personnalisées selon vos besoins.

## 🔐 Sécurité

- **Sanitization HTML** : Toutes les entrées utilisateur sont nettoyées avec DOMPurify avant rendu
- **TypeScript strict** : Mode strict activé pour une meilleure sécurité des types
- **Validation des entrées** : Vérification des champs requis avant génération

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Améliorations récentes

- ✅ Suppression de tous les `@ts-ignore` et amélioration du typage TypeScript
- ✅ Remplacement des `alert()` par un système de toasts moderne
- ✅ Ajout de la sanitization HTML avec DOMPurify
- ✅ Extraction de la génération HTML dans des utilitaires réutilisables
- ✅ Centralisation des types dans un fichier unique
- ✅ Correction des tests et de la configuration
- ✅ Amélioration de la gestion d'erreurs

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Corentin Solal**

- GitHub: [@corentinsolal123](https://github.com/corentinsolal123)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [HeroUI](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
