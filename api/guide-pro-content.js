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
        const protectedHtml = `
      <div style="max-width:760px;margin:0 auto;padding:50px 20px;font-family:'DM Sans',sans-serif;color:#e8e8f0;">

        <div style="text-align:center;margin-bottom:50px;">
          <span style="display:inline-block;background:#00e5a022;border:1px solid #00e5a0;color:#00e5a0;font-size:0.75rem;font-weight:700;padding:6px 16px;border-radius:100px;margin-bottom:16px;">MÉTHODE PROPRIÉTAIRE</span>
          <h1 style="font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;margin:10px 0;">La méthode E.M.P.A.T.H.Y</h1>
          <p style="color:#8888aa;max-width:520px;margin:0 auto;">7 étapes pour transformer la donnée comportementale en décisions qui augmentent vos conversions.</p>
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

      </div>
    `;

        return res.status(200).json({ html: protectedHtml });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur serveur." });
    }
}