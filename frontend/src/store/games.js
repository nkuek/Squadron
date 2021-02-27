const API_KEY = process.env.REACT_APP_API_KEY_RAWG;

const GET_GAMES = 'games/getGames';
const REMOVE_GAME_STATE = 'games/removeGameState';

export const getGames = (games) => ({
    type: GET_GAMES,
    games,
});

export const removeGameState = () => ({
    type: REMOVE_GAME_STATE,
});

// export const loadGames = (ordering) => async (dispatch) => {
//     const res = await csrfFetch('/api/games', {
//         method: 'PUT',
//         body: JSON.stringify({ order: ordering }),
//     });
//     const games = await res.json();
//     dispatch(getGames(games));
// };

export const loadGames = (ordering) => async (dispatch) => {
    const apiRes = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&metacritic=80,100&ordering=${ordering}`
    );
    const apiData = await apiRes.json();
    const results = apiData.results;
    const games = results.map((game) => {
        return {
            name: game.name,
            image: game.background_image,
            metacritic: game.metacritic,
            genres: game.genres.map((genre) => genre.name),
        };
    });
    dispatch(getGames(games));
};

export const resetGameState = () => async (dispatch) => {
    dispatch(removeGameState());
};

const gamesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_GAMES:
            newState = Object.assign({}, state);
            newState = { ...state, ...action.games };
            return newState;

        default:
            return state;
    }
};

export default gamesReducer;
