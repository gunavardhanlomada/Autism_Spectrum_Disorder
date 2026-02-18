from sqlalchemy import Column, Integer, String, JSON, DateTime
from datetime import datetime
from app.db.base import Base


class TestHistory(Base):
    __tablename__ = "test_history"
    id = Column(Integer, primary_key=True)
    email = Column(String, index=True)
    age = Column(Integer)
    sex = Column(String)
    features = Column(JSON)
    result = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
