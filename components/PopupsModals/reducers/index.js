import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  allPassengersDropOffOptionsPopup: false,
};

const handlers = {
  [ActionTypes.TOGGLE_ALL_PASSENGERS_MODAL](state) {
    return {
      ...state,
      allPassengersDropOffOptionsPopup: !state.allPassengersDropOffOptionsPopup,
    };
  },
};

export default createReducer(initialState, handlers);
