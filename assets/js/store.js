import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {   
    middlewares.push(createLogger());
}

const middleware = applyMiddleware(...middlewares);

const store = createStore(rootReducer, middleware);

export default store;