import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { TabView, SceneMap } from 'react-native-tab-view';
import { withNavigation } from 'react-navigation';

import tabViewStyles from '../../styles/TabViewStyles';
import AllPassengersDropOff from './AllPassengersDropOff';
import AllPassengersPickup from './AllPassengersPickup';

import { indexRouteAction } from '../../screens/HomeScreen/actions/homeScreen';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class TopTabView extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  handleIndexChange = indexParam => {
    const { indexRouteActionHandler, navigation } = this.props;
    indexRouteActionHandler(indexParam);
    return indexParam
      ? navigation.navigate('App2')
      : navigation.navigate('App');
  };

  renderTabBar = props => {
    const { navigationStore } = this.props;
    return (
      <View style={tabViewStyles.tabBar}>
        {props.navigationState.routes.map((route, index) => {
          return (
            <Fragment key={route.key}>
              <TouchableOpacity
                style={[
                  tabViewStyles.tabItem,
                  tabViewStyles.tabStyle,
                  tabViewStyles[`tabStyle_${index}`],
                  props.navigationState.index.toString() !==
                    navigationStore.routes[index].key &&
                    tabViewStyles[`tabStyle_${index}_disabled`],
                ]}
                onPress={() => this.handleIndexChange(index)}
              >
                <Text style={tabViewStyles.tabTitle}>{route.title}</Text>
                {props.navigationState.index.toString() ===
                  navigationStore.routes[index].key && (
                  <View style={tabViewStyles.tabArrowWrapper}>
                    <View
                      style={[
                        tabViewStyles.tabArrowContent,
                        {
                          backgroundColor:
                            tabViewStyles[`tabStyle_${index}`].backgroundColor,
                        },
                      ]}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </Fragment>
          );
        })}
      </View>
    );
  };

  renderScene = SceneMap({
    0: AllPassengersDropOff,
    1: AllPassengersPickup,
  });

  render() {
    const { navigationStore } = this.props;
    return (
      <TabView
        useNativeDriver
        initialLayout={initialLayout}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        navigationState={navigationStore}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}

TopTabView.propTypes = {
  indexRouteActionHandler: PropTypes.func.isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
    }),
    dispatch => ({
      indexRouteActionHandler: data => {
        dispatch(indexRouteAction(data));
      },
    }),
  ),
)(withNavigation(TopTabView));
