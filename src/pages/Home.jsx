import './Home.css';
import React, {useEffect, useState} from 'react';

function renderContents(list, error) {
  if (error) {
    return <span>Error!</span>
  }

  if (list && list?.length > 0) {
    return (
      <ul>
        {list.map((item) => (<li key={item}>{item}</li>))}
      </ul>
    );
  }

  return <span>Loading...</span>;
}

function Home() {
  const [list, setList] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await fetch('/api/list');
        const json = await response.json();
        console.log('Received list: ' + json);
        setList(json);
      } catch(error) {
        console.error('Received error: ' + error);
        setError(error);
      }
    }

    fetchList();
  }, []);

  return (
    <div className="Home">
      {renderContents(list, error)}
    </div>
  );
}

export default Home;
