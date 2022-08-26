import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api';

export const getCards = createAsyncThunk(
  'card/get',
  async (
    payload: {page: number},
    {dispatch, rejectWithValue, fulfillWithValue, getState},
  ) => {
    return await api
      .get<{
        data: {
          title: string;
          description?: string;
          status: string;
          user: {
            email: string;
            firstname: string;
            id: string;
            lastname: string;
          };
        }[];
        pageLimit: number;
        totalItems: number;
      }>('cards', {params: {page: payload.page}})
      .then(response => {
        if (response.data.data.length) {
          dispatch(setCards(response.data.data));
          dispatch(setPage(null));
        } else {
          dispatch(setLast(true));
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  },
);

const initialState: {
  cards: {
    title: string;
    description?: string;
    status: string;
    user: {email: string; firstname: string; id: string; lastname: string};
  }[];
  isLoading: boolean;
  isLast: boolean;
  page: number;
} = {cards: [], isLoading: false, isLast: false, page: 1};

export const cardReducer = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = [...state.cards, ...action.payload];
    },
    setPage: (state, action) => {
      state.page = state.page + 1;
    },
    setLast: (state, action) => {
      state.isLast = true;
    },
  },
  extraReducers: {
    [getCards.fulfilled.toString()]: (state, action) => {
      console.log('fulfilled get cards');
      state.isLoading = false;

      // state.cards = [...state.cards, ...action.payload.data];
      // ...state,
      // cards: state.cards.concat(action.payload.data),
    },
    [getCards.pending.toString()]: (state, action) => {
      console.log('pending get cards');
      if (!state.isLast) {
        state.isLoading = true;
      }
    },
    [getCards.rejected.toString()]: (state, action) => {
      console.log('rejected get cards');
      state.isLoading = false;
    },
  },
});
export const {setCards, setPage, setLast} = cardReducer.actions;
