import React from 'react';
import AltContainer from 'alt-container/native';
import BudgetActions from '../actions/BudgetActions';
import BudgetStore from '../stores/BudgetStore';
import UIStore from '../stores/UIStore';
import { BudgetList } from './BudgetList';
import '../stores/PersistenceStore';

export class BudgetListContainer extends React.Component {

  render() {
    return (
      <AltContainer
        stores={
          {
            budgetstore: BudgetStore,
            uistore: UIStore
          }
        }
        actions={
          {
            budgetactions: BudgetActions,
          }
        }>
        <BudgetList/>
      </AltContainer>
    );
  }
}
