import React from 'react';
import Image from '../Image';
import Articles from '../Articles';
import Tutorials from '../Tutorials';
import Signup from '../Signup';
import './HomePage.css'; 
import ChatPage from './ChatPage';

const HomePage = ({ theme }) => {
    return (
        <div className={`homepage-container ${theme}`}>
            <Image />
            <Articles />
            <Tutorials />
            <Signup />
            <ChatPage />
        </div>
    );
};

export default HomePage;
