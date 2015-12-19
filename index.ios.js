import React from 'react-native';
import { Navigation } from './src/nav';

const { AppRegistry, StatusBarIOS } = React;

export default class BasicBudgets extends React.Component {

  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  render() {
    return (<Navigation/>);
  }
}

AppRegistry.registerComponent('BasicBudgets', () => BasicBudgets);
