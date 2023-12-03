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
            {messages.map( (msg) => (
                mapResponse(msg)
            ))}
        </div>
    );
}

function mapResponse(msg: any): JSX.Element {
    // Check for the presence of different keys and handle accordingly
    if (msg.Std) {
        // Handling "Std" key
        return (
            <>
                {msg.Std.elements.map((element: any, index: number) => {
                    if (element.Paragraph) {
                        return <p key={index}>{element.Paragraph.text}</p>;
                    }
                    // You can add more conditions here for different types of elements within "Std"
                })}
            </>
        );
    }
    return <div>Unknown message format</div>;
}

export default Terminal;