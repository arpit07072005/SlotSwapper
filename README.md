# 🕒 SlotSwapper

SlotSwapper is a web-based platform that allows users to create, manage, and swap their scheduled time slots with others in a secure and automated way.  
It helps in optimizing resource sharing — ideal for students, employees, or teams with fixed duty or lab timings.

---

## 🧩 Overview

The project provides a *slot-swapping system* where users can:
- Create their own schedule slots.
- Mark slots as “Swappable”.
- Request swaps with other users.
- Accept or reject incoming swap requests.

### 🧠 Design Choices
- *JWT-based Authentication with HTTP-only Cookies* for secure session handling.
- *RESTful API structure* for modular design.
- *MongoDB (Mongoose)* for flexible and scalable data modeling.
- *Three Core Models:*
  - User → manages login, registration, and tokens.
  - Event → represents a user's slot.
  - SwapRequest → handles swap request between users.
- *Protected routes* using a custom middleware verifyjwt.

---

## ⚙ Setup Instructions

Follow these steps to run the project locally.

### 1️⃣ Clone the repository
bash
git clone https://github.com/your-username/SlotSwapper_backend.git
cd SlotSwapper_backend 

#### Install dependencies

npm install

### Setup .env file
Create a .env file in the backend root folder and add the following:

PORT=4000
MONGO_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d

### Start the backend server

npm run dev

Your backend will run at 👉 http://localhost:4000
### 🧠 API Endpoints

| Endpoint | Method | Description | Auth Required |
|-----------|---------|--------------|----------------|
| /api/v1/user/signup | *POST* | Register a new user | ❌ |
| /api/v1/user/login | *POST* | Login user and set cookies | ❌ |
| /api/v1/user/logout | *POST* | Logout current user | ✅ |
| /api/v1/user/myself | *POST* | Get logged-in user info | ✅ |
| /api/v1/event/create | *POST* | Create a new event/slot | ✅ |
| /api/v1/event/myevents | *GET* | Get all events of user | ✅ |
| /api/v1/swap/swappable-slots | *GET* | View available slots for swapping | ✅ |
| /api/v1/swap/swaprequest | *POST* | Create a new swap request | ✅ |
| /api/v1/swap/swapresponse | *POST* | Accept or reject a swap | ✅ |
| /api/v1/swap/swapincoming | *GET* | View incoming swap requests | ✅ |
| /api/v1/swap/swapoutgoing | *GET* | View outgoing swap requests | ✅ |
---
#### You can test all APIs using Postman by importing this collection:
## 💡 Assumptions
- 🧍 Each user can only manage their *own events*.  
- 🔁 Swap requests can only occur between *“SWAPPABLE”* slots.  
- 🍪 Cookies are required for all *authenticated routes* (withCredentials: true in frontend Axios).  
----
## ⚠ Challenges Faced

- CORS + Cookie Handling: Required credentials: true for proper session - - management between Render and Vercel.
- JWT Expiry Management: Ensured automatic refresh with secure tokens.
- Data Consistency: When a swap is accepted or rejected, both slots’ statuses are updated atomically.
ise 
### 🧰 Tools Used

- 🟢 Node.js & Express.js – API server

- 🍃 MongoDB (Mongoose) – Database

- 🔑 JWT – Authentication

- 🍪 Cookie-Parser – Secure session management

- 🌐 CORS – Cross-origin support

- 🚀 Render / Vercel – Deployment
### 👨‍💻 Author
Arpit Pandey