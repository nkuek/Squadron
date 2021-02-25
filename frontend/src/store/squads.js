import { csrfFetch } from './csrf';

const CREATE_NEW_SQUAD = 'squads/createNewSquad';

export const newSquad = (squadInformation) => ({
    type: CREATE_NEW_SQUAD,
    squadInformation,
});

export const createNewSquad = (squadInformation) => async (dispatch) => {
    const {
        squadName,
        description,
        primaryType,
        secondaryType,
        captainId,
    } = squadInformation;

    const res = await csrfFetch('/api/squads', {
        method: 'POST',
        body: JSON.stringify({
            squadName,
            description,
            primaryType,
            secondaryType,
        }),
    });

    const data = await res.json();
    dispatch(newSquad(data));
};

const squadReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_NEW_SQUAD:
            return action.squadInformation;
        default:
            return state;
    }
};

export default squadReducer;
