import React from 'react-native';
let { Text, View, TextInput } = React;
import objectMap from '../utils/objectMap';
import { BudgetBlockItem } from './BudgetBlockItem';


export class BudgetBlock extends React.Component {

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
        <Text>Block ID: { this.props.blockId }</Text>

        { budgets }

         <Text>Subtotal: £{ this.props.budgetBlock.subtotal }</Text>

      </View>
    );
  }
}
