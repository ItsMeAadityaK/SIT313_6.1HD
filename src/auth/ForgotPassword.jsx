import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import sendPasswordResetEmail
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSendResetLink = async (e) => {
        e.preventDefault();
        const auth = getAuth(); // Get the auth instance

        try {
            await sendPasswordResetEmail(auth, email); // Use the correct function with auth
            setMessage('Password reset link sent! Please check your email.');
            setError(''); // Clear error if successful
        } catch (error) {
            setError(error.message);
            setMessage(''); // Clear message if there is an error
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSendResetLink}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
