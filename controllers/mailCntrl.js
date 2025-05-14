import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

import { Prisma } from "@prisma/client";

export const sendEmail = asyncHandler(async (req, res) => {
    const {
      anrede, vorname, nachname, email,
      telefon, immobilienart, ort, flaeche, nachricht
    } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // sau alt provider
      auth: {
        user: process.env.EMAIL_USER, // adresa de email
        pass: process.env.EMAIL_PASS // ATENȚIE: folosește App Password, nu parola contului
        // ATENȚIE: folosește App Password, nu parola contului
      }
    });
  
    const mailOptions = {
      from: email,
      to: 'lupancuruben2@gmail.com',
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
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'E-Mail gesendet' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Fehler beim Senden' });
    }
  });
  
// controllers/propertyContactController.js
// controllers/propertyContactController.js

import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';

export const sendPropertyContact = asyncHandler(async (req, res) => {
  const {
    propertyTitle,
    anrede,
    vorname,
    nachname,
    email,
    telefon,
    nachricht,
    interests = {},    // { call: true, visit: false, finance: true }
  } = req.body;

  // Construim lista intereselor selectate
  const selectedInterests = Object.entries(interests)
    .filter(([, checked]) => checked)
    .map(([key]) => {
      switch (key) {
        case 'call':
          return 'Ich wünsche ein unverbindliches Telefonat';
        case 'visit':
          return 'Ich bitte um einen Besichtigungstermin';
        case 'finance':
          return 'Ich habe Fragen zur Finanzierung / Investitionsmodell';
        default:
          return key;
      }
    });

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.MANAGER_EMAIL || 'lupancuruben2@gmail.com',
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
${selectedInterests.length > 0 
    ? selectedInterests.map(i => `- ${i}`).join('\n') 
    : '- Keine angegeben'}

---
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-Mail gesendet' });
  } catch (error) {
    console.error('Error sending property contact email:', error);
    res.status(500).json({ message: 'Fehler beim Senden' });
  }
});
