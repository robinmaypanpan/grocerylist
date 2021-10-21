import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  position: relative;
  min-height: 100vh;
  color: white;
`;

const Button = styled.button`
  display: block;

  background: #d45b12;
  color: white;

  font-size: 1.5em;
  padding: 0.5em 1em;
  border: 2px solid #d45b12;
  border-radius: 10px;
  width: 85%;
  margin: 0.6em auto;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Item = styled.div`
  font-size: 1.5em;
`;

function renderContents(list, error) {
  if (error) {
    return <span>Error!</span>
  }

  if (list && list?.length > 0) {
    return (
      <ItemList>
        {list.map((item) => (
          <Item key={item}>{item}</Item>
        ))}
      </ItemList>
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
    <Wrapper>
      <Link to='/addNewItem'>
        <Button>Add New Entry</Button>
      </Link>
      {renderContents(list, error)}
    </Wrapper>
  );
}

export default Home;
