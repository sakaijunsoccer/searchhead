import React, { useState } from 'react';

import './App.css';
import Helper from "./utils/Helper";

const App = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [promiseInProgress, setpromiseInProgress] = useState(false);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setQuery(enteredName);
  };

  const search = () => {
    setErrorMessage('');
    setpromiseInProgress(true);
     fetch('/api/v1/search?' + Helper.generateQueryString(query))
        .then((response) => response.json())
        .then((data) => {
           setpromiseInProgress(false);
           if (data.events && data.events.length > 0){
            setEvents(data.events);
           }else{
            setErrorMessage("no events");
           }
           if (data.errorMessage) {
            setErrorMessage(data.errorMessage);
           }
        })
        .catch((err) => {
          console.log(err.errorMessage);
        });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <input
          value={query}
          onChange={inputHandler}
          placeholder=""
          className="input"
        />

        <button onClick={search}>Search</button>
      </div>

      <div className="errorMessage">
        {errorMessage && ( <h2 className="errorMessage"> {errorMessage} </h2>)}
      </div>
      <div className="search-result">
        {promiseInProgress && (<h3>Loading...</h3>)}
        {
          events.map((event, index) => (
            <li key={index} className="event">
              <span className="event-data">{event}</span>
            </li>
          )) 
        }
      </div>
    </div>
  );
};

export default App;