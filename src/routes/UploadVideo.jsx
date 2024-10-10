import React, { useState } from 'react';
import { auth, storage, db } from '../firebase'; // Import Firebase authentication and storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary storage functions
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import './UploadVideo.css';

const UploadVideo = () => {
    const [title, setTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null); // State for video file
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();

        const userId = auth.currentUser ? auth.currentUser.uid : null;
        if (!userId) {
            setErrorMessage("You must be logged in to upload videos.");
            return;
        }

        if (!title || !videoFile) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        // Create a reference to the video file in Firebase Storage
        const storageRef = ref(storage, `videos/${videoFile.name}`);

        try {
            // Upload the video file to Firebase Storage
            await uploadBytes(storageRef, videoFile);
            console.log("Video uploaded successfully!");

            // Get the download URL of the uploaded video
            const videoUrl = await getDownloadURL(storageRef);
            console.log("Video URL: ", videoUrl);

            // Save video metadata to Firestore
            await addDoc(collection(db, 'tutorials'), {
                title: title,
                url: videoUrl,
                views: 0,
                rating: 0,
                userId: userId,
                createdAt: new Date()
            });

            setSuccessMessage("Video uploaded successfully!");
            setErrorMessage('');
            setTitle(''); 
            setVideoFile(null); 
        } catch (error) {
            setErrorMessage("Error uploading video: " + error.message);
        }
    };

    return (
        <div className="upload-video-container">
            <h2>Upload a Tutorial Video</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleUpload}>
                <input
                    type="text"
                    placeholder="Video Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="file" // Change to file input
                    accept="video/*" // Accept only video files
                    onChange={(e) => setVideoFile(e.target.files[0])} // Set the video file state
                    required
                />
                <button type="submit">Upload Video</button>
            </form>
        </div>
    );
};

export default UploadVideo;
