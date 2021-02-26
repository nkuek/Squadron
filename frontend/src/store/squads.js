import { csrfFetch } from './csrf';

const CREATE_NEW_SQUAD = 'squads/createNewSquad';
const FIND_SQUADS = 'squads/findSquads';

export const newSquad = (squad) => ({
    type: CREATE_NEW_SQUAD,
    squad,
});

export const findSquads = (squads) => ({
    type: FIND_SQUADS,
    squads,
});

export const createNewSquad = (squad) => async (dispatch) => {
    const {
        squadName,
        description,
        primaryType,
        secondaryType,
        captainId,
    } = squad;

    const res = await csrfFetch('/api/squads', {
        method: 'POST',
        body: JSON.stringify({
            squadName,
            description,
            primaryType,
            secondaryType,
            captainId,
        }),
    });

    const data = await res.json();
    dispatch(newSquad(data));
    return data;
};

export const findUserSquads = (username) => async (dispatch) => {
    const res = await csrfFetch('/api/users/squads', {
        method: 'PUT',
        body: JSON.stringify({ username }),
    });
    const squads = await res.json();
    console.log(squads);
    dispatch(findSquads(squads));
    return squads;
};

const squadReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_NEW_SQUAD:
            return action.squad;
        case FIND_SQUADS:
            return { ...state, ...action.squads };
        default:
            return state;
    }
};

export default squadReducer;
