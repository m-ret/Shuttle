import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import { has } from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PassengersStyles from '../../styles/Passengers';
import Colors from '../../constants/Colors';
import globalStyles from '../../styles/GlobalStyles';
import PassengersAdded from './PassengersAdded';

class PassengersInfo extends Component {
  state = { successResponse: false };

  handleAddToMyPassengers = async () => {
    const { id } = this.props;
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch(
        'http://34.235.222.72/public/api/addToMyPassengers',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        },
      );
      const responseJson = await response.json();
      if (has(responseJson, 'error')) {
        Alert.alert('Error', 'Unable to process your request at this time.');
      } else {
        this.setState({ successResponse: responseJson });
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error with your request, please try again later.',
      );
    }
  };

  render() {
    const {
      cardinalpoint,
      name,
      address,
      datetime,
      navigationStore,
      callModal,
    } = this.props;
    const { successResponse } = this.state;
    return (
      <View>
        {successResponse && successResponse.success && <PassengersAdded />}
        <View style={{ height: 30 }} />
        <View>
          <View className="c-tile-list" style={PassengersStyles.CTileList}>
            <View
              className="c-tile-list__item"
              style={PassengersStyles.CTileListItem}
            >
              <View>
                <View style={PassengersStyles.CArticleTileHeader}>
                  <View style={PassengersStyles.CardinalPointWrapper}>
                    <Text style={PassengersStyles.CArticleTileCategory}>
                      {cardinalpoint}
                    </Text>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={{ paddingHorizontal: 10 }}
                      onPress={callModal}
                    >
                      <View>
                        <Ionicons name="md-more" color="#979797" size={24} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={PassengersStyles.CArticleTileBody}>
                  <Text
                    style={[
                      PassengersStyles.NameOfClient,
                      {
                        color: navigationStore.index
                          ? Colors.pickupTabColor
                          : Colors.dropOffTabColor,
                      },
                    ]}
                  >
                    {name}
                  </Text>
                  <Text style={PassengersStyles.Address}>{address}</Text>
                  <Text style={PassengersStyles.RequestedTimeText}>
                    Requested at{' '}
                    <Text style={PassengersStyles.RequestedTime}>
                      {datetime}
                    </Text>
                  </Text>
                </View>

                <View style={PassengersStyles.CArticleTileFooter}>
                  <TouchableOpacity
                    onPress={this.handleAddToMyPassengers}
                    style={[
                      globalStyles.touchableBtnDropOffItem,
                      {
                        backgroundColor: navigationStore.index
                          ? Colors.pickupTabColor
                          : Colors.dropOffTabColor,
                      },
                    ]}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      ADD TO MY PASSENGERS
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

PassengersInfo.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  cardinalpoint: PropTypes.oneOfType([PropTypes.string]).isRequired,
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
  name: PropTypes.oneOfType([PropTypes.string]).isRequired,
  address: PropTypes.oneOfType([PropTypes.string]).isRequired,
  datetime: PropTypes.oneOfType([PropTypes.string]).isRequired,
  callModal: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default compose(
  connect(store => ({
    navigationStore: store.homeScreen.navigation,
  })),
)(PassengersInfo);
