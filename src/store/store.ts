import {combineReducers} from 'redux';
import {userReducer} from './user/reducer';
import {configureStore} from '@reduxjs/toolkit';
import {RootState} from '@reduxjs/toolkit/dist/query/core/apiState';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {cardReducer} from './card/reducer';

export const rootReducer = combineReducers({
  user: userReducer.reducer,
  card: cardReducer.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
