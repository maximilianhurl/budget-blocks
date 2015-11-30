var React = require('react-native');
let {
  StyleSheet,
  View,
} = React;

import { BudgetListContainer } from './components/BudgetListContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export class App extends React.Component {

  render() {

    return (
      <View style={styles.container}>

        <BudgetListContainer />

      </View>
    );
  }
};
