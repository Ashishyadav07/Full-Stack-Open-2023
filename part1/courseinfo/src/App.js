const App = () => {
  const Header = props => <h1>{props.course}</h1>
  const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = (props) => {
  const parts = props.parts

  return (
    <div>
      {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

  const Total = (props) => {
  const parts = props.parts

  const total = parts.reduce((acc, part) => acc + part.exercises, 0)

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App