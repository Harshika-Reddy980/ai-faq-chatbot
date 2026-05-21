from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from google.oauth2 import id_token
from google.auth.transport import requests

from app.database.db import get_db
from app.models.user_model import User
from app.schemas.user_schema import UserSignup, UserLogin, GoogleLoginRequest
from app.utils.auth_utils import hash_password, verify_password, create_access_token
from app.config.settings import GOOGLE_CLIENT_ID

router = APIRouter()

@router.post("/signup")
def signup(request: UserSignup, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=request.name,
        email=request.email,
        password=hash_password(request.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


@router.post("/login")
def login(request: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({
        "user_id": user.id,
        "email": user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }


@router.post("/google-login")
def google_login(request: GoogleLoginRequest, db: Session = Depends(get_db)):
    try:
        id_info = id_token.verify_oauth2_token(
            request.credential,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = id_info.get("email")
        name = id_info.get("name")

        if not email:
            raise HTTPException(status_code=400, detail="Google email not found")

        user = db.query(User).filter(User.email == email).first()

        if not user:
            user = User(
                name=name or "Google User",
                email=email,
                password=hash_password("google_auth_user")
            )

            db.add(user)
            db.commit()
            db.refresh(user)

        token = create_access_token({
            "user_id": user.id,
            "email": user.email
        })

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")