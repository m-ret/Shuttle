import { StyleSheet } from 'react-native';
import globalStyles from './GlobalStyles';
import Colors from '../constants/Colors';

const tabViewStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(250, 250, 250, 0.5)',
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
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {
    marginTop: 20,
    borderRadius: 2,
    marginHorizontal: 10,
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
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabArrowContent: {
    width: 15,
    height: 15,
    marginTop: 35,
    transform: [{ rotateZ: '45deg' }],
  },
  tabTitle: {
    color: Colors.whiteColor,
    fontFamily: 'montserratBold',
  },
});

export default tabViewStyles;
