import { StyleSheet } from 'react-native';

const mainColor = '#ff5252';
const white = '#ffffff';

const globalStyles = StyleSheet.create({
  container: {
    padding: 30,
  },
  mainColorBackground: {
    backgroundColor: mainColor,
  },
  mainColorFont: {
    color: mainColor,
  },
  whiteColor: {
    color: white,
    backgroundColor: white,
  },
  fontWhite: {
    color: white,
  },
  regularFontFamily: {
    fontFamily: 'montserratRegular',
  },
  semiBoldFontFamily: {
    fontFamily: 'montserratSemibold',
  },
  boldFontFamily: {
    fontFamily: 'montserratBold',
  },
  touchableBtnDropOffItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-around',
    height: 36,
    borderRadius: 2,
    flexBasis: '47%',
  },
  stretchContent: {
    flex: 1,
    color: white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default globalStyles;
