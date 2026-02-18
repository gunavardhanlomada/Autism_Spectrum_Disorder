from fastapi import FastAPI
from app.api import auth, predict, history
from fastapi.middleware.cors import CORSMiddleware
from app.db.base import Base
from app.db.session import engine
from app.models.user import User
from app.models.test_history import TestHistory

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ASD Prediction API")

origins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:8080","http://localhost:3000","http://localhost:3001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(predict.router)
app.include_router(history.router)
