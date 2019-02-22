import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';
import { filter } from 'lodash';

const initialState = {
  navigation: {
    index: 0,
    routes: [
      { key: '0', title: 'Drop-Off', routeName: 'DropOffAllPassengers' },
      { key: '1', title: 'Pick up', routeName: 'PickupHome' },
    ],
  },
  passengersData: [],
  searchParam: '',
};

const handlers = {
  [ActionTypes.INDEX_ROUTE](state, action) {
    return {
      ...state,
      navigation: {
        ...state.navigation,
        index: action.payload.index,
      },
    };
  },

  [ActionTypes.PASSENGERS_DATA](state, action) {
    return {
      ...state,
      passengersData: action.payload.passengersData,
    };
  },

  [ActionTypes.SEARCH_PARAM](state, action) {
    return {
      ...state,
      searchParam: action.payload.searchParam,
    };
  },
};

export default createReducer(initialState, handlers);
