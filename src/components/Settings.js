import React from 'react-native';
import RatingRequestor from 'react-native-rating-requestor';
let {
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableHighlight
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


export class Settings extends React.Component {

  render() {
    return (
      <View style={[styles.container]}>
        <Text>Settings</Text>
        <Text>Currency Symbol: £</Text>
        <Picker
          style={{backgroundColor: 'red'}}
          selectedValue={'£'}
          onValueChange={(symbol) => console.log(symbol)}>
          <Picker.Item label="£" value="£" />
          <Picker.Item label="$" value="$" />
          <Picker.Item label="€" value="€" />
          <Picker.Item label="¥" value="¥" />
        </Picker>
        <TouchableHighlight onPress={() => RatingTracker.showRatingPopup()}>
          <Text>Leave rating</Text>
        </TouchableHighlight>
      </View>
    );
  }

}
