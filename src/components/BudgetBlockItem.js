var React = require('react-native');
let { Text, View, TextInput } = React;


export class BudgetBlockItem extends React.Component {

  updateValue(value) {

    this.props.budgetactions.updateBudgetBlockItemValue(
      this.props.blockId, this.props.blockItemId, value
    );
  }

  render() {

    return (
      <View style={{marginTop: 10}}>
        <Text>Budget: { this.props.blockItem.title }</Text>
        <Text>key: { this.props.blockItemId }</Text>
        <Text>£{ this.props.blockItem.value }</Text>
        <TextInput
          style={{height: 20, width: 270, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
          onChangeText={(text) => this.updateValue(text)}
          keyboardType={'numeric'}
          value={this.props.blockItem.value} />
      </View>
    );
  }
}
