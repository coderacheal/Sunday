// import React, { useState } from 'react';
// import * as tf from '@tensorflow/tfjs';

// const SentimentAnalysis = () => {
//   const [model, setModel] = useState(null);

//   // Load the TensorFlow.js model
//   const loadModel = async () => {
//     const loadedModel = await tf.loadLayersModel('path/to/tfjs_sentiment_model/model.json');
//     setModel(loadedModel);
//   };

//   // Predict sentiment using the loaded model
//   const predictSentiment = async (text) => {
//     const tokenizedText = tokenizer.encode(text, { truncation: true, padding: 'max_length' });
//     const inputTensor = tf.tensor([tokenizedText]);

//     // Make predictions
//     const predictions = model.predict(inputTensor);

//     // Process predictions and update UI
//     // ...

//     // Dispose of the inputTensor to avoid memory leaks
//     inputTensor.dispose();
//   };

//   return (
//     <div>
//       <button onClick={loadModel}>Load Model</button>
//       <button onClick={() => predictSentiment("I love it!")}>Predict Sentiment</button>
//     </div>
//   );
// };

// export default SentimentAnalysis;


// useEffect(() => {
  //   // Load the TensorFlow.js model when the component mounts
  //   const loadModel = async () => {
  //     try {
  //       const loadedModel = await tf.loadLayersModel('path/to/tfjs_sentiment_model/model.json');
  //       setModel(loadedModel);
  //     } catch (error) {
  //       console.error('Error loading the model:', error);
  //     }
  //   };

  //   loadModel(); // Load the model when the component mounts
  // }, []);

  // Predict sentiment using the loaded model


    
  // const predictSentiment = async (text) => {
  //   if (!model) {
  //     console.warn('Model not loaded yet.');
  //     return;
  //   }

  //   try {
  //     const tokenizedText = tokenizer.encode(text, { truncation: true, padding: 'max_length' });
  //     const inputTensor = tf.tensor([tokenizedText]);

  //     // Make predictions
  //     const predictions = model.predict(inputTensor);
  //     const handleSentiment = () => {
  //       setSentiment(predictions)
  //     }

  //     // update the sentiment state
  //     handleSentiment()
     
  //     // Dispose of the inputTensor to avoid memory leaks
  //     inputTensor.dispose();
  //   } catch (error) {
  //     console.error('Error predicting sentiment:', error);
  //   }
  // };


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        // sentiment: sentiment
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      setSentimentPopup(false)
    }
  };