var React = require('react-native');
let { Text, View } = React;

export class BudgetList extends React.Component {
  render() {

    let budgets = this.props.budgetstore.budgets.map(budget => {
      return (<Text>Budget: { budget.title }</Text>);
    });

    return (
      <View>
        { budgets }
      </View>
    );
  }
}
