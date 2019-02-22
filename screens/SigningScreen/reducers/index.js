import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  userToken: null,
};

const handlers = {
  [ActionTypes.SET_USER_TOKEN](state, action) {
    return {
      ...state,
      userToken: action.payload.userToken,
    };
  },

  [ActionTypes.REMOVE_USER_TOKEN](state, action) {
    return {
      ...state,
      userToken: null,
    };
  },
};

export default createReducer(initialState, handlers);
