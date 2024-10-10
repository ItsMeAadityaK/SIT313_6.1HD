import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Please enter a valid email');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/submit-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('Thank you for subscribing!');
                setEmail('');
            } else {
                setMessage('Failed to subscribe. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="newsletter-signup">
            <h2 className="signup-text">SIGN UP FOR OUR DAILY INSIDER</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="subscribe-button">Subscribe</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Signup;
