import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  WrapperContainerParent: {
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  ContainerParent: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  WrapperContainer: {
    width: 200,
    height: 225,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#d8d8d8',
  },

  Container: {
    flex: 1,
  },

  Option: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  LastOption: {
    borderBottomWidth: 0,
  },

  OptionIconContainer: {
    marginRight: 9,
    flexBasis: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  OptionTextContainer: {
    flexBasis: '60%',
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

  ConfirmationOptionText: {
    fontSize: 12,
    marginTop: 1,
    color: '#c50e29',
    fontWeight: '600',
  },

  ButtonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default styles;
