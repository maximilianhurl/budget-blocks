import React from 'react-native';
let { Text, ScrollView, TouchableHighlight, TextInput } = React;
import { BudgetBlock } from './BudgetBlock';
import objectMap from '../utils/objectMap';

export class BudgetList extends React.Component {

  constructor(props) {
    super(props);
    this.contentYOffset = 0;
    this.layouts = {};

    this.state = {
      reordering: false
    };
  }

  onScroll(e) {
    const {contentOffset} = e.nativeEvent;
    this.contentYOffset = contentOffset.y;
  }

  dragStartCallback() {
    console.log('dragStartCallback')
    this.setState({
      reordering: true
    });
  }

  dragEndedCallback() {
    console.log('dragEndedCallback')
    this.setState({
      reordering: false
    });
  }

  dragMoveCallback(dragItemKey, gestureState) {
    console.log(dragItemKey, gestureState.moveY)

    let yPos = this.contentYOffset + gestureState.moveY;

    console.log(this.contentYOffset, gestureState.moveY)

    for (let key of Object.keys(this.layouts)) {

      if (dragItemKey !== key) {
        let layout = this.layouts[key];
        if (yPos >= layout.y && yPos <= layout.y + layout.height) {
          console.log("=====================================")
          console.log(yPos, layout.y)
          console.log(dragItemKey + ' inside ' + key)

          //swap them round!
          this.props.budgetactions.reorderBudgetBlocks(dragItemKey, key);
        }
      }
    }

  }

  handleItemLayout (e, key) {
    this.layouts[key] = e.nativeEvent.layout;
  }

  addBudgetBlock() {
    this.props.budgetactions.addBudgetBlock('New outgoing block');
  }

  updateIncome(text) {
    this.props.budgetactions.updateIncome(text);
  }

  render() {

    let budgetsBlocks = objectMap(this.props.budgetstore.budgets).sort((a, b) => a.obj.order - b.obj.order);

    let budgets = budgetsBlocks.map(item => {
      return (
        <BudgetBlock
          budgetBlock={item.obj}
          key={item.key}
          onLayout={(e) => this.handleItemLayout(e, item.key)}
          dragStartCallback={() => this.dragStartCallback()}
          dragEndedCallback={() => this.dragEndedCallback()}
          dragMoveCallback={(dragItemKey, gestureState) => this.dragMoveCallback(dragItemKey, gestureState)}
          blockId={item.key}
          budgetactions={this.props.budgetactions}
          income={this.props.budgetstore.income}/>
      );
    });

    return (
      <ScrollView
        style={{ marginTop: 60 }}
        scrollEnabled={!this.state.reordering}
        onScroll={(e) => this.onScroll(e)}
        scrollEventThrottle={20}>

        <Text>Income: £ { this.props.budgetstore.income }</Text>
        <TextInput
          style={{
            height: 40, width: 270, borderColor: 'gray',
            borderWidth: 1, backgroundColor: 'white', marginBottom: 20
          }}
          onChangeText={(text) => this.updateIncome(text)}
          keyboardType={'numeric'}
          value={this.props.budgetstore.income} />

        { budgets }

        <TouchableHighlight onPress={() => this.addBudgetBlock()}>
          <Text
            style={{height: 40, width: 270, backgroundColor: 'gray', color: 'white', marginTop: 10}}
            >
            Add Block
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.props.persistenceactions.persistState()}>
          <Text
            style={{height: 40, width: 270, backgroundColor: 'gray', color: 'white', marginTop: 10}}
            >
            Save State
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.props.persistenceactions.loadPersistentState()}>
          <Text
            style={{height: 40, width: 270, backgroundColor: 'gray', color: 'white', marginTop: 10}}
            >
            Load State
          </Text>
        </TouchableHighlight>


      </ScrollView>
    );
  }
}
