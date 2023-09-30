import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SentimentPopUp from "./SentimentPopUp";
import * as tf from '@tensorflow/tfjs';


const Chat = ({ socket, username, room}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [sentiment, setSentiment] = useState("none")
  const [messageList, setMessageList] = useState([]);
  const [sentimentPopup, setSentimentPopup] = useState(false)

  useEffect(() => {
    // Load the TensorFlow.js model when the component mounts
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('path/to/tfjs_sentiment_model/model.json');
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    };

    loadModel(); // Load the model when the component mounts
  }, []);

  // Predict sentiment using the loaded model
  const predictSentiment = async (text) => {
    if (!model) {
      console.warn('Model not loaded yet.');
      return;
    }

    try {
      const tokenizedText = tokenizer.encode(text, { truncation: true, padding: 'max_length' });
      const inputTensor = tf.tensor([tokenizedText]);

      // Make predictions
      const predictions = model.predict(inputTensor);
      const handleSentiment = () => {
        setSentiment(predictions)
      }

      // update the sentiment state
      handleSentiment()
     
      // Dispose of the inputTensor to avoid memory leaks
      inputTensor.dispose();
    } catch (error) {
      console.error('Error predicting sentiment:', error);
    }
  };

  const handleSentimentPopup = () => {
    if (currentMessage !== "") {
    setSentimentPopup(true)
    }
  }

  const handleExitSending = () => {
    setSentimentPopup(false)
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        sentiment: sentiment
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      setSentimentPopup(false)
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chatFrame">
      <div className="chat-header">
        <p>Live Chat - {username}</p>
      </div>
      <div className="chat-body">
        {!sentimentPopup? (
          <ScrollToBottom className="messageDiv">
          {messageList.map((messageContent) => {
            console.log(messageContent)
            return (
              <div
                className="message"
                id={username === messageContent.author ? "sender" : "receiver"}
              >
                <div>
                  <div className="message-content">
                    <p className="message-body-text">{messageContent.message}</p>
                    <div className="metaData">
                    <p id="sentiment">Sentiment: <b> {messageContent.sentiment}</b></p>
                  </div>
                    <p id="time"> Sent by {messageContent.author} at {messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
        ): (
          <SentimentPopUp onSend={sendMessage} onExit={handleExitSending} sentiment={sentiment}/>
        ) }
        
      </div>
      <div className="enterMessage">
        <input
          type="text"
          className="messageInput"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && handleSentimentPopup();
          }}
        />
        <button className="sendMessageBtn" 
        onClick={() =>{predictSentiment(currentMessage); handleSentimentPopup();}}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
