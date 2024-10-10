import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import './Checkout.css';

const Checkout = ({ setTheme }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handlePaymentSuccess = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { isPremium: true }, { merge: true });
            alert('Payment Successful!');
            localStorage.setItem('subscription', 'premium');
            setTheme('premium'); // Update the theme immediately
            navigate('/');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            handlePaymentSuccess();
        }

        setLoading(false);
    };

    return (
        <div className="checkout-container">
            {success ? (
                <div className="success-message">
                    <h2>Payment Successful!</h2>
                    <p>You will be redirected shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="checkout-form">
                    <CardElement className="card-element" />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="pay-button" disabled={!stripe || loading}>
                        {loading ? 'Processing...' : 'Pay'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
