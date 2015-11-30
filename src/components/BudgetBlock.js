var React = require('react-native');
let { Text, View } = React;
import objectMap from '../utils/objectMap';
import { BudgetBlockItem } from './BudgetBlockItem';


export class BudgetBlock extends React.Component {

  render() {

    let budgets = objectMap(this.props.budgetBlock.outgoings).map(item => {
      return (
        <BudgetBlockItem
          budgetBlockItemBudget={item.obj}
          storeKey={item.key}
          />
      );
    });

    return (
      <View>

        <Text>Block Title: { this.props.budgetBlock.title }</Text>
        <Text>Block Key: { this.props.storeKey }</Text>

        { budgets }

      </View>
    );
  }
}
