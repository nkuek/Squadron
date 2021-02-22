const API_KEY = process.env.REACT_APP_API_KEY_RAWG;

const GET_GAMES = 'games/getGames';

export const getGames = (games) => ({
    type: GET_GAMES,
    games,
});

export const loadGames = (count = 1) => async (dispatch) => {
    const apiRes = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&${count}`
    );
    const apiData = await apiRes.json();
    const gameData = apiData.results.map((game) => {
        return {
            name: game.name,
            image: game.background_image,
            genres: game.genres.map((genre) => genre.name),
        };
    });

    dispatch(getGames(gameData));
};

const gamesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_GAMES:
            return { ...state, ...action.games };
        default:
            return state;
    }
};

export default gamesReducer;
