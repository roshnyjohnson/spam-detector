MailPal — Spam Detector with Explainable AI
A web app that detects spam messages using machine learning, and explains its decision by highlighting which words influenced the result.

Live Demo
[link once deployed]

Screenshots
alt text

alt text

alt text

Tech Stack
Frontend: React (Vite)
Backend: FastAPI
ML: scikit-learn (TF-IDF + Logistic Regression)
Dataset: SMS Spam Collection
How It Works
Messages are vectorized using TF-IDF
A Logistic Regression model predicts spam/ham
Word-level coefficients are used to explain which words influenced each specific prediction
Results
Accuracy: 97.3%
F1-score (spam class): ~93%
Running Locally
Backend
cd backend pip install -r requirements.txt uvicorn main:app --reload --port 8000

Frontend
cd spam-detector-app npm install npm run dev
