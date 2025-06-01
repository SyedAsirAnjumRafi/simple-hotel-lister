# 🏨 Simple Hotel Lister

**Submitted by:** Syed Asir Anjum Rafi  

---

## 📌 Features

### ✅ Hotel Search & Filtering
- Search hotels by **location**
- Filter by **star rating** (3, 4, 5 stars)
- Filter by **pool availability** (Yes/No)

### ✅ Hotel Display
- Hotel name, description, star rating, pool availability
- Indicative price in **৳ BDT**
- **View Details** button shows hotel description in a popup

### ✅ Bookmarking System
- Users can **bookmark** hotels
- A dedicated **View Bookmarks** page to view saved hotels

### ✅ Booking Feature
- A **Book Now** button simulates hotel booking with a success prompt

### ✅ User Authentication
- **Register** and **Login** with secure JWT tokens
- Passwords hashed using `werkzeug.security`

### ✅ Appearance Settings
- Light/Dark Mode toggle

---

## 🛠️ Tech Stack

### Frontend
- ReactJS (with Hooks)
- TailwindCSS (for styling)
- React Router DOM (for routing)

### Backend
- Python Flask
- Flask-JWT-Extended (for authentication)
- Flask-CORS
- SQLAlchemy ORM
- SQLite (for local database)

---

## 💾 Setup Instructions

### 1️⃣ Backend Setup (Flask)
```bash
cd backend
python -m venv venv
venv\Scripts\activate    # On Windows
pip install -r requirements.txt
python app.py
```

### 2️⃣ Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```

Make sure the Flask server runs on http://127.0.0.1:5000 and React on http://localhost:3000

---

## ⚙️ Data Handling

**Option Chosen:** ✅ **Option A** — Static mock data.  
Hotels are preloaded into the SQLite database with Bangladeshi hotel examples.

---

## 🔐 Authentication

- Simple JWT-based system.
- **Login and registration are email-based**.
- Passwords are hashed before storing.

---

## 🧠 AI Tool Disclosure

ChatGPT was used for:
-Debugging backend issues (422, 409, JWT)

-Structuring routes and SQLAlchemy models

-Generating boilerplate React components

-Enhancing UX with alert prompts and visual feedback

---

## 📁 Project Structure

simple-hotel-lister/
├── backend/
│ ├── app.py
│ ├── db_models.py
│ ├── db_instance.py
│ ├── routes.py
│ └── hotels.db
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── App.js
│ │ └── index.js
├── README.md

---

📝 Final Notes
-All functional and technical requirements of the assessment are implemented.

-The app is tested locally and meets all listed criteria.

-You may log in with any registered account to test bookmarking and booking.

---

## 🏁 Submission

Thank you for reviewing my submission!  
**-Syed Asir Anjum Rafi-**