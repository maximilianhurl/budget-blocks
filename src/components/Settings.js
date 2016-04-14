import React from 'react-native';
import RatingRequestor from 'react-native-rating-requestor';
import { COLOURS, GLOBAL_STYLES } from '../utils/styles';

let {
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions
} = React;


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.DARKBLUE,
    marginTop: 55,
    paddingHorizontal: 20,
    paddingVertical: 25,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: COLOURS.LIGHTBLUE,
  },
  innerContent: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  title: {
    color: 'white',
    marginTop: 10,
    fontSize: 20,
  },
  picker: {
    marginTop: 20,
    paddingTop: 10,
  },
  pickerItem: {
    color: 'white',
    fontSize: 24,
  }
});

let RatingTracker = new RatingRequestor('1059221816', {
  title: 'Leave Rating',
  actionLabels: {
    decline: 'No thanks',
    delay: 'Later',
    accept: 'Rate now'
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
      <Animated.View style={[{top: this.state.positionAnimation}, styles.innerContainer, styles.picker]}>
        <View>
           <TouchableOpacity
            onPress={() => this.props.uiactions.toggleCurrencyPicker()}
            style={[styles.innerContent, GLOBAL_STYLES.ADDBUTTON]}>
            <Text style={[GLOBAL_STYLES.ADDBUTTONTEXT, GLOBAL_STYLES.BOLDFONT]}>DONE</Text>
          </TouchableOpacity>
        </View>
        <Picker
          selectedValue={this.props.uistore.currencySymbol}
          onValueChange={(symbol) => this.props.uiactions.setCurrencySymbol(symbol)}
          itemStyle={[{color: 'white'}, GLOBAL_STYLES.BOLDFONT]}>
          {this.props.uistore.currencySymbols.map((currencySymbol) => {
            return (<Picker.Item
              key={currencySymbol}
              label={currencySymbol}
              value={currencySymbol}/>);
          })}
        </Picker>
      </Animated.View>
    );
  }
}

export class Settings extends React.Component {

  render() {

    return (
      <View style={[styles.container]}>
        <View style={[styles.innerContainer]}>
          <Text style={[styles.title, GLOBAL_STYLES.BOLDFONT, styles.innerContent]}>SETTINGS</Text>
          <TouchableOpacity
            onPress={() => this.props.uiactions.toggleCurrencyPicker()}
            style={[styles.innerContent, GLOBAL_STYLES.ADDBUTTON]}>
            <Text
              style={[GLOBAL_STYLES.ADDBUTTONTEXT, GLOBAL_STYLES.BOLDFONT]}>
              CURRENCY SYMBOL {this.props.uistore.currencySymbol}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => RatingTracker.showRatingPopup()}
            style={[styles.innerContent, GLOBAL_STYLES.ADDBUTTON]}>
            <Text
              style={[GLOBAL_STYLES.ADDBUTTONTEXT, GLOBAL_STYLES.BOLDFONT]}>
              LEAVE RATING
            </Text>
          </TouchableOpacity>
        </View>

        <PickerView {...this.props}/>

      </View>
    );
  }

}
