// /api/stripe-webhook-log.js
// Wrapper à ajouter au début de ton handler webhook Stripe existant
// pour tracer les user-agents et repérer les patterns répétitifs de bots

export function logWebhookMeta(req) {
  const userAgent = req.headers['user-agent'] || 'unknown';
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const timestamp = new Date().toISOString();

  // Simple log console → visible dans les logs Vercel (Dashboard > Deployments > Functions)
  console.log(JSON.stringify({
    event: 'stripe_webhook_hit',
    timestamp,
    userAgent,
    ip
  }));

  // Signal d'alerte basique : les vrais webhooks Stripe ont toujours
  // un user-agent commençant par "Stripe/1.0"
  const isLikelyStripe = userAgent.startsWith('Stripe/');
  if (!isLikelyStripe) {
    console.warn(`⚠️ Requête webhook suspecte — UA non-Stripe: ${userAgent} (IP: ${ip})`);
  }

  return { userAgent, ip, isLikelyStripe };
}

// Usage dans ton handler existant :
// import { logWebhookMeta } from './stripe-webhook-log';
// export default async function handler(req, res) {
//   const meta = logWebhookMeta(req);
//   if (!meta.isLikelyStripe) {
//     return res.status(403).json({ error: 'forbidden' });
//   }
//   // ... reste de ta logique existante
// }
