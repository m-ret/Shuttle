import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  assignedPassengersData: [],
  dropOffPickUpConfirmationSuccess: false,
};

const handlers = {
  [ActionTypes.MY_PASSENGERS_DATA](state, action) {
    return {
      ...state,
      assignedPassengersData: action.payload.assignedPassengersData,
    };
  },

  [ActionTypes.MY_PASSENGERS_CARD_ID](state, action) {
    return {
      ...state,
      myPassengerCardId: action.payload.myPassengerCardId,
    };
  },

  [ActionTypes.DROPOFF_PICKUP_CONFIRMATION](state, action) {
    return {
      ...state,
      dropOffPickUpConfirmationSuccess:
        action.payload.dropOffPickUpConfirmationSuccess,
    };
  },

  [ActionTypes.MY_PASSENGERS_CARD_ID_PICKUP](state, action) {
    return {
      ...state,
      myPassengerCardIdPickUp: action.payload.myPassengerCardIdPickUp,
    };
  },
};

export default createReducer(initialState, handlers);
