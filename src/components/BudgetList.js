import React from 'react-native';
let { Text, ScrollView, TouchableHighlight, TextInput } = React;
import { BudgetBlock } from './BudgetBlock';
import objectMap from '../utils/objectMap';

export class BudgetList extends React.Component {

  constructor(props) {
    super(props);
    this.contentYOffset = 0;
  }

  componentWillReceiveProps(nextProps) {
    //if reordering see if items should be re-ordered
    let blockreorderstore = nextProps.blockreorderstore;
    if (blockreorderstore.reordering && blockreorderstore.yPos && blockreorderstore.reorderingItemId) {
      this.checkDragPosition(nextProps);
    }
  }

  onScroll(e) {
    const {contentOffset} = e.nativeEvent;
    this.contentYOffset = contentOffset.y;
  }

  checkDragPosition (nextProps) {
    //Check if the current scroll position is inside another block
    //if so then re-order so scrolling block is in that position

    let yPos = this.contentYOffset + nextProps.blockreorderstore.yPos;

    console.log(this.contentYOffset, nextProps.blockreorderstore.yPos)

    for (let refKey of Object.keys(this.blockRefs)) {
      if (refKey !== nextProps.blockreorderstore.reorderingItemId) {
        this.blockRefs[refKey].refs.outerView.measure((x, y, width, height) => {

          console.log(yPos)

          if (yPos >= y && yPos <= y + height && nextProps.blockreorderstore.reorderingItemId) {
            console.log("=====================================")
            console.log(yPos, y)
            console.log(nextProps.blockreorderstore.reorderingItemId + ' inside ' + refKey)

            //swap them round!
            nextProps.budgetactions.reorderBudgetBlocks(
              nextProps.blockreorderstore.reorderingItemId, refKey
            );
            return;
          }
        });
      }
    }
  }

  addBudgetBlock() {
    this.props.budgetactions.addBudgetBlock('New outgoing block');
  }

  updateIncome(text) {
    this.props.budgetactions.updateIncome(text);
  }

  render() {

    //store refs to the objects to get layout positions when dragging
    this.blockRefs = {};

    let budgetsBlocks = objectMap(this.props.budgetstore.budgets).sort((a, b) => a.obj.order - b.obj.order);

    let budgets = budgetsBlocks.map(item => {
      console.log(item)
      return (
        <BudgetBlock
          budgetBlock={item.obj}
          key={item.key}
          //store refs to the objects to get layout positions when dragging
          ref={(ref) => this.blockRefs[item.key] = ref}
          blockId={item.key}
          budgetactions={this.props.budgetactions}
          blockreorderactions={this.props.blockreorderactions}
          blockreorderstore={this.props.blockreorderstore}
          income={this.props.budgetstore.income}/>
      );
    });

    return (
      <ScrollView
        style={{ marginTop: 60 }}
        scrollEnabled={!this.props.blockreorderstore.reordering}
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
