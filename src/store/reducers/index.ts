import { combineReducers } from 'redux';

// Reducers
import TodoReducer from './todo';

export const rootReducer = combineReducers({
  todo: TodoReducer,
});
