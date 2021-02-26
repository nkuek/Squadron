import { csrfFetch } from './csrf';

const CREATE_NEW_SQUAD = 'squads/createNewSquad';
const FIND_USER_SQUADS = 'squads/findMySquads';

export const newSquad = (squad) => ({
    type: CREATE_NEW_SQUAD,
    squad,
});

export const findSquads = (squads) => ({
    type: FIND_USER_SQUADS,
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

export const findMySquads = (userId) => async (dispatch) => {
    const res = await csrfFetch('/api/squads/mysquads', {
        method: 'PUT',
        body: JSON.stringify({ userId }),
    });
    const squads = await res.json();
    dispatch(findSquads(squads));
    return squads;
};

const squadReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_NEW_SQUAD:
            return action.squad;
        case FIND_USER_SQUADS:
            const userSquads = action.squads.map((squad) =>
                squad.Squads.map((Squad) => Squad.squadName)
            );
            return { ...state, userSquads };
        default:
            return state;
    }
};

export default squadReducer;
