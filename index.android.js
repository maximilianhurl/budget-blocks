import React from 'react-native';
import { NavContainer } from './src/NavContainer';

const { AppRegistry } = React;

class BudgetBlocks extends React.Component {

  render() {
    return <NavContainer/>;
  }
}

AppRegistry.registerComponent('BudgetBlocks', () => BudgetBlocks);
