import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: {
  user?:
    | {email: string; firstname: string; id: string; lastname: string}
    | undefined;
  accessToken?: string;
  isLoading: boolean;
  isLoadingCurrent: boolean;
  validMessage?: {[key: string]: string};
  incorrectMessage?: string;
} = {
  user: undefined,
  accessToken: undefined,
  isLoading: false,
  isLoadingCurrent: true,
};

export const signIn = createAsyncThunk(
  'user/signIn',
  async (
    payload: {body: {email: string; password: string}; nav: any},
    {dispatch, rejectWithValue},
  ) => {
    await api
      .post('users/sign-in', payload.body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async response => {
        dispatch(setUser(response.data.user));
        dispatch(setAccessToken(response.data.accessToken));
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        dispatch(
          payload.nav.reset({
            index: 0,
            routes: [{name: 'Main'}],
          }),
        );
      })
      .catch(error => {
        error = error.response.data;
        if (error.statusCode === 422) {
          const newMessage: {[key: string]: string} = {};
          for (const key of error.message) {
            newMessage[key.property] = key.code;
          }
          dispatch(setValidMessage(newMessage));
        }
        if (error.statusCode === 404) {
          dispatch(setIncorrectMessage(error.message));
        }
      });
  },
);

export const currentUser = createAsyncThunk(
  'user/currentUser',
  async (nav: any, {dispatch, rejectWithValue, fulfillWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        return await api
          .get('users/current')
          .then(response => {
            nav.reset({
              index: 0,
              routes: [{name: 'Main'}],
            });
            return fulfillWithValue(response.data);
          })
          .catch(error => {
            return rejectWithValue(
              error?.response?.data || {message: 'Сервер недоступен.'},
            );
            // setMessage(error.response.data);
          });
      } else {
        return rejectWithValue(null);
      }
    } catch (e) {
      return rejectWithValue(null);
    }
  },
);

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setValidMessage: (state, action) => {
      state.validMessage = action.payload;
    },
    setIncorrectMessage: (state, action) => {
      state.incorrectMessage = action.payload;
    },
    setLoadingCurrent: (state, action) => {
      state.isLoadingCurrent = action.payload;
    },
    currentUser: (state, action) => {
      api
        .get('users/current', {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        })
        .then(response => {
          state.user = response.data;
        })
        .catch(error => {
          console.log(error.response);
          // setMessage(error.response.data);
        });
    },
    logout: state => {
      return {...state, ...initialState};
    },
  },
  extraReducers: {
    [signIn.fulfilled.toString()]: (state, action) => {
      state.isLoading = false;
    },
    [signIn.pending.toString()]: (state, action) => {
      state.isLoading = true;
    },
    [signIn.rejected.toString()]: (state, action) => {
      state.isLoading = false;
    },
    [currentUser.fulfilled.toString()]: (state, action) => {
      console.log('fulfilled');
      state.isLoadingCurrent = false;
      state.user = action.payload;
    },
    [currentUser.pending.toString()]: (state, action) => {
      console.log('pending');
      state.isLoadingCurrent = true;
    },
    [currentUser.rejected.toString()]: (state, action) => {
      state.isLoadingCurrent = false;
      state.user = undefined;
      state.accessToken = '';
    },
  },
});

export const {
  setUser,
  setAccessToken,
  logout,
  setValidMessage,
  setIncorrectMessage,
  setLoadingCurrent,
} = userReducer.actions;
