import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SentimentPopUp from "./SentimentPopUp";


const Chat = ({ socket, username, room}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [sentiment, setSentiment] = useState("")
  const [sentiment_probability, setSentimentProbability] = useState("")
  const [messageList, setMessageList] = useState([]);
  const [sentimentPopup, setSentimentPopup] = useState(false)


  const getSentiment = async (message) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/predict/text=${encodeURIComponent(message)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const sentimentData = await response.json();
      return sentimentData; 
      
    } catch (error) {
      console.error("Error fetching sentiment:", error);
    }
  };
  


  const handleSentimentPopup = () => {
    if (currentMessage !== "") {
    setSentimentPopup(true)
    }
  }

  const handleExitSentimentPopup = () => {
    setSentimentPopup(false)
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      // Fetch sentiment data before sending the message
      const sentimentData = await getSentiment(currentMessage);
      console.log(sentimentData)

      const handleSentiment = () => {
        setSentiment(sentimentData['predicted_class'])
      }

      const handleSentimentProbability = () => {
        setSentimentProbability(sentimentData['predicted_probability'])
      }

      handleSentiment()
      handleSentimentProbability()
      

      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        sentiment: sentiment,
        sentiment_probability: sentiment_probability
      };

      console.log(sentiment)
      console.log(sentiment_probability)
  
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      setSentimentPopup(false);
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
          <SentimentPopUp onSend={sendMessage} onExit={handleExitSentimentPopup}/>
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
        onClick={() =>{handleSentimentPopup();}}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
