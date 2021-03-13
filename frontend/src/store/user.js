import { csrfFetch } from './csrf';

const FIND_USER = 'users/findUser';
const EDIT_USER = 'users/editUser';
const JOIN_SQUAD = 'users/joinSquad';
const ADD_GAME = 'users/addGame';
const REMOVE_USER = 'users/removeUser';

export const getUser = (user) => ({
    type: FIND_USER,
    user,
});

export const editAbout = (newAbout) => ({
    type: EDIT_USER,
    newAbout,
});

export const findUser = (username) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'PUT',
        body: JSON.stringify({ username }),
    });
    const user = await res.json();
    dispatch(getUser(user));
    return user;
};

export const joinSquad = (newSquadsList) => ({
    type: JOIN_SQUAD,
    newSquadsList,
});

export const newGame = (userGames) => ({
    type: ADD_GAME,
    userGames,
});

export const removeUser = () => ({
    type: REMOVE_USER,
});

export const editUserAbout = (newAbout) => async (dispatch) => {
    const res = await csrfFetch('/api/users/:user/about', {
        method: 'PUT',
        body: JSON.stringify({ newAbout }),
    });

    const updatedUser = await res.json();
    dispatch(editAbout(updatedUser.description));
};

export const joinNewSquad = (squadId, userId) => async (dispatch) => {
    const res = await csrfFetch('/api/squads/join', {
        method: 'POST',
        body: JSON.stringify({ squadId, userId }),
    });

    const data = await res.json();
    dispatch(joinSquad(data));
};

export const addGame = (userId, gameName) => async (dispatch) => {
    const res = await csrfFetch('/api/games', {
        method: 'PUT',
        body: JSON.stringify({ userId, gameName }),
    });

    const userGames = await res.json();
    dispatch(newGame(userGames));
    return userGames;
};

export const logOutUser = () => async (dispatch) => {
    dispatch(removeUser());
};

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case FIND_USER:
            return action.user;
        case EDIT_USER:
            return { ...state, description: action.newAbout };
        case JOIN_SQUAD:
            return { ...state, squadmates: [...action.newSquadsList] };
        case ADD_GAME:
            return { ...state, usergames: [...action.userGames] };
        case REMOVE_USER:
            const resetState = {};
            state = resetState;
            return state;
        default:
            return state;
    }
};

export default userReducer;
