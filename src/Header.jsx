import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './Header.css';

const Header = ({ setTheme }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            localStorage.setItem('subscription', 'free');
            setTheme('light');
            navigate('/login');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <div className="header">
            <Link to="/" className="logo-link">
                <div className="logo">DEV@Deakin</div>
            </Link>

            <input type="text" placeholder="Search..." className="search-input" />

            <div className="buttons">
                {isLoggedIn && (
                    <>
                        <Link to="/find-question">
                            <button className="btn find-question-btn">Find Questions</button>
                        </Link>
                        <Link to="/post">
                            <button className="btn post-btn">Post</button>
                        </Link>
                    
                        <Link to="/upload">
                            <button className="btn upload-btn">Upload Video</button>
                        </Link>
                        <Link to="/tutorials">
                                <button className="btn tutorials-btn">View Tutorials</button>
                        </Link>

                    </>
                )}

                {isLoggedIn && (
                    <Link to="/plans">
                        <button className="btn plans-btn">Plans</button>
                    </Link>
                )}

                {isLoggedIn ? (
                    <button className="btn login-btn" onClick={handleLogout}>
                        Sign out
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="btn login-btn">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
