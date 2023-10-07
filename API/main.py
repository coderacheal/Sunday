from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
import joblib

app = FastAPI()

mobilebert = joblib.load('mobile_bert.joblib')

class Sentiment(BaseModel):
    text: str

@app.get("/")
def home():
    return {'Greeting' : 'Hello'}

@app.post("/predict_sentiment")
def predict_sentiment(data: Sentiment):
    data = data.dict()
    text = data['text']

    prediction  = mobilebert.predict([[text]])
    return {'prediction': prediction[0]}

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=7860, reload=True)