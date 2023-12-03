import './Terminal.css';
import React, { useEffect, useState } from 'react';
import WebSocketService from '../service/WebSocketService';
function Terminal() {

    const [messages, setMessages] = useState<any[]>([]);
    const webSocketService = new WebSocketService('ws://localhost:8080/ui/session');
  
    useEffect(() => {
      webSocketService.connect();
      console.log("websocket connected");
      webSocketService.subscribeToMessages((message) => {
        setMessages(prev => [...prev, message]);
      });
  
      return () => {
        webSocketService.disconnect();
      };
    }, []);

    return (
        <div className='Terminal'>
            <p>The main terminal area</p>
        </div>
    );
}

export default Terminal;