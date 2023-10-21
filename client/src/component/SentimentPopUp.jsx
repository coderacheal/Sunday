import React from 'react'

const SentimentPopUp = ({ onSend, onExit, sentiment, probability}) => {
  return (
    <div className="sentimentPopup">
      <div className="postPopup">
        <p>Are you sure you want to send this message. The sentiment for this message is {sentiment} with a {probability}% probability</p>
        <div className='confirmationBtnContainer'>
          <button onClick={onSend} className='confirmationBtn'>Send</button>
          <button onClick={onExit} className='confirmationBtn'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default SentimentPopUp
