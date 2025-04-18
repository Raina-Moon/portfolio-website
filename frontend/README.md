# 🌐 Raina Moon's Portfolio Website

Welcome to my personal developer portfolio!  
This site showcases who I am, what I’ve built, and what I’ve learned throughout my journey as a frontend developer.

**🔗 Live Demo:** [https://raina-moon.com](https://raina-moon.com)

---

## 📌 Features

- 🧑‍💻 Personal introduction & tech stack  
- 📂 Timeline of major projects with detailed role and learnings  
- 📬 Contact form (email integration via Nodemailer)  
- 🌍 Fully deployed with custom domain + HTTPS  
- 📱 Responsive design (mobile-first)

---

## ⚙️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Prisma ORM](https://www.prisma.io/)  
- [Nodemailer](https://nodemailer.com/) for email handling

### Deployment
- [Docker](https://www.docker.com/) for containerization  
- [AWS EC2](https://aws.amazon.com/ec2/) for server deployment  
- [Nginx](https://nginx.org/) as reverse proxy  
- [Let’s Encrypt](https://letsencrypt.org/) for SSL certification (HTTPS)  
- [GoDaddy](https://www.godaddy.com/) for domain management

---

## 🛠️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Raina-Moon/portfolio-website.git

# Move into the project directory
cd portfolio-website

# Start containers
docker-compose up --build
```

Make sure to set up your `.env` files in both `frontend/` and `backend/` folders.

### Example `.env.production` for frontend

```env
NEXT_PUBLIC_API_URL=*******
```

### Example `.env` for backend

```env
PORT=5000
DATABASE_URL=postgresql://postgres:****@db:5432/mydb
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=email@example.com
SMTP_PASS=*****
```

---

## 💡 Motivation

As a frontend developer, I wanted to challenge myself to go beyond UI development and build the entire pipeline — from backend APIs to deployment.  
It was tough, but I learned so much about **infrastructure**, **server configuration**, and **database management** through this journey.

---

## 📫 Contact

If you want to connect, feel free to reach out through the contact form on [raina-moon.com](https://raina-moon.com) — or just drop by my [LinkedIn](https://www.linkedin.com/in/daseul-moon-8b064128b/).

---

## 🧼 License

MIT License © 2025 Raina Moon
