from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {'Greeting' : 'Hello'}

@app.post("/predict")
def predict_sentiment():
    pass