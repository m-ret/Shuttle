import React from 'react';
import { Text, View } from 'react-native';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import styles from '../../styles/PopupsModals';

import { confirmationPopupAction } from './actions/popupsModals';

import ConfirmationPopupBtn from './ConfirmationPopupBtn';

const ConfirmationPopup = ({
  textTitle,
  buttonText,
  handleDeleteOptionsModal,
  confirmationPopupActionHandler,
}) => (
  <View style={styles.ConfirmationWrapperContainer}>
    <View style={styles.ConfirmationContainer}>
      <Text style={styles.ConfirmationText}>{textTitle}</Text>
      <View style={styles.ButtonsWrapper}>
        <ConfirmationPopupBtn
          isDisabled={false}
          text="CANCEL"
          onPress={confirmationPopupActionHandler}
        />
        <ConfirmationPopupBtn
          isDisabled={false}
          text={buttonText}
          onPress={handleDeleteOptionsModal}
        />
      </View>
    </View>
  </View>
);

ConfirmationPopup.propTypes = {
  handleDeleteOptionsModal: PropTypes.func.isRequired,
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  textTitle: PropTypes.oneOfType([PropTypes.string]).isRequired,
  buttonText: PropTypes.oneOfType([PropTypes.string]).isRequired,
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
