from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import SessionLocal, engine, get_db, Base
from app.models.chat_model import ChatHistory
from app.schemas.chat_schema import ChatRequest
from app.services.gemini_service import generate_ai_response

router = APIRouter()

# Create Database Tables
Base.metadata.create_all(bind=engine)

# Chat API
@router.post("/chat")
def chat(request: ChatRequest, db: Session = Depends(get_db)):

    user_message = request.message

    # Generate AI Response
    bot_response = generate_ai_response(user_message)

    # Save Chat to Database
    new_chat = ChatHistory(
        user_message=user_message,
        bot_response=bot_response
    )

    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    return {
        "user_message": user_message,
        "bot_response": bot_response
    }

# Get Chat History
@router.get("/history")
def get_history(db: Session = Depends(get_db)):

    chats = db.query(ChatHistory).all()

    return chats

# Delete Chat
@router.delete("/history/{chat_id}")
def delete_chat(chat_id: int, db: Session = Depends(get_db)):

    chat = db.query(ChatHistory).filter(
        ChatHistory.id == chat_id
    ).first()

    if not chat:
        return {"message": "Chat not found"}

    db.delete(chat)
    db.commit()

    return {"message": "Chat deleted successfully"}