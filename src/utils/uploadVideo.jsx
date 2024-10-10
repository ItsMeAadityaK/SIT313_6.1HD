import { db } from '../firebase'; 
import { addDoc, collection } from 'firebase/firestore';

export const uploadVideo = async (title, url, userId) => {
    try {
        await addDoc(collection(db, 'tutorials'), {
            title: title,
            url: url,
            views: 0,
            rating: 0,
            createdAt: new Date(),
            userId: userId
        });
        console.log("Video uploaded successfully!");
    } catch (error) {
        console.error("Error uploading video: ", error);
        throw error;
    }
};
