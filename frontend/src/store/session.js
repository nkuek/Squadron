import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    user,
});

export const removeUser = () => ({
    type: REMOVE_USER,
});

export const loginUser = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });

    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
};

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
};

export const signUpUser = (user) => async (dispatch) => {
    const { username, email, password, confirmPassword } = user;
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword,
        }),
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
};

export const logoutUser = () => async (dispatch) => {
    await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
