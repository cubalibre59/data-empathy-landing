# DATA-EMPATHY - Routine Opérationnelle (Affiliation)

Ce document explique comment démarrer, configurer et mettre en ligne votre landing page d'affiliation.

## 1. Démarrer le projet en local (Développement)

Pour voir votre site sur votre ordinateur et tester vos modifications :

1. Ouvrez votre terminal (ou l'invite de commande).
2. Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé.
3. Placez-vous dans ce dossier : `cd d:\DATA-EMPATHY\landing-page`
4. Installez les dépendances (la première fois uniquement) :
   ```bash
   npm install
   ```
5. Lancez le serveur local :
   ```bash
   npm run dev
   ```
6. Cliquez sur le lien local fourni dans le terminal (souvent `http://localhost:5173/`) pour voir le résultat. Le site se mettra à jour automatiquement dès que vous modifiez `index.html`.

## 2. Configurer la page pour l'Affiliation

### A. Insérer vos liens d'affiliation
Ouvrez le fichier `index.html`. Cherchez les textes en majuscules suivants et remplacez-les par vos propres liens générés par vos programmes d'affiliation :
- `VOTRE_LIEN_AFFILIE_ICI` (Bouton principal dans le Hero)
- `LIEN_AFFILIE_OUTIL_1`, `2`, `3` (Dans la section Piliers)

### B. Mettre en place le Tracking (Essentiel !)
Pour faire du retargeting ou comprendre d'où viennent vos ventes, vous devez ajouter des pixels.
Dans la balise `<head>` du fichier `index.html`, j'ai laissé des espaces prêts à l'emploi. 
- Décommentez (enlevez les `<!--` et `-->`) le bloc "EXEMPLE META PIXEL" ou "GOOGLE ANALYTICS".
- Remplacez `VOTRE_ID_PIXEL` ou `VOTRE_ID_GA` par les identifiants fournis par Facebook/Google.

## 3. Mise en ligne (Déploiement Gratuit)

Je vous recommande d'utiliser **Vercel** ou **Netlify** pour héberger ce site gratuitement et très facilement.

**Méthode la plus simple (via interface web Vercel) :**
1. Créez un compte sur [Vercel](https://vercel.com).
2. Téléchargez l'outil en ligne de commande de Vercel (optionnel) ou bien publiez votre code sur un dépôt GitHub.
3. Si vous utilisez GitHub, connectez votre dépôt à Vercel. Il détectera automatiquement que c'est un projet Vite.
4. Laissez les paramètres par défaut (`Build Command: npm run build`, `Output Directory: dist`).
5. Cliquez sur **Deploy**.

En moins d'une minute, votre site sera en ligne avec une URL en HTTPS. Vous pourrez ensuite acheter un nom de domaine (ex: `data-empathy.com`) et l'ajouter dans les paramètres Vercel.
