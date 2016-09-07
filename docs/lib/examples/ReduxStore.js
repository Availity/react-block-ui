import { applyMiddleware, createStore, combineReducers } from 'redux';
import { BlockUiMiddleware } from 'react-block-ui/redux';
//import reducers from './reducers';
const reducers = {actions: (state = [], payload) => [payload, ...state]};

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(BlockUiMiddleware)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
