import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  confirmationPopup: false,
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
};

export default createReducer(initialState, handlers);
