from fastapi import FastAPI
import torch
from transformers import MobileBertTokenizer, MobileBertForSequenceClassification
import joblib
import uvicorn

app = FastAPI()

# Load the my further trained model, tokenizer, label_encoder
model_path = ".\model\sunday_mobile_bert_model"
model = MobileBertForSequenceClassification.from_pretrained(model_path)
tokenizer = MobileBertTokenizer.from_pretrained('google/mobilebert-uncased')
# label_encoder = joblib.load(".\model\sunday_mobile_bert_model\label_encoder.joblib")

@app.get("/")
def home():
    return {'Health Check' : 'Status Ok'}

@app.get("/predict/{text}")
def predict_sentiment(text: str):

    # Tokenize the input text
    input_encoding = tokenizer(text, truncation=True, padding=True, max_length=512, return_tensors='pt')

    # Extract input_id and attention_mask from encoding
    input_ids = input_encoding['input_ids']
    attention_mask = input_encoding['attention_mask']
    
    # Pass input_ids and attention mask for prediction
    outputs = model(input_ids, attention_mask=attention_mask)

    # Get predicted class and probability
    predicted_class = torch.argmax(outputs.logits, dim=1).item()
    predicted_probability = torch.softmax(outputs.logits, dim=1).tolist()

    # Extract probability for the predicted class only and inverse the prediction into text
    class_probability = predicted_probability[0][predicted_class]
    # predicted_label = label_encoder.inverse_transform([predicted_class])[0]
    # predicted_probability = probabilities[0, predictions[0]].item()

    return {"predicted_class": predicted_class, "predicted_probability": class_probability}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
    