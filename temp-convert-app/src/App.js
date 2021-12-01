import './App.css';
import { Component } from "react"

// components
import ErrorDisplay from './components/ErrorDisplay';
import InputZipCode from './components/InputZipCode';
import TemperatureDisplay from './components/TemperatureDisplay';

// API KEY
const myOpenWeatherApiKey = "your_api_key" /* <-- replace with your api key here (using https://home.openweathermap.org/api_keys)*/

class App extends Component {
  // states
  state = {
    temperature: null,
    zipCode: ""
  }

  // effects
  async getTemperature() {
    try {
      console.log("obtaining temperature...")
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipCode},us&appid=${myOpenWeatherApiKey}`)
      
      if (response.ok) {
        let data = await response.json()
        if (data) {
          this.setState({temperature: data.main.temp})
        }
      }
      else {
        this.setState({temperature: null})
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.zipCode !== this.state.zipCode) {
      this.getTemperature()
    }
  }

  // handlers
  updateZipCode = (newZipCode) => {
    this.setState({zipCode: newZipCode})
  }

  // render
  renderDisplay() {
    // don't show any display if no zip code has been entered
    if (!this.state.zipCode) {
      return null
    }
    // show an error if we don't get back valid data
    else if (!this.state.temperature) {
      return <ErrorDisplay message="Unable to get temperature information from your zip code." />
    }

    return (
      <div className="App">
        <TemperatureDisplay tempInKelvin={this.state.temperature}/>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h2>Temperature Conversion App</h2>
        <InputZipCode updateZipCode={this.updateZipCode} buttonText="Get Temperature"/>
        { this.renderDisplay() }
      </div>
    );
  }
}

export default App;
