const Header = (props) => {
  const courseName = props.name.name
  return (
    <>
      <h1>{courseName}</h1>
    </>
  )
}
const Part = (props) => {

  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  )
}
const Content = (props) => {
  const part = props.parts

  return (
    <>
      <div>
        <Part name={part.parts[0].name} exercises={part.parts[0].exercises}/>
        <Part name={part.parts[1].name} exercises={part.parts[1].exercises}/>
        <Part name={part.parts[2].name} exercises={part.parts[2].exercises}/>
      </div>
    </>
  )
}

const Total = (props) => {
  let totalAmount = props.exercise.parts[0].exercises + props.exercise.parts[1].exercises+ props.exercise.parts[2].exercises
  return (
    <>
      <p>
        Number of exercises {totalAmount}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course}/>
      <Content parts={course}/>
      <Total exercise={course} />
    </div>
  )
}

export default App
