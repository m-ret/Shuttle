import createReducer from '../../../redux/createReducer';
import ActionTypes from '../constants/ActionTypes';

const initialState = {
  screenName: '',
  searchParam: '',
  passengerInfo: {},
  toggleSearch: false,
  passengerCardId: null,
  passengersGoingTo: '',
  myPassengerCardId: null,
  pickupTabColor: '#3DA7DC',
  dropOffTabColor: '#ff5252',
  pickupPassengerCardId: null,
  myPassengerCardIdPickUp: null,
  unassignedPickUpPassengers: [],
  unassignedDropOffPassengers: [],
  isAddToMyPassengersSuccess: false,
  passengerSuccessfullyEdited: false,
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

  [ActionTypes.PASSENGER_GOING_TO](state, action) {
    return {
      ...state,
      passengersGoingTo: action.payload.passengersGoingTo,
    };
  },

  [ActionTypes.PASSENGER_SUCCESSFULLY_EDITED](state) {
    return {
      ...state,
      passengerSuccessfullyEdited: !state.passengerSuccessfullyEdited,
    };
  },

  [ActionTypes.SCREEN_NAME](state, action) {
    return {
      ...state,
      screenName: action.payload.screenName,
    };
  },

  [ActionTypes.SEARCH_PARAM](state, action) {
    return {
      ...state,
      searchParam: action.payload.searchParam,
    };
  },

  [ActionTypes.TOGGLE_SEARCH](state) {
    return {
      ...state,
      toggleSearch: !state.toggleSearch,
    };
  },

  [ActionTypes.PASSENGER_INFO](state, action) {
    return {
      ...state,
      passengerInfo: action.payload.passengerInfo,
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

  [ActionTypes.DELETE_PASSENGER_SUCCESS](state, action) {
    return {
      ...state,
      isDeletePassengerSuccess: action.payload.isDeletePassengerSuccess,
    };
  },

  [ActionTypes.UNASSIGNED_PICKUP_PASSENGERS](state, action) {
    return {
      ...state,
      unassignedPickUpPassengers: action.payload.unassignedPickUpPassengers,
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
};

export default createReducer(initialState, handlers);
