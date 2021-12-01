import { Component } from "react"

class TemperatureDisplay extends Component {
  // NOTE: Yes, you probably can refactor this component to eliminate these state values, but we've added them for the sake of understanding life-cycle methods better, so please do not remove them. 

  // state
  state = {
    tempInCelsius: null,
    tempInFahrenheit: null
  }

  // effects
  updateTempValues() {
    let tC = this.props.tempInKelvin - 273.15
    let tF = (tC * 9 / 5) + 32

    this.setState({
      tempInCelsius: tC.toFixed(2),
      tempInFahrenheit: tF.toFixed(2)
    })
  }

  componentDidMount() {
    this.updateTempValues()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tempInKelvin !== this.props.tempInKelvin) {
      this.updateTempValues()
    }
  }

  render() {
    return (
      <div>
        <p>Current Temperature:</p>
        <span className="temperature">
          { this.state.tempInCelsius }
          <span className="units">°C</span>
          &nbsp;&nbsp;&nbsp;&nbsp; 
          { this.state.tempInFahrenheit }
          <span className="units">°F</span>
        </span>
      </div>
    )
  }
}

export default TemperatureDisplay;