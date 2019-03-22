/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { TabView } from 'react-native-tab-view';
import { withNavigation } from 'react-navigation';

import tabViewStyles from '../../styles/TabViewStyles';

import { indexRouteAction } from '../../screens/HomeScreen/actions/homeScreen';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class TopTabView extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  renderTabBar = props => {
    const { handleIndexChangeProp, topPadding, whichNav } = this.props; // whichNav prop indicates de Navigation State.
    return (
      <View style={[tabViewStyles.tabBar, topPadding]}>
        {props.navigationState.routes.map((route, index) => {
          return (
            <Fragment key={route.key}>
              <TouchableOpacity
                style={[
                  tabViewStyles.tabItem,
                  tabViewStyles.tabStyle,
                  tabViewStyles[`tabStyle_${index}`],
                  props.navigationState.index.toString() !==
                    whichNav.routes[index].key &&
                    tabViewStyles[`tabStyle_${index}_disabled`],
                ]}
                onPress={() => handleIndexChangeProp(index)}
              >
                <Text style={tabViewStyles.tabTitle}>{route.title}</Text>
                {props.navigationState.index.toString() ===
                  whichNav.routes[index].key && (
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

  render() {
    const { whichNav, renderSceneNav, handleIndexChangeProp } = this.props;
    return (
      <TabView
        useNativeDriver
        navigationState={whichNav}
        renderScene={renderSceneNav}
        initialLayout={initialLayout}
        renderTabBar={this.renderTabBar}
        onIndexChange={handleIndexChangeProp}
      />
    );
  }
}

TopTabView.propTypes = {
  renderSceneNav: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  topPadding: PropTypes.shape({}).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  handleIndexChangeProp: PropTypes.func.isRequired,
  whichNav: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      historyNavigation: store.historyScreen.historyNavigation,
    }),
    dispatch => ({
      indexRouteActionHandler: data => {
        dispatch(indexRouteAction(data));
      },
    }),
  ),
)(withNavigation(TopTabView));
