from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.db import Base

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)

    user_message = Column(String, nullable=False)

    bot_response = Column(String, nullable=False)

    timestamp = Column(DateTime, default=datetime.utcnow)