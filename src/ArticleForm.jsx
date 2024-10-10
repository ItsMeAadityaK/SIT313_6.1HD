import React, { useState } from 'react';
import { handlePostSubmit } from './firebase'; // Import the handlePostSubmit function
import { storage } from './firebase'; // Import storage from firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './PostForm.css'; // Shared CSS for both forms

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [articleText, setArticleText] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageName, setImageName] = useState(''); // New state for storing image name

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageName(e.target.files[0].name); // Set the name of the selected image
        }
    };

    const uploadImageAndGetUrl = async () => {
        if (!image) {
            alert("Please select an image to upload.");
            return null;
        }
        try {
            const storageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
            return url;
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;
        }
    };

    const handlePost = async () => {
        let finalImageUrl = imageUrl;
        if (image && !imageUrl) {
            finalImageUrl = await uploadImageAndGetUrl();
            if (!finalImageUrl) {
                alert("Image upload failed. Please try again.");
                return;
            }
        }

        const post = {
            type: 'article',
            title,
            abstract,
            articleText,
            tags: tags.split(',').map(tag => tag.trim()),
            imageUrl: finalImageUrl,
        };

        try {
            await handlePostSubmit(post);
            console.log("Article posted successfully");
            // Optionally, reset form fields
            setTitle('');
            setAbstract('');
            setArticleText('');
            setTags('');
            setImage(null);
            setImageUrl('');
            setImageName(''); // Reset the image name
        } catch (error) {
            console.error("Error posting article:", error);
        }
    };

    const handleBrowseClick = () => {
        document.getElementById('fileInput').click(); // Trigger the file input click event
    };

    return (
        <form className="post-form">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="image">Add an image</label>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
            />
            <div className="image-upload-section">
                <button type="button" className="browse-button" onClick={handleBrowseClick}>
                    Browse
                </button>
                {imageName && <span className="image-name">{imageName}</span>} {/* Display the image name */}
            </div>
            <button type="button" className="upload-button" onClick={uploadImageAndGetUrl}>
                Upload
            </button>

            <label htmlFor="abstract">Abstract</label>
            <textarea
                id="abstract"
                placeholder="Enter a 1-paragraph abstract"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
            />

            <label htmlFor="articleText">Article Text</label>
            <textarea
                id="articleText"
                placeholder="Enter your article text"
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
            />

            <label htmlFor="tags">Tags</label>
            <input
                type="text"
                id="tags"
                placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            <button type="button" className="post-button" onClick={handlePost}>
                Post
            </button>
        </form>
    );
};

export default ArticleForm;
