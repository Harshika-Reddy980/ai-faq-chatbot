from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.chat_model import ChatHistory
from app.models.user_model import User
from app.schemas.chat_schema import ChatRequest
from app.services.gemini_service import generate_ai_response
from app.utils.auth_utils import get_current_user

router = APIRouter()

@router.post("/chat")
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    user_message = request.message

    bot_response = generate_ai_response(user_message)

    new_chat = ChatHistory(
        user_message=user_message,
        bot_response=bot_response,
        user_id=current_user.id
    )

    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    return {
        "user_message": user_message,
        "bot_response": bot_response
    }

@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chats = db.query(ChatHistory).filter(
        ChatHistory.user_id == current_user.id
    ).all()

    return chats

@router.delete("/history/{chat_id}")
def delete_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chat = db.query(ChatHistory).filter(
        ChatHistory.id == chat_id,
        ChatHistory.user_id == current_user.id
    ).first()

    if not chat:
        return {"message": "Chat not found"}

    db.delete(chat)
    db.commit()

    return {"message": "Chat deleted successfully"}