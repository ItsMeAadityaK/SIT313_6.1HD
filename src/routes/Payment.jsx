import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../Checkout';
import './Payment.css';

const stripePublishableKey = 'pk_test_51Q7fIo08BIbFmBcDVzwXmiO6K9xvASaqWvGhOwaYmC8iMcYuVETimSoOwRKLwiLiHs0zJC0c39cNIz72iTVBgqGl00NH2tvRLZ';
const stripePromise = loadStripe(stripePublishableKey);

const Payment = ({ setTheme }) => {
    return (
        <Elements stripe={stripePromise}>
            <div className="payment-page">
                <h2>Complete your payment</h2>
                <Checkout setTheme={setTheme} />
            </div>
        </Elements>
    );
};

export default Payment;
