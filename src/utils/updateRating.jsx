import { db } from '../firebase'; 
import { doc, updateDoc } from 'firebase/firestore';

export const updateRating = async (tutorialId, newRating) => {
    const tutorialRef = doc(db, 'tutorials', tutorialId);
    try {
        await updateDoc(tutorialRef, {
            rating: newRating
        });
        console.log("Rating updated successfully!");
    } catch (error) {
        console.error("Error updating rating: ", error);
        throw error; // Rethrow the error for further handling if necessary
    }
};
