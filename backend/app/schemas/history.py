from pydantic import BaseModel
from datetime import datetime
from typing import List, Any

class HistoryOut(BaseModel):
    id: int
    email: str
    age: int
    sex: str
    features: List[Any]
    result: str
    created_at: datetime

    class Config:
        from_attributes = True
