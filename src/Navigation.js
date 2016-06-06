import React from 'react';
import { BudgetListContainer } from './components/BudgetListContainer';
import { SettingsContainer } from './components/SettingsContainer';
import { COLOURS, GLOBAL_STYLES } from './utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Navigator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.DARKBLUE,
  },
  navigator: {
    flex: 1,
    justifyContent: 'center',
  },
  navBar: {
    backgroundColor: COLOURS.LIGHTBLUE,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: 'transparent',
    paddingTop: 20,
    paddingHorizontal: 12,
    flexDirection: 'row'
  },
  navBarText: {
    fontSize: 20,
    margin: 5,
    marginRight: 0,
    color: 'white',
    width: 74,
  },
  blocksContainer: {
    flex: 0.5,
    paddingTop: 1,
  },
  blocksImage: {
    height: 15,
    width: 22,
  },
  navBarButton: {
    marginHorizontal: 5,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  navBarButtonText: {
    margin: 0,
  },
  settings: {
    marginRight: 5,
    paddingHorizontal: 4,
  },
  navBarButtonActive: {
    backgroundColor: COLOURS.DARKBLUE,
  },
});

const ROUTES = {
  LIST: 'LIST',
  SETTINGS: 'SETTINGS',
};

export class NavBar extends React.Component {

  render() {

    const onSettings = this.props.navigator.getCurrentRoutes().slice(-1)[0].name === ROUTES.SETTINGS;

    return (
      <View style={[styles.navBar]}>
        <Text style={[styles.navBarText, GLOBAL_STYLES.BOLDFONT]}>
          BUDGET
        </Text>
        <View style={[styles.blocksContainer]}>
          <Image
            style={[styles.blocksImage]}
            resizeMode={'contain'}
            source={require('../assets/blocks.png')}/>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (onSettings) {
              this.props.navigator.pop();
            } else {
              this.props.navigator.push({
                name: ROUTES.SETTINGS
              });
            }
          }}
          style={[
            styles.settings, onSettings ? styles.navBarButtonActive : null
          ]}>
          <Icon name="ios-settings" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.uiactions.toggleEditControls()}
          style={[
            styles.navBarButton,
            this.props.uistore.editControlsVisible ? styles.navBarButtonActive : null
          ]}>
          <Text style={[styles.navBarButtonText, GLOBAL_STYLES.BOLDFONT]}>
            EDIT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export class Navigation extends React.Component {

  renderScene(route, navigator) {
    if (route.name === ROUTES.LIST) {
      return (<BudgetListContainer navigator={navigator} />);
    }

    if (route.name === ROUTES.SETTINGS) {
      return (<SettingsContainer navigator={navigator} />);
    }
  }

  configureScene() {
    return Navigator.SceneConfigs.VerticalDownSwipeJump;
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          style={[styles.navigator]}
          navigationBar={
            <NavBar
              events={this.eventEmitter}
              uistore={this.props.uistore}
              uiactions={this.props.uiactions}/>
          }
          initialRoute={{ name: ROUTES.LIST }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}/>
      </View>
    );
  }
}
