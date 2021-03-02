import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import gamesReducer from './games';
import gameReducer from './game';
import orderReducer from './order';
import userSquadsReducer from './userSquads';
import searchReducer from './search';
import userReducer from './user';
import allSquadsReducer from './allSquads';

const rootReducer = combineReducers({
    session: sessionReducer,
    games: gamesReducer,
    game: gameReducer,
    order: orderReducer,
    userSquads: userSquadsReducer,
    allSquads: allSquadsReducer,
    search: searchReducer,
    userProfile: userReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
