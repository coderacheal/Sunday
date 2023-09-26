import React from 'react'

const SentimentPopUp = ({ onSend, onExit }) => {
  return (
    <div className="sentimentPopup">
      <div className="postPopup">
        <p>Are you sure you want to send this message. The sentiment for this message is 'litigious' </p>
        <div className='confirmationBtnContainer'>
          <button onClick={onSend} className='confirmationBtn'>Post</button>
          <button onClick={onExit} className='confirmationBtn'>Exit</button>
        </div>
      </div>
    </div>
  )
}

export default SentimentPopUp
