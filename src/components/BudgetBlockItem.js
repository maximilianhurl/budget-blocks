import React from 'react-native';
import { GLOBAL_STYLES, COLOURS } from '../utils/styles';
let { Text, View, TextInput, TouchableHighlight, Alert, StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLOURS.DARKBUTTON,
  },
  title: {
    flex: 0.5,
  },
  total: {
    marginLeft: 5,
  },
  input: {
    flex: 0.4,
    height: 20,
    color: COLOURS.DARKTEXT,
    margin: 0,
    padding:0,
    marginBottom: 5,
  },
  currency: {
    fontSize: 16,
  }
});


export class BudgetBlockItem extends React.Component {

  updateValue(value) {
    this.props.budgetactions.updateBudgetBlockItemValue(
      this.props.blockId, this.props.blockItemId, value
    );
  }

  updateTitle(title) {
    this.props.budgetactions.updateBudgetBlockItemTitle(
      this.props.blockId, this.props.blockItemId, title
    );
  }

  removeBlockItem() {
    this.props.budgetactions.removeBudgetBlockItem(
      this.props.blockId, this.props.blockItemId
    );
  }

  renderRemoveButton() {
    if (this.props.uistore.editControlsVisible) {
      return (<TouchableHighlight
        style={[GLOBAL_STYLES.ADDBUTTON]}
        onPress={() => Alert.alert(
          'Are you sure you want to remove this outgoing?',
          null,
          [
            {text: 'Remove', onPress: () => this.removeBlockItem()},
            {text: 'Cancel'},
          ]
        )}>
        <Text style={[GLOBAL_STYLES.ADDBUTTONTEXT, GLOBAL_STYLES.BOLDFONT]}>
          - REMOVE OUTGOING
        </Text>
      </TouchableHighlight>);
    }
    return null;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <TextInput
          style={[styles.input, styles.title, GLOBAL_STYLES.REGULARFONT]}
          onChangeText={(text) => this.updateTitle(text)}
          value={ this.props.blockItem.title } />
        <Text style={[styles.currency, GLOBAL_STYLES.BOLDFONT]}>£</Text>
        <TextInput
          style={[styles.input, styles.total]}
          onChangeText={(text) => this.updateValue(text)}
          keyboardType={'numeric'}
          value={this.props.blockItem.value} />

        { this.renderRemoveButton() }

      </View>
    );
  }
}
