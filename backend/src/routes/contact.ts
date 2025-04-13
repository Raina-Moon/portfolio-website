import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const router = Router();
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newContact = await prisma.contactMessage.create({
      data: { name, email, subject, message }
    });

    const mailOptions = {
        from: `"Portfolio Website" <${process.env.SMTP_USER}>`, // Sender address
        to: process.env.SMTP_USER, // Recipient email address
        subject: `New Contact Message: ${subject}`,
        text: `You have a new contact message from ${name} (${email}):\n\n${message}`,
        html: `<p>You have a new contact message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
      };
  
      await transporter.sendMail(mailOptions);

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create contact message' });
  }
});

export default router;
