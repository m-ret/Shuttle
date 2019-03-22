import { StyleSheet } from 'react-native';

const PassengersStyles = StyleSheet.create({
  CTileListItem: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 4,
  },

  CArticleTile: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    borderWidth: 2,
    backgroundColor: 'rgb(255, 255, 255)',
  },

  CArticleTileHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'stretch',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },

  CArticleTileCategory: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  CArticleTileBody: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },

  CArticleTileFooter: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 1,
    paddingBottom: 15,
    color: '#949494',
  },

  CArticleTileTitle: {
    margin: 0,
    color: '#333',
  },

  CardinalPointWrapper: {
    flexDirection: 'column',
    alignItems: 'baseline',
    position: 'relative',
  },

  NameOfClient: {
    fontSize: 24,
    marginVertical: 5,
  },

  Address: {
    fontSize: 14,
    color: 'rgba(0,0,0, 0.5)',
    marginVertical: 5,
  },

  RequestedTimeText: {
    fontSize: 12,
    color: 'rgba(0,0,0, 0.23)',
    marginVertical: 10,
  },

  RequestedTime: {
    fontWeight: 'bold',
    color: 'rgba(0,0,0, 0.23)',
  },

  ButtonTextIconMargin: {
    marginHorizontal: 5,
  },

  SearchBox: {
    height: 40,
    marginTop: 20,
    borderColor: 'rgba(0,0,0, 0.23)',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default PassengersStyles;
