import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { NavContainer } from './src/NavContainer';

export default class BudgetBlocks extends React.Component {

  componentWillMount() {
    StatusBar.setBarStyle('default');
  }

  render() {
    return (<NavContainer/>);
  }
}

AppRegistry.registerComponent('BudgetBlocks', () => BudgetBlocks);
