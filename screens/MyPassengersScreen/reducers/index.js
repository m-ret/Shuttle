import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  assignedPassengersData: [],
};

const handlers = {
  [ActionTypes.MY_PASSENGERS_DATA](state, action) {
    return {
      ...state,
      assignedPassengersData: action.payload.assignedPassengersData,
    };
  },
};

export default createReducer(initialState, handlers);
