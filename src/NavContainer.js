import React from 'react';
import AltContainer from 'alt-container/native';
import UIActions from './actions/UIActions';
import UIStore from './stores/UIStore';
import { Navigation } from './Navigation';

export class NavContainer extends React.Component {

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
