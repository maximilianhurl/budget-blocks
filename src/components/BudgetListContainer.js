import React from 'react-native';
import AltContainer from 'alt/AltNativeContainer';

import BudgetActions from '../actions/BudgetActions';
import BudgetStore from '../stores/BudgetStore';
import { BudgetList } from './BudgetList';

export class BudgetListContainer extends React.Component {

  render() {
    return (
      <AltContainer
        stores={
          {
            budgetstore: BudgetStore
          }
        }
        actions={
          {
            budgetActions: BudgetActions
          }
        }>
        <BudgetList/>
      </AltContainer>
    );
  }
}
