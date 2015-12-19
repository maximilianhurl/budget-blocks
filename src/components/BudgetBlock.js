import React from 'react-native';
let { Text, View, TextInput, TouchableHighlight } = React;
import objectMap from '../utils/objectMap';
import { BudgetBlockItem } from './BudgetBlockItem';
import alert from '../utils/alerts/alert';


export class BudgetBlock extends React.Component {

  removeBlock() {
    this.props.budgetactions.removeBudgetBlock(
      this.props.blockId
    );
  };


  addBudgetBlockItem() {
    this.props.budgetactions.addBudgetBlockItem(this.props.blockId, 'New outgoing', 0);
  };

  updateTitle(title) {
    this.props.budgetactions.updateBudgetBlockTitle(
      this.props.blockId, title
    );
  };

  render() {

    let budgets = objectMap(this.props.budgetBlock.items).map(item => {
      return (
        <BudgetBlockItem
          blockItem={item.obj}
          blockItemId={item.key}
          blockId={this.props.blockId}
          budgetactions={this.props.budgetactions}
          />
      );
    });

    return (
      <View style={{marginBottom: 20, width: 270, borderColor: 'gray', borderWidth: 1}}>

        <Text>Block Title: { this.props.budgetBlock.title }</Text>
        <TextInput
          style={{height: 20, width: 270, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
          onChangeText={(text) => this.updateTitle(text)}
          value={ this.props.budgetBlock.title } />

        <TouchableHighlight
          onPress={() => alert(
            'Are you sure you want to remove this block?',
            null,
            [
              {text: 'Remove', onPress: () => this.removeBlock()},
              {text: 'Cancel'},
            ]
          )}>
          <Text
            style={{height: 40, width: 200, backgroundColor: 'gray', color: 'white', marginTop: 10}}>
            Remove
          </Text>
        </TouchableHighlight>

        { budgets }

        <TouchableHighlight onPress={() => this.addBudgetBlockItem()}>
          <Text
            style={{height: 40, width: 200, backgroundColor: 'gray', color: 'white', marginTop: 10}}>
            Add outgoing
          </Text>
        </TouchableHighlight>

        <Text>Subtotal: £{ this.props.budgetBlock.subtotal }</Text>

      </View>
    );
  }
}
