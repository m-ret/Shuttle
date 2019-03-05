import ActionTypes from '../constants/ActionTypes';

export const popupsModalsAction = () => ({
  type: ActionTypes.TOGGLE_ALL_PASSENGERS_MODAL,
});

export const confirmationPopupAction = () => ({
  type: ActionTypes.TOGGLE_CONFIRMATION_POPUP,
});

export const editPassengerModalAction = () => ({
  type: ActionTypes.TOGGLE_EDIT_PASSENGER_MODAL,
});
