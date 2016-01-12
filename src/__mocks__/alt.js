
const alt = {
  generateActions: function (...actions) {
    return actions;
  },

  createActions: function (ActionClass) {
    var actions = new ActionClass();
    return actions;
  },

  createStore: function (store) {
    return store;
  }
};


module.exports = alt;
