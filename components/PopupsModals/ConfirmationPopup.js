import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from '../../styles/PopupsModals';

import { confirmationPopupAction } from './actions/popupsModals';

const ConfirmationPopup = ({
  handleDeleteOptionsModal,
  confirmationPopupActionHandler,
}) => (
  <View style={styles.ConfirmationWrapperContainer}>
    <View style={styles.ConfirmationContainer}>
      <Text style={styles.ConfirmationText}>
        Are you sure you want to delete this passenger?
      </Text>
      <View style={styles.ButtonsWrapper}>
        <TouchableOpacity
          style={styles.ConfirmationOption}
          background={TouchableOpacity.Ripple('#ccc', false)}
          onPress={confirmationPopupActionHandler}
        >
          <View>
            <View>
              <Text style={styles.ConfirmationOptionText}>Cancel</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ConfirmationOption}
          background={TouchableOpacity.Ripple('#ccc', false)}
          onPress={handleDeleteOptionsModal}
        >
          <View>
            <View>
              <Text style={styles.ConfirmationOptionText}>Delete</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

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
