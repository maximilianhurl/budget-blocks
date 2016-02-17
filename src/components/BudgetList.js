import React from 'react-native';
let { Text, ScrollView, TouchableHighlight, TextInput } = React;
import { BudgetBlock } from './BudgetBlock';

export class BudgetList extends React.Component {

  constructor(props) {
    super(props);

    this.yPos = 0;
    this.scrollOffset = 0;
    this.layouts = {};

    this.animatingReorder = false;

    this.state = {
      reordering: false
    };
  }

  onScroll(e) {
    const {contentOffset} = e.nativeEvent;
    this.scrollOffset = contentOffset.y;
  }

  onLayout(e) {
    this.yPos = e.nativeEvent.layout.y;
  }

  dragStartCallback() {
    this.setState({
      reordering: true
    });
  }

  dragEndedCallback() {
    this.setState({
      reordering: false
    });
  }

  dragMoveCallback(dragItemKey, eventYPos, movingDown) {

    if (this.animatingReorder) {
      return;
    }

    //Adjust pan pos for scroll
    eventYPos = eventYPos + this.scrollOffset - this.yPos;

    var scrollerTop = eventYPos;
    var scrollerBottom = eventYPos + this.layouts[dragItemKey].height;

    var bh = this.layouts[dragItemKey].height / 2;

    for (let key of Object.keys(this.layouts)) {

      //check if dragged item overlaps any other blocks
      if (dragItemKey !== key) {
        let layout = this.layouts[key];
        if (
          (scrollerTop >= layout.y && scrollerTop <= layout.y + layout.height - bh && !movingDown) ||
          (scrollerBottom >= layout.y + bh && scrollerBottom <= layout.y + layout.height && movingDown)
        ) {

          this.animatingReorder = true;

          this.refs[key].animatePositionChange();
          this.props.budgetactions.reorderBudgetBlocks(dragItemKey, key);

          //ignore drag events whlie animation completes
          setTimeout(() => this.animatingReorder = false, 300 );
          break;
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

    let budgets = this.props.budgetstore.getOrderedBlocks().map(item => {
      return (
        <BudgetBlock
          budgetBlock={item.obj}
          key={item.key}
          yOffset={this.yPos}
          ref={item.key}
          scrollOffset={this.scrollOffset}
          onLayout={(e) => this.handleItemLayout(e, item.key)}
          dragStartCallback={() => this.dragStartCallback()}
          dragEndedCallback={() => this.dragEndedCallback()}
          dragMoveCallback={(dragItemKey, gestureState, movingDown) => {
            return this.dragMoveCallback(dragItemKey, gestureState, movingDown);
          }}
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
        onLayout={(e) => this.onLayout(e)}
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
