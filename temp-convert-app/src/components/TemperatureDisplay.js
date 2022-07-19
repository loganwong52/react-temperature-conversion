import { React, useState } from "react"
import { useEffect, useRef } from "react/cjs/react.development"

function TemperatureDisplay(props) {
  // NOTE: Yes, you probably can refactor this component to eliminate these state values, but we've added them for the sake of understanding life-cycle methods better, so please do not remove them. 

  // state
  // state = {
  //   tempInCelsius: null,
  //   tempInFahrenheit: null
  // }
  const [tempInCelsius, setCelsius] = useState(null)
  const [tempInFahrenheit, setFarenheit] = useState(null)

  let firstRender = useRef(true)

  // effects
  const updateTempValues = () => {
    let tC = props.tempInKelvin - 273.15
    let tF = (tC * 9 / 5) + 32

    // this.setState({
    //   tempInCelsius: tC.toFixed(2),
    //   tempInFahrenheit: tF.toFixed(2)
    // })
    setCelsius(tC.toFixed(2))
    setFarenheit(tF.toFixed(2))
  }

  // const componentDidMount = () => {
  //   updateTempValues()
  // }

  useEffect(() => {
    updateTempValues()
    firstRender.current = false
  })

  // const componentDidUpdate = (prevProps, prevState) => {
  //   if (prevProps.tempInKelvin !== this.props.tempInKelvin) {
  //     updateTempValues()
  //   }
  // }

  useEffect(() => {
    // const previousKelvin = firstRender.current
    // if (previousKelvin.tempInKelvin !== props.tempInKelvin) {
    if (!firstRender.current) {
      updateTempValues()
      firstRender.current = true
    }
  })

  return (
    <div>
      <p>Current Temperature:</p>
      <span className="temperature">
        {tempInCelsius}
        <span className="units">°C</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {tempInFahrenheit}
        <span className="units">°F</span>
      </span>
    </div>
  )
}

export default TemperatureDisplay;