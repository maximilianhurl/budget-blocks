import React from 'react-native';
import { Navigation } from './src/nav';

const { AppRegistry } = React;

class BasicBudgets extends React.Component {

  render() {
    return <Navigation/>;
  }
}

AppRegistry.registerComponent('BasicBudgets', () => BasicBudgets);
