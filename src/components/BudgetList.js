import React from 'react-native';
import { BudgetBlock } from './BudgetBlock';
import { orderedBlocks } from '../stores/BudgetStore';
import { COLOURS, GLOBAL_STYLES } from '../utils/styles';

let {
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  View
} = React;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.DARKBLUE,
    marginTop: 55,
    paddingHorizontal: 20,
    paddingVertical: 25,
    flex: 1,
  },
  incomeInput: {
    height: 40,
    paddingHorizontal: 5,
    color: 'white',
  },
  incomeBorder: {
    borderBottomColor: '#000000',
    borderBottomWidth: 2,
    marginBottom: 20,
  }
});

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

    let budgets = orderedBlocks(this.props.budgetstore.budgets).map(item => {
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
          uistore={this.props.uistore}
          income={this.props.budgetstore.income}/>
      );
    });

    return (
      <ScrollView
        scrollEnabled={!this.state.reordering}
        onScroll={(e) => this.onScroll(e)}
        onLayout={(e) => this.onLayout(e)}
        scrollEventThrottle={20}
        style={[styles.container]}>

        <Text>Income: {this.props.uistore.currencySymbol} { this.props.budgetstore.income }</Text>
        <View style={[styles.incomeBorder]}>
          <TextInput
            style={[styles.incomeInput]}
            onChangeText={(text) => this.updateIncome(text)}
            keyboardType={'numeric'}
            value={this.props.budgetstore.income} />
        </View>

        { budgets }

        <TouchableHighlight onPress={() => this.addBudgetBlock()} style={[GLOBAL_STYLES.ADDBUTTON]}>
          <Text style={[GLOBAL_STYLES.ADDBUTTONTEXT, GLOBAL_STYLES.BOLDFONT]}>+ ADD BLOCK</Text>
        </TouchableHighlight>

      </ScrollView>
    );
  }
}
