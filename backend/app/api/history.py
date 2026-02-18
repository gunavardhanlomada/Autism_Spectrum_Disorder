from fastapi import APIRouter, Depends
from app.core.security import get_current_email
from app.db.session import SessionLocal
from app.schemas.history import HistoryOut
from typing import List

router = APIRouter(prefix="/history", tags=["History"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[HistoryOut])
def get_history(email=Depends(get_current_email), db=Depends(get_db)):
    return fetch(db, email)
