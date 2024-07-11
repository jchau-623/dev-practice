export const calculateAverageRating = (reviews = []) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 'No reviews yet';
    const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
};
