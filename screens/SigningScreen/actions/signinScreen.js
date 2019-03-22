import ActionTypes from '../constants/ActionTypes';

export const setUserTokenAction = userToken => ({
  type: ActionTypes.SET_USER_TOKEN,
  payload: { userToken },
});

export const removeUserTokenAction = () => ({
  type: ActionTypes.REMOVE_USER_TOKEN,
});
