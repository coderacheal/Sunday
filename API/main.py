from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel

app = FastAPI()

class Sentiment(BaseModel):
    text  = str

@app.get("/")
def home():
    return {'Greeting' : 'Hello'}

@app.post("/predict_sentiment")
def predict_sentiment(data: Sentiment):
    pass

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=7860, reload=True)