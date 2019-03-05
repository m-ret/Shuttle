import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import OptionsModal from './OptionsAlertPassenger';

import { editPassengerModalAction } from './actions/popupsModals';

import PassengerFormModal from './PassengerFormModal';

const PassengerFormModalParent = ({
  editPassengerModal,
  editPassengerModalActionHandler,
}) => {
  return (
    <View>
      <OptionsModal
        openBy={editPassengerModal}
        onRequestClose={editPassengerModalActionHandler}
      >
        {<PassengerFormModal />}
      </OptionsModal>
    </View>
  );
};

PassengerFormModalParent.propTypes = {
  editPassengerModalActionHandler: PropTypes.func.isRequired,
  editPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      editPassengerModal: store.popupsModals.editPassengerModal,
    }),
    dispatch => ({
      editPassengerModalActionHandler: () => {
        dispatch(editPassengerModalAction());
      },
    }),
  ),
)(PassengerFormModalParent);
