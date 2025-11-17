# 🚀 Subscription Tracker API

A production-ready backend service to manage digital subscriptions, track renewal dates, and send automated reminder emails using **Node.js**, **Express**, **MongoDB**, **JWT Authentication**, **Upstash QStash**, and **Nodemailer**.

This API is designed with clean architecture, secure authentication, automated workflows, and real-world SaaS backend patterns.

---

## 🌐 Live API URL

```
https://subscription-tracker-api-ujcy.onrender.com
```

> ⚠️ This is a **backend API**, not a frontend website. Use Postman, Thunder Client, or cURL to interact with protected routes.

---

## 📦 Features

### 🔐 Authentication

* User registration and login using JWT
* Secure password hashing with bcrypt
* Stateless token-based auth
* Token blacklist for secure logout

### 🎫 Subscription Management

* Create, update, cancel, and delete subscriptions
* Auto-calculate renewal dates
* Auto-expire subscriptions based on renewal date
* Fully user-scoped subscription access control

### 📬 Automated Email Reminders

* Renewal reminders at:

  * 7 days
  * 5 days
  * 2 days
  * 1 day before renewal
* Beautiful HTML email templates
* Nodemailer SMTP integration for email delivery

### ⚙️ Upstash QStash Workflow

* Delayed and scheduled execution
* Workflow retries
* Sleep-until reminder logic
* Event-driven architecture

### 🗄 MongoDB + Mongoose

* Schema validation
* Indexing
* Timestamps
* Relationship population for workflows

---

## 📘 API Endpoints

### 🔐 Authentication Routes

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/v1/auth/sign-up`  | Register a new user       |
| POST   | `/api/v1/auth/sign-in`  | Login user                |
| POST   | `/api/v1/auth/sign-out` | Logout (blacklists token) |

---

### 📦 Subscription Routes

| Method | Endpoint                                  | Auth | Description                  |
| ------ | ----------------------------------------- | ---- | ---------------------------- |
| POST   | `/api/v1/subscriptions`                   | ✔    | Create a subscription        |
| GET    | `/api/v1/subscriptions/user/:id`          | ✔    | Get subscriptions for a user |
| GET    | `/api/v1/subscriptions/:id`               | ✔    | Get subscription by ID       |
| PUT    | `/api/v1/subscriptions/:id`               | ✔    | Update subscription          |
| DELETE | `/api/v1/subscriptions/:id`               | ✔    | Delete subscription          |
| PUT    | `/api/v1/subscriptions/:id/cancel`        | ✔    | Cancel subscription          |
| GET    | `/api/v1/subscriptions/upcoming-renewals` | ✔    | Get upcoming renewals        |

---

### ⏰ Workflow Route (Upstash QStash)

| Method | Endpoint                                  | Description                               |
| ------ | ----------------------------------------- | ----------------------------------------- |
| POST   | `/api/v1/workflows/subscription/reminder` | Trigger the subscription renewal workflow |

---

## 🧪 Testing the API

Use **Postman**, **Thunder Client**, or **cURL**.

Example:

```
GET https://subscription-tracker-api-ujcy.onrender.com/api/v1/subscriptions/user/<USER_ID>
Authorization: Bearer <JWT_TOKEN>
```

---

## 🛠 Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Upstash QStash Workflows
* Nodemailer (SMTP)
* Day.js

---

## 📬 Email Reminder Workflow

Automated reminders include:

* User name personalization
* Subscription-specific details
* Auto-calculated renewal dates

Emails use a responsive HTML template generated dynamically based on reminder type.

---


## Why I Built This

While following tutorials helped me grasp the building blocks, I customized and extended this API to fit real production use cases — like protecting user data, planning for renewals, and keeping the codebase scalable.

It’s now fully ready to be deployed as a backend for any subscription-based app — think content platforms, SaaS tools, or even gym memberships.


---

## 🚀 Getting Started (Quick Setup)

```bash
git clone https://github.com/your-username/subscription-api.git
cd subscription-api
npm install
npm run dev
```
---


## 🙌 Acknowledgements

Thanks to Upstash, MongoDB Atlas, and Render for their amazing developer tools.
