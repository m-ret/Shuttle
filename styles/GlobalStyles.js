import { StyleSheet } from 'react-native';

const mainColor = '#ff5252';
const white = '#ffffff';

const globalStyles = StyleSheet.create({
  CenterContent: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  BtnTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
  },

  EmptyView: { height: 38 },

  ConfirmActionBg: {
    backgroundColor: '#263238',
  },

  RegularStylesContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  ContainerWithHorizontalPadding: {
    flex: 1,
    paddingHorizontal: 20,
  },

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
    height: 36,
    display: 'flex',
    borderRadius: 2,
    flexBasis: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-around',
  },

  stretchContent: {
    flex: 1,
    color: white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  Loader: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  ButtonWithBorderOnly: {
    borderWidth: 1,
    color: '#474350',
    borderColor: '#474350',
    backgroundColor: '#FFFFFF',
  },

  ButtonDarkBg: {
    borderWidth: 1,
    color: '#FFFFFF',
    borderColor: '#474350',
    backgroundColor: '#474350',
  },
});

export default globalStyles;
