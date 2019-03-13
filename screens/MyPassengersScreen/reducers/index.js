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

  [ActionTypes.DROPOFF_PICKUP_CONFIRMATION](state, action) {
    return {
      ...state,
      dropOffPickUpConfirmationSuccess:
        action.payload.dropOffPickUpConfirmationSuccess,
    };
  },
};

export default createReducer(initialState, handlers);
