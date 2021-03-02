import { csrfFetch } from './csrf';

const CREATE_NEW_SQUAD = 'squads/createNewSquad';
const FIND_SQUAD = 'squads/findSquad';

export const newSquad = (squad) => ({
    type: CREATE_NEW_SQUAD,
    squad,
});

export const getSquad = (squad) => ({
    type: FIND_SQUAD,
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
    dispatch(newSquad(data));
    return data;
};

export const findSquad = (squadId) => async (dispatch) => {
    const formattedId = parseInt(squadId, 10);
    const res = await csrfFetch('/api/squads', {
        method: 'PUT',
        body: JSON.stringify({ formattedId }),
    });

    const squad = await res.json();
    dispatch(getSquad(squad));
    // return squad;
};

const userSquadReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_NEW_SQUAD:
            return action.squad;
        case FIND_SQUAD:
            return action.squad;
        default:
            return state;
    }
};

export default userSquadReducer;
