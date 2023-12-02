import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

const Chat: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>('');
    const [chat, setChat] = useState<string[]>([]);

    useEffect(() => {
        // Connect to the WebSocket server
        const newSocket = io('http://localhost:8080/ui/session'); // Replace with your server URL
        setSocket(newSocket);

        // Listen for messages from the server
        newSocket.on('chat message', (msg: string) => {
            setChat((prevChat) => [...prevChat, msg]);
        });

        // Disconnect on cleanup
        return () => {
            if (newSocket) newSocket.disconnect();
        };
    }, []);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message !== '' && socket) {
            // Send the message to the server
            socket.emit('chat message', message);
            setMessage('');
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

export default Chat;
