import { csrfFetch } from '../store/csrf';
const API_KEY = process.env.REACT_APP_API_KEY_RAWG;

const GET_GAMES = 'games/getGames';
const FIND_GAME = 'games/findGame';
const REMOVE_GAME_STATE = 'games/removeGameState';
const ORDER_GAMES = 'games/orderGames';

export const getGames = (games) => ({
    type: GET_GAMES,
    games,
});

export const findGame = (game) => ({
    type: FIND_GAME,
    game,
});

export const removeGameState = () => ({
    type: REMOVE_GAME_STATE,
});

export const gameOrder = (order) => ({
    type: ORDER_GAMES,
    order,
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
        };
    });

    dispatch(getGames(games));
};

export const findGames = (gameName) => async (dispatch) => {
    const res = await csrfFetch('/api/games', {
        method: 'POST',
        body: JSON.stringify({ name: gameName }),
    });
    const game = await res.json();
    dispatch(findGame(game));
};

export const resetGameState = () => async (dispatch) => {
    dispatch(removeGameState());
};

export const setGameOrder = (order) => async (dispatch) => {
    dispatch(gameOrder(order));
};
// export const findGames = (gameName) => async (dispatch) => {
//     const searchParam = gameName.split(' ').join('%');
//     const apiRes = await fetch(
//         `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchParam}&search_exact=true`
//     );
//     const apiData = await apiRes.json();
//     const results = apiData.results[0];
//     const gameInformation = {
//         name: results.name,
//         genres: results.genres.map((genre) => genre.name),
//         metacritic: results.metacritic,
//         rating: results.rating,
//         image: results.background_image,
//         platforms: results.platforms.map((platform) => platform.name),
//         released: results.released,
//     };

//     dispatch(findGame(gameInformation));
// };

const gamesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_GAMES:
            return { ...state, ...action, ...action.games };

        case FIND_GAME:
            return { ...state, ...action, game: action.game };
        case REMOVE_GAME_STATE:
            return { ...state, ...action, game: null };
        case ORDER_GAMES:
            return {
                ...state,
                ...action.games,
                ...action.order,
                ...action.game,
            };
        default:
            return state;
    }
};

export default gamesReducer;
