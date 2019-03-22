import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  passengersByCardinalPointData: [],
};

const handlers = {
  [ActionTypes.PASSENGER_BY_CARDINAL_POINT](state, action) {
    return {
      ...state,
      passengersByCardinalPointData:
        action.payload.passengersByCardinalPointData,
    };
  },
};

export default createReducer(initialState, handlers);
