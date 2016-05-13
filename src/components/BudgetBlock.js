import React from 'react';
import objectMap from '../utils/objectMap';
import { BudgetBlockItem } from './BudgetBlockItem';
import { COLOURS, GLOBAL_STYLES } from '../utils/styles';
import zeroOrNaN from '../utils/zeroOrNaN';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text, View, TextInput, TouchableOpacity,
  PanResponder, Animated, LayoutAnimation, Alert,
  StyleSheet, Platform
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: COLOURS.LIGHTBLUE,
  },
  innerContent: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    flex: 0.8,
    margin: 0,
    paddingVertical: 0,
    fontSize: 18,
  },
  move: {
    flex: 0.07,
    height: 20,
    margin: 0,
    textAlign: 'center',
  },
  removeBtn: {
    flex: 0.07,
  },
  removeBtnText: {
    textAlign: 'right',
  },
  totalContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLOURS.DARKBUTTON,
    flexDirection: 'row',
  },
  totalCurrency: {
    marginRight: 5,
    marginTop: 3,
    fontSize: 16,
  },
  totalValue: {
    color: 'white',
    fontSize: 18,
  }
});


export class BudgetBlock extends React.Component {

  constructor(props) {
    super(props);

    this.layoutYPos = 0;

    this.state = {
      pan: new Animated.ValueXY(0, 0),
      reordering: false,
    };
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
        const touches = event.touchHistory.touchBank[(Platform.OS === 'ios') ? 1 : 0];
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
    this.props.budgetactions.addBudgetBlockItem(this.props.blockId, 'Outgoing...', '0');
  };

  updateTitle(title) {
    this.props.budgetactions.updateBudgetBlockTitle(
      this.props.blockId, title
    );
  };

  renderRemoveButton() {
    if (this.props.uistore.editControlsVisible) {
      return (<TouchableOpacity
        style={[styles.removeBtn]}
        onPress={() => Alert.alert(
          'Are you sure you want to remove this block?',
          null,
          [
            {text: 'Remove', onPress: () => this.removeBlock()},
            {text: 'Cancel'},
          ]
        )}>
         <Text style={[styles.removeBtnText]}>
          <Icon name="close-circled" size={18} color="white" />
        </Text>
      </TouchableOpacity>);
    }
    return null;
  }

  render() {

    //animate every change to the views
    LayoutAnimation.configureNext({
      duration: 250,
      create: {
        type: LayoutAnimation.Types.curveEaseInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.curveEaseInEaseOut,
      },
    });

    let budgets = objectMap(this.props.budgetBlock.items).map(item => {
      return (
        <BudgetBlockItem
          key={item.key}
          blockItem={item.obj}
          blockItemId={item.key}
          blockId={this.props.blockId}
          uistore={this.props.uistore}
          budgetactions={this.props.budgetactions}
          />
      );
    });

    return (
      <Animated.View onLayout={(e) => this.onLayout(e)} style={[
        { backgroundColor: this.state.reordering ? 'gray' : 'transparent' },
        styles.container
      ]}>
        <Animated.View style={[{top: this.state.pan.y}, styles.innerContainer]}>
          <View style={[styles.titleContainer]}>
            <TextInput
              style={[styles.title, GLOBAL_STYLES.BOLDFONT]}
              onChangeText={(text) => this.updateTitle(text)}
              underlineColorAndroid="black"
              value={ this.props.budgetBlock.title } />
            <Text style={[styles.move]} {...this.panResponder.panHandlers}>
              <Icon name="navicon-round" size={20} color="white" />
            </Text>

            { this.renderRemoveButton() }

          </View>

          { budgets }

          <TouchableOpacity
            onPress={() => this.addBudgetBlockItem()}
            style={[styles.innerContent, GLOBAL_STYLES.ADDBUTTON]}>
            <Text style={[GLOBAL_STYLES.ADDBUTTONTEXT, GLOBAL_STYLES.BOLDFONT]}>
              + ADD OUTGOING
            </Text>
          </TouchableOpacity>

          <View style={[styles.totalContainer, styles.innerContent]}>
            <Text style={[styles.totalCurrency, GLOBAL_STYLES.BOLDFONT]}>
              { this.props.uistore.currencySymbol }
            </Text>
            <Text style={[styles.totalValue, GLOBAL_STYLES.REGULARFONT]}>
              { zeroOrNaN(this.props.income) && this.props.budgetBlock.subtotal === 0 ?
                'Total' : this.props.budgetBlock.subtotal }
            </Text>
          </View>


        </Animated.View>
      </Animated.View>
    );
  }
}
