import alt from '../alt';
import UIActions from '../actions/UIActions';

export class UIStore {

  constructor () {
    this.currencySymbol = '£';
    this.currencySymbols = ['£', '$', '€'];

    this.currencyPickerVisible = false;

    this.editControlsVisible = false;

    this.bindActions(UIActions);
  }

  onToggleCurrencyPicker() {
    this.currencyPickerVisible = !this.currencyPickerVisible;
  }

  onToggleEditControls() {
    this.editControlsVisible = !this.editControlsVisible;
  }

  onSetCurrencySymbol(symbol) {
    this.currencySymbol = symbol;
  }

}

export default alt.createStore(UIStore, 'UIStore');
