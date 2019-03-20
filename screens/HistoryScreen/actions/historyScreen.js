import ActionTypes from '../constants/ActionTypes';

export const minDateAction = minDate => ({
  type: ActionTypes.MIN_DATE,
  payload: { minDate },
});

export const maxDateAction = maxDate => ({
  type: ActionTypes.MAX_DATE,
  payload: { maxDate },
});

export const historyDataAction = historyData => ({
  type: ActionTypes.HISTORY_DATA,
  payload: { historyData },
});

export const historyNavigationAction = index => ({
  type: ActionTypes.HISTORY_NAVIGATION,
  payload: { index },
});
