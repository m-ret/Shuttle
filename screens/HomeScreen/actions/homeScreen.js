import ActionTypes from '../constants/ActionTypes';

export const toggleSearchAction = () => ({
  type: ActionTypes.TOGGLE_SEARCH,
});

export const indexRouteAction = index => ({
  type: ActionTypes.INDEX_ROUTE,
  payload: { index },
});

export const screenNameAction = screenName => ({
  type: ActionTypes.SCREEN_NAME,
  payload: { screenName },
});

export const searchParamAction = searchParam => ({
  type: ActionTypes.SEARCH_PARAM,
  payload: { searchParam },
});

export const passengerNameAction = passengerName => ({
  type: ActionTypes.PASSENGER_NAME,
  payload: { passengerName },
});

export const passengerSuccessfullyEditedAction = () => ({
  type: ActionTypes.PASSENGER_SUCCESSFULLY_EDITED,
});

export const holdPassengerInfoAction = passengerInfo => ({
  type: ActionTypes.PASSENGER_INFO,
  payload: { passengerInfo },
});

export const passengerCardIdAction = passengerCardId => ({
  type: ActionTypes.PASSENGERS_CARD_ID,
  payload: { passengerCardId },
});

export const passengersGoingToAction = passengersGoingTo => ({
  type: ActionTypes.PASSENGER_GOING_TO,
  payload: { passengersGoingTo },
});

export const pickupPassengerNameAction = pickupPassengerName => ({
  type: ActionTypes.PICKUP_PASSENGER_NAME,
  payload: { pickupPassengerName },
});

export const pickupPassengerCardIdAction = pickupPassengerCardId => ({
  type: ActionTypes.PICKUP_PASSENGER_CARD_ID,
  payload: { pickupPassengerCardId },
});

export const isDeletePassengerSuccessAction = isDeletePassengerSuccess => ({
  type: ActionTypes.DELETE_PASSENGER_SUCCESS,
  payload: { isDeletePassengerSuccess },
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
