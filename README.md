AI FAQ Chatbot

AI FAQ Chatbot is a full-stack AI-powered chatbot application developed using React.js, FastAPI, SQLite, and Groq API.  
The chatbot is designed to provide intelligent responses for different types of support systems such as:

- College FAQ Support
- HR Support
- Customer Support
- Product Assistance

The application allows users to ask questions, receive AI-generated responses, and store chat history in a database for future reference.

---

Project Features

- AI-powered chatbot system
- Real-time chat interface
- Modern ChatGPT-style UI
- Dark mode and Light mode support
- Chat history sidebar
- Store conversations in SQLite database
- Delete chat history
- Responsive design for desktop and mobile
- REST API integration
- FastAPI backend services

---

Frontend Technologies

The frontend of the application is developed using:

- React.js
- Vite
- Tailwind CSS
- Axios

Frontend Functionalities:

- Interactive chatbot interface
- User and AI chat bubbles
- Sidebar for previous chats
- Auto-scroll for messages
- Loading animation while AI responds
- Dark and Light mode toggle
- Responsive user interface

---

Backend Technologies

The backend of the application is developed using:

- FastAPI
- Python
- SQLAlchemy
- SQLite
- Groq API
- Uvicorn
- Python-dotenv

Backend Functionalities:

- REST API development
- AI response generation
- Chat history management
- Database integration
- Error handling
- Environment variable management using `.env`

---

Database Information

SQLite database is used to store chat history.

Database Table: `chat_history`

| Column Name    | Description |
|----------------|-------------|
| id             | Unique ID |
| user_message   | User question |
| bot_response   | AI-generated response |
| timestamp      | Date and time of chat |

---

API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | / | Home route |
| POST | /chat | Send user message to AI |
| GET | /history | Retrieve chat history |
| DELETE | /history/{id} | Delete a specific chat |

---

Project Structure

```bash
ai-faq-chatbot/
│
├── backend/
├── frontend/
├── screenshots/
└── README.md
```

---

Backend Setup

Step 1: Navigate to backend folder

```bash
cd backend
```

Step 2: Create virtual environment

```bash
python -m venv venv
```

Step 3: Activate virtual environment

Windows:

```bash
venv\Scripts\activate
```

Step 4: Install required packages

```bash
pip install -r requirements.txt
```

Step 5: Run backend server

```bash
python -m uvicorn app.main:app --reload
```

Backend server runs on:

```bash
http://127.0.0.1:8000
```

---

Frontend Setup

Step 1: Navigate to frontend folder

```bash
cd frontend
```

Step 2: Install frontend dependencies

```bash
npm install
```

Step 3: Run frontend server

```bash
npm run dev
```

Frontend server runs on:

```bash
http://localhost:5173
```

---

Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
GROQ_API_KEY=your_api_key
```

---

Sample Questions

College FAQ Support

- What is the admission process for MCA?
- Does the college provide hostel facilities?

HR Support

- How can I apply for leave?
- What are the office working hours?

Customer Support

- How can I track my order?
- What is your return policy?

Product Assistance

- How do I install this application?
- Does this software support mobile devices?

---

Screenshots

Home Page

![Home](screenshots/homepage.png)

Dark Mode

![Dark Mode](screenshots/darkmode.png)

Light Mode

![Light Mode](screenshots/lightmode.png)

Chat Interface

![Chat](screenshots/chat-working.png)

Chat History

![History](screenshots/chat-history.png)

---

Future Enhancements

- User Authentication
- Voice Assistant Integration
- Multi-language Support
- Cloud Database Integration
- Chat Export Feature
- AI Memory Support

---

Author

Harshika Reddy

---

Conclusion

This project demonstrates the development of a complete full-stack AI chatbot application using modern frontend and backend technologies. The chatbot provides an interactive user experience with AI-generated responses, chat history management, and responsive UI design.