import React, { useState } from 'react';
import axios from 'axios';
import './ChatGPT.css';

const ChatGPT = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!userInput) return;

        // Add user message to the chat
        setMessages([...messages, { sender: 'user', text: userInput }]);

        // Send request to OpenAI API
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: userInput },
                ],
            }, {
                headers: {
                    'Authorization': `Bearer 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`,
                    'Content-Type': 'application/json',
                },
            });

            const botReply = response.data.choices[0].message.content;
            // Add bot response to the chat
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botReply }]);
            setUserInput(''); // Clear input field
        } catch (error) {
            console.error("Error fetching response from OpenAI:", error);
        }
    };

    return (
        <div className="chat-gpt-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        <strong>{msg.sender === 'user' ? 'You: ' : 'Bot: '}</strong>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatGPT;
