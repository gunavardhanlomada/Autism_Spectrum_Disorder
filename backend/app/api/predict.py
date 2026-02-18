from fastapi import APIRouter, Depends
from app.schemas.predict import PredictIn
from app.core.security import get_current_email
from app.ml.model_loader import predict
from app.db.session import SessionLocal
from app.crud.history import save
router = APIRouter(prefix="/predict", tags=["Prediction"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def run(data: PredictIn, email=Depends(get_current_email), db=Depends(get_db)):
    feats = [data.a1, data.a2, data.a3, data.a4, data.a5, data.a6, data.a7,
             data.a8, data.a9, data.a10, data.age, data.sex, data.Jaundice, data.Family_ASD]
    res = predict(feats, data.age)
    save(db, email, data.age, data.sex, feats, res)
    return {"prediction": res, "email": email}
