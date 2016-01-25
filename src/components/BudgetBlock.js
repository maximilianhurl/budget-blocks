import React from 'react-native';
let {
  Text, View, TextInput, TouchableHighlight,
  PanResponder, Animated, StyleSheet
} = React;
import objectMap from '../utils/objectMap';
import { BudgetBlockItem } from './BudgetBlockItem';
import alert from '../utils/alerts/alert';


export class BudgetBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(0, 0)
    };
  }

  componentWillReceiveProps(nextProps) {
    //if reordering see if items should be re-ordered
    console.log('new props')
  }

  removeBlock() {
    this.props.budgetactions.removeBudgetBlock(
      this.props.blockId
    );
  };

  addBudgetBlockItem() {
    this.props.budgetactions.addBudgetBlockItem(this.props.blockId, 'New outgoing', 0);
  };

  updateTitle(title) {
    this.props.budgetactions.updateBudgetBlockTitle(
      this.props.blockId, title
    );
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => this.dragStarted(),
      onPanResponderMove: Animated.event(
        [ null, {dy: this.state.pan.y}],
        {
          listener: (e, gestureState) => {
            this.props.blockreorderactions.moveReorder(gestureState.moveY);
          }
        }
      ),
      onPanResponderRelease: () => this.dragEnded(),
      onPanResponderTerminate: () => this.dragEnded(),
    });
  };

  dragEnded() {
    this.props.blockreorderactions.finishReorder();

    Animated.spring(this.state.pan, {
      toValue: 0,   // Returns to the start
      tension: 200, //speed
      friction: 12, //overshoot
    }).start();
  }

  dragStarted() {
    this.props.blockreorderactions.startReorder(this.props.blockId);
  }

  render() {

    let budgets = objectMap(this.props.budgetBlock.items).map(item => {
      return (
        <BudgetBlockItem
          key={item.key}
          blockItem={item.obj}
          blockItemId={item.key}
          blockId={this.props.blockId}
          budgetactions={this.props.budgetactions}
          />
      );
    });

    return (
      <View ref="outerView" style={{
        marginBottom: 20,
        width: 270,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: this.props.blockreorderstore.reordering ? 'green' : null,
      }}>
        <Animated.View style={{
          top: this.state.pan.y,
          backgroundColor: 'grey',
          position: 'relative',
        }}>

          <Text>Block Title: { this.props.budgetBlock.title }</Text>
          <TextInput
            style={{height: 20, width: 270, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
            onChangeText={(text) => this.updateTitle(text)}
            value={ this.props.budgetBlock.title } />

          <Text {...this._panResponder.panHandlers}>MOVE ME</Text>

          <TouchableHighlight
            onPress={() => alert(
              'Are you sure you want to remove this block?',
              null,
              [
                {text: 'Remove', onPress: () => this.removeBlock()},
                {text: 'Cancel'},
              ]
            )}>
            <Text
              style={{height: 40, width: 200, backgroundColor: 'gray', color: 'white', marginTop: 10}}>
              Remove Block
            </Text>
          </TouchableHighlight>

          { budgets }

          <TouchableHighlight onPress={() => this.addBudgetBlockItem()}>
            <Text
              style={{height: 40, width: 200, backgroundColor: 'gray', color: 'white', marginTop: 10}}>
              Add outgoing
            </Text>
          </TouchableHighlight>

          <Text>Subtotal: £{ this.props.budgetBlock.subtotal }</Text>

        </Animated.View>
      </View>
    );
  }
}
