import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

import { Prisma } from "@prisma/client";

const defaultFrom = process.env.EMAIL_USER;   // ex: "no-reply@fidelia.immo"
const managerTo  = process.env.MANAGER_EMAIL //|| 'office@fidelia.immo';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: defaultFrom,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

export const sendEmail = asyncHandler(async (req, res) => {
  const {
    anrede, vorname, nachname, email,
    telefon, immobilienart, ort, flaeche, nachricht
  } = req.body;

  const mailOptions = {
    from: defaultFrom,
    replyTo: `"${vorname} ${nachname}" <${email}>`,
    to: managerTo,
    subject: 'Neue Suchanfrage',
    text: `
Anrede: ${anrede}
Name: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '-'}
Immobilienart: ${immobilienart}
Ort: ${ort}
Fläche: ${flaeche || '-'}
Nachricht: ${nachricht || '-'}
`
  };

  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: 'E-Mail gesendet' });
});

export const sendPropertyContact = asyncHandler(async (req, res) => {
  const {
    propertyTitle, anrede, vorname, nachname,
    email, telefon, nachricht, interests = {}
  } = req.body;

  const selectedInterests = Object.entries(interests)
    .filter(([, ok]) => ok)
    .map(([k]) => {
      if (k==='call')    return 'Ich wünsche ein unverbindliches Telefonat';
      if (k==='visit')   return 'Ich bitte um einen Besichtigungstermin';
      if (k==='finance') return 'Ich habe Fragen zur Finanzierung / Investitionsmodell';
      return k;
    });

  const mailOptions = {
    from: defaultFrom,
    replyTo: `"${vorname} ${nachname}" <${email}>`,
    to: managerTo,
    subject: `Anfrage zur Immobilie „${propertyTitle}"`,
    text: `
Objekt: ${propertyTitle}
Anrede: ${anrede}
Name: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '-'}

Nachricht:
${nachricht || '-'}

Interessen:
${ selectedInterests.length
    ? selectedInterests.map(i => `- ${i}`).join('\n')
    : '- Keine angegeben'
}

---
`
  };

  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: 'E-Mail gesendet' });
});
