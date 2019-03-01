import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { WebBrowser } from 'expo';
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from '../../styles/PopupsModals';
import { popupsModalsAction } from './actions/popupsModals';

class AllPassengersOptionsModal extends Component {
  _handlePressSlack = () => {
    WebBrowser.openBrowserAsync('https://slack.expo.io');
  };

  render() {
    const {
      handleCallOptionsModal,
      handleDeleteOptionsModal,
      popupsModalsActionHandler,
    } = this.props;
    return (
      <>
        <View style={styles.Container}>
          <TouchableOpacity
            style={styles.Option}
            background={TouchableOpacity.Ripple('#ccc', false)}
            onPress={handleCallOptionsModal}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionIconContainer}>
                <View>
                  <Ionicons name="md-call" size={24} />
                </View>
              </View>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Call</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            background={TouchableOpacity.Ripple('#ccc', false)}
            style={styles.Option}
            onPress={this._handlePressSlack}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionIconContainer}>
                <MaterialCommunityIcons name="account-edit" size={24} />
              </View>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Edit</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            background={TouchableOpacity.Ripple('#ccc', false)}
            style={styles.Option}
            onPress={handleDeleteOptionsModal}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionIconContainer}>
                <MaterialIcons name="delete-forever" size={24} />
              </View>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Delete</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            background={TouchableOpacity.Ripple('#ccc', false)}
            style={[styles.Option, styles.LastOption]}
            onPress={() => popupsModalsActionHandler({})}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionIconContainer}>
                <MaterialIcons name="cancel" size={24} />
              </View>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Cancel</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

AllPassengersOptionsModal.defaultProps = {
  handleCallOptionsModal: null,
};

AllPassengersOptionsModal.propTypes = {
  handleCallOptionsModal: PropTypes.func,
  handleDeleteOptionsModal: PropTypes.func.isRequired,
  popupsModalsActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default compose(
  connect(
    store => ({
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
    }),
    dispatch => ({
      popupsModalsActionHandler: data => {
        dispatch(popupsModalsAction(data));
      },
    }),
  ),
)(AllPassengersOptionsModal);
