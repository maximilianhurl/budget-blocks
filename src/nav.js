import React from 'react-native';
import { App } from './app';

let { Navigator, View, StyleSheet, Text } = React;

var NavigationBarRouteMapper = {

  LeftButton: function(route) {
    return (
      <Text>{ route.leftButton }</Text>
    );
  },

  Title: function(route) {
    return (
      <Text>{ route.name }</Text>
    );
  },

  RightButton: function(route) {
    return (
      <Text>{ route.rightButton }</Text>
    );
  }

};

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  },
  navColor: {
    'backgroundColor': '#3B5998'
  },
  appContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export class Navigation extends React.Component {

  render() {

    return (
      <Navigator
        style={styles.navigator}
        initialRoute={{
          component: App,
          name: 'Basic Budgets'
        }}
        renderScene={(route, navigator) => (
          <View style={styles.appContainer}>
            <App
              navigator={navigator}
              route={route}
            />
          </View>
        )}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}/>
        }
      />
    );
  }
}
