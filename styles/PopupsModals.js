import { StyleSheet } from 'react-native';

const dropOffTabColor = '#ff5252';

const styles = StyleSheet.create({
  WrapperContainerParent: {
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  ContainerParent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  WrapperContainer: {
    width: 200,
    height: 225,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    backgroundColor: '#FFFFFF',
  },

  Container: {
    flex: 1,
  },

  Option: {
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    alignContent: 'center',
    justifyContent: 'center',
    borderBottomColor: '#d8d8d8',
  },

  LastOption: {
    borderBottomWidth: 0,
  },

  OptionIconContainer: {
    marginRight: 9,
    flexBasis: '40%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  OptionTextContainer: {
    flexBasis: '60%',
    paddingVertical: 15,
  },

  OptionText: {
    fontSize: 15,
    marginTop: 1,
    fontWeight: '600',
  },

  CenterElements: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  ConfirmationContainer: {
    padding: 30,
  },

  ConfirmationContainerParent: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  ConfirmationWrapperContainer: {
    width: 300,
    borderColor: '#d8d8d8',
    backgroundColor: '#f4f4f4',
  },

  ConfirmationOption: {
    paddingHorizontal: 15,
  },

  ConfirmationText: {
    fontSize: 14,
    fontWeight: '600',
  },

  ModalButtonText: {
    fontSize: 12,
    marginTop: 1,
    color: '#c50e29',
    fontWeight: '600',
  },

  ButtonsWrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },

  AddEditWrapper: {
    width: 300,
    padding: 20,
    height: 300,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    backgroundColor: '#FFFFFF',
  },

  AddEditContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  AddEditModalTitle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  AddEditIconContainer: {
    marginRight: 9,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  AddEditOptionTextContainer: {
    fontSize: 16,
    paddingTop: 5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  AddEditInputsWrapper: {
    flex: 1,
    alignItems: 'stretch',
    alignContent: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  AddEditInputs: {
    flex: 1,
    height: 40,
    paddingLeft: 35,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  IconWithinInput: {
    left: 0,
    padding: 10,
    position: 'absolute',
  },

  InputContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  AddEditButtonsWrapper: {
    paddingTop: 10,
  },

  SaveButtonStyle: {
    backgroundColor: dropOffTabColor,
    borderRadius: 4,
    padding: 10,
    paddingHorizontal: 25,
  },

  ButtonTextStyle: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  CancelButtonStyle: {
    borderRadius: 4,
    padding: 10,
    marginRight: 20,
  },

  CancelButtonTextStyle: {
    color: '#000000',
  },
});

export default styles;
