import './App.css';
import { React, useState, useEffect, useRef } from "react"

// components
import ErrorDisplay from './components/ErrorDisplay';
import InputZipCode from './components/InputZipCode';
import TemperatureDisplay from './components/TemperatureDisplay';

// API KEY
const myOpenWeatherApiKey = "" /* <-- replace with your api key here (using https://home.openweathermap.org/api_keys)*/

function App() {
  // states
  // state = {
  //   temperature: null,
  //   zipCode: ""
  // }

  const [temperature, setTemperature] = useState(null)
  const [zipCode, setZipCode] = useState("")

  let firstRender = useRef(true)

  // effects
  const getTemperature = async () => {
    try {
      console.log("obtaining temperature...")
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${myOpenWeatherApiKey}`)

      if (response.ok) {
        let data = await response.json()
        if (data) {
          setTemperature(data.main.temp)
        }
      }
      else {
        setTemperature(null)
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.zipCode !== this.state.zipCode) {
  //     this.getTemperature()
  //   }
  // }

  useEffect(() => {
    // console.log(firstRender)
    // console.log(firstRender.current)
    // const prevZipCode = firstRender.current
    // if (prevZipCode.zipCode !== zipCode) {
    if (!firstRender.current) {
      getTemperature()
      firstRender.current = true
    }
  })

  // handlers
  const updateZipCode = (newZipCode) => {
    setZipCode(newZipCode)
    firstRender.current = false       // NEW!!!!!!!!!!!!!!!!!!!!!!!
  }

  // render
  const renderDisplay = () => {
    // don't show any display if no zip code has been entered
    if (!zipCode) {
      return null
    }
    // show an error if we don't get back valid data
    else if (!temperature) {
      return <ErrorDisplay message="Unable to get temperature information from your zip code." />
    }

    return (
      <div className="App">
        <TemperatureDisplay tempInKelvin={temperature} />
      </div>
    )
  }

  return (
    <div className="App">
      <h2>Temperature Conversion App</h2>
      <InputZipCode updateZipCode={updateZipCode} buttonText="Get Temperature" />
      {renderDisplay()}
    </div>
  );
}

export default App;
