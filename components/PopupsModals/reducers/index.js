import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  toggleCardOptionsModal: false,
  passengerInfo: {},
};

const handlers = {
  [ActionTypes.TOGGLE_ALL_PASSENGERS_MODAL](state, action) {
    return {
      ...state,
      toggleCardOptionsModal: !state.toggleCardOptionsModal,
      passengerInfo: action.payload.passengerInfo,
    };
  },
};

export default createReducer(initialState, handlers);
