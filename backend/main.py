from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
 
app = FastAPI()
 
# Allow your React app (running on a different port) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load the real trained model and vectorizer once, when the server starts
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)
 
with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)
# Also rebuild the explainability lookup, same idea as Day 2's explain_prediction()
feature_names = vectorizer.get_feature_names_out()
coefficients = model.coef_[0]
 
class MessageInput(BaseModel):
    text: str
@app.post('/predict')
def predict(input: MessageInput):
    vector = vectorizer.transform([input.text])
    prediction = model.predict(vector)[0]
    probability = model.predict_proba(vector)[0]
    confidence = float(max(probability))
 
    # Explainability: which words in THIS message influenced the result
    vector_array = vector.toarray()[0]
    present_indices = vector_array.nonzero()[0]
 
    contributions = []
    for idx in present_indices:
        word = feature_names[idx]
        contribution = vector_array[idx] * coefficients[idx]
        contributions.append({'word': word, 'contribution': float(contribution)})
 
    contributions.sort(key=lambda x: abs(x['contribution']), reverse=True)
 
    return {
        'label': prediction,
        'confidence': confidence,
        'top_words': contributions[:5]
    }
 
@app.get('/')
def health_check():
    return {'status': 'API is running'}
