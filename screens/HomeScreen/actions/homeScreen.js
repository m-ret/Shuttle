import ActionTypes from '../constants/ActionTypes';

export const toggleSearchAction = () => ({
  type: ActionTypes.TOGGLE_SEARCH,
});

export const indexRouteAction = index => ({
  type: ActionTypes.INDEX_ROUTE,
  payload: { index },
});

export const searchParamAction = searchParam => ({
  type: ActionTypes.SEARCH_PARAM,
  payload: { searchParam },
});

export const passengerCardIdAction = passengerCardId => ({
  type: ActionTypes.PASSENGERS_CARD_ID,
  payload: { passengerCardId },
});

export const pickupPassengerCardIdAction = pickupPassengerCardId => ({
  type: ActionTypes.PICKUP_PASSENGER_CARD_ID,
  payload: { pickupPassengerCardId },
});

export const isAddToMyPassengersSuccessAction = isAddToMyPassengersSuccess => ({
  type: ActionTypes.ADD_TO_MY_PASSENGERS_SUCCESS,
  payload: { isAddToMyPassengersSuccess },
});

export const unassignedPickUpPassengersAction = unassignedPickUpPassengers => ({
  type: ActionTypes.UNASSIGNED_PICKUP_PASSENGERS,
  payload: { unassignedPickUpPassengers },
});

export const unassignedDropOffPassengersAction = unassignedDropOffPassengers => ({
  type: ActionTypes.UNASSIGNED_DROP_OFF_PASSENGERS,
  payload: { unassignedDropOffPassengers },
});
