import React from 'react-native';
import { BudgetListContainer } from './components/BudgetListContainer';
import { SettingsContainer } from './components/SettingsContainer';
import UIActions from './actions/UIActions';
import { COLOURS, GLOBAL_STYLES } from './utils/styles';
let {
  Navigator,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: 'white',
    flex: 0.8
  },
  navBarButton: {
    marginHorizontal: 5,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  navBarButtonText: {
    fontSize: 12,
    margin: 0,
    marginVertical: 2,
  },
});

const ROUTES = {
  LIST: 'LIST',
  SETTINGS: 'SETTINGS',
};

export class NavBar extends React.Component {

  render() {
    return (
      <View style={[styles.navBar]}>
        <Text style={[styles.navBarText, GLOBAL_STYLES.BOLDFONT]}>
          BUDGET BLOCKS
        </Text>
        <TouchableHighlight
          onPress={() => {
            if (this.props.navigator.getCurrentRoutes().slice(-1)[0].name === ROUTES.SETTINGS) {
              this.props.navigator.pop();
            } else {
              this.props.navigator.push({
                name: ROUTES.SETTINGS,
              });
            }
          }}
          style={styles.navBarButton}>
          <Text style={[styles.navBarButtonText, GLOBAL_STYLES.BOLDFONT]}>
            SETTINGS
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => UIActions.toggleEditControls()}
          style={styles.navBarButton}>
          <Text style={[styles.navBarButtonText, GLOBAL_STYLES.BOLDFONT]}>
            EDIT
          </Text>
        </TouchableHighlight>
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
            <NavBar events={this.eventEmitter}/>
          }
          initialRoute={{ name: ROUTES.LIST }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}/>
      </View>
    );
  }
}
