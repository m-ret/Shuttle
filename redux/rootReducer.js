import { combineReducers } from 'redux';

// HomeScreen reducer
import homeScreen from '../screens/HomeScreen/reducers';

// SigninScreen reducer
import signinScreen from '../screens/SigningScreen/reducers';

// Popups and Modals reducer
import popupsModals from '../components/PopupsModals/reducers';

// Passenger By Cardinal Point reducer
import passengersByCardinalPoint from '../screens/PassengersByCardinalPoint/reducers';

// My Assigned Passengers reducer
import myPassengersScreen from '../screens/MyPassengersScreen/reducers';

const rootReducer = combineReducers({
  homeScreen,
  popupsModals,
  signinScreen,
  myPassengersScreen,
  passengersByCardinalPoint,
});

export default rootReducer;
