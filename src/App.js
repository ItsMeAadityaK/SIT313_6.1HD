import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './auth/Login';
import Signup from './auth/Signup';
import HomePage from './routes/HomePage';
import PostPage from './routes/PostPage';
import FindQuestionPage from './routes/FindQuestionPage';
import Plans from './routes/Plans';
import Payment from './routes/Payment';
import UploadVideo from './routes/UploadVideo';
import TutorialPage from './routes/TutorialPage';
import ForgotPassword from './auth/ForgotPassword';
import ChatPage from './routes/ChatPage';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import './App.css';

function App() {
    const [theme, setTheme] = useState('light'); // Default to 'light' theme
    const [user, setUser] = useState(null); // State for user
    const [isEmailVerified, setIsEmailVerified] = useState(false); // State for email verification status

    useEffect(() => {
        const fetchUserTheme = async (userId) => {
            if (!userId) return; // Check if userId is available

            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const isPremium = userDoc.data().isPremium;
                setTheme(isPremium ? 'premium' : 'light'); // Apply the premium or light theme
            }
        };

        // Listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Check email verification
                setIsEmailVerified(currentUser.emailVerified);
                await fetchUserTheme(currentUser.uid); // Pass user.uid here
            } else {
                setTheme('light'); // Default to light theme if not logged in
            }
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    // Protected Route component
    const ProtectedRoute = ({ element }) => {
        return isEmailVerified ? element : <Navigate to="/login" />;
    };

    return (
        <Router>
            <div className={`App ${theme}`}> 
                <Header setTheme={setTheme} /> 
                
                
                <div className="welcome-message">
                    {user && <p>Welcome, {user.email}</p>} 
                </div>
                
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage theme={theme} />} /> {/* Pass theme prop */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/post" element={<ProtectedRoute element={<PostPage />} />} />
                        <Route path="/find-question" element={<ProtectedRoute element={<FindQuestionPage />} />} />
                        <Route path="/plans" element={<Plans setTheme={setTheme} />} /> {/* Pass setTheme prop */}
                        <Route path="/payment" element={<Payment setTheme={setTheme} />} />
                        <Route path="/tutorials" element={<TutorialPage />} />
                        <Route path="/upload" element={<UploadVideo />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
