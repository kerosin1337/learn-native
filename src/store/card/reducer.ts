import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';
import api from '../../api';

export const getCards = createAsyncThunk(
  'card/get',
  async (
    payload: {page: number},
    {dispatch, rejectWithValue, fulfillWithValue, getState},
  ) => {
    if (payload.page === 1) {
      dispatch(setIsLoading(true));
    }
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
        dispatch(setIsLoading(false));
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

export const refreshCard = createAsyncThunk(
  'card/refresh',
  async (payload, {dispatch, rejectWithValue, fulfillWithValue, getState}) => {
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
      }>('cards', {params: {page: 1}})
      .then(response => {
        if (response.data.data.length) {
          dispatch(setCards({data: response.data.data, refresh: true}));
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
  isLoadingPage: boolean;
  isLoading: boolean;
  isLast: boolean;
  page: number;
  refresh: boolean;
} = {
  cards: [],
  isLoadingPage: false,
  isLoading: false,
  isLast: false,
  page: 1,
  refresh: false,
};

export const cardReducer = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action) => {
      if (action.payload?.refresh) {
        state.cards = action.payload.data;
      } else {
        state.cards = [...state.cards, ...action.payload];
      }
    },
    setPage: (state, action) => {
      state.page = state.page + 1;
    },
    setLast: (state, action) => {
      state.isLast = true;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [getCards.fulfilled.toString()]: (state, action) => {
      console.log('fulfilled get cards');
      state.isLoadingPage = false;
    },
    [getCards.pending.toString()]: (state, action) => {
      console.log('pending get cards');
      if (!state.isLast) {
        state.isLoadingPage = true;
      }
    },
    [getCards.rejected.toString()]: (state, action) => {
      console.log('rejected get cards');
    },
    [refreshCard.fulfilled.toString()]: (state, action) => {
      console.log('fulfilled refreshCard');
      state.refresh = false;
    },
    [refreshCard.pending.toString()]: (state, action) => {
      console.log('pending refreshCard');
      state.refresh = true;
    },
    [refreshCard.rejected.toString()]: (state, action) => {
      console.log('rejected refreshCard');
      state.refresh = false;
    },
  },
});
export const {setCards, setPage, setLast, setIsLoading} = cardReducer.actions;
