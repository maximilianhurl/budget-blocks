import React from 'react-native';
import AltContainer from 'alt-container/native';
import UIActions from '../actions/UIActions';
import UIStore from '../stores/UIStore';
import { Settings } from './Settings';

export class SettingsContainer extends React.Component {

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
        <Settings/>
      </AltContainer>
    );
  }
}
