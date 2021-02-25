import { csrfFetch } from './csrf';

const CREATE_NEW_SQUAD = 'squads/createNewSquad';

export const newSquad = (squad) => ({
    type: CREATE_NEW_SQUAD,
    squad,
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
    console.log(data);
    dispatch(newSquad(data));
    return res;
};

const squadReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_NEW_SQUAD:
            return action.squad;
        default:
            return state;
    }
};

export default squadReducer;
