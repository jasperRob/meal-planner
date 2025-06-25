import { useState } from 'react';
import './InitialInformation.css';

export default function InitialInformation({ setInitialInformation, doneCallback }) {
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [inclusions, setInclusions] = useState('');
  const [exclusions, setExclusions] = useState('');

  const handleChange = (key, value) => {
    const updated = {
      dietaryRequirements: dietaryRequirements,
      mealsPerDay: mealsPerDay,
      numberOfPeople: numberOfPeople,
      inclusions: inclusions,
      exclusions: exclusions,
      [key]: value,
    };
    setInitialInformation(updated);

    switch (key) {
      case 'dietaryRequirements': setDietaryRequirements(value); break;
      case 'mealsPerDay': setMealsPerDay(value); break;
      case 'numberOfPeople': setNumberOfPeople(value); break;
      case 'inclusions': setInclusions(value); break;
      case 'exclusions': setExclusions(value); break;
      default: break;
    }
  };

  const toggleSelection = (item, currentList, key) => {
    const updated = currentList.includes(item)
      ? currentList.filter(i => i !== item)
      : [...currentList, item];
    handleChange(key, updated);
  };

  return (
    <div className="container">

      <p>To get started, please answer the following questions so we can understand more about your needs and preferences. Click the 'Done' button below once you are finished.</p>

      <h4 className='question-title'>Do you have any dietary requirements? (eg. vegetarian, gluten free)</h4>
      <input
        value={dietaryRequirements}
        onChange={(e) => handleChange('dietaryRequirements', e.target.value)}
      />

      <h4 className='question-title'>Which meals should we plan for? (select all that apply)</h4>
      <div className="button-group">
        {['breakfast', 'lunch', 'dinner'].map(option => (
          <button
            key={option}
            className={mealsPerDay.includes(option) ? 'selected' : ''}
            onClick={() => toggleSelection(option, mealsPerDay, 'mealsPerDay')}
          >
            {option}
          </button>
        ))}
      </div>

      <h4 className='question-title'>How many people are we planning for?</h4>
      <input
        type="number"
        min="1"
        value={numberOfPeople}
        onChange={(e) => handleChange('numberOfPeople', parseInt(e.target.value) || 1)}
      />

      <h4 className='question-title'>Any specific ingredients to include in meals?</h4>
      <input
        value={inclusions}
        onChange={(e) => handleChange('inclusions', e.target.value)}
      />

      <h4 className='question-title'>Any specific ingredients to exclude from meals?</h4>
      <input
        value={exclusions}
        onChange={(e) => handleChange('exclusions', e.target.value)}
      />

      <div className="done-button-container">
        <button className="done-button" onClick={() => doneCallback()}>
          Done
        </button>
      </div>
    </div>
  );
}
