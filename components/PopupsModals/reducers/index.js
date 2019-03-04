import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  passengerInfo: {},
  confirmationPopup: false,
  toggleCardOptionsModal: false,
};

const handlers = {
  [ActionTypes.TOGGLE_ALL_PASSENGERS_MODAL](state, action) {
    return {
      ...state,
      toggleCardOptionsModal: !state.toggleCardOptionsModal,
      passengerInfo: action.payload.passengerInfo,
    };
  },

  [ActionTypes.TOGGLE_CONFIRMATION_POPUP](state) {
    return {
      ...state,
      confirmationPopup: !state.confirmationPopup,
    };
  },
};

export default createReducer(initialState, handlers);
