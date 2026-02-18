from app.models.test_history import TestHistory


def save(db, email, age, sex, features, res):
    h = TestHistory(email=email, age=age, sex=str(sex),
                    features=features, result=str(res))
    db.add(h)
    db.commit()


def fetch(db, email):
    return db.query(TestHistory).filter(TestHistory.email == email).order_by(TestHistory.created_at.desc()).all()
