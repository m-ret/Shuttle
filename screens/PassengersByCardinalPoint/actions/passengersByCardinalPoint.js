import ActionTypes from '../constants/ActionTypes';

export const passengersByCardinalPointDataAction = passengersByCardinalPointData => ({
  type: ActionTypes.PASSENGER_BY_CARDINAL_POINT,
  payload: { passengersByCardinalPointData },
});
