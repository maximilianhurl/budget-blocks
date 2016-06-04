import React from 'react';
import { BudgetBlock } from './BudgetBlock';
import { orderedBlocks } from '../stores/BudgetStore';
import { COLOURS, GLOBAL_STYLES } from '../utils/styles';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Platform
} from 'react-native';

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
    flex: 0.9,
    fontSize: 20,
  },
  incomeCurrency: {
    paddingTop: 10,
    marginRight: 2,
    fontSize: 20,
    marginTop: (Platform.OS === 'ios') ? 0 : 4,
  },
  incomeBorder: {
    borderBottomColor: '#000000',
    borderBottomWidth: 2,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
  }
});

export class BudgetList extends React.Component {

  constructor(props) {
    super(props);

    this.yPos = 0;
    this.scrollOffset = 0;
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
    var scrollerBottom = eventYPos + this.props.budgetstore.blockLayouts[dragItemKey].height;

    var bh = this.props.budgetstore.blockLayouts[dragItemKey].height / 2;

    for (let key of Object.keys(this.props.budgetstore.blockLayouts)) {

      //check if dragged item overlaps any other blocks
      if (dragItemKey !== key) {
        let layout = this.props.budgetstore.blockLayouts[key];
        if (
          (scrollerTop >= layout.y && scrollerTop <= layout.y + layout.height - bh && !movingDown) ||
          (scrollerBottom >= layout.y + bh && scrollerBottom <= layout.y + layout.height && movingDown)
        ) {

          this.animatingReorder = true;

          this.props.budgetactions.reorderBudgetBlocks(dragItemKey, key);

          //ignore drag events whlie animation completes
          setTimeout(() => this.animatingReorder = false, 255);
          break;
        }
      }
    }

  }

  handleItemLayout (e, key) {
    this.props.budgetactions.addBlockLayout(key, e.nativeEvent.layout);
  }

  addBudgetBlock() {
    this.props.budgetactions.addBudgetBlock('NAME BLOCK...');
  }

  updateIncome(text) {
    this.props.budgetactions.updateIncome(text);
  }

  getIcomeText() {
    if (parseFloat(this.props.budgetstore.income) <= 0) {
      return 'Income...';
    }
    return this.props.budgetstore.income;
  }

  render() {

    let budgets = orderedBlocks(this.props.budgetstore.budgets).map(item => {
      return (
        <BudgetBlock
          budgetBlock={item.obj}
          key={item.key}
          yOffset={this.yPos}
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

        <View style={[styles.incomeBorder]}>
          <Text style={[styles.incomeCurrency, GLOBAL_STYLES.BOLDFONT]}>
              { this.props.uistore.currencySymbol }
          </Text>
          <TextInput
            style={[styles.incomeInput, GLOBAL_STYLES.REGULARFONT]}
            underlineColorAndroid={COLOURS.DARKBLUE}
            onChangeText={(text) => this.updateIncome(text)}
            keyboardType={'numeric'}
            value={this.getIcomeText()} />
        </View>

        { budgets }

        <TouchableOpacity
          onPress={() => this.addBudgetBlock()}
          style={[GLOBAL_STYLES.ADDBUTTON, {marginBottom: 40}]}>
          <Text
            style={[GLOBAL_STYLES.ADDBUTTONTEXT, GLOBAL_STYLES.BOLDFONT]}>
            + ADD BLOCK
          </Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}
