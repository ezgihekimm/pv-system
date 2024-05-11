// pages/index.tsx
'use client'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Home() {
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(); // Add socket state

    useEffect(() => {
        const newSocket = io(
            'ws://raspberrypi.local:5000',
            {
                transports: ['websocket'],
            }
        );

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('message', (data: any) => {
            console.log('Received message from server:', data);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (socket) {
            // Send the message to the server
            socket.emit('message', {
                'relay1': false,
                'relay2': true,
                'relay3': false,
            });
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Home Page</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
}
