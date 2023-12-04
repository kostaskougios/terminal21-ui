import React, { useState, useEffect } from "react";

const ChatApp: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    // Create a WebSocket connection
    const newWs = new WebSocket("ws://localhost:8080/ui/session");

    newWs.onmessage = (event: MessageEvent) => {
      setChat((prevChat) => [...prevChat, event.data]);
    };

    setWs(newWs);

    // Clean up function
    return () => {
      if (newWs) newWs.close();
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message !== "" && ws) {
      ws.send(message);
      setMessage("");
    }
  };

  return (
    <div>
      <ul>
        {chat.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
