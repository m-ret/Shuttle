import ActionTypes from '../constants/ActionTypes';

export const indexRouteAction = index => ({
  type: ActionTypes.INDEX_ROUTE,
  payload: { index },
});

export const passengersDataAction = passengersData => ({
  type: ActionTypes.PASSENGERS_DATA,
  payload: { passengersData },
});

export const searchParamAction = searchParam => ({
  type: ActionTypes.SEARCH_PARAM,
  payload: { searchParam },
});
