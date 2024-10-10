import React, { useState } from 'react';
import './PostPage.css';
import QuesForm from '../QuesForm';
import ArticleForm from '../ArticleForm';
import { handlePostSubmit } from '../firebase'; // Import the function from firebase.js
import { storage } from '../firebase'; // Import storage from firebase.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PostPage = () => {
    const [postType, setPostType] = useState('question'); // default to 'question'

    const handlePostTypeChange = (e) => {
        console.log("Post type changed to:", e.target.value);
        setPostType(e.target.value);
    };
    
    const handleImageUpload = async (file) => {
        if (!file) {
            console.error("No file selected for upload");
            return;
        }
        try {
            console.log("Uploading image...");
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            console.log("Image uploaded, URL:", url);
            return url;
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;
        }
    };

    return (
        <div className="post-page-container">
            <h2>Create a New Post</h2>
            
            <div className="post-type-selection">
                <label>Select Post Type:</label>
                <input
                    type="radio"
                    name="postType"
                    value="question"
                    checked={postType === 'question'}
                    onChange={handlePostTypeChange}
                /> Question
                <input
                    type="radio"
                    name="postType"
                    value="article"
                    checked={postType === 'article'}
                    onChange={handlePostTypeChange}
                /> Article
            </div>

            <div className="post-section-header">
                <h3>What do you want to ask or share</h3>
            </div>

            {/* Conditional rendering based on post type */}
            {postType === 'question' ? (
                <QuesForm handlePostSubmit={handlePostSubmit} handleImageUpload={handleImageUpload} />
            ) : (
                <ArticleForm handlePostSubmit={handlePostSubmit} handleImageUpload={handleImageUpload} />
            )}
        </div>
    );
};

export default PostPage;
