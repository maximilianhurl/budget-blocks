import React from 'react-native';
let { Text, View, TextInput, TouchableHighlight } = React;
import alert from '../utils/alerts/alert';


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

  render() {
    return (
      <View style={{marginTop: 10}}>
        <Text>Budget: { this.props.blockItem.title }</Text>
        <TextInput
          style={{height: 20, width: 200, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
          onChangeText={(text) => this.updateTitle(text)}
          value={ this.props.blockItem.title } />
        <Text>£{ this.props.blockItem.value }</Text>
        <TextInput
          style={{height: 18, width: 200, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
          onChangeText={(text) => this.updateValue(text)}
          keyboardType={'numeric'}
          value={this.props.blockItem.value} />
        <TouchableHighlight
          onPress={() => alert(
            'Are you sure you want to remove this outgoing?',
            null,
            [
              {text: 'Remove', onPress: () => this.removeBlockItem()},
              {text: 'Cancel'},
            ]
          )}>
          <Text
            style={{height: 40, width: 200, backgroundColor: 'gray', color: 'white', marginTop: 10}}>
            Remove Outgoing
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
