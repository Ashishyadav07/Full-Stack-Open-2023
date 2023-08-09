const Total = (props) => {
  
    const total = props.courses.parts.reduce((acc, part) => acc + part.exercises, 0)
  
    return (
      <div>
        <p><strong>Total of {total} exercises </strong></p>
      </div>
    )
  }
  export default Total