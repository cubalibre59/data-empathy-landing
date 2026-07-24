// Fichier à placer dans : api/guide-pro-content.js (à la racine du projet, à côté de "public")
// Cette fonction serverless Vercel :
// 1. Reçoit un session_id (fourni par Stripe après paiement)
// 2. Vérifie auprès de Stripe que ce paiement est bien confirmé
// 3. Ne renvoie le contenu du Guide PRO QUE si le paiement est validé

export default async function handler(req, res) {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(401).json({ error: "Session manquante." });
  }

  try {
    // Vérification auprès de Stripe (clé secrète, jamais exposée au client)
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session_id}`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.STRIPE_SECRET_KEY + ":").toString("base64"),
        },
      }
    );

    if (!stripeRes.ok) {
      return res.status(403).json({ error: "Session invalide." });
    }

    const session = await stripeRes.json();

    // Vérifie que le paiement est bien confirmé
    if (session.payment_status !== "paid") {
      return res.status(403).json({ error: "Paiement non confirmé." });
    }

    // ✅ Paiement confirmé — on renvoie le contenu protégé.
    const toolFiches = [
      { name: "Hotjar", category: "Heatmaps", desc: "Cartes de chaleur, enregistrements de sessions et sondages in-page pour voir où vos visiteurs cliquent et hésitent.", useCase: "Démarrer l'analyse comportementale sans budget élevé." },
      { name: "Lucky Orange", category: "Tout-en-un", desc: "Enregistrements de sessions, chat en direct et heatmaps réunis dans un seul outil accessible.", useCase: "Petites équipes qui veulent un outil polyvalent unique." },
      { name: "Userpilot", category: "Onboarding", desc: "Guides interactifs in-app et analyse de l'adoption produit pour réduire le churn dès les premiers jours.", useCase: "SaaS qui veulent améliorer leur onboarding utilisateur." },
      { name: "Mouseflow", category: "Analytics", desc: "Cartes de chaleur et entonnoirs de conversion détaillés pour repérer les points de friction précis.", useCase: "Sites e-commerce avec un tunnel d'achat à optimiser." },
      { name: "ContentSquare", category: "IA comportementale", desc: "Analyse comportementale de niveau enterprise avec Sense, sa suite d'IA analytique et prédictive.", useCase: "Sites à fort trafic voulant une analyse poussée et automatisée." },
      { name: "Crazy Egg", category: "Heatmaps", desc: "Heatmaps, scrollmaps et enregistrements pour visualiser ce qui retient ou fait fuir les visiteurs.", useCase: "Optimisation rapide de landing pages à fort trafic." },
      { name: "VWO", category: "A/B Testing", desc: "Plateforme de tests A/B combinée à des heatmaps et une analyse comportementale intégrée.", useCase: "Équipes qui veulent tester et mesurer chaque changement." },
      { name: "Intercom", category: "Chat IA", desc: "Messagerie client et chatbot IA pour engager les visiteurs au bon moment du parcours.", useCase: "Convertir les visiteurs hésitants en clients via le chat." },
      { name: "Heap", category: "Analytics auto", desc: "Capture automatique de tous les événements utilisateurs sans configuration manuelle de tracking.", useCase: "Équipes qui veulent analyser rétroactivement sans re-tagger." },
      { name: "Pendo", category: "Onboarding IA", desc: "Analytique produit, guides in-app et NPS intégré pour piloter l'engagement utilisateur.", useCase: "Produits SaaS matures qui veulent réduire le churn." },
      { name: "FullStory", category: "Session replay", desc: "Rejeu de sessions avec recherche indexée pour retrouver instantanément des comportements précis.", useCase: "Équipes support/produit qui enquêtent sur des bugs UX." },
      { name: "Amplitude", category: "Product analytics", desc: "Analyse des parcours produit et cohortes pour comprendre la rétention sur le long terme.", useCase: "Produits avec un cycle d'usage complexe à analyser." },
      { name: "Optimizely", category: "A/B Testing", desc: "Plateforme d'expérimentation avancée pour tester des variations à grande échelle.", useCase: "Grandes équipes avec un volume de trafic élevé." },
      { name: "Klaviyo", category: "Email comportemental", desc: "Segmentation et emails déclenchés automatiquement selon le comportement d'achat.", useCase: "E-commerce voulant automatiser les relances comportementales." },
      { name: "Segment", category: "CDP", desc: "Plateforme de données client qui centralise et redistribue les événements vers tous vos outils.", useCase: "Harmoniser les données entre plusieurs outils (étape H de la méthode)." },
    ];

    const protectedHtml = `
      <div style="max-width:760px;margin:0 auto;padding:50px 20px;font-family:'DM Sans',sans-serif;color:#e8e8f0;">

        <div style="text-align:center;margin-bottom:50px;">
          <span style="display:inline-block;background:#00e5a022;border:1px solid #00e5a0;color:#00e5a0;font-size:0.75rem;font-weight:700;padding:6px 16px;border-radius:100px;margin-bottom:16px;">MÉTHODE PROPRIÉTAIRE</span>
          <h1 style="font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;margin:10px 0;">La méthode E.M.P.A.T.H.Y</h1>
          <p style="color:#8888aa;max-width:520px;margin:0 auto 24px;">7 étapes pour transformer la donnée comportementale en décisions qui augmentent vos conversions.</p>
          <button onclick="window.print()" class="no-print" style="background:linear-gradient(135deg,#7c3aed,#00e5a0);color:#fff;border:none;font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;padding:12px 26px;border-radius:10px;cursor:pointer;">📥 Enregistrer en PDF</button>
        </div>

        <div style="background:#181828;border:1px solid #2a2a45;border-radius:16px;padding:24px 28px;margin-bottom:20px;">
          <h3 style="font-family:'Syne',sans-serif;color:#00e5a0;margin-bottom:8px;">E — Explorer le besoin métier</h3>
          <p style="color:#c8c8d8;font-size:0.92rem;">Avant tout outil, identifiez précisément le problème business : churn élevé, faible conversion, manque de compréhension client. Sans cette étape, aucun outil ne sera efficace.</p>
        </div>

        <div style="background:#181828;border:1px solid #2a2a45;border-radius:16px;padding:24px 28px;margin-bottom:20px;">
          <h3 style="font-family:'Syne',sans-serif;color:#00e5a0;margin-bottom:8px;">M — Mapper le parcours utilisateur</h3>
          <p style="color:#c8c8d8;font-size:0.92rem;">Cartographiez chaque point de contact, de la première visite à l'achat. Identifiez précisément où les utilisateurs abandonnent.</p>
          <p style="color:#00e5a0;font-size:0.85rem;margin-top:8px;">→ Outils recommandés : Hotjar, Lucky Orange</p>
        </div>

        <div style="background:#181828;border:1px solid #2a2a45;border-radius:16px;padding:24px 28px;margin-bottom:20px;">
          <h3 style="font-family:'Syne',sans-serif;color:#00e5a0;margin-bottom:8px;">P — Préparer et collecter les données</h3>
          <p style="color:#c8c8d8;font-size:0.92rem;">Mettez en place un tracking propre (événements, formulaires, comportements). Sans données fiables, pas d'analyse fiable.</p>
          <p style="color:#00e5a0;font-size:0.85rem;margin-top:8px;">→ Outils recommandés : Mouseflow, Heap</p>
        </div>

        <div style="background:#181828;border:1px solid #7c3aed;border-radius:16px;padding:24px 28px;margin-bottom:20px;">
          <h3 style="font-family:'Syne',sans-serif;color:#a78bfa;margin-bottom:8px;">A — Analyser avec l'IA analytique</h3>
          <p style="color:#c8c8d8;font-size:0.92rem;">Utilisez l'IA pour détecter des patterns invisibles à l'œil nu : segments à risque, comportements prédictifs de churn.</p>
          <p style="color:#a78bfa;font-size:0.85rem;margin-top:8px;">→ Outil recommandé : ContentSquare</p>
        </div>

        <div style="background:#181828;border:1px solid #7c3aed;border-radius:16px;padding:24px 28px;margin-bottom:20px;">
          <h3 style="font-family:'Syne',sans-serif;color:#a78bfa;margin-bottom:8px;">T — Transformer les données en décisions</h3>
          <p style="color:#c8c8d8;font-size:0.92rem;">Chaque insight doit déboucher sur une action concrète : changement de formulaire, nouveau message, nouvelle offre — jamais juste un rapport qu'on ne relit pas.</p>
        </div>

        <div style="background:#181828;border:1px solid #d85a30;border-radius:16px;padding:24px 28px;margin-bottom:20px;">
          <h3 style="font-family:'Syne',sans-serif;color:#f0997b;margin-bottom:8px;">H — Harmoniser les outils</h3>
          <p style="color:#c8c8d8;font-size:0.92rem;">Connectez CRM, CDP, Analytics et IA pour que les données circulent au lieu de rester en silos.</p>
          <p style="color:#f0997b;font-size:0.85rem;margin-top:8px;">→ Exemple : Brevo (CRM/email) + Stripe (paiement) + ContentSquare (comportement)</p>
        </div>

        <div style="background:#181828;border:1px solid #d85a30;border-radius:16px;padding:24px 28px;margin-bottom:20px;">
          <h3 style="font-family:'Syne',sans-serif;color:#f0997b;margin-bottom:8px;">Y — Yield : mesurer et améliorer en continu</h3>
          <p style="color:#c8c8d8;font-size:0.92rem;">Suivez les KPI clés (taux de conversion, churn, LTV) et itérez. La méthode n'est jamais "finie" — elle boucle en continu.</p>
        </div>

        <div style="text-align:center;margin:60px 0 30px;">
          <span style="display:inline-block;background:#7c3aed22;border:1px solid #7c3aed;color:#a78bfa;font-size:0.75rem;font-weight:700;padding:6px 16px;border-radius:100px;margin-bottom:16px;">BIBLIOTHÈQUE PRO</span>
          <h2 style="font-family:'Syne',sans-serif;font-size:1.7rem;font-weight:800;margin:10px 0;">15 fiches outils détaillées</h2>
        </div>

        ${toolFiches.map((t, i) => `
        <div style="background:#181828;border:1px solid #2a2a45;border-radius:14px;padding:22px 26px;margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <h4 style="font-family:'Syne',sans-serif;color:#e8e8f0;font-size:1rem;">${String(i + 1).padStart(2, '0')}. ${t.name}</h4>
            <span style="font-size:0.72rem;color:#00e5a0;background:#00e5a022;padding:3px 10px;border-radius:100px;">${t.category}</span>
          </div>
          <p style="color:#8888aa;font-size:0.88rem;margin-bottom:6px;">${t.desc}</p>
          <p style="color:#6a6a85;font-size:0.8rem;"><strong style="color:#8888aa;">Idéal pour :</strong> ${t.useCase}</p>
        </div>`).join('')}

        <div style="text-align:center;margin:60px 0 30px;">
          <span style="display:inline-block;background:#00e5a022;border:1px solid #00e5a0;color:#00e5a0;font-size:0.75rem;font-weight:700;padding:6px 16px;border-radius:100px;margin-bottom:16px;">TEMPLATES</span>
          <h2 style="font-family:'Syne',sans-serif;font-size:1.7rem;font-weight:800;margin:10px 0;">3 templates prêts à l'emploi</h2>
        </div>

        <div style="background:#181828;border:1px solid #2a2a45;border-radius:14px;padding:22px 26px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;">
          <div>
            <h4 style="font-family:'Syne',sans-serif;color:#e8e8f0;margin-bottom:6px;">📋 Grille d'audit du tunnel de conversion</h4>
            <p style="color:#8888aa;font-size:0.88rem;">Checklist étape par étape pour auditer chaque point du parcours client (landing → paiement) et repérer les frictions.</p>
          </div>
          <a href="/templates/template-1-audit-tunnel.pdf" download style="flex-shrink:0;background:#00e5a0;color:#000;font-weight:700;font-size:0.85rem;padding:10px 20px;border-radius:8px;text-decoration:none;white-space:nowrap;">📥 Télécharger</a>
        </div>
        <div style="background:#181828;border:1px solid #2a2a45;border-radius:14px;padding:22px 26px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;">
          <div>
            <h4 style="font-family:'Syne',sans-serif;color:#e8e8f0;margin-bottom:6px;">📊 Matrice de priorisation impact/effort</h4>
            <p style="color:#8888aa;font-size:0.88rem;">Pour classer chaque friction identifiée et décider quoi corriger en premier.</p>
          </div>
          <a href="/templates/template-2-matrice-priorisation.pdf" download style="flex-shrink:0;background:#00e5a0;color:#000;font-weight:700;font-size:0.85rem;padding:10px 20px;border-radius:8px;text-decoration:none;white-space:nowrap;">📥 Télécharger</a>
        </div>
        <div style="background:#181828;border:1px solid #2a2a45;border-radius:14px;padding:22px 26px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;">
          <div>
            <h4 style="font-family:'Syne',sans-serif;color:#e8e8f0;margin-bottom:6px;">✅ Checklist de mise en place du tracking</h4>
            <p style="color:#8888aa;font-size:0.88rem;">Liste des événements essentiels à tracker avant de commencer toute analyse comportementale.</p>
          </div>
          <a href="/templates/template-3-checklist-tracking.pdf" download style="flex-shrink:0;background:#00e5a0;color:#000;font-weight:700;font-size:0.85rem;padding:10px 20px;border-radius:8px;text-decoration:none;white-space:nowrap;">📥 Télécharger</a>
        </div>

        <div style="text-align:center;margin:60px 0 30px;">
          <span style="display:inline-block;background:#7c3aed22;border:1px solid #7c3aed;color:#a78bfa;font-size:0.75rem;font-weight:700;padding:6px 16px;border-radius:100px;margin-bottom:16px;">VIDÉO</span>
          <h2 style="font-family:'Syne',sans-serif;font-size:1.7rem;font-weight:800;margin:10px 0;">3 tutoriels vidéo</h2>
          <p style="color:#8888aa;font-size:0.9rem;">🎥 Vidéos en cours de production — disponibles très prochainement pour tous les membres PRO.</p>
        </div>

      </div>
    `;

    return res.status(200).json({ html: protectedHtml });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
}