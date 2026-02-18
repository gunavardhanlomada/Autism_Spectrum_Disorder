import joblib
import numpy as np
import pandas as pd

kids = joblib.load("app/ml/kids_model.pkl")
adult = joblib.load("app/ml/adult_model.pkl")


def predict(features, age):
    cols = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'Age', 'Sex', 'Jauundice', 'Family_ASD']
    X = pd.DataFrame([features], columns=cols)
    if age > 3 and age <= 12:
        return int(kids.predict(X)[0])
    if age > 12:
        return int(adult.predict(X)[0])
    raise ValueError("Invalid age")
