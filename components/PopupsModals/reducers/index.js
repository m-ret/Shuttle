import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  addPassengerData: {},
  newAddressFromGoogle: {},
  confirmationPopup: false,
  editPassengerModal: false,
  cancelPassengerEdit: false,
  toggleCardOptionsModal: false,
  toggleGooglePlacesInput: false,
  toggleAddPassengerModal: false,
};

const handlers = {
  [ActionTypes.TOGGLE_ADD_PASSENGER_MODAL](state) {
    return {
      ...state,
      toggleAddPassengerModal: !state.toggleAddPassengerModal,
    };
  },

  [ActionTypes.ADD_PASSENGER_DATA](state, action) {
    return {
      ...state,
      addPassengerData: action.payload.addPassengerData,
    };
  },
  [ActionTypes.TOGGLE_CONFIRMATION_POPUP](state) {
    return {
      ...state,
      confirmationPopup: !state.confirmationPopup,
    };
  },

  [ActionTypes.TOGGLE_ALL_PASSENGERS_MODAL](state) {
    return {
      ...state,
      toggleCardOptionsModal: !state.toggleCardOptionsModal,
    };
  },

  [ActionTypes.TOGGLE_EDIT_PASSENGER_MODAL](state) {
    return {
      ...state,
      editPassengerModal: !state.editPassengerModal,
    };
  },

  [ActionTypes.CANCEL_PASSENGER_EDIT_ACTION](state) {
    return {
      ...state,
      cancelPassengerEdit: !state.cancelPassengerEdit,
    };
  },

  [ActionTypes.TOGGLE_GOOGLE_PLACES_INPUT](state) {
    return {
      ...state,
      toggleGooglePlacesInput: !state.toggleGooglePlacesInput,
    };
  },

  [ActionTypes.NEW_ADDRESS_FROM_GOOGLE](state, action) {
    return {
      ...state,
      newAddressFromGoogle: action.payload.newAddressFromGoogle,
    };
  },
};

export default createReducer(initialState, handlers);
