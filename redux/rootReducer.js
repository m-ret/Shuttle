import { combineReducers } from 'redux';

// HomeScreen reducer
import homeScreen from '../screens/HomeScreen/reducers';

// SigninScreen reducer
import signinScreen from '../screens/SigningScreen/reducers';

// Popups and Modals reducer
import popupsModals from '../components/PopupsModals/reducers';

// Passenger By Cardinal Point reducer
import passengersByCardinalPoint from '../screens/PassengersByCardinalPoint/reducers';

const rootReducer = combineReducers({
  homeScreen,
  popupsModals,
  signinScreen,
  passengersByCardinalPoint,
});

export default rootReducer;
