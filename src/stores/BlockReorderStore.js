import alt from '../alt';

import UIActions from '../actions/BlockReorderActions';

export class BlockReorderStore {

  //handles events and state associated with re-ordering blocks

  constructor () {
    this.bindActions(UIActions);

    this.reordering = false;
    this.reorderingItemId = false;
    this.yPos = false;
  }

  onStartReorder(reorderingItemId) {
    this.reordering = true;
    this.reorderingItemId = reorderingItemId;
  }

  onMoveReorder(yPos) {
    this.yPos = yPos;
  }

  onFinishReorder() {
    this.reordering = false;
    this.reorderingItemId = false;
    this.yPos = false;
  }

}

export default alt.createStore(BlockReorderStore, 'BlockReorderStore');
