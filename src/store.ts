import { configureStore, Store } from '@reduxjs/toolkit';
import { counterReducer } from './Counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { counterSaga } from './Counter/counterSaga';
import { itunesSaga } from './itunes/itunesSaga';
import { itunesReducer } from './itunes/itunesSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    itunes: itunesReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(function* () {
  yield all([counterSaga(), itunesSaga()]);
});

type GetStoreState<S> = S extends Store<infer State, any> ? State : unknown;

export type StoreState = GetStoreState<typeof store>;
