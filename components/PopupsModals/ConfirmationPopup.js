import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import styles from '../../styles/PopupsModals';

import { confirmationPopupAction } from './actions/popupsModals';

import ConfirmationPopupBtn from './ConfirmationPopupBtn';

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
        <ConfirmationPopupBtn
          text="Cancel"
          onPress={confirmationPopupActionHandler}
          background={TouchableOpacity.Ripple('#ccc', false)}
        />
        <ConfirmationPopupBtn
          text="Delete"
          onPress={handleDeleteOptionsModal}
          background={TouchableOpacity.Ripple('#ccc', false)}
        />
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
