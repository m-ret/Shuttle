import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  searchParam: '',
  passengerCardId: null,
  pickupPassengerCardId: null,
  pickupTabColor: '#3DA7DC',
  dropOffTabColor: '#ff5252',
  unassignedPickUpPassengers: [],
  unassignedDropOffPassengers: [],
  isAddToMyPassengersSuccess: false,
  navigation: {
    index: 0,
    routes: [
      { key: '0', title: 'Drop-Off', routeName: 'DropOffAllPassengers' },
      { key: '1', title: 'Pick up', routeName: 'PickupHome' },
    ],
  },
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

  [ActionTypes.PASSENGERS_CARD_ID](state, action) {
    return {
      ...state,
      passengerCardId: action.payload.passengerCardId,
    };
  },

  [ActionTypes.PICKUP_PASSENGER_CARD_ID](state, action) {
    return {
      ...state,
      pickupPassengerCardId: action.payload.pickupPassengerCardId,
    };
  },

  [ActionTypes.SEARCH_PARAM](state, action) {
    return {
      ...state,
      searchParam: action.payload.searchParam,
    };
  },

  [ActionTypes.ADD_TO_MY_PASSENGERS_SUCCESS](state, action) {
    return {
      ...state,
      isAddToMyPassengersSuccess: action.payload.isAddToMyPassengersSuccess,
    };
  },

  [ActionTypes.UNASSIGNED_DROP_OFF_PASSENGERS](state, action) {
    return {
      ...state,
      ...state.passengerCardId,
      unassignedDropOffPassengers: action.payload.unassignedDropOffPassengers,
    };
  },

  [ActionTypes.UNASSIGNED_PICKUP_PASSENGERS](state, action) {
    return {
      ...state,
      unassignedPickUpPassengers: action.payload.unassignedPickUpPassengers,
    };
  },
};

export default createReducer(initialState, handlers);
