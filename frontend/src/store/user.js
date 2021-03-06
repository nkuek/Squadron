import { csrfFetch } from './csrf';

const FIND_USER = 'users/findUser';
const EDIT_USER = 'users/editUser';

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

export const editUserAbout = (newAbout) => async (dispatch) => {
    const res = await csrfFetch('/api/users/:user/about', {
        method: 'PUT',
        body: JSON.stringify({ newAbout }),
    });

    const updatedUser = await res.json();
    dispatch(editAbout(updatedUser.description));
};

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case FIND_USER:
            return action.user;
        case EDIT_USER:
            return { ...state, description: action.newAbout };
        default:
            return state;
    }
};

export default userReducer;
