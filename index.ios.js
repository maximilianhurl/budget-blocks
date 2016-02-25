import React from 'react-native';
import { Navigation } from './src/nav';
import PersistenceActions from './src/actions/PersistenceActions';

const { AppRegistry, AppStateIOS, StatusBarIOS } = React;

export default class BasicBudgets extends React.Component {

  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
    this.handleAppStateChange('started');
  }

  componentDidMount() {
    AppStateIOS.addEventListener('change', (appState) => this.handleAppStateChange(appState));
  }

  componentWillUnmount() {
    AppStateIOS.removeEventListener('change', (appState) => this.handleAppStateChange(appState));
  }

  handleAppStateChange(appState) {
    switch (appState) {
      case 'started':
        PersistenceActions.loadPersistentState();
        break;
      case 'active':
        // no need to do anything when resuming
        break;
      case 'background':
        PersistenceActions.persistState();
        break;
    }
  }

  render() {
    return (<Navigation/>);
  }
}

AppRegistry.registerComponent('BasicBudgets', () => BasicBudgets);
