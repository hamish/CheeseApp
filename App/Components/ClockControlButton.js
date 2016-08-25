import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styles from './Styles/ClockControlButtonStyle'

export default class ClockControlButton extends React.Component {

  // // Prop type warnings
  // static propTypes = {
  //   someProperty: React.PropTypes.object,
  //   someSetting: React.PropTypes.bool.isRequired
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>ClockControlButton Component</Text>
      </TouchableOpacity>



      </View>
    )
  }
}
