import React from 'react-native';
import { NavContainer } from './src/NavContainer';
import PersistenceActions from './src/actions/PersistenceActions';

const { AppRegistry, AppStateIOS, StatusBar } = React;

export default class BudgetBlocks extends React.Component {

  componentWillMount() {
    StatusBar.setBarStyle('default');
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
    return (<NavContainer/>);
  }
}

AppRegistry.registerComponent('BudgetBlocks', () => BudgetBlocks);
