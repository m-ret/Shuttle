import { Alert, AsyncStorage } from 'react-native';
import { has } from 'lodash';
import PropTypes from 'prop-types';

const FetchLoginData = async (
  username,
  password,
  navigation,
  userTokenActionHandler,
) => {
  try {
    const response = await fetch(
      'http://34.235.222.72/public/api/driverlogin',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      },
    );
    const responseJson = await response.json();
    if (has(responseJson, 'error')) {
      Alert.alert('Error', 'Please check your credentials.');
    } else {
      await AsyncStorage.setItem('userToken', responseJson.success.token);
      userTokenActionHandler(responseJson.success.token);
      navigation.navigate('App');
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your request, please try again later.',
    );
  }
};

FetchLoginData.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  userTokenActionHandler: PropTypes.func.isRequired,
};

export default FetchLoginData;
