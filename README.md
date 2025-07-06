# 🧾 Subscription Management API – Built for Real Users, Real Payments, Real Scale

A backend system that handles everything from user authentication to subscription tracking and automated renewal reminders. This isn’t a demo — it’s designed for **real-world deployment**, with all the structure and safeguards a production-grade app needs.

Whether you're managing a Spotify-style subscription service or a SaaS billing layer, this system lays the groundwork.

---

## 🧠 What This Project Covers

- **🔐 JWT-Based User Auth**  
  Secure sign-in/sign-up with route protection and role-based access for real users.

- **📦 Subscription Lifecycle Management**  
  Create, update, cancel, and track renewals — all tied to authenticated users and stored persistently via MongoDB.

- **📧 Automated Email Reminders with Upstash**  
  Subscription reminders are handled through background workflows triggered on creation — no cron jobs, no manual queues.

- **🚫 Rate Limiting and Bot Protection**  
  Arcjet middleware integration helps secure public endpoints from abuse and bot attacks.

- **📊 MongoDB Modeling with Mongoose**  
  Designed for clarity and scalability, with clean schema definitions for both users and subscriptions.

- **🧰 Middleware and Error Handling**  
  Centralized error flow, custom error classes, and validation responses built to make debugging *actually helpful*.

- **🛠 Modular API Architecture**  
  Routes → Controllers → Services, following a clean, maintainable pattern to scale features without spaghetti.

---

## 🛠 Stack & Tools

| Category | Tech |
|---------|------|
| Backend Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + Bcrypt |
| Rate Limiting | Arcjet |
| Emails | Nodemailer + Upstash Workflows |
| Hosting | Render  |

---

## Why I Built This

> This project was originally inspired by a tutorial from [JS Mastery], and expanded upon to add custom features, security layers, and deployment integrations.

While following tutorials helped me grasp the building blocks, I customized and extended this API to fit real production use cases — like protecting user data, planning for renewals, and keeping the codebase scalable.

It’s now fully ready to be deployed as a backend for any subscription-based app — think content platforms, SaaS tools, or even gym memberships.


---

## 🚀 Getting Started (Quick Setup)

```bash
git clone https://github.com/your-username/subscription-api.git
cd subscription-api
npm install
npm run dev
