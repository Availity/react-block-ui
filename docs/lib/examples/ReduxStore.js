import { applyMiddleware, createStore, combineReducers } from 'redux';
import reduxMiddleware from 'react-block-ui/reduxMiddleware';
//import reducers from './reducers';
const reducers = {actions: (state = [], payload) => [payload, ...state]};

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(reduxMiddleware)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
