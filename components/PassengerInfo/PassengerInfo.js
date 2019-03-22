import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PassengersStyles from '../../styles/Passengers';
import Colors from '../../constants/Colors';

import momentDateFormatter from '../../utils/DateFormatter';

const PassengersInfo = ({
  name,
  address,
  onPress,
  btnStyle,
  datetime,
  callModal,
  buttonText,
  cardinalpoint,
  isBtnDisabled,
  navigationStore,
}) => {
  return (
    <View style={{ marginBottom: 38 }}>
      <View style={PassengersStyles.CTileListItem}>
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
                {momentDateFormatter(datetime)}
              </Text>
            </Text>
          </View>

          <View style={PassengersStyles.CArticleTileFooter}>
            <TouchableOpacity
              onPress={onPress}
              style={btnStyle}
              disabled={isBtnDisabled}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

PassengersInfo.defaultProps = {
  isBtnDisabled: false,
};

PassengersInfo.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  isBtnDisabled: PropTypes.oneOfType([PropTypes.bool]),
  name: PropTypes.oneOfType([PropTypes.string]).isRequired,
  onPress: PropTypes.oneOfType([PropTypes.func]).isRequired,
  address: PropTypes.oneOfType([PropTypes.string]).isRequired,
  callModal: PropTypes.oneOfType([PropTypes.func]).isRequired,
  datetime: PropTypes.oneOfType([PropTypes.string]).isRequired,
  buttonText: PropTypes.oneOfType([PropTypes.string]).isRequired,
  cardinalpoint: PropTypes.oneOfType([PropTypes.string]).isRequired,
  btnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default compose(
  connect(store => ({
    navigationStore: store.homeScreen.navigation,
    passengersGoingTo: store.homeScreen.passengersGoingTo,
  })),
)(PassengersInfo);
