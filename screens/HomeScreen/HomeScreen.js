import React, { Component } from 'react';
import { has } from 'lodash';
import { Alert } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabView from '../../components/DropOffPickUpTabs/TabView';

import styles from '../../styles/HomeScreenStyles';
import { passengersDataAction } from './actions/homeScreen';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.GetPassengersData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userToken !== this.props.userToken) {
      this.GetPassengersData();
    }
  }

  GetPassengersData = async () => {
    const { passengersDataActionHandler, userToken } = this.props;
    if (userToken && userToken !== null) {
      try {
        const response = await fetch(
          'http://34.235.222.72/public/api/getPassengers',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const responseJson = await response.json();
        if (has(responseJson, 'error')) {
          Alert.alert(
            'Error',
            'There was an error trying to fetch the data. Please try again later.',
          );
        } else {
          passengersDataActionHandler(responseJson.success.data);
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'There was an error with your request, please try again later.',
        );
      }
    }
  };

  render() {
    return <TabView style={styles.container} />;
  }
}

HomeScreen.defaultProps = {
  userToken: null,
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  passengersDataActionHandler: PropTypes.func.isRequired,
  userToken: PropTypes.oneOfType([PropTypes.string]),
};

export default compose(
  connect(
    store => ({
      userToken: store.signinScreen.userToken,
      passengersData: store.homeScreen.passengersData,
    }),
    dispatch => ({
      passengersDataActionHandler: token => {
        dispatch(passengersDataAction(token));
      },
    }),
  ),
)(HomeScreen);
