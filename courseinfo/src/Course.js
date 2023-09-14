const Headers = ({name}) => {
    return <h2>{name}</h2>
}
  
const Content = ({parts}) => {
    return(
      <div>
        {parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </div>
    )
}
  
const Total = ({parts}) => {
    const test = parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
      <b>total of {test} exercises</b>
    )
}
  
const Course = ({courses}) => {
    return (
        <div>
        <h1>Web development curriculum</h1>
        {courses.map((course) => (<div key={course.id}>
          <Headers name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
          </div>))}
        </div>
    )
}

export default Course;
  