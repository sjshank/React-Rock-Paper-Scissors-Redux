import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import gameReducer from './reducers/gameReducer';

const store = createStore(gameReducer, compose(applyMiddleware(thunk)));

export default store;