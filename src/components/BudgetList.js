var React = require('react-native');
let { Text, View, TouchableHighlight, TextInput } = React;
import { BudgetBlock } from './BudgetBlock';
import objectMap from '../utils/objectMap';

export class BudgetList extends React.Component {

  addBudgetBlock() {
    this.props.budgetactions.addBudgetBlock('cat2');
  }

  updateIncome(value) {
    this.props.budgetactions.updateIncome(value);
  }

  render() {

    let budgets = objectMap(this.props.budgetstore.budgets).map(item => {
      return (
        <BudgetBlock
          budgetBlock={item.obj}
          key={item.key}
          storeKey={item.key}
          income={this.props.budgetstore.income}/>
      );
    });

    return (
      <View>

        <Text>Income: £ { this.props.budgetstore.income }</Text>
        <TextInput
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.updateIncome({text})}
          keyboardType={'numeric'}
          value={this.props.budgetstore.income} />

        { budgets }

        <TouchableHighlight onPress={() => this.addBudgetBlock()}>
          <Text
            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
            >
            Add Block
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.props.persistenceactions.persistState()}>
          <Text
            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
            >
            Save State
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.props.persistenceactions.loadPersistentState()}>
          <Text
            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
            >
            Load State
          </Text>
        </TouchableHighlight>


      </View>
    );
  }
}
