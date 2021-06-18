/**
 * Create the store with dynamic reducers
 */
import { setAutoFreeze } from 'immer';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createReducer from './createReducers';
import rootSaga from './saga';

setAutoFreeze(false);

export function configureStore(initialState = {}) {
  let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const reduxSagaMonitorOptions = {};

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const rootReducer = createReducer();

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers),
  );
  
  sagaMiddleware.run(rootSaga);

  return store;
}

const store = configureStore();
const persistor = persistStore(store);

export { store, persistor };


