import { StyleSheet } from 'react-native';
import globalStyles from './GlobalStyles';

const signingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  companyName: {
    letterSpacing: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  welcomeShuttleTitle: {
    fontSize: 40,
    fontFamily: 'montserratBold',
    letterSpacing: 0,
  },
  welcomeServiceTitle: {
    fontSize: 40,
    fontFamily: 'montserratBold',
    letterSpacing: 2,
  },
  welcomeImage: {
    resizeMode: 'contain',
    marginVertical: 30,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray',
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    flex: 1,
    fontSize: 30,
  },
  labelFontRegular: {
    fontFamily: 'montserratRegular',
  },
  labelFontSemibold: {
    fontFamily: 'montserratSemibold',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 30,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    borderRadius: 2,
  },
  loginButtonDisabled: {
    backgroundColor: 'lightgray',
  },
  loginButton: {
    backgroundColor: globalStyles.mainColorBackground.backgroundColor,
  },
  loginText: {
    color: 'white',
  },
  hint: {
    marginTop: 15,
  },
});

export default signingStyles;
