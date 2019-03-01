import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { popupsModalsAction } from './actions/popupsModals';

const OptionsModal = ({
  toggleCardOptionsModal,
  popupsModalsActionHandler,
  children,
}) => (
  <View style={{ marginTop: 22, backgroundColor: 'rgba(255,255,255,0.5)' }}>
    <Modal
      animationType="fade"
      transparent
      visible={toggleCardOptionsModal}
      onRequestClose={popupsModalsActionHandler}
    >
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 200,
            height: 225,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#d8d8d8',
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  </View>
);

OptionsModal.propTypes = {
  popupsModalsActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  toggleCardOptionsModal: PropTypes.oneOfType([PropTypes.bool])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      toggleCardOptionsModal:
        store.popupsModals.toggleCardOptionsModal,
    }),
    dispatch => ({
      popupsModalsActionHandler: () => {
        dispatch(popupsModalsAction());
      },
    }),
  ),
)(OptionsModal);
