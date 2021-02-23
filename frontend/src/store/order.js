const ORDER_GAMES = 'order/orderGames';

export const gameOrder = (order) => ({
    type: ORDER_GAMES,
    order,
});

export const setGameOrder = (order) => async (dispatch) => {
    dispatch(gameOrder(order));
};

const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_GAMES:
            return {
                ...state,
                order: action.order,
            };
        default:
            return state;
    }
};

export default orderReducer;
