import produce from 'immer';

import * as constants from './constants';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const persistConfig = {
    key: 'login',
    storage: AsyncStorage,
    whitelist: ['accessToken'],
    debounce: 3000,
  };


export const initialState = {
    accessToken: '',
};

const reducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
        case constants.LOGIN:
            break;
        case constants.LOGIN_SUCCESS:
            newState.accessToken = action.payload;
        break;
            case constants.LOGIN_FAILED:
        break;
    }
  });

  export default persistReducer(persistConfig, reducer);