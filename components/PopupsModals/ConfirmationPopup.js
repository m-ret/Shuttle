import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from '../../styles/PopupsModals';

import { confirmationPopupAction } from './actions/popupsModals';

class ConfirmationPopup extends Component {
  

  render() {
    const {
      handleDeleteOptionsModal,
      confirmationPopupActionHandler,
    } = this.props;
    return (
      <View style={styles.WrapperContainer}>
        <View style={styles.Container}>
          <TouchableOpacity
            style={styles.Option}
            background={TouchableOpacity.Ripple('#ccc', false)}
            onPress={confirmationPopupActionHandler}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Cancel</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Option}
            background={TouchableOpacity.Ripple('#ccc', false)}
            onPress={handleDeleteOptionsModal}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Delete</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ConfirmationPopup.propTypes = {
  handleDeleteOptionsModal: PropTypes.func.isRequired,
  confirmationPopupActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      confirmationPopup: store.popupsModals.confirmationPopup,
    }),
    dispatch => ({
      confirmationPopupActionHandler: () => {
        dispatch(confirmationPopupAction());
      },
    }),
  ),
)(ConfirmationPopup);
