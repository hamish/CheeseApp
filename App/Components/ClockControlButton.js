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
      <TouchableOpacity disabled={this.props.disabled} activeOpacity={this.props.disabled ? 0.5 : 1} style={styles.button} onPress={this.props.onPress}>
        <Text activeOpacity={this.props.disabled ? 0.5 : 1} style={styles.buttonText}>{this.props.label}</Text>
      </TouchableOpacity>



      </View>
    )
  }
}
