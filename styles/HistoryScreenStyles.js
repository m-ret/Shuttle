import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  Wrapper: {
    flex: 1,
    marginVertical: 30,
  },

  ContentPadding: {
    paddingHorizontal: 15,
  },

  NameTextWrapper: {
    flexDirection: 'row',
  },

  NameText: {
    fontSize: 16,
    color: 'black',
  },

  Greytext: {
    fontSize: 12,
    color: '#6e6e6e',
  },

  LightGreytext: {
    fontSize: 12,
    color: '#9b9b9b',
    paddingBottom: 2,
  },

  Container: {
    borderTopWidth: 1,
    paddingVertical: 20,
    borderColor: '#e5e5e5',
  },

  Times: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
