import { Component } from "react"

class ErrorDisplay extends Component {

  componentDidMount() {
    console.log("!! There was an error !!")
  }

  componentWillUnmount() {
    console.log("++ The error was resolved ++")
  }

  render() {
    return (
      <div>
        <p className="error">Error: { this.props.message }</p>
      </div>
    )
  }
}

export default ErrorDisplay;