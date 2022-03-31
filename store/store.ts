import {combineReducers, applyMiddleware, createStore} from 'redux';

import thunkMiddleware from 'redux-thunk';
import { weatherReducer } from '../src/weather/store/weather.store';

const rootReducer = combineReducers({
  weather: weatherReducer,
});
const middleWareEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleWareEnhancer);
export default store;
