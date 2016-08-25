import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/ClockStyle'

export default class Clock extends React.Component {

  // // Prop type warnings
  // static propTypes = {
  //   text: React.PropTypes.String,
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
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </View>
    )
  }
}
