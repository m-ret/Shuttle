import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SigninSubmitButton from '../../components/SigninScreen/SubmitButton';
import FormInputs from '../../components/SigninScreen/Inputs';
import TopComponent from '../../components/SigninScreen/TopComponent';
import globalStyles from '../../styles/GlobalStyles';
import signingStyles from '../../styles/SigningScreenStyles';
import FetchLoginData from '../../APICalls/FetchLoginData';
import { setUserTokenAction } from './actions/signinScreen';

class SigninScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = { username: '', password: '' };

  signInAsync = () => {
    const { username, password } = this.state;
    const { navigation, userTokenActionHandler } = this.props;
    return FetchLoginData(
      username,
      password,
      navigation,
      userTokenActionHandler,
    );
  };

  render() {
    const { username, password } = this.state;

    return (
      <ScrollView style={globalStyles.container}>
        <TopComponent />

        <View style={signingStyles.formContainer}>
          <FormInputs
            onChangeText={username => this.setState({ username })}
            labelText="User Name"
            inputLength={username.length}
          />

          <FormInputs
            onChangeText={password => this.setState({ password })}
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
      </ScrollView>
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
