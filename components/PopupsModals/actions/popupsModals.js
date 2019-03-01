import ActionTypes from '../constants/ActionTypes';

export const popupsModalsAction = passengerInfo => ({
  type: ActionTypes.TOGGLE_ALL_PASSENGERS_MODAL,
  payload: { passengerInfo },
});
