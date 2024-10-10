import React from 'react';
import './Image.css';

const Banner = () => {
    return (
        <div className="image">
            <img src={`${process.env.PUBLIC_URL}/banner.jpg`} alt="Banner" />
        </div>
    );
};

export default Banner;