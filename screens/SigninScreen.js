import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, View } from 'react-native';
import SigninSubmitButton from '../components/SigninScreen/SubmitButton';
import SigningInputs from '../components/SigninScreen/Inputs';
import TopComponent from '../components/SigninScreen/TopComponent';
import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/SigningScreenStyles';

export default class SigninScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = { username: '', password: '' };

  signInAsync = async () => {
    const { navigation } = this.props;
    await AsyncStorage.setItem('userToken', 'abc');
    navigation.navigate('App');
  };

  render() {
    const { username, password } = this.state;

    return (
      <View style={globalStyles.container}>
        <TopComponent />

        <View style={styles.formContainer}>
          <SigningInputs
            onChangeText={user => this.setState({ username: user })}
            labelText="User Name"
            inputLength={username.length}
          />

          <SigningInputs
            onChangeText={pass => this.setState({ password: pass })}
            secureTextEntry
            labelText="Password"
            inputLength={password.length}
          />

          <View style={styles.buttonWrapper}>
            <SigninSubmitButton
              style={[
                styles.buttonContainer,
                username.length && password.length
                  ? styles.loginButton
                  : styles.loginButtonDisabled,
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
};
