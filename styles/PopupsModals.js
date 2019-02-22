import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
});

export default styles;
