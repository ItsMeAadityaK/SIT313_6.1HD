import React from 'react';
import ChatGPT from '../ChatGPT'; 
import './ChatPage.css';

const ChatPage = () => {
    return (
        <div className="chat-page-container">
            <h2>Chat with GPT</h2>
            <ChatGPT />
        </div>
    );
};

export default ChatPage;
