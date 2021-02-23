const API_KEY = process.env.REACT_APP_API_KEY_RAWG;

const GET_GAMES = 'games/getGames';
const FIND_GAME = 'games/findGame';

export const getGames = (games) => ({
    type: GET_GAMES,
    games,
});

export const findGame = (game) => ({
    type: FIND_GAME,
    game,
});

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
            next: apiData.next,
            metacritic: game.metacritic,
        };
    });

    dispatch(getGames(games));
};

export const findGames = (game) => async (dispatch) => {
    const searchParam = game.split(' ').join('%');
    const apiRes = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchParam}&search_exact=true`
    );
    const apiData = await apiRes.json();
    const results = apiData.results[0];
    const gameInformation = {
        name: results.name,
        genres: results.genres.map((genre) => genre.name),
        metacritic: results.metacritic,
        rating: results.rating,
        image: results.background_image,
        platforms: results.platforms.map((platform) => platform.name),
        released: results.released,
    };

    dispatch(findGame(gameInformation));
};

const gamesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_GAMES:
            return { ...state, ...action.games };

        case FIND_GAME:
            return { ...state, ...action.games, game: action.game };
        default:
            return state;
    }
};

export default gamesReducer;
