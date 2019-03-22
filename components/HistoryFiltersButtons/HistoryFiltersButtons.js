import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PassengersStyles from '../../styles/Passengers';
import globalStyles from '../../styles/GlobalStyles';

import DateRangePicker from '../../utils/DateRangePicker';

import {
  minDateAction,
  maxDateAction,
} from '../../screens/HistoryScreen/actions/historyScreen';

class HistoryFiltersButtons extends Component {
  state = { toggleCalendar: false };

  handleOnSucess = (minDate, maxDate) => {
    const { toggleCalendar } = this.state;
    const { minDateActionHandler, maxDateActionHandler } = this.props;
    minDateActionHandler(minDate);
    maxDateActionHandler(maxDate);

    return this.setState({ toggleCalendar: !toggleCalendar });
  };

  handleSeeLatest = () => {
    const { toggleCalendar } = this.state;
    const { minDateActionHandler, maxDateActionHandler } = this.props;
    minDateActionHandler('');
    maxDateActionHandler('');

    if (toggleCalendar) {
      this.setState({ toggleCalendar: false });
    }
  };

  handleToggleCalendar = () => {
    const { toggleCalendar } = this.state;

    return this.setState({ toggleCalendar: !toggleCalendar });
  };

  render() {
    const { toggleCalendar } = this.state;
    return (
      <View>
        <View>
          <Text style={globalStyles.HistoryScreenTitle}>HISTORY</Text>
        </View>
        <View style={globalStyles.stretchContent}>
          <TouchableOpacity
            onPress={this.handleToggleCalendar}
            style={[
              globalStyles.touchableBtnDropOffItem,
              globalStyles.ButtonWithBorderOnly,
              { marginTop: 20 },
            ]}
          >
            <Text style={[PassengersStyles.ButtonTextIconMargin]}>
              SELECT DATE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleSeeLatest}
            style={[
              globalStyles.touchableBtnDropOffItem,
              globalStyles.ButtonDarkBg,
              { marginTop: 20 },
            ]}
          >
            <Text
              style={[
                globalStyles.fontWhite,
                PassengersStyles.ButtonTextIconMargin,
              ]}
            >
              SEE LATEST
            </Text>
          </TouchableOpacity>
        </View>
        {toggleCalendar && (
          <View style={{ paddingVertical: 20 }}>
            <DateRangePicker
              onSuccess={(minDate, maxDate) =>
                this.handleOnSucess(minDate, maxDate)
              }
              initialRange={['', '']}
              theme={{ markColor: '#263238', markTextColor: 'white' }}
            />
          </View>
        )}
      </View>
    );
  }
}

HistoryFiltersButtons.propTypes = {
  minDateActionHandler: PropTypes.func.isRequired,
  maxDateActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      historyData: store.historyScreen.historyData,
      historyNavigation: store.historyScreen.historyNavigation,
    }),
    dispatch => ({
      minDateActionHandler: minDate => {
        dispatch(minDateAction(minDate));
      },
      maxDateActionHandler: maxDate => {
        dispatch(maxDateAction(maxDate));
      },
    }),
  ),
)(HistoryFiltersButtons);
