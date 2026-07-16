# DATA-EMPATHY — Architecture SaaS

> **Domaine** : `data-empathy.click`  
> **Stack** : OVH (DNS/Email) → Vercel (Frontend) → Systeme.io (Marketing Automation)

---

## 🧩 Architecture SaaS Finale

| Service          | Rôle                          | URL / Accès                                      | Statut       |
|------------------|-------------------------------|--------------------------------------------------|--------------|
| **OVH**          | Domaine + DNS + Email Pro     | [Manager OVH](https://www.ovh.com/manager/)      | ⚙️ À valider |
| **Vercel**       | Hébergement Frontend (SaaS)   | [Dashboard](https://vercel.com/tamayo-s-projects) | ✅ Déployé   |
| **Systeme.io**   | Acquisition & Tunnel de vente | [Dashboard](https://systeme.io/)                 | ⚙️ À configurer |
| **OVH Mail/Zimbra** | Email professionnel        | `contact@data-empathy.click`                     | ⚙️ À valider |
| **Brevo**   | Acquisition & Tunnel de vente | [Dashboard](https://brevo.com/)                 | ⚙️ À configurer |

---

## 📂 Structure du Projet

```
landing-page/
├── index.html           ← Page principale (Landing + Audit IA + Tunnel)
├── guide-gratuit.html   ← Guide gratuit (Top 10 Outils IA) — lead magnet
├── guide-pro.html       ← Guide PRO (19€) — produit payant
├── vercel.json          ← Config Vercel (redirections, headers, clean URLs)
├── package.json         ← Scripts dev/build (Vite)
└── README.md            ← Ce fichier
```

---

## 🔗 Tunnel de Vente (Flux Utilisateur)

```
Visiteur arrive sur data-empathy.click
        │
        ▼
┌───────────────────────┐
│  LANDING PAGE         │
│  (index.html)         │
│  • Hero + urgency bar │
│  • Formulaire email   │
└───────┬───────────────┘
        │ Email soumis → Systeme.io
        ▼
┌───────────────────────┐
│  THANK YOU            │
│  (écran 2)            │
│  • Guide gratuit      │
│    envoyé par email   │
│  • CTA → Audit IA    │
└───────┬───────────────┘
        │
        ▼
┌───────────────────────┐
│  AUDIT IA             │
│  (écran 3)            │
│  • 6 questions        │
│  • Score + Recommanda-│
│    tions personnalisées│
│  • Upsell Guide PRO  │
└───────┬───────────────┘
        │
        ▼
┌───────────────────────┐
│  GUIDE PRO (19€)      │
│  (guide-pro.html)     │
│  • Page de vente      │
│  • Paiement Stripe /  │
│    Systeme.io         │
└───────────────────────┘
```

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
