import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemList from '../components/ItemList';

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

const ErrorContainer = styled.div`
  position: absolute;
  top: 35%;
  text-align: center;
  width: 100%;
  color: #F3BC2E;
  font-size: 8em;
  height: 700px;
`;

const ErrorDescription = styled.div`
  position: absolute;
  top: 60%;
  padding: 50px;
  text-align: center;
  width: 100% - 50px;
  color: white;
  font-size: 1em;
  height: 700px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 40%;
  text-align: center;
  width: 100%;
  color: #F3BC2E;
  font-size: 4em;
  height: 700px;  
`;

function renderContents(list, error) {
  if (error) {
    return (
      <>
        <ErrorContainer>Error</ErrorContainer>
        <ErrorDescription>{error}</ErrorDescription>
      </>
    );
  }

  if (list && list?.length > 0) {
    return <ItemList list={list}/>
  }

  return <LoadingContainer>Loading...</LoadingContainer>;
}

function Home() {
  const [list, setList] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await fetch('/api/list');
        const json = await response.json();
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
