import ActionTypes from '../constants/ActionTypes';

export const pushNotificationDataAction = pushNotificationData => ({
  type: ActionTypes.PUSH_NOTIFICATION_DATA,
  payload: { pushNotificationData },
});
