import { combineReducers } from 'redux';

// HomeScreen reducer
import homeScreen from '../screens/HomeScreen/reducers';

// SigninScreen reducer
import signinScreen from '../screens/SigningScreen/reducers';

// Popups and Modals reducer
import popupsModals from '../components/PopupsModals/reducers';

const rootReducer = combineReducers({
  homeScreen,
  signinScreen,
  popupsModals,
});

export default rootReducer;
