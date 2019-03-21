import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  pushNotificationData: {},
};

const handlers = {
  [ActionTypes.PUSH_NOTIFICATION_DATA](state, action) {
    return {
      ...state,
      pushNotificationData: action.payload.pushNotificationData,
    };
  },
};

export default createReducer(initialState, handlers);
