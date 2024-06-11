const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const EDIT_SPOT = 'spots/EDIT_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const ADD_SPOT = 'spots/ADD_SPOT';
const UPDATE_CURRENT_IMAGE_INDEX = 'spots/UPDATE_CURRENT_IMAGE_INDEX';

// Actions
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
};

const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    };
};

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    };
};

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};

export const updateCurrentImageIndex = (spotId, index) => {
    return {
        type: UPDATE_CURRENT_IMAGE_INDEX,
        spotId,
        index
    };
};

// Thunks

export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
    }
};

export const createSpot = (spot) => async (dispatch) => {
    const response = await fetch('/api/spots/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addSpot(data));
    }
};

export const updateSpot = (spot) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editSpot(data));
    }
};

export const removeSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteSpot(spotId));
    }
};

const initialState = {
    spots: {},
    currentImageIndices: {}
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const spots = {};
            action.spots.forEach(spot => {
                spots[spot.id] = { ...spot, currentImageIndex: 0 };
            });
            return { ...state, spots };
        case ADD_SPOT:
            return {
                ...state,
                spots: { ...state.spots, [action.spot.id]: { ...action.spot, currentImageIndex: 0 } }
            };
        case EDIT_SPOT:
            return {
                ...state,
                spots: {
                    ...state.spots,
                    [action.spot.id]: { ...state.spots[action.spot.id], ...action.spot }
                }
            };
        case DELETE_SPOT:
            const spotsCopy = { ...state.spots };
            delete spotsCopy[action.spotId];
            return { ...state, spots: spotsCopy };
        case UPDATE_CURRENT_IMAGE_INDEX:
            return {
                ...state,
                currentImageIndices: {
                    ...state.currentImageIndices,
                    [action.spotId]: action.index
                }
            };
        default:
            return state;
    }
};

export default spotsReducer;
