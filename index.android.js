import React from 'react';
import { AppRegistry, AppState } from 'react-native';
import { NavContainer } from './src/NavContainer';
import PersistenceActions from './src/actions/PersistenceActions';

export default class BudgetBlocks extends React.Component {

  componentWillMount() {
    this.handleAppStateChange('started');
  }

  componentDidMount() {
    AppState.addEventListener('change', (appState) => this.handleAppStateChange(appState));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', (appState) => this.handleAppStateChange(appState));
  }

  handleAppStateChange(appState) {
    switch (appState) {
      case 'started':
        PersistenceActions.loadPersistentState();
        break;
      case 'inactive':
        // unused
        break;
      case 'background':
        PersistenceActions.persistState();
        break;
    }
  }

  render() {
    return <NavContainer/>;
  }
}

AppRegistry.registerComponent('BudgetBlocks', () => BudgetBlocks);
