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

export const toggleGooglePlacesInputAction = () => ({
  type: ActionTypes.TOGGLE_GOOGLE_PLACES_INPUT,
});

export const newAddressFromGoogleAction = newAddressFromGoogle => ({
  type: ActionTypes.NEW_ADDRESS_FROM_GOOGLE,
  payload: { newAddressFromGoogle },
});

export const editPassengerDataAction = editPassengerData => ({
  type: ActionTypes.EDIT_PASSENGER_DATA,
  payload: { editPassengerData },
});
