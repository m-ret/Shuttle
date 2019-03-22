import { combineReducers } from 'redux';

// HomeScreen reducer
import homeScreen from '../screens/HomeScreen/reducers';

// SigninScreen reducer
import signinScreen from '../screens/SigningScreen/reducers';

// History reducer
import historyScreen from '../screens/HistoryScreen/reducers';

// Just a Global Store
import globalStore from '../screens/GlobalStoreRedux/reducers';

// Popups and Modals reducer
import popupsModals from '../components/PopupsModals/reducers';

// My Assigned Passengers reducer
import myPassengersScreen from '../screens/MyPassengersScreen/reducers';

// Passenger By Cardinal Point reducer
import passengersByCardinalPoint from '../screens/PassengersByCardinalPoint/reducers';

const rootReducer = combineReducers({
  homeScreen,
  globalStore,
  popupsModals,
  signinScreen,
  historyScreen,
  myPassengersScreen,
  passengersByCardinalPoint,
});

export default rootReducer;
