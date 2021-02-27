const API_KEY = process.env.REACT_APP_API_KEY_RAWG;
const page1Url = `https://api.rawg.io/api/games?key=${API_KEY}&metacritic=80,100&ordering=`;

const GET_GAMES = 'games/getGames';
const GET_MORE_GAMES = 'games/getMoreGames';

export const getGames = (games) => ({
    type: GET_GAMES,
    games,
});

export const getMoreGames = (moreGames) => ({
    type: GET_MORE_GAMES,
    moreGames,
});

// export const loadGames = (ordering) => async (dispatch) => {
//     const res = await csrfFetch('/api/games', {
//         method: 'PUT',
//         body: JSON.stringify({ order: ordering }),
//     });
//     const games = await res.json();
//     dispatch(getGames(games));
// };

export const loadGames = (ordering, url = page1Url) => async (dispatch) => {
    const apiRes = await fetch(url + ordering);
    const apiData = await apiRes.json();
    const results = apiData.results;

    const games = results.map((game) => {
        return {
            name: game.name,
            image: game.background_image,
            metacritic: game.metacritic,
            genres: game.genres.map((genre) => genre.name),
            next: apiData.next,
        };
    });
    dispatch(getGames(games));
};

export const moreGames = (url) => async (dispatch) => {
    const apiRes = await fetch(url);
    const apiData = await apiRes.json();
    const results = apiData.results;

    const games = results.map((game) => {
        return {
            name: game.name,
            image: game.background_image,
            metacritic: game.metacritic,
            genres: game.genres.map((genre) => genre.name),
            next: apiData.next,
        };
    });
    dispatch(getMoreGames(games));
};

const gamesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_GAMES:
            return { ...state, games: [...action.games] };

        case GET_MORE_GAMES:
            return { ...state, games: [...state.games, ...action.moreGames] };

        default:
            return state;
    }
};

export default gamesReducer;
