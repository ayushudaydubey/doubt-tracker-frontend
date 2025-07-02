# 🎓 Doubt Tracker – Frontend (React)

This is the **frontend** of the Doubt Tracker App – a platform for students to post academic doubts and receive solutions from mentors.

> Built using **React**, **Vite**, **Tailwind CSS**, and integrated with a secure backend (Express + MongoDB).

---

## ⚙️ Tech Stack

- **React 18**
- **Vite** – For fast development builds
- **Tailwind CSS 4** – Utility-first CSS framework
- **React Router v7** – Client-side routing
- **React Hook Form** – Form handling and validation
- **React Toastify** – Notification system
- **Axios** – API handling
- **Lucide React** – Icon set

---

## 🛠️ Getting Started

### 1. Clone the Repository


git clone https://github.com/ayushudaydubey/doubt-tracker-frontend

cd doubt-tracker/client

2. Install Dependencies
bash
Copy
Edit
npm install

3. Setup Environment Variables
Create a .env file in the root:

env
Copy
Edit
VITE_API_URL=http://localhost:3000

✅ Replace with https://doubt-tracker-backend.onrender.com for production.

4. Run the Development Server
bash
Copy
Edit
npm run dev
Your frontend will now be running on: http://localhost:5173

🧪 Available Scripts
Command	Description

npm run dev	Start local development server
npm run build	Build production-ready app
npm run preview	Preview the production build
npm run lint	Run ESLint on the codebase

🧑‍💻 Features
For Students
Register & login

Create and manage doubts

View mentor responses

For Mentors
Login & view student doubts

Submit responses to open queries

UI/UX
Responsive design

Toast notifications

Dynamic status indicators (e.g., "resolved", "in-progress")

📦 Folder Structure
arduino
Copy
Edit
client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── routes/
│   └── App.jsx
├── .env
├── vite.config.js
└── package.json
🧑‍🔧 Developer Notes
Ensure the backend is running before starting the frontend.

CORS must be properly configured in the backend for API requests to succeed.

Customize the color scheme and branding using Tailwind's config file if needed.

🚀 Deployment
This app can be easily deployed on Vercel or Netlify.

Deploy to Vercel
bash
Copy
Edit
vercel deploy
Make sure to set the VITE_API_URL in the Vercel environment settings.

🙌 Contributions
Pull requests are welcome! Please follow the project structure and styling conventions.

📄 License
This project is licensed under the MIT License.

📬 Contact
For queries or suggestions, feel free to open an issue or contact the maintainer.



