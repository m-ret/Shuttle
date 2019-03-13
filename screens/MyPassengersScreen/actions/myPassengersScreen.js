import ActionTypes from '../constants/ActionTypes';

export const assignedPassengersDataAction = assignedPassengersData => ({
  type: ActionTypes.MY_PASSENGERS_DATA,
  payload: { assignedPassengersData },
});

export const dropOffPickUpConfirmationSuccessAction = dropOffPickUpConfirmationSuccess => ({
  type: ActionTypes.DROPOFF_PICKUP_CONFIRMATION,
  payload: { dropOffPickUpConfirmationSuccess },
});
