import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './Plans.css';

const Plans = ({ setTheme }) => {
    const [isPremium, setIsPremium] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists() && userDoc.data().isPremium) {
                    setIsPremium(true);
                }
            }
        };

        fetchSubscriptionStatus();
    }, []);

    const handleSelectPlan = async (plan) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            if (plan === 'premium') {
                navigate('/payment');
            } else if (plan === 'free') {
                await updateDoc(userRef, { isPremium: false });
                setTheme('light');
                setIsPremium(false);
                localStorage.setItem('subscription', 'free');
                navigate('/');
            }
        }
    };

    return (
        <div className="plans-page">
            <h2>Subscription Plans</h2>
            {isPremium ? (
                <div className="plan">
                    <h3>Premium Member</h3>
                    <p>You are currently subscribed to the premium plan.</p>
                    <button className="btn" onClick={() => handleSelectPlan('free')}>
                        Cancel Membership
                    </button>
                </div>
            ) : (
                <>
                    <div className="plan">
                        <h3>Free Plan</h3>
                        <p>Access to basic features.</p>
                        <button className="btn" disabled>Selected</button>
                    </div>
                    <div className="plan">
                        <h3>Premium Plan</h3>
                        <p>Access to premium features.</p>
                        <button className="btn" onClick={() => handleSelectPlan('premium')}>
                            Choose Premium
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Plans;
