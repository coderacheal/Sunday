from fastapi import FastAPI
import torch
from transformers import MobileBertTokenizer, MobileBertForSequenceClassification
import joblib
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load my tuned model, tokenizer and label_encoder
model_path = ".\model\sunday_mobile_bert_model"
model = MobileBertForSequenceClassification.from_pretrained(model_path)
# tokenizer = MobileBertTokenizer.from_pretrained(model_path)
tokenizer = MobileBertTokenizer.from_pretrained('google/mobilebert-uncased')
# label_encoder = joblib.load(".\model\sunday_mobile_bert_model\label_encoder.joblib")

@app.get("/")
def home():
    return {'Health Check' : 'Status Ok'}

@app.get("/predict/{text}")
def predict_sentiment(text: str):

    # Tokenize the input text
    input_encoding = tokenizer(text, truncation=True, padding=True, max_length=512, return_tensors='pt')

    # Extract input_id and attention_mask from encoded text input and pass it to the model
    input_ids = input_encoding['input_ids']
    attention_mask = input_encoding['attention_mask']
    outputs = model(input_ids, attention_mask=attention_mask)

    # Get predicted class and probability
    predicted_class = torch.argmax(outputs.logits, dim=1).item()
    predicted_probability = torch.softmax(outputs.logits, dim=1).tolist()

    # Extract probability for the predicted class only and reverse the predicted sentiment into text
    class_probability = predicted_probability[0][predicted_class]
    # predicted_label = label_encoder.inverse_transform([predicted_class])[0]
    # predicted_probability = probabilities[0, predictions[0]].item()

    return {"predicted_class": predicted_class, "predicted_probability": class_probability}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
    