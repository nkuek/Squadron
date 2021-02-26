import { csrfFetch } from '../store/csrf';

const FIND_GAME = 'game/findGame';

export const findGame = (game) => ({
    type: FIND_GAME,
    game,
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

const gameReducer = (state = {}, action) => {
    switch (action.type) {
        case FIND_GAME:
            return action.game;
        default:
            return state;
    }
};

export default gameReducer;
