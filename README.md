# 🛒 GrocerEase – Online Grocery Shopping Platform

GrocerEase is a full-stack grocery shopping and management web application built using the MERN stack. It provides a convenient platform for customers to browse grocery products, manage their shopping carts, and place orders, while allowing administrators to manage products and inventory.

## 🚀 Features

### 👤 Customer Features
- User registration and login.
- Browse available grocery products.
- Search and filter products.
- Add products to the shopping cart.
- Update product quantities and cart totals.
- Place grocery orders.
- View and track orders.

### 🔐 Admin Features
- Admin authentication and access control.
- Manage grocery products.
- Monitor product inventory.
- Update product stock.
- Manage customer orders.

### ⚡ Additional Features
- Dynamic stock management.
- Secure authentication and protected routes.
- RESTful API integration.
- Database connectivity for managing application data.
- Responsive user interface.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Tailwind CSS | UI styling |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| JWT | Authentication |

## 📂 Project Structure

```text
Grocery-management-System/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

*Note: The folder structure above is illustrative; adjust it to match the actual repository.*

## ⚙️ Installation and Setup

Follow these steps to run GrocerEase locally.

### 1. Clone the repository

```bash
git clone https://github.com/vaishs-04/Grocery-management-System.git
```

### 2. Navigate to the project

```bash
cd Grocery-management-System
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the backend directory and configure the required values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the actual environment variable names required by your backend code.

### 5. Start the backend server

```bash
npm run dev
```

### 6. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

### 7. Start the frontend

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

*Make sure the commands match the scripts defined in your package.json files.*

## 🔄 Application Workflow

1. Customers register or log in to their accounts.
2. Customers browse and search for grocery products.
3. Selected products are added to the shopping cart.
4. Customers update quantities and proceed to place orders.
5. The backend validates product availability and processes orders.
6. Inventory is updated after successful purchases.
7. Administrators manage products and monitor inventory.

## 🎯 Project Objective

The main objective of GrocerEase is to simplify online grocery shopping and inventory management through a user-friendly web application. It demonstrates the practical implementation of full-stack web development, REST APIs, database management, authentication, and frontend-backend integration.

## 👩‍💻 Developed By

**Vaishnavi Singh**

B.Tech – Computer Science and Engineering

GitHub: [@vaishs-04](https://github.com/vaishs-04)

---

⭐ If you find this project useful, consider giving it a star!
