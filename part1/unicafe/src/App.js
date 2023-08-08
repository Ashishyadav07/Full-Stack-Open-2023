import { useState } from "react";

const Button = ({ name, handleClick }) => {
	return (
		<button onClick={() => handleClick((prevState) => prevState + 1)}>
			{name}
		</button>
	);
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positivePercentage = (good / total) * 100;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      
      <div>
        <strong>Good</strong> {good}
      </div>
      <div>
        <strong>Neutral</strong> {neutral}
      </div>
      <div>
        <strong>Bad</strong> {bad}
      </div>
      <div>
        <strong>Total</strong> {total}
      </div>
      <div>
        <strong>Average</strong> {average}
      </div>
      <div>
        <strong>Positive Percentage</strong> {positivePercentage}%
      </div>
    </div>
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
 