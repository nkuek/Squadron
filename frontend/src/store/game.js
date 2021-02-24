import { csrfFetch } from '../store/csrf';

const FIND_GAME = 'game/findGame';
const REMOVE_GAME_STATE = 'game/removeGameState';

export const findGame = (game) => ({
    type: FIND_GAME,
    game,
});

export const removeGameState = () => ({
    type: REMOVE_GAME_STATE,
});

export const findGames = (gameName) => async (dispatch) => {
    const res = await csrfFetch('/api/games', {
        method: 'POST',
        body: JSON.stringify({ name: gameName }),
    });
    const game = await res.json();
    dispatch(findGame(game));
    return game;
};

export const resetGameState = () => async (dispatch) => {
    dispatch(removeGameState());
};

const gameReducer = (state = {}, action) => {
    switch (action.type) {
        case FIND_GAME:
            return action.game;
        case REMOVE_GAME_STATE:
            state = {};
            return state;
        default:
            return state;
    }
};

export default gameReducer;
