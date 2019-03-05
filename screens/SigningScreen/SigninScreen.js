import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SigninSubmitButton from '../../components/SigninScreen/SubmitButton';
import FormInputs from '../../components/SigninScreen/Inputs';
import TopComponent from '../../components/SigninScreen/TopComponent';
import globalStyles from '../../styles/GlobalStyles';
import signingStyles from '../../styles/SigningScreenStyles';
import FetchLoginData from '../../APICalls/FetchLoginData';
import { setUserTokenAction } from './actions/signinScreen';

class SigninScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = { username: '', password: '' };

  signInAsync = () => {
    const { username, password } = this.state;
    const { navigation, userTokenActionHandler } = this.props;
    FetchLoginData(username, password, navigation, userTokenActionHandler);
  };

  render() {
    const { username, password } = this.state;

    return (
      <View style={globalStyles.container}>
        <TopComponent />

        <View style={signingStyles.formContainer}>
          <FormInputs
            onChangeText={user => this.setState({ username: user })}
            labelText="User Name"
            inputLength={username.length}
          />

          <FormInputs
            onChangeText={pass => this.setState({ password: pass })}
            secureTextEntry
            labelText="Password"
            inputLength={password.length}
          />

          <View style={signingStyles.buttonWrapper}>
            <SigninSubmitButton
              style={[
                signingStyles.buttonContainer,
                username.length && password.length
                  ? signingStyles.loginButton
                  : signingStyles.loginButtonDisabled,
              ]}
              signInAsync={this.signInAsync}
              disabledProp={username.length && password.length}
            />
          </View>
        </View>
      </View>
    );
  }
}

SigninScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  userTokenActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      userToken: store.signinScreen.userToken,
    }),
    dispatch => ({
      userTokenActionHandler: token => {
        dispatch(setUserTokenAction(token));
      },
    }),
  ),
)(SigninScreen);
