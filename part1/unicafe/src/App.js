import { useState } from "react";

const Button = ({ name, handleClick }) => {
	return (
		<button onClick={() => handleClick((prevState) => prevState + 1)}>
			{name}
		</button>
	);
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(1);
  const positivePercentage = ((good / total) * 100).toFixed(1);
  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
    <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="Total" value={total} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={`${positivePercentage}%`} />
    </tbody>
  </table>
  );
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h2>Give Feedback</h2>
			<Button name="Good" handleClick={setGood} />
			<Button name="Neutral" handleClick={setNeutral} />
			<Button name="Bad" handleClick={setBad} />
      <h2>Statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
 