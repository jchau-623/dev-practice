


export const calculateAverageRating = (reviews, spotId) => {
    const spotReviews = reviews[spotId] || [];
    if (spotReviews.length === 0) return null;
    const totalRating = spotReviews.reduce((total, review) => total + review.rating, 0);
    return (totalRating / spotReviews.length).toFixed(1);
};
