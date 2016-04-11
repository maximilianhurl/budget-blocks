import React from 'react-native';
import RatingRequestor from 'react-native-rating-requestor';
let {
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions
} = React;

let RatingTracker = new RatingRequestor('1059221816', {
  title: 'Leave Rating',
  actionLabels: {
    decline: 'No thanks',
    delay: 'Later',
    accept: 'Rate now'
  }
});

const styles = StyleSheet.create({
  container: {
    marginTop: 60
  }
});

class PickerView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      positionAnimation: new Animated.Value(Dimensions.get('window').height),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uistore.currencyPickerVisible) {
      this.animateIn();
    } else {
      this.animateOut();
    }
  }

  animateIn() {
    Animated.timing(
      this.state.positionAnimation,
      {
        toValue: 0,
        duration: 250,
        easing: Easing.easeInOutQuint
      }
    ).start();
  }

  animateOut() {
    Animated.timing(
      this.state.positionAnimation,
      {
        toValue: Dimensions.get('window').height,
        duration: 250,
        easing: Easing.easeInOutQuint
      }
    ).start();
  }

  render() {
    return (
      <Animated.View style={{top: this.state.positionAnimation}}>
        <View>
           <TouchableHighlight onPress={() => this.props.uiactions.toggleCurrencyPicker()}>
            <Text>Done</Text>
          </TouchableHighlight>
        </View>
        <Picker
          selectedValue={this.props.uistore.currencySymbol}
          onValueChange={(symbol) => this.props.uiactions.setCurrencySymbol(symbol)}>
          {this.props.uistore.currencySymbols.map((currencySymbol) => {
            return (<Picker.Item
              key={currencySymbol}
              label={currencySymbol}
              value={currencySymbol} />);
          })}
        </Picker>
      </Animated.View>
    );
  }
}

export class Settings extends React.Component {

  render() {

    return (
      <View>
        <View style={[styles.container]}>
          <Text>Settings</Text>
          <TouchableHighlight onPress={() => this.props.uiactions.toggleCurrencyPicker()}>
            <Text>Currency Symbol: {this.props.uistore.currencySymbol}</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => RatingTracker.showRatingPopup()}>
            <Text>Leave rating</Text>
          </TouchableHighlight>
        </View>

        <PickerView {...this.props}/>

      </View>
    );
  }

}
