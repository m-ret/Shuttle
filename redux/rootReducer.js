import { combineReducers } from 'redux';

// HomeScreen reducer
import homeScreen from '../screens/HomeScreen/reducers';

// SigninScreen reducer
import signinScreen from '../screens/SigningScreen/reducers';

// Popups and Modals reducer
import popupsModals from '../components/PopupsModals/reducers';

// History reducer
import historyScreen from '../screens/HistoryScreen/reducers';

// My Assigned Passengers reducer
import myPassengersScreen from '../screens/MyPassengersScreen/reducers';

// Passenger By Cardinal Point reducer
import passengersByCardinalPoint from '../screens/PassengersByCardinalPoint/reducers';

const rootReducer = combineReducers({
  homeScreen,
  popupsModals,
  signinScreen,
  historyScreen,
  myPassengersScreen,
  passengersByCardinalPoint,
});

export default rootReducer;
