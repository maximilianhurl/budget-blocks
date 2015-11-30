var React = require('react-native');
let { Text, View } = React;


export class BudgetBlockItem extends React.Component {

  render() {

    return (
      <View>

        <Text>Budget: { this.props.budgetBlockItemBudget.title }</Text>
        <Text>key: { this.props.storeKey }</Text>

      </View>
    );
  }
}
