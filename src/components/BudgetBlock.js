import React from 'react-native';
let {
  Text, View, TextInput, TouchableHighlight,
  PanResponder, Animated, LayoutAnimation
} = React;
import objectMap from '../utils/objectMap';
import { BudgetBlockItem } from './BudgetBlockItem';
import alert from '../utils/alerts/alert';


export class BudgetBlock extends React.Component {

  constructor(props) {
    super(props);

    this.layoutYPos = 0;

    this.state = {
      pan: new Animated.ValueXY(0, 0),
      reordering: false,
    };
  }

  animatePositionChange() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  dragEnded() {
    this.setState({
      reordering: false
    });

    this.props.dragEndedCallback();
    Animated.spring(this.state.pan, {
      toValue: 0,   // Returns to the start
      tension: 200, //speed
      friction: 12, //overshoot
    }).start();
  }

  onLayout(e) {
    this.layoutYPos = e.nativeEvent.layout.y;
    this.props.onLayout(e);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.props.dragStartCallback();
        this.setState({
          reordering: true
        });
      },
      onPanResponderMove: (event) => {
        const gestureYPos = (event.nativeEvent.pageY - this.layoutYPos - this.props.yOffset) + this.props.scrollOffset;

        const touches = event.touchHistory.touchBank[1];
        const movingDown = touches.previousPageY < touches.currentPageY ? true : false;

        this.state.pan.setValue({x: 0, y: gestureYPos});
        this.props.dragMoveCallback(this.props.blockId, event.nativeEvent.pageY, movingDown);
      },
      onPanResponderRelease: () => this.dragEnded(),
      onPanResponderTerminate: () => this.dragEnded(),
    });
  };

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
      <Animated.View ref="outerView" onLayout={(e) => this.onLayout(e)} style={{
        marginBottom: 20,
        width: 270,
        backgroundColor: this.state.reordering ? 'green' : 'transparent',
      }}>
        <Animated.View style={{
          top: this.state.pan.y,
          backgroundColor: 'grey',
        }}>

          <Text {...this.panResponder.panHandlers}>MOVE ME</Text>

          <Text>Block Title: { this.props.budgetBlock.title }</Text>
          <TextInput
            style={{height: 20, width: 270, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
            onChangeText={(text) => this.updateTitle(text)}
            value={ this.props.budgetBlock.title } />

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
      </Animated.View>
    );
  }
}
