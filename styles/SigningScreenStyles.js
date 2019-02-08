import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeShuttleTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  welcomeServiceTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  welcomeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
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
    borderBottomWidth: 2,
    borderBottomColor: '#D3D3D3',
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
    backgroundColor: 'red',
  },
  loginText: {
    color: 'white',
  },
});
