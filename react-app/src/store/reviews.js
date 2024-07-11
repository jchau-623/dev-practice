const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// Actions
const loadReviews = (spotId, reviews) => ({
    type: LOAD_REVIEWS,
    spotId,
    reviews,
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
});

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review,
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId,
});

// Thunks
export const getReviews = (spotId) => async (dispatch) => {
    console.log('Fetching reviews for spotId:', spotId); // Debugging
    const response = await fetch(`/api/reviews?spot_id=${spotId}`);
    if (response.ok) {
        const data = await response.json();
        console.log('Fetched reviews:', data); // Debugging
        dispatch(loadReviews(spotId, data));
    }
};

export const createReview = (reviewData) => async (dispatch) => {
    const response = await fetch('/api/reviews/create', {
        method: 'POST',
        body: reviewData,
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        return data;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
    }
};

export const updateReview = (reviewData) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewData.get('id')}`, {
        method: 'PUT',
        body: reviewData,
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editReview(data));
        return data;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update review');
    }
};

export const removeReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteReview(reviewId));
    }
};

// Initial state
const initialState = {};

// Reducer
export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_REVIEWS:
            console.log('Loading reviews for spotId:', action.spotId, 'Reviews:', action.reviews); // Debugging
            return {
                ...state,
                [action.spotId]: action.reviews
            };
        case ADD_REVIEW:
            const { review } = action;
            return {
                ...state,
                [review.spot_id]: [...(state[review.spot_id] || []), review]
            };
        case EDIT_REVIEW:
            const { review: editedReview } = action;
            return {
                ...state,
                [editedReview.spot_id]: state[editedReview.spot_id].map(r =>
                    r.id === editedReview.id ? editedReview : r
                )
            };
        case DELETE_REVIEW:
            const { reviewId } = action;
            const newState = { ...state };
            for (const spotId in newState) {
                newState[spotId] = newState[spotId].filter(review => review.id !== reviewId);
            }
            return newState;
        default:
            return state;
    }
}
