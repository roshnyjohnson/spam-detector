# MailPal — Spam Detector with Explainable AI
 
A web app that detects spam messages using machine learning, and
explains its decision by highlighting which words influenced the result.
 
## Live Demo
[link once deployed]
 
## Screenshots
![alt text](class_distribution.png)


![alt text](confusion_matrix.png)

![alt text](top_spam_words.png)


## Tech Stack
- Frontend: React (Vite)
- Backend: FastAPI
- ML: scikit-learn (TF-IDF + Logistic Regression)
- Dataset: SMS Spam Collection
 
## How It Works
1. Messages are vectorized using TF-IDF
2. A Logistic Regression model predicts spam/ham
3. Word-level coefficients are used to explain which words
   influenced each specific prediction
 
## Results
- Accuracy: 97.3%
- F1-score (spam class): ~93%
 
## Running Locally
### Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
 
### Frontend
cd spam-detector-app
npm install
npm run dev

# MailPal — Spam Detector with Explainable AI
 
A web app that detects spam messages using machine learning, and
explains its decision by highlighting which words influenced the result.
 
## Live Demo
[link once deployed]
 
## Screenshots
![alt text](class_distribution.png)


![alt text](confusion_matrix.png)

![alt text](top_spam_words.png)


## Tech Stack
- Frontend: React (Vite)
- Backend: FastAPI
- ML: scikit-learn (TF-IDF + Logistic Regression)
- Dataset: SMS Spam Collection
 
## How It Works
1. Messages are vectorized using TF-IDF
2. A Logistic Regression model predicts spam/ham
3. Word-level coefficients are used to explain which words
   influenced each specific prediction
 
## Results
- Accuracy: 97.3%
- F1-score (spam class): ~93%
 
## Running Locally
### Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
 
### Frontend
cd spam-detector-app
npm install
npm run dev
