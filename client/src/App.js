import "./styles/index.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./component/Chat";
import Socials from "./component/Socials";


const socket = io.connect("http://localhost:3001");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  // const [sentiment, setSentiment] = useState("")
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      <div className="discoverSunday">
        <div>
          <ul>
            <li>Sunday</li>
            <li>
              <span>
              <i class="fa-solid fa-link"></i>
                About
              </span>
            </li>
            <li>
              <span><i aria-label="Input Label" className="fa-brands fa-angellist" />Share</span>
              <i class="fa-sharp fa-light fa-share-nodes"></i>
            </li>
          </ul>
        </div>
        <p className="tag-line">Discover how you <span className="askSunday"> text.</span> </p>
        <p className="slogan">Before your next text, ask SUNDAY </p>
        <button className="login">Create a permanent account</button>
      </div>
      <div>
        {!showChat ? (
          <div className="joinChatDiv">
            <h3>Join A Chat</h3>
            <input
              type="text"
              className="user-inputs"
              placeholder="Enter your name..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              className="user-inputs"
              placeholder="Enter Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      <Socials />
      </div>
    
    </div>
  );
}

export default App;