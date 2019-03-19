import ActionTypes from '../constants/ActionTypes';

export const historyDataAction = historyData => ({
  type: ActionTypes.HISTORY_DATA,
  payload: { historyData },
});

export const historyNavigationAction = index => ({
  type: ActionTypes.HISTORY_NAVIGATION,
  payload: { index },
});
