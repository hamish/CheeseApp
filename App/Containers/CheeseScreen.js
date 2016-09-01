import React, { PropTypes } from 'react'
import { View, ScrollView, Text, Image, LayoutAnimation, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import Clock from '../Components/Clock'
import ClockControlButton from '../Components/ClockControlButton'
import RoundedButton from '../Components/RoundedButton'
import { Metrics } from '../Themes'
import { Images } from '../Themes'

// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'

// Styles
import styles from './Styles/CheeseScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'


class CheeseScreen extends React.Component {

  constructor (props) {
    super(props)
    var timeStamp = Math.floor(Date.now() / 1000);

    this.state = {
      visibleHeight: Metrics.screenHeight,
      secondsSinceStart: 0, 
      secondsRemaining: 0,
      timerStatus: "STOPPED" // STOPPED, COUNTUP, COUNTDOWN
    }
    setInterval(
      ()=>{
        switch(this.state.timerStatus) {
          case "STOPPED":
            break;
          case "COUNTUP":
            var now = Math.floor(Date.now() / 1000);
            var sss = now - this.state.startTime;

            this.setState({secondsSinceStart:sss})
            break;
          case "COUNTDOWN":
            var now = Math.floor(Date.now() / 1000);
            var sscd = now - this.state.countDownTimerStart;
            var sr = Math.floor(this.state.floculationDuration * 1.5 - sscd);
            var newState={secondsRemaining:sr}
            if (sr == 0) {
              newState.timerStatus="STOPPED"
            }
            this.setState(newState);
            break;
        }
      }, 100);
  }

  buttonPress() {
    switch (this.state.timerStatus) {
      case "STOPPED":
        var now = Math.floor(Date.now() / 1000);
        this.setState({
          startTime: now,
          timerStatus: "COUNTUP",
          secondsSinceStart: 0,
          secondsRemaining: 0
        })
        break;
      case "COUNTUP":
        this.setState({
          timerStatus: "COUNTDOWN",
          countDownTimerStart: Math.floor(Date.now() / 1000),
          floculationDuration: this.state.secondsSinceStart
        })
        break;
      case "COUNTDOWN":
        this.setState({
          secondsSinceStart: 0,
          secondsRemaining: 0,
          timerStatus: "STOPPED"
        })
        break;
    }
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))

    // Configure nav button
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow (e) {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize
    })
  }

  keyboardDidHide (e) {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight
    })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />

      <ScrollView style={[styles.container, {height: this.state.visibleHeight}]}>
        <Clock text={this.state.secondsSinceStart}></Clock>
        <Clock text={this.state.secondsRemaining}></Clock>
        <ClockControlButton onPress={
          () => { 
            this.buttonPress(); // setState({secondsSinceStart:this.state.secondsSinceStart+1});
          }
        } label={this.state.timerStatus}></ClockControlButton>
      </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(CheeseScreen)
