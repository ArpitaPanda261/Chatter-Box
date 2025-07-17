# 💬 ChatterBox

ChatterBox is my very first full-stack **MERN** application — a modern chat-inspired interface with smooth authentication and a clean UI. It was built to explore the fundamentals of **full-stack development**, **user authentication**, and **dark/light theme toggling** using powerful modern tools like React, Tailwind CSS, Zustand, and Express.

---

## 🚀 Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Zustand (for auth state)
- Framer Motion (for animations)
- Axios (for API calls)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- bcrypt.js (for password hashing)
- JWT (for authentication)
- dotenv (for environment configs)

---

## 🔐 Authentication Flow

- 🔸 Users can **Sign Up** by entering a username, email, and password.
- 🔸 Passwords are **hashed using bcrypt** before storing in MongoDB.
- 🔸 On successful login, the backend returns a **JWT token** and user details.
- 🔸 Token is stored in **Zustand store** (React state) and sent with protected API requests.
- 🔸 Auth-protected routes (like `/profile`) are only accessible with a valid token.

---

## 🌗 Theme Toggling

- Built-in **dark/light mode switcher** using Tailwind’s `dark:` variants.
- Users can seamlessly toggle themes with smooth transitions.
- Theme preference is stored in localStorage so it persists across visits.

---

## 🛠 How I Built It

This was my **first MERN project**, so I learned and applied:
- How to structure a **monorepo** (client + server).
- How to **connect frontend to backend** with Axios and handle CORS.
- Basics of **JWT authentication** with Express middleware.
- Deploying frontend to **Netlify** and backend to **Render**.

---

## 🌍 Deployment

- **Frontend:** [Netlify Live Link](https://chatter-box-web06.netlify.app)
- **Backend:** [Render API URL](https://chatter-box-server-8iqs.onrender.com)

---

## 📌 Status

✅ Authentication — Done  
✅ Theme toggle — Done  
🚧 Real-time chat — Coming soon!  

---

## 🙌 Author

Built with patience and late-night debugging  
by [@ArpitaPanda261](https://github.com/ArpitaPanda261)

