import { csrfFetch } from './csrf';
const GET_ALL_SQUADS = 'squads/getAllSquads';

export const getAllSquads = (allSquads) => ({
    type: GET_ALL_SQUADS,
    allSquads,
});

export const findAllSquads = () => async (dispatch) => {
    const res = await csrfFetch('/api/squads/');
    const squads = await res.json();
    dispatch(getAllSquads(squads));
    return squads;
};

const allSquadsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_SQUADS:
            return action.allSquads;
        default:
            return state;
    }
};

export default allSquadsReducer;
