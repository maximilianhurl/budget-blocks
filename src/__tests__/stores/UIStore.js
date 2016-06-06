/* global jest, describe, it, expect, beforeEach */

jest.dontMock('../../stores/UIStore');
jest.setMock('../../alt', require('../../__mocks__/alt'));
jest.setMock('react-native', require('../../__mocks__/react-native'));
jest.setMock('../../actions/UIActions', require('../../__mocks__/UIActions'));


describe('Test UIStore', function () {

  var store, uiActions;

  beforeEach(function () {
    require('../../stores/UIStore').default;
    uiActions = require('../../actions/UIActions');
    const UIStore = require('../../stores/UIStore').UIStore;
    UIStore.prototype.bindActions = jest.genMockFunction();
    store = new UIStore();
  });

  it('Should toggle picker', function () {
    expect(store.currencyPickerVisible).toBe(false);
    store.onToggleCurrencyPicker();
    expect(store.currencyPickerVisible).toBe(true);
    expect(store.bindActions).lastCalledWith(uiActions);
  });

  it('Should toggle edit', function () {
    expect(store.editControlsVisible).toBe(false);
    store.onToggleEditControls();
    expect(store.editControlsVisible).toBe(true);
  });

  it('Should set currency', function () {
    expect(store.currencySymbol).toBe('£');
    store.onSetCurrencySymbol('CATS');
    expect(store.currencySymbol).toEqual('CATS');
  });


});
