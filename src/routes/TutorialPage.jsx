import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore'; // Import required Firestore functions
import Rating from '../Rating'; 
import './TutorialPage.css';

const TutorialPage = () => {
    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        const fetchTutorials = async () => {
            const tutorialsCollection = collection(db, 'tutorials');
            const tutorialSnapshot = await getDocs(tutorialsCollection);
            const tutorialList = tutorialSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTutorials(tutorialList);
        };

        fetchTutorials();
    }, []);

    // Function to handle video end and increment views
    const handleVideoEnd = async (tutorialId) => {
        const tutorialRef = doc(db, 'tutorials', tutorialId);
        try {
            await updateDoc(tutorialRef, {
                views: increment(1) // Increment the views count by 1
            });
            console.log("View count incremented for tutorial ID:", tutorialId);
        } catch (error) {
            console.error("Error updating view count: ", error);
        }
    };

    return (
        <div className="tutorial-page">
            <h2>Tutorials</h2>
            <div className="tutorial-list">
                {tutorials.length === 0 ? (
                    <p>No tutorials available.</p>
                ) : (
                    tutorials.map(tutorial => (
                        <div key={tutorial.id} className="tutorial-card">
                            <h3>{tutorial.title}</h3>
                            <video
                                width="320"
                                height="240"
                                controls
                                onEnded={() => handleVideoEnd(tutorial.id)} // Increment views on video end
                            >
                                <source src={tutorial.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <p>Views: {tutorial.views}</p>
                            <p>Rating: {tutorial.rating}</p>
                            <Rating tutorialId={tutorial.id} currentRating={tutorial.rating} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TutorialPage;
