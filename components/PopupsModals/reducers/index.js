import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  confirmationPopup: false,
  editPassengerModal: false,
  toggleCardOptionsModal: false,
};

const handlers = {
  [ActionTypes.TOGGLE_ALL_PASSENGERS_MODAL](state) {
    return {
      ...state,
      toggleCardOptionsModal: !state.toggleCardOptionsModal,
    };
  },

  [ActionTypes.TOGGLE_CONFIRMATION_POPUP](state) {
    return {
      ...state,
      confirmationPopup: !state.confirmationPopup,
    };
  },

  [ActionTypes.TOGGLE_EDIT_PASSENGER_MODAL](state) {
    return {
      ...state,
      editPassengerModal: !state.editPassengerModal,
    };
  },
};

export default createReducer(initialState, handlers);
