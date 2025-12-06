# 🧾 OpsDesk – Internal Ticket Management System

OpsDesk is a full-stack MERN application designed to manage internal company issues efficiently. It provides a secure, role-based workflow where **Employees raise tickets**, **Admins assign them**, and **Technicians resolve them**.

---

## 🚀 Features

### 👨‍💼 Admin
- Register Employees & Technicians
- View and filter all tickets (Open, In-Progress, Resolved, Closed)
- Assign tickets to technicians
- Edit or delete users

### 👩‍💻 Employee
- Create, edit, and delete tickets
- View only their own tickets
- Track ticket status in real time

### 🧑‍🔧 Technician
- View assigned tickets
- Filter tickets by status
- Update ticket status (In-Progress, Resolved, Closed)

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- React Router  
- Redux Toolkit  
- Axios  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  
- Mongoose  

### Authentication & Security
- JWT Authentication  
- HTTP-only Cookies / Token-based Auth  
- bcrypt for password hashing  

### Tools
- Git & GitHub  
- Postman / Thunder Client  
- Prettier & ESLint  
- VS Code  

---


---

## ✅ Prerequisites

- Node.js installed
- MongoDB installed or MongoDB Atlas account
- Git installed

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/opsdesk.git
cd opsdesk

#Backend
- cd backend
- npm install

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key

- npm start

Frontend
- cd frontend
- npm install
- npm run dev



