import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { auth } from '../firebase'; // Import Firebase authentication
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import required Firebase functions
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage] = useState(''); // Success message for resend verification
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if the user's email is verified
            if (user && !user.emailVerified) {
                setErrorMessage("Please verify your email before logging in.");
                return; // Stop further execution
            }

            // Redirect to home if login is successful
            navigate('/'); 
        } catch (error) {
            setErrorMessage(error.message); // Display error message
        }
    };

    return (
        <div className="login-container">
            <div className="signup-link">
                <button
                    className="signup-button"
                    onClick={() => navigate('/signup')}
                >
                    Sign up
                </button>
            </div>

            <h2>Login</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <input
                type="email"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="login-input"
            />
            <input
                type="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="login-input"
            />

            <button onClick={handleLogin} className="login-button">Login</button>

            
            <p>
                <Link to="/forgot-password">Forgot your password?</Link>
            </p>
        </div>
    );
};

export default Login;
