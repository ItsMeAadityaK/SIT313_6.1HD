import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Import the auth functions
import { setDoc, doc } from 'firebase/firestore'; // Firestore methods
import './Signup.css';

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSignup = async () => {
        const { name, email, password, confirmPassword } = userDetails;
        
        // Password validation
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }
        
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Send email verification
            await sendEmailVerification(userCredential.user);

            // Store user data in Firestore
            await setDoc(doc(db, 'users', uid), {
                name: name,
                email: email,
                uid: uid,
                createdAt: new Date()
            });

            // Success messages
            setSuccessMessage('User created successfully! A verification email has been sent.'); 
            setErrorMessage(''); // Clear any previous error messages
            navigate('/login');
        } catch (error) {
            // Handle both Firebase auth and Firestore errors
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('The email address is already in use. Please use another email.');
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('The email address is not valid.');
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage('The password is too weak. Please choose a stronger password.');
            } else {
                setErrorMessage(error.message); // Display general error message
            }
            console.error("Error during signup: ", error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create a DEV@Deakin Account</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <input
                type="text"
                name="name"
                placeholder="Name*"
                onChange={handleChange}
                value={userDetails.name}
                className="signup-input"
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email*"
                onChange={handleChange}
                value={userDetails.email}
                className="signup-input"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password*"
                onChange={handleChange}
                value={userDetails.password}
                className="signup-input"
                required
            />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password*"
                onChange={handleChange}
                value={userDetails.confirmPassword}
                className="signup-input"
                required
            />

            <button onClick={handleSignup} className="signup-button">Create</button>
        </div>
    );
};

export default Signup;
