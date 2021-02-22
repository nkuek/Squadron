import { csrfFetch } from './csrf';

const API_KEY = process.env.REACT_APP_API_KEY_RAWG;

const GET_GAMES = 'games/getGames';

export const getGames = (games) => ({
    type: GET_GAMES,
    games,
});

export const loadGames = () => async (dispatch) => {
    const res = await fetch(`https://api.rawg.io/api/games?${API_KEY}`, {});
    const data = await res.json();
    dispatch(getGames(data.results));
};

const gamesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_GAMES:
            newState = Object.assign({}, state);
            newState = action.games;
            return newState;
        default:
            return state;
    }
};

export default gamesReducer;
