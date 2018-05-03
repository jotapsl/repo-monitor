import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { loadAuthState, saveAuthState } from './localStorage';

const persistedState = { auth: loadAuthState() };
const middleware = applyMiddleware(thunk, createLogger());

const store = createStore(rootReducer, persistedState, middleware);

store.subscribe(() => {
    if (!store.getState().auth.fetching)
        saveAuthState(store.getState());
});

export default store;