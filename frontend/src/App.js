import { useState } from 'react';
import Chatbot from './components/Chatbot';
import InitialInformation from './components/InitialInformation';
import './App.css';

function App() {

  const [initialInformation, setInitialInformation] = useState({});
  const [activateChatbot, setActivateChatbot] = useState(false);

  return (
    <div className="App">
      <div className='heading-div'>
        <h2>Meal Planner</h2>
      </div>
      {activateChatbot ? <Chatbot initialInformation={initialInformation} />
        : <InitialInformation setInitialInformation={setInitialInformation} doneCallback={() => setActivateChatbot(true)} />
      }
    </div>
  );
}

export default App;
