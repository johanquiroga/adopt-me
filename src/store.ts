import { createStore } from 'redux';
import { StateType } from 'typesafe-actions';

import reducer from './reducers';

const store = createStore(
  reducer,
  typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f,
);

export type AppState = StateType<
  ReturnType<typeof import('./reducers').default>
>;

export default store;
