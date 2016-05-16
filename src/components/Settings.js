import React from 'react';
import RatingRequestor from 'react-native-rating-requestor';
import { COLOURS, GLOBAL_STYLES, } from '../utils/styles';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
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
  innerContainer: {
    backgroundColor: COLOURS.LIGHTBLUE,
  },
  innerContent: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
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
  },
  currencySymbol: {
    fontSize: 18,
    marginTop: (Platform.OS === 'ios') ? 0 : 2,
    marginLeft: 8,
  },
  currencyButton: {
    paddingBottom: 5,
  }
});

let RatingTracker = new RatingRequestor({
  appStoreId: '1099266102',
  marketId: null,
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
          itemStyle={[{color: 'white'}, GLOBAL_STYLES.BOLDFONT]}
          style={[{'marginHorizontal': 5}]}>
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
            style={[styles.currencyButton, styles.innerContent, GLOBAL_STYLES.ADDBUTTON]}>
            <Text
              style={[GLOBAL_STYLES.ADDBUTTONTEXT, GLOBAL_STYLES.BOLDFONT]}>
              CURRENCY SYMBOL
            </Text>
            <Text
              style={[GLOBAL_STYLES.ADDBUTTONTEXT, GLOBAL_STYLES.BOLDFONT, styles.currencySymbol]}>
                {this.props.uistore.currencySymbol}
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
