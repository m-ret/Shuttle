import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  historyData: [],
  historyNavigation: {
    index: 0,
    routes: [
      { key: '0', title: 'Drop-Off', routeName: 'HistoryList' },
      { key: '1', title: 'Pick up', routeName: 'HistoryListPickup' },
    ],
  },
};

const handlers = {
  [ActionTypes.HISTORY_DATA](state, action) {
    return {
      ...state,
      historyData: action.payload.historyData,
    };
  },

  [ActionTypes.HISTORY_NAVIGATION](state, action) {
    return {
      ...state,
      historyNavigation: {
        ...state.historyNavigation,
        index: action.payload.index,
      },
    };
  },
};

export default createReducer(initialState, handlers);
