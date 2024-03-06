// Redux
import { createStore } from 'redux';

// Reducer
import { rootReducer } from './reducers';

// Store
const store = createStore(rootReducer);

// Types
type RootReducerType = typeof rootReducer;
export type StateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsType<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;

export default store;
