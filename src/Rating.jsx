import React, { useState } from 'react';
import { updateRating } from './utils/updateRating';

const Rating = ({ tutorialId, currentRating }) => {
    const [rating, setRating] = useState(currentRating);

    const handleRating = async (newRating) => {
        setRating(newRating);
        await updateRating(tutorialId, newRating);
    };

    return (
        <div className="rating">
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    onClick={() => handleRating(star)}
                    style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'grey' }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default Rating;
