from fastapi import FastAPI
import uvicorn
import torch
from transformers import MobileBertTokenizer, MobileBertForSequenceClassification

app = FastAPI()

# Load the pre-trained model
model_path = "/model/sunday_mobile_bert_model"
model = MobileBertForSequenceClassification.from_pretrained(model_path)
tokenizer = MobileBertTokenizer.from_pretrained(model_path)


@app.get("/")
def home():
    return {'Greeting' : 'Hello'}

@app.get("/predict/{text}")
def predict(text: str):

    # Tokenize the input text
    input_encoding = tokenizer(text, truncation=True, padding=True, max_length=512, return_tensors='pt')

    # Forward pass through the model
    with torch.no_grad():
        model.eval()
       
        input_ids = input_encoding['input_ids']
        attention_mask = input_encoding['attention_mask']
        
        outputs = model(input_ids, attention_mask=attention_mask)

        # Get predicted class and probability
        predicted_class = torch.argmax(outputs.logits, dim=1)
        predicted_probability = torch.softmax(outputs.logits, dim=1)

        return {"predicted_class": predicted_class, "predicted_probability": predicted_probability}
