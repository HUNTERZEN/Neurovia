import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

export const config = {
  runtime: 'nodejs',
};

const ALLOWED_SENDERS = new Set([
  'neurovianexus8@gmail.com',
  (process.env.EMAIL_USER || '').trim().toLowerCase(),
].filter(Boolean));

function safeEqualHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function stripCrlf(val) {
  return String(val || '').replace(/[\r\n]+/g, ' ').trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const fromUser = stripCrlf(body.fromUser).toLowerCase();
    const appPass = String(body.appPass || '').replace(/\s+/g, '');
    const to = Array.isArray(body.to)
      ? body.to.map(stripCrlf).filter(Boolean).join(', ')
      : stripCrlf(body.to);
    const subject = stripCrlf(body.subject);
    const html = String(body.html || '');
    const replyTo = body.replyTo ? stripCrlf(body.replyTo) : undefined;

    const ts = String(req.headers['x-neurovia-relay-ts'] || '');
    const sig = String(req.headers['x-neurovia-relay-sig'] || '');

    if (!fromUser || !ALLOWED_SENDERS.has(fromUser)) {
      return res.status(403).json({ error: 'Unauthorized sender' });
    }
    if (!appPass || appPass.length < 12 || !to || !subject || !html) {
      return res.status(400).json({ error: 'Invalid relay payload' });
    }

    // Prevent replay attacks (5 minute window) & verify HMAC integrity
    const tsNum = Number(ts);
    if (!Number.isFinite(tsNum) || Math.abs(Date.now() - tsNum) > 5 * 60 * 1000) {
      return res.status(401).json({ error: 'Expired relay timestamp' });
    }

    const expectedSig = crypto
      .createHmac('sha256', appPass)
      .update(`${ts}:${fromUser}:${to}:${subject}`)
      .digest('hex');

    if (!safeEqualHex(expectedSig, sig)) {
      return res.status(401).json({ error: 'Invalid relay signature' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: fromUser,
        pass: appPass,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });

    const info = await transporter.sendMail({
      from: `"Neurovia Nexus" <${fromUser}>`,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    return res.status(200).json({ sent: true, messageId: info.messageId });
  } catch (err) {
    console.error('Mail relay error:', err.message);
    return res.status(500).json({ sent: false, error: 'Relay send failed' });
  }
}

