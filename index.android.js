import React from 'react';
import { AppRegistry } from 'react-native';
import { NavContainer } from './src/NavContainer';

class BudgetBlocks extends React.Component {

  render() {
    return <NavContainer/>;
  }
}

AppRegistry.registerComponent('BudgetBlocks', () => BudgetBlocks);
