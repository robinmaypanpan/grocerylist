import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateList } from '../slices/listSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ItemList from '../components/ItemList';
import StyledButton from '../components/StyledButton';
import PageWrapper from '../components/PageWrapper';

const ErrorContainer = styled.div`
  position: absolute;
  top: 35%;
  text-align: center;
  width: 100%;
  color: #F3BC2E;
  font-size: 5em;
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
  font-size: 2em;
  height: 700px;  
`;

const TopButton = styled(StyledButton)`
    position:absolute;
    top: 2vh;
    left: 7.5vw;
`;

const Contents = styled.div`
  position: absolute;  
  top: 14vh;
  height: 86vh;
  width: 100vw;
  left: 0;
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
  const list = useSelector((state) => state.list.value)
  const dispatch = useDispatch();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await fetch('/api/list');
        const json = await response.json();
        dispatch(updateList(json));
      } catch(error) {
        console.error('Received error: ' + error);
        setError(error);
      }
    }

    fetchList();
  }, [dispatch]);

  return (
    <PageWrapper>
      <Link to='/addNewItem'>
        <TopButton>Add New Entry</TopButton>
      </Link>
      <Contents>
        {renderContents(list, error)}
      </Contents>
    </PageWrapper>
  );
}

export default Home;
