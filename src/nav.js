import React from 'react-native';
import { BudgetListContainer } from './components/BudgetListContainer';
import { Settings } from './components/Settings';
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
    padding:20,
    justifyContent: 'center',
  },
  navBar: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    paddingTop: 20,
    flexDirection: 'row'
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarLeftButton: {
    paddingLeft: 10,
    backgroundColor: 'green'
  },
  navBarButtonText: {
    color: '#5890FF',
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
        <Text style={[styles.navBarText]}>
          Budget Blocks
        </Text>
        <TouchableHighlight
          onPress={() => {
            if (this.props.navigator.getCurrentRoutes().slice(-1)[0].name === 'Settings') {
              this.props.navigator.pop();
            } else {
              this.props.navigator.push({
                name: ROUTES.SETTINGS,
              });
            }
          }}
          style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Settings
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
      return (<Settings navigator={navigator} />);
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
