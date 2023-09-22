import { useEffect, useState } from "react";
import socketClient from "socket.io-client";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [server, setServer] = useState(null);
  useEffect(() => {
    const server = socketClient("https://nodehandsonfiveserver.onrender.com");
    setServer(server);
    const user = prompt("Please enter your username:");
    setUsername(user);
    server.emit("join", user);
  }, []);

  useEffect(() => {
    if (server) {
      server.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [server]);

  const sendmessage = (e) => {
    e.preventDefault();
    if (server) {
      const messageData = { username, message };
      server.emit("message", messageData);
      setMessage("");
    }
  };

  return (
    <div>
    <div className="head">
      <h1>Lets Chat
        <span>
          <img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3vVHGg815PYZMbd0x0WenJntYVmDPeR_JKw&usqp=CAU" alt="loading"/>
        </span>
      </h1>

    </div>
      <div className="Main">
        <div className="Display">
          {messages.map((msg) => (
            <div>
              {msg.username === username ? (
                <p key={msg.messageId} className="SentMSG">
                  {username} : {msg.message}
                </p>
              ) : (
                <p key={msg.messageId} className="receivedMSG">
                  {msg.username} : {msg.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={sendmessage}>
            <input
              type="text"
              id="name"
              placeholder="User name..."
              value={username}
              className="TextField"
              onChange={(e) => setUsername(e.target.value)}
            />

            
           
           <div className="sendButton">

            <div>
            <input
              type="text"
              id="sending"
              placeholder="Write Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="SendInput"
            />
            </div>

            <div>
            <button type="submit">
              <img className="sendMsg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY2bOJZ2Z7AV-1z3ucF1B33WZrhv-IrNp1zQ&usqp=CAU" alt="loading"/>
            </button>
            </div>

           </div>
           
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;