// /api/verify-email.js
// Fonction serverless Vercel — à placer dans le dossier /api de ton projet
import dns from 'dns/promises';

// Liste rapide de domaines jetables courants (extensible)
const DISPOSABLE_DOMAINS = new Set([
  'yopmail.com', 'mailinator.com', 'guerrillamail.com', 'tempmail.com',
  'temp-mail.org', '10minutemail.com', 'trashmail.com', 'throwawaymail.com',
  'fakeinbox.com', 'sharklasers.com', 'getnada.com', 'maildrop.cc'
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ valid: false, reason: 'invalid_format' });
  }

  const domain = email.split('@')[1].toLowerCase().trim();

  // 1. Blocage domaines jetables connus
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return res.status(200).json({ valid: false, reason: 'disposable_domain' });
  }

  // 2. Vérification MX (le domaine peut-il réellement recevoir des emails ?)
  try {
    const mxRecords = await dns.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return res.status(200).json({ valid: false, reason: 'no_mx_record' });
    }
  } catch (err) {
    // ENOTFOUND / ENODATA = domaine invalide ou sans MX
    return res.status(200).json({ valid: false, reason: 'domain_not_found' });
  }

  return res.status(200).json({ valid: true });
}
