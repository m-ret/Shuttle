import React from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

import moment from 'moment';

import HistoryScreenStyles from '../../styles/HistoryScreenStyles';

const HistoryPassengerCard = ({
  info,
  index,
  pickUpOrDropOffTime,
  pickUpOrDropOffText,
}) => (
  <View style={HistoryScreenStyles.Container}>
    <View style={HistoryScreenStyles.NameTextWrapper}>
      <Text style={HistoryScreenStyles.NameText}>{index + 1}. </Text>
      <Text style={HistoryScreenStyles.NameText}>{info.name}</Text>
    </View>
    <View style={HistoryScreenStyles.ContentPadding}>
      <View>
        <Text style={HistoryScreenStyles.LightGreytext}>
          {info.dropoffaddress}
        </Text>
      </View>
      <View>
        <Text style={HistoryScreenStyles.LightGreytext}>{info.phone}</Text>
      </View>
      <View style={HistoryScreenStyles.Times}>
        <Text style={HistoryScreenStyles.Greytext}>
          Requested: {moment(info.timestamp).format('HH:mm')}
        </Text>
        <Text style={HistoryScreenStyles.Greytext}>
          {pickUpOrDropOffText}: {moment(pickUpOrDropOffTime).format('HH:mm')}
        </Text>
      </View>
      <View>
        <Text style={HistoryScreenStyles.Greytext}>
          {info.dropoff ? 'Drop-Off' : 'No Drop-Off'}
        </Text>
        <Text style={HistoryScreenStyles.Greytext}>
          {info.pickup ? 'Pick up' : 'No Pick up'}
        </Text>
      </View>
    </View>
  </View>
);

HistoryPassengerCard.defaultProps = {
  pickUpOrDropOffText: '',
  pickUpOrDropOffTime: '',
};

HistoryPassengerCard.propTypes = {
  index: PropTypes.oneOfType([PropTypes.number]).isRequired,
  info: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  pickUpOrDropOffTime: PropTypes.oneOfType([PropTypes.string]),
  pickUpOrDropOffText: PropTypes.oneOfType([PropTypes.string]),
};

export default HistoryPassengerCard;
