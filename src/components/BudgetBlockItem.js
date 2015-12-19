import React from 'react-native';
let { Text, View, TextInput } = React;


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

  render() {

    return (
      <View style={{marginTop: 10}}>
        <Text>Budget: { this.props.blockItem.title }</Text>
        <TextInput
          style={{height: 20, width: 200, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
          onChangeText={(text) => this.updateTitle(text)}
          value={ this.props.blockItem.title } />
        <Text>key: { this.props.blockItemId }</Text>
        <Text>£{ this.props.blockItem.value }</Text>
        <TextInput
          style={{height: 18, width: 200, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
          onChangeText={(text) => this.updateValue(text)}
          keyboardType={'numeric'}
          value={this.props.blockItem.value} />
      </View>
    );
  }
}
