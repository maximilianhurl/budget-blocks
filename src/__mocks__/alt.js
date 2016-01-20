
const alt = {
  generateActions(...actions) {
    return actions;
  },

  createActions (ActionClass) {
    var actions = new ActionClass();
    return actions;
  },

  createStore(store) {
    return store;
  },

  takeSnapshot() {
    return false;
  },

  bootstrap() {
    return false;
  }
};

module.exports = alt;
