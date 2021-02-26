import { csrfFetch } from './csrf';

const FIND_USER = 'users/findUser';

export const getUser = (user) => ({
    type: FIND_USER,
    user,
});

export const findUser = (username) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'PUT',
        body: JSON.stringify({ username }),
    });

    const user = res.json();
    dispatch(getUser(user));
    return user;
};

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case FIND_USER:
            return action.user;
        default:
            return state;
    }
};

export default userReducer;
