import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import globalStyles from './GlobalStyles';
import Colors from '../constants/Colors';

const tabViewStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
  },
  onWhite: {
    color: globalStyles.whiteColor.color,
    backgroundColor: globalStyles.whiteColor.backgroundColor,
  },
  bolderFont: {
    fontFamily: 'montserratBold',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
  },
  tabStyle: {
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 2,
  },
  tabStyle_0_disabled: {
    backgroundColor: Colors.tabIconDefault,
  },
  tabStyle_1_disabled: {
    backgroundColor: Colors.tabIconDefaultPickup,
  },
  tabStyle_0: {
    backgroundColor: Colors.dropOffTabColor,
  },
  tabStyle_1: {
    backgroundColor: Colors.pickupTabColor,
  },
  tabArrowWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 0,
  },
  tabArrowContent: {
    transform: [{ rotateZ: '45deg' }],
    width: 15,
    height: 15,
    marginTop: 35,
  },
  tabTitle: {
    color: Colors.whiteColor,
    fontFamily: 'montserratBold',
  },
});

export default tabViewStyles;
