const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const EDIT_SPOTS = 'spots/EDIT_SPOTS'
const DELETE_SPOTS = 'spots/DELETE_SPOTS'
const ADD_SPOTS = 'spots/ADD_SPOTS'


// Actions
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const editSpots = (spot) => {
    return {
        type: EDIT_SPOTS,
        spot
    }
}

const deleteSpots = (spotId) => {
    return {
        type: DELETE_SPOTS,
        spotId
    }
}

const addSpot = (spot) => {
    return {
        type: ADD_SPOTS,
        spot
    }
}


// Thunks
export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    const data = await response.json();
    dispatch(loadSpots(data.spots));
}

export const createSpot = (spot) => async (dispatch) => {
    const response = await fetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });
    const data = await response.json();
    dispatch(addSpot(data.spot));
}

export const updateSpot = (spot) => async (dispatch) => {
    const response = await fetch('/api/spots', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });
    const data = await response.json();
    dispatch(editSpots(data.spot));
}

export const removeSpot = (spotId) => async (dispatch) => {
    await fetch('/api/spots', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spot_id: spotId })
    });
    dispatch(deleteSpots(spotId));
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const spots = {};
            action.spots.forEach(spot => {
                spots[spot.id] = spot;
            });
            return { ...state, ...spots };
        case ADD_SPOTS:
            return { ...state, [action.spot.id]: action.spot };
        case EDIT_SPOTS:
            return { ...state, [action.spot.id]: action.spot };
        case DELETE_SPOTS:
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
