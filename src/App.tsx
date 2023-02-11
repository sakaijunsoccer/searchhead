import React, { useState } from 'react';

import './App.css';

const App = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [promiseInProgress, setpromiseInProgress] = useState(false);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const generateQueryString = (query: string) => {
    const words = query.split(' ').filter(Boolean);
    const queryStringArray = [];
    const keywords = [];
    for(let i=0; i < words.length; i++){
        const keyValues = words[i].split('=');
        if (keyValues.length === 2){
            const [key, value] = keyValues;
            if ((key !== 'filename') && (key !== 'limit')){
              // TODO (sakaijunsoccer) Implement key=value serach in log file
              keywords.push(encodeURIComponent(words[i]))
            }
            queryStringArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(value)) 
        }else{
            keywords.push(encodeURIComponent(words[i]))
        }
    }
    queryStringArray.push("keywords=" + keywords.join(','))
    return queryStringArray.join('&');
  };

  const search = () => {
    setErrorMessage('');
    setEvents([]);
    const queryString =  generateQueryString(query)
    if (!queryString){
      return
    }
    setpromiseInProgress(true);
    fetch('/api/v1/search?' + generateQueryString(query))
      .then((response) => response.json())
      .then((data) => {
         setpromiseInProgress(false);
         if (data.events && data.events.length > 0){
          setEvents(data.events);
         }else{
          setErrorMessage("no events");
         }
         if (data?.errorMessage) {
          setErrorMessage(data.errorMessage);
         }
      })
      .catch((err) => {
        setpromiseInProgress(false);
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <input
          value={query}
          onChange={inputHandler}
          className="input"
        />

        <button onClick={search}>Search</button>
      </div>

      <div className="errorMessage">
        {errorMessage && ( <h2 className="errorMessage"> {errorMessage} </h2>)}
      </div>
      
      <div className="searchResult">
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
