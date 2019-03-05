import { Linking, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import OptionsModal from './OptionsAlertPassenger';
import AllPassengersOptionsModal from './AllPassengersOptionsModal';

import {
  confirmationPopupAction,
  popupsModalsAction,
} from './actions/popupsModals';

const CardOptionsModalParent = ({
  passengerInfo,
  confirmationPopup,
  toggleCardOptionsModal,
  popupsModalsActionHandler,
  confirmationPopupActionHandler,
}) => {
  return (
    <View>
      {!confirmationPopup && (
        <>
          <OptionsModal
            openBy={toggleCardOptionsModal}
            onRequestClose={() => popupsModalsActionHandler}
          >
            {
              <AllPassengersOptionsModal
                id={passengerInfo.id}
                handleCallOptionsModal={() =>
                  Linking.openURL(`tel:${passengerInfo.phone}`)
                }
                openConfirmationPopup={confirmationPopupActionHandler}
              />
            }
          </OptionsModal>
        </>
      )}
    </View>
  );
};

CardOptionsModalParent.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  popupsModalsActionHandler: PropTypes.func.isRequired,
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  confirmationPopup: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  toggleCardOptionsModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      passengerInfo: store.homeScreen.passengerInfo,
      confirmationPopup: store.popupsModals.confirmationPopup,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
    }),
    dispatch => ({
      popupsModalsActionHandler: () => {
        dispatch(popupsModalsAction());
      },
      confirmationPopupActionHandler: () => {
        dispatch(confirmationPopupAction());
      },
    }),
  ),
)(CardOptionsModalParent);
