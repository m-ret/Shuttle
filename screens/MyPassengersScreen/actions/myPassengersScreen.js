import ActionTypes from '../constants/ActionTypes';

export const myPassengerCardIdAction = myPassengerCardId => ({
  type: ActionTypes.MY_PASSENGERS_CARD_ID,
  payload: { myPassengerCardId },
});

export const assignedPassengersDataAction = assignedPassengersData => ({
  type: ActionTypes.MY_PASSENGERS_DATA,
  payload: { assignedPassengersData },
});

export const myPassengerCardIdPickUpAction = myPassengerCardIdPickUp => ({
  type: ActionTypes.MY_PASSENGERS_CARD_ID_PICKUP,
  payload: { myPassengerCardIdPickUp },
});

export const dropOffPickUpConfirmationSuccessAction = dropOffPickUpConfirmationSuccess => ({
  type: ActionTypes.DROPOFF_PICKUP_CONFIRMATION,
  payload: { dropOffPickUpConfirmationSuccess },
});
