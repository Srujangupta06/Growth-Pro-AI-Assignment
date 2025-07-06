
# Project Title

A brief description of what this project does and who it's for

# 🏆 Business Headline Generator

This is a full-stack application that generates catchy headlines for local businesses based on their name and location using AI logic. Built with:

- 🔧 **Backend**: Node.js + Express
- 🌐 **Frontend**: React
- 🎨 **Styling**: Tailwind CSS
- 📦 **Deployment**: Backend (Render), Frontend (Vercel)

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v16+)
- npm
- Git

---

## 📁 Folder Structure

backend/ # Express server
 - index.js
 - utils/
 - validations

frontend/ # React application
 - src/
   - public/
   - package.json


---

## ⚙️ Running Locally

### 🖥️ Backend Setup

```bash
cd backend
npm install

# Production Server
 - npm start 

# Development Server
 - npm run dev

- Server runs on https://growth-pro-ai-assignment.onrender.com.

🌐 Frontend Setup using Vite
cd frontend
npm install
npm run dev
Opens app on https://gpai-ashy.vercel.app/



📡 API Reference
📝 Generate Business Headline

POST /business-data
Generates a headline using business name and location.

Request Body
Parameter	Type	Description
name	string	Required. Business name
location	string	Required. Business location

Example Response
json

{
  "status": "success",
  "data": {
    "name": "Apple",
    "location": "California",
    "headline": "Discover Why Apple Thrives in California in 2025",
    "rating": 4.3,
    "reviews": 130
  }
}
🔁 Regenerate Headline

GET /regenerate-headline?name={name}&location={location}
Returns a newly generated headline for the business.

Query Params
Parameter	Type	Description
name	string	Required. Business name
location	string	Required. Business location

Example

GET /regenerate-headline?name=Nike&location=New%20York
Example Response
json
{
  "headline": "Why New York Can't Stop Talking About Nike in 2025"
}
👨‍🎓 Developed By
Srujan Kandakurthi
Email: srujan93811@gmail.com
LinkedIn: https://www.linkedin.com/in/srujan-kandakurthi