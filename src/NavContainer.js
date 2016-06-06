import React from 'react';
import { AppState } from 'react-native';
import AltContainer from 'alt-container/native';
import UIActions from './actions/UIActions';
import UIStore from './stores/UIStore';
import { Navigation } from './Navigation';
import PersistenceActions from './actions/PersistenceActions';

export class NavContainer extends React.Component {

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
      case 'active':
        // no need to do anything when resuming
        break;
      case 'background':
        PersistenceActions.persistState();
        break;
    }
  }

  render() {
    return (
      <AltContainer
        stores={
          {
            uistore: UIStore
          }
        }
        actions={
          {
            uiactions: UIActions,
          }
        }>
        <Navigation/>
      </AltContainer>
    );
  }
}
