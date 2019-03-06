import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import OptionsModal from './OptionsAlertPassenger';

import { toggleAddPassengerModalAction } from './actions/popupsModals';

import AddPassengerModal from './AddPassengerModal';

const AddPassengerModalParent = ({
  toggleAddPassengerModal,
  toggleAddPassengerModalActionHandler,
}) => {
  return (
    <View>
      <OptionsModal
        openBy={toggleAddPassengerModal}
        onRequestClose={toggleAddPassengerModalActionHandler}
      >
        {<AddPassengerModal />}
      </OptionsModal>
    </View>
  );
};

AddPassengerModalParent.propTypes = {
  toggleAddPassengerModalActionHandler: PropTypes.func.isRequired,
  toggleAddPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      toggleAddPassengerModal: store.popupsModals.toggleAddPassengerModal,
    }),
    dispatch => ({
      toggleAddPassengerModalActionHandler: () => {
        dispatch(toggleAddPassengerModalAction());
      },
    }),
  ),
)(AddPassengerModalParent);
