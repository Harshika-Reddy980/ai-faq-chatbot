Backend - AI FAQ Chatbot

This is the backend service for the AI FAQ Chatbot project. It is built using FastAPI and handles authentication, AI response generation, database storage, and API endpoints.

Technologies Used

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Neon Database
- JWT Authentication
- Google Auth Verification
- Groq API
- Uvicorn
- Python-dotenv

Backend Features

- User signup
- User login
- Continue with Google authentication
- JWT token generation
- Protected API routes
- AI response generation using Groq API
- Store chat history in PostgreSQL
- Retrieve user-specific chat history
- Delete chat history
- Environment variable support

Folder Structure

```text
backend/
├── app/
│   ├── config/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── main.py
├── requirements.txt
├── .env
└── README.md