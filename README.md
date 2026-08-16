# DATA-EMPATHY — Architecture SaaS

> **Domaine** : `data-empathy.click`  
> **Stack** : OVH (DNS/Email) → Vercel (Frontend) → Systeme.io (Marketing Automation)
Ce dépôt contient **deux projets distincts et indépendants**, hébergés sur le même repo GitHub / déploiement Vercel, mais **ne devant jamais être mélangés**.

---
## ⚠️ RÈGLE ABSOLUE

| Dossier | Projet | Statut |
|---|---|---|
| `/deco` | Tunnel Pinterest → Amazon (affiliation) | 🔒 **NE JAMAIS TOUCHER** — déjà connecté à Systeme.io |
| `/public` (racine) | **DATA-EMPATHY** — SaaS analytics comportementale | ✅ Projet actif, en développement continu |

Toute intervention (code, contenu, config) concerne **exclusivement** le projet DATA-EMPATHY, sauf demande explicite contraire.

---

## 🧩 Projet 1 — `/deco` (Pinterest → Amazon)

- **Fonction :** tunnel d'affiliation Amazon piloté depuis des épingles Pinterest
- **Plateforme d'automatisation :** Systeme.io (formulaires, tunnels, emails)
- **Fichiers concernés :** `deco/index.html`, `deco/test-sticky-bar.html`
- **Statut :** fonctionnel, autonome, ne dépend d'aucun élément du projet DATA-EMPATHY

Aucune documentation supplémentaire n'est fournie ici volontairement — ce projet est hors périmètre.

---

## 🚀 Projet 2 — DATA-EMPATHY (SaaS)

### Vue d'ensemble

Plateforme d'analyse comportementale IA. Le site sert de tunnel de vente complet :
**visiteur → lead (email) → nurturing automatisé → client payant → contenu premium débloqué.**

- **Domaine :** [data-empathy.click](https://www.data-empathy.click)
- **Repo :** `github.com/cubalibre59/data-empathy-landing`
- **Déploiement :** Vercel (auto-deploy sur push vers `main`)
- **Type :** site statique HTML/CSS/JS (pas de framework front, Vite présent mais non utilisé au build)

### Stack technique

| Brique | Outil | Rôle |
|---|---|---|
| Domaine | OVHcloud | Gestion DNS de data-empathy.click |
| Hébergement | Vercel | Déploiement statique + fonctions serverless |
| Code | GitHub | Versioning, déclenche le déploiement auto |
| Email / CRM | Brevo | Capture de leads, automatisation, listes |
| Paiement | Stripe | Paiement du Guide PRO (19€), vérification serverless |
| Analytics comportemental | ContentSquare | Tracking UX (déjà installé sur les pages clés) |
--------------------
## 🔗 Tunnel de Vente (Flux Utilisateur)

```
Visiteur → index.html (landing + audit IA interactif)
              │
              ▼
     Formulaire Brevo (email uniquement)
              │
              ▼
   Liste Brevo "Guide gratuit - Data Empathy" (#7)
              │
              ▼
   Automatisation Brevo — 6 emails (J0 → J+9)
   (bienvenue, prise en main, astuce, étude de cas,
    teaser PRO, offre finale)
              │
              ▼
   Clic sur lien Stripe (19€) dans un email ou sur
   guide-gratuit.html (CTA "Débloquer le Guide PRO")
              │
              ▼
     Paiement Stripe → redirection avec session_id
              │
              ▼
   guide-pro.html vérifie le paiement via
   api/guide-pro-content.js (fonction serverless)
              │
              ▼
   Contenu débloqué : méthode E.M.P.A.T.H.Y,
   15 fiches outils, 3 templates PDF, tutoriels vidéo (à venir)
```

## 🧩 Architecture SaaS Finale

| Service          | Rôle                          | URL / Accès                                      | Statut       |
|------------------|-------------------------------|--------------------------------------------------|--------------|
| **OVH**          | Domaine + DNS + Email Pro     | [Manager OVH](https://www.ovh.com/manager/)      | ✅ valide |
| **Vercel**       | Hébergement Frontend (SaaS)   | [Dashboard](https://vercel.com/tamayo-s-projects) | ✅ Déployé   |
| **Systeme.io**   | Acquisition & Tunnel de vente | [Dashboard](https://systeme.io/)                 |  ✅ valide |
| **OVH Mail/Zimbra** | Email professionnel        | `contact@data-empathy.click`                     |  ✅ valide|
| **Brevo**   | Acquisition & Tunnel de vente | [Dashboard](https://brevo.com/)                 |  ✅ valide |

---

## 📂 Structure du Projet

```
landing-page/
├── api/
│   └── guide-pro-content.js      # Vérifie le paiement Stripe, renvoie le contenu PRO
├── public/
│   ├── index.html                 # Landing page + audit IA interactif
│   ├── guide-gratuit.html         # Guide gratuit (10 outils) + CTA Guide PRO
│   ├── guide-pro.html             # Coquille protégée par paywall
│   ├── cgv.html                   # Conditions Générales de Vente
│   ├── politique-confidentialite.html
│   ├── templates/
│   │   ├── template-1-audit-tunnel.pdf
│   │   ├── template-2-matrice-priorisation.pdf
│   │   └── template-3-checklist-tracking.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── deco/                          # 🔒 Projet séparé — ne pas toucher
├── vercel.json                    # buildCommand vide, outputDirectory "."
├── vite.config.js                 # Présent mais non exécuté au déploiement
└── package.json
```
### La méthode E.M.P.A.T.H.Y

Framework propriétaire DATA-EMPATHY, cœur du contenu du Guide PRO :

| Lettre | Étape |
|---|---|
| **E** | Explorer le besoin métier |
| **M** | Mapper le parcours utilisateur |
| **P** | Préparer et collecter les données |
| **A** | Analyser avec l'IA analytique |
| **T** | Transformer les données en décisions |
| **H** | Harmoniser les outils (CRM, CDP, Analytics, IA) |
| **Y** | Yield : mesurer et améliorer en continu |

- Teasing progressif : aperçu léger sur `index.html`/`guide-gratuit.html`, détail complet uniquement après paiement.

### Variables d'environnement (Vercel)

| Variable | Usage |
|---|---|
| `STRIPE_SECRET_KEY` | Vérification des paiements côté serveur dans `api/guide-pro-content.js` |

### Offre Guide PRO

- **Prix :** 19€ (paiement unique)
- **Lien Stripe :** `https://buy.stripe.com/28E00i3MIbmUf1C1yNgQE00`
- **Contenu livré :** méthode E.M.P.A.T.H.Y complète, 15 fiches outils, 3 templates PDF téléchargeables, 3 tutoriels vidéo *(en cours de production)*
- **Accès :** consultation en ligne (pas de PDF envoyé par email) + bouton "Enregistrer en PDF" (impression navigateur) pour une copie hors-ligne

### Statut actuel

✅ Formulaire de capture connecté à Brevo (remplace l'ancien Systeme.io)
✅ Automatisation 6 emails créée et activée
✅ Paywall Stripe fonctionnel (`guide-pro.html` + `api/guide-pro-content.js`)
✅ Pages légales (CGV, politique de confidentialité) déployées
✅ Templates PDF créés et liés
✅ Reçus de paiement Stripe activés

### statut  valide - 27/07/2026

✅Compléter les mentions légales définitives (SIRET, statut juridique) dans CGV et politique de confidentialité
✅ Enregistrer et intégrer les 3 tutoriels vidéo
✅ Ajouter le teaser E.M.P.A.T.H.Y sur `index.html` (lien discret dans la nav, sans concurrencer le CTA principal "Obtenir le Guide Gratuit")
✅ Intégration affiliation ContentSquare (lien : `https://invite.contentsquare.com/mt1dz2ujeux2`)

### Principes de travail

- Toute modification est commitée sur `main` avec un message en français, puis auto-déployée par Vercel
- Le dossier `/deco` reste strictement hors périmètre
- Les changements de contenu marketing (emails, CTA, prix) doivent rester cohérents entre `guide-gratuit.html`, `guide-pro.html`/`guide-pro-content.js` et les emails Brevo
---


---
## 📈 Stratégie SEO — Exécution (Août 2026)

### Recherche de mots-clés

- Outils utilisés : SEMrush Keyword Magic Tool (quota gratuit limité), veille manuelle
- Cluster **churn/rétention** testé et abandonné : 78/99 mots-clés à volume 0 en base France, quasi exclusivement anglophone → aucun potentiel de recherche organique FR
- Cluster **conversion** validé : `taux de conversion saas` (40/mois), `taux de conversion landing page saas` (20/mois, moins disputé)
- Quick win identifié : `analyse des besoins clients` (90/mois, KD 28) — déjà positionné en page 2 (~pos.15) sans contenu dédié avant l'article

### Contenu publié

| Article | Mot-clé cible | Étape E.M.P.A.T.H.Y | Statut |
|---|---|---|---|
| `taux-conversion-landing-page-saas.html` | taux de conversion landing page saas | Y (Yield) | ✅ Indexé (confirmé GSC) |
| `analyse-besoins-clients.html` | analyse des besoins clients | E (Explorer) | ✅ Indexation demandée, à confirmer |

Chaque article inclut : meta title/description optimisés, JSON-LD Article, canonical, CTA vers le Guide PRO, et maillage interne bidirectionnel avec `guide-gratuit.html` et `bibliotheque-methode-empathy.html`.

### Netlinking

- **Disavow complet** : ~206 domaines spam/PBN désavoués via Search Console (remplace l'ancien fichier à 43 domaines)
- **FranceSaaS.fr** : fiche créée, badge dofollow installé et vérifié dans le footer de `index.html`, soumise pour validation manuelle
- À faire : AlternativeTo, Crunchbase, réapplication Awin/Lucky Orange (dossier renforcé par les pages légales + premier backlink légitime)

### Indexation

- Chaque nouvel article est soumis manuellement via GSC "Demander une indexation" après déploiement
- Sitemap mis à jour à chaque nouvelle page publiée

---

## ⚙️ Configuration DNS (OVH → Vercel)

### Enregistrements requis dans la Zone DNS OVH

| Type    | Sous-domaine | Cible / Valeur                | TTL        |
|---------|-------------|-------------------------------|------------|
| **A**   | `@`         | `76.76.21.21`                 | Par défaut |
| **CNAME** | `www`     | `cname.vercel-dns.com.`       | Par défaut |

> **Important** : Supprimez tout enregistrement A existant pointant vers `213.186.33.5` avant d'ajouter le nouveau.
> Un CNAME ne peut pas coexister avec d'autres enregistrements (A, TXT, etc.) sur le même sous-domaine.

### Vérification DNS

```bash
nslookup -type=a data-empathy.click
# Attendu : 76.76.21.21

nslookup -type=cname www.data-empathy.click
# Attendu : cname.vercel-dns.com.
```

---

## 📧 Configuration Email Pro (OVH Mail / Zimbra)

### Accès Webmail
- **URL** : https://pro1.mail.ovh.net (ou via le Manager OVH)
- **Adresse** : `contact@data-empathy.click`

### Enregistrements DNS pour l'email (déjà présents)

| Type    | Sous-domaine                     | Cible                                                          |
|---------|----------------------------------|----------------------------------------------------------------|
| CNAME   | `ovhmo-selector-1._domainkey`    | `ovhmo-selector-1._domainkey.4633691.io.dkim.mail.ovh.net.`   |
| CNAME   | `ovhmo-selector-2._domainkey`    | `ovhmo-selector-2._domainkey.4633692.io.dkim.mail.ovh.net.`   |

> Ces enregistrements DKIM sont déjà configurés. L'email pro est prêt à l'emploi.

---

## 📩 Configuration Systeme.io

### Étape 1 : Créer le formulaire de capture

1. Connectez-vous à [Systeme.io](https://systeme.io)
2. Allez dans **Tunnels de vente** → **Créer un tunnel**
3. Choisissez le type **"Capture d'email"**
4. Créez une page avec un formulaire simple (email uniquement)
5. Dans les **paramètres du formulaire**, récupérez l'URL d'action :
   ```
   https://systeme.io/embedded/XXXXXX/subscribe
   ```

### Étape 2 : Intégrer dans le site

Ouvrez `index.html` et trouvez la ligne :
```javascript
const SYSTEME_IO_FORM_URL = 'https://systeme.io/embedded/XXXXXX/subscribe';
```
Remplacez `XXXXXX` par votre identifiant Systeme.io.

### Étape 3 : Configurer l'automatisation email

1. Dans Systeme.io → **Emails** → **Campagnes**
2. Créez une **séquence automatique** :
   - **Email 1** (immédiat) : Envoi du Guide Gratuit (lien vers `guide-gratuit.html`)
   - **Email 2** (J+1) : Rappel + CTA vers l'Audit IA
   - **Email 3** (J+3) : Témoignages + CTA vers le Guide PRO (19€)
   - **Email 4** (J+5) : Dernière chance + offre limitée Guide PRO
3. Associez cette séquence au formulaire de capture créé à l'étape 1

### Étape 4 : Configurer le paiement (Guide PRO)

1. Systeme.io → **Produits** → **Créer un produit**
2. Nom : "Guide PRO DATA-EMPATHY"
3. Prix : 19€
4. Méthode de paiement : Stripe ou PayPal (à configurer dans les paramètres)
5. Page de vente : lien vers `https://data-empathy.click/guide-pro`
6. Livraison : accès automatique après paiement

---

## 🚀 Déploiement

### Développement local
```bash
npm install     # Première fois uniquement
npm run dev     # Serveur local (http://localhost:5173)
```

### Déployer sur Vercel
```bash
git add .
git commit -m "feat: description de vos changements"
git push origin main
# → Vercel redéploie automatiquement
```

### Vérifier le déploiement
- Production : https://data-empathy.click
- Preview : https://data-empathy-landing.vercel.app

---

## 📋 Checklist de Mise en Production

### DNS & Domaine (OVH)
- [ ] Enregistrement **A** → `76.76.21.21` (racine `@`)
- [ ] Enregistrement **CNAME** → `cname.vercel-dns.com.` (sous-domaine `www`)
- [ ] Supprimer les anciens enregistrements A/TXT conflictuels
- [ ] Vérifier la propagation DNS avec `nslookup`

### Vercel
- [ ] Domaine `data-empathy.click` → **Valid Configuration**
- [ ] Domaine `www.data-empathy.click` → **Valid Configuration**
- [ ] SSL/HTTPS automatique activé
- [ ] `vercel.json` déployé (redirections + headers)

### Systeme.io
- [ ] Formulaire de capture créé
- [ ] URL du formulaire intégrée dans `index.html` (`SYSTEME_IO_FORM_URL`)
- [ ] Séquence email automatique configurée (4 emails minimum)
- [ ] Produit "Guide PRO" créé (19€)
- [ ] Paiement Stripe/PayPal connecté
- [ ] Test complet du tunnel (inscription → emails → achat)

### Email Pro (OVH)
- [ ] Adresse `contact@data-empathy.click` créée et fonctionnelle
- [ ] Enregistrements DKIM configurés (déjà fait)
- [ ] Test d'envoi/réception d'email
- [ ] Signature email professionnelle configurée

---

## 📊 KPIs à Suivre

| Métrique                  | Objectif     | Outil de suivi     |
|---------------------------|-------------|-------------------|
| Taux de capture email     | > 15%       | Systeme.io        |
| Taux d'ouverture emails   | > 40%       | Systeme.io        |
| Taux de clic emails       | > 10%       | Systeme.io        |
| Conversion Guide PRO      | > 3%        | Systeme.io/Stripe |
| Visiteurs uniques/jour    | > 100       | Vercel Analytics  |

---

## 🔧 Commandes Utiles

```bash
# Vérifier le statut Git
git status

# Voir les logs récents
git log --oneline -5

# Vérifier les DNS
nslookup -type=a data-empathy.click
nslookup -type=cname www.data-empathy.click

# Inspecter le domaine via Vercel CLI
vercel domains inspect data-empathy.click

# Redéployer manuellement
vercel --prod
```

---

© 2026 DATA-EMPATHY — Architecture SaaS complète
