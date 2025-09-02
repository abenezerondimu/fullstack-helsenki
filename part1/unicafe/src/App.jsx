import { useState } from "react"
const Title = ({ text }) => <h1>{text}</h1>

let theTotal = 0
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ value, text }) => {

  if (text === "good") {
    return (
      <tbody>
        <tr><td>{text} {value}</td></tr>
      </tbody>
    )
  }
  if (text === "neutral") {
    return (
      <tbody>
        <tr>
          <td>{text} {value}</td>
        </tr>
      </tbody>
    )
  }
  if (text === "bad") {
    return (
      <tbody>
        <tr>
          <td>{text} {value}</td>
        </tr>
      </tbody>
    )
  }
  if (text === "total") {
    theTotal = value[0] + value[1] + value[2]
    return (
      <tbody>
        <tr>
          <td>{text} {theTotal}</td>
        </tr>
      </tbody>
    )
  }
  if (text === "average") {
    // console.log(theTotal)
    return (
      <tbody>
        <tr>
          <td>{text} {(value[0] - value[1]) / theTotal}</td>
        </tr>
      </tbody>
    )
  }
  if (text === "positive") {
    return (
      <tbody>
        <tr>
          <td>{text} {(value[0] / theTotal) * 100} %</td>
        </tr>
      </tbody>
    )
  }
}
const Statistics = ({ good, neutral, bad }) => {
  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={[good, neutral, bad]} />
        <StatisticLine text="average" value={[good, bad]} />
        <StatisticLine text="positive" value={[good, neutral, bad]} />
      </table>
    )
  }
  return (
    <div>No feedback given</div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <Title text={"give feedback"} />
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <Title text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App