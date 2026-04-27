# 🛒 E-Commerce Platform

A full-stack e-commerce web application that provides a complete online shopping experience with user authentication, product management, secure payments, real-time communication, and an advanced admin dashboard.

This project was built as a **learning and practice project**, and I gained significant experience in full-stack development, API design, real-time systems, and production-level architecture.

---

## 📌 About The Project

This platform simulates a real-world e-commerce system with both user and admin functionalities.

Users can browse products, manage their cart, place orders, and interact with support features. Admins can manage products, handle feedback/reports, track sales analytics, and manage the entire platform.

The system also includes secure payment processing, email notifications, and real-time chat support.

---

## 🚀 Features

### 👤 User Features
- User authentication (Login / Signup)
- Browse and search products
- Add/remove products from cart
- Place orders with secure checkout (Stripe)
- Receive email notifications for order status updates
- Submit feedback and reports
- Live support chat system
- FAQ section

---

### 🛠 Admin Features
- Add / Edit / Delete products
- Manage users and orders
- Handle feedback and reports system
- Order status management (triggers email updates)
- Dashboard analytics (30-day / 7-day sales & revenue charts)
- Admin control panel

---

### 📊 Analytics & Dashboard
- Revenue tracking (7-day & 30-day views)
- Sales statistics visualization
- Built with interactive charts (Recharts.js)

---

### 💬 Real-Time Features
- Live support chat using WebSockets
- Instant admin-user communication

---

### 🔐 Security Features
- Rate limiting (prevents abuse)
- CORS protection
- Secure REST APIs
- JWT-based authentication

---

## 🧰 Tech Stack

### Frontend
- React.js
- React State Management
- Bootstrap
- CSS
- Recharts.js

### Backend
- Node.js
- Express.js
- REST APIs
- WebSocket
- Webhooks

### Database
- MySQL

### Integrations & Tools
- Stripe (Payments)
- SendGrid (Email notifications)
- Docker
- Git & GitHub
- Rate Limiter
- CORS middleware

---

## 📸 Screenshots


### 🏠 Home Page
![Home](/frontend/public/assets/img2.png)

### 🛍 Product Page
![Products](/frontend/public/assets/img1.png)

### 🛒 Cart Page
![Cart](/frontend/public/assets/img8.png)

### 💳 Checkout Page
![Checkout](/frontend/public/assets/img5.png)

### 📊 Analytics Dashboard
![Analytics](/frontend/public/assets/img4.png)

---

## ⚙️ Installation Guide

### 1. Clone repository
```bash
git clone https://github.com/your-username/ecommerce-app.git 
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Install frontend dependencies
```bash
cd frontend
npm install
```

### 4. Setup environment variables

Create a .env file in the backend folder:

```bash
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database

JWT_SECRET=your_secret_key

STRIPE_SECRET_KEY=your_stripe_key
SENDGRID_API_KEY=your_sendgrid_key
```

Create a .env file in frontend folder:
```bash
VITE_BACKEND_URl=localhost://8081
VITE_STRIPE_PUBLIC_KEY=pk_test_51T3HPbDhDPlvJFNzLqb5y5nmgK1Sq6NeqWNnnmBGggStVexE0WEW8pNsJqkIQBMRfPIQAt35vok5Jc4m7EJODeYp00GrSyMxE5
```

### 5. Run the project

```bash 
cd backend nodemon server.js
```

```bash
cd frontend npm run dev
```
---

## 🚀 Future Improvements

- 🎨 Improve UI/UX design for a more modern and user-friendly experience
- 🔔 Add real-time notifications for orders, messages, and system updates
- 📊 Enhance admin analytics with deeper insights and advanced reporting
- 🤖 Integrate an AI-powered chatbot for customer support and assistance
- 📱 Improve mobile responsiveness and performance optimization