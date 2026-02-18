import sys
import os
import numpy as np

# Add the project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.ml.model_loader import predict

def test_prediction():
    # 14 features: A1-A10 (10), Age (1), Sex (1), Jaundice (1), Family_ASD (1)
    feats = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 25, 1, 1, 1]
    age = 25
    
    print(f"Testing prediction with {len(feats)} features...")
    try:
        res = predict(feats, age)
        print(f"Prediction successful! Result: {res}")
    except Exception as e:
        print(f"Prediction failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_prediction()
