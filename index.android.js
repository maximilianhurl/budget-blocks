import React from 'react-native';
import { Navigation } from './src/nav';

const { AppRegistry } = React;

class BudgetBlocks extends React.Component {

  render() {
    return <Navigation/>;
  }
}

AppRegistry.registerComponent('BudgetBlocks', () => BudgetBlocks);
