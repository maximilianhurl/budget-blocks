import React from 'react-native';
import AltContainer from 'alt-container/src/AltNativeContainerLegacy';

import PersistenceActions from '../actions/PersistenceActions';
import BudgetActions from '../actions/BudgetActions';
import BlockReorderActions from '../actions/BlockReorderActions';
import BudgetStore from '../stores/BudgetStore';
import BlockReorderStore from '../stores/BlockReorderStore';
import { BudgetList } from './BudgetList';
import '../stores/PersistenceStore';

export class BudgetListContainer extends React.Component {

  render() {

    return (
      <AltContainer
        stores={
          {
            budgetstore: BudgetStore,
            blockreorderstore: BlockReorderStore,
          }
        }
        actions={
          {
            budgetactions: BudgetActions,
            persistenceactions: PersistenceActions,
            blockreorderactions: BlockReorderActions
          }
        }>
        <BudgetList/>
      </AltContainer>
    );
  }
}
