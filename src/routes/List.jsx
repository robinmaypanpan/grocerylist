import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateList } from '../slices/listSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ItemList from '../components/ItemList';
import StyledButton from '../components/StyledButton';
import PageWrapper from '../components/PageWrapper';

import { getList, removeItem } from '../services/api';

const Header = styled.section`
  position:absolute;
  top: 2vh;
  left: 7.5vw;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
`;

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

const Contents = styled.section`
  position: absolute;  
  top: 20vh;
  height: 80vh;
  width: 100vw;
  left: 0;
`;

function List(props) {
  const list = useSelector((state) => state.list.value)
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const listId = props.match.params.listId;

  useEffect(() => {
    async function fetchList() {
      setLoading(true);
      try {
        const newList = await getList(listId);
        dispatch(updateList(newList));
      } catch(error) {
        console.error('Received error: ' + error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchList();
  }, [listId, dispatch]);

  async function handleRemoveItem (itemId) {
    const newList = await removeItem(itemId, listId);
    dispatch(updateList(newList));
  }

  const addNewItemDestination = `/addNewItem/${listId}`;

  return (
    <PageWrapper>
      <Header>
        <Title>{list.name}</Title>
        <Link to={addNewItemDestination}>
          <StyledButton>Add New Item</StyledButton>
        </Link>
      </Header>
      <Contents>
        {list?.items?.length > 0 && (<ItemList list={list.items} onRemoveItem={handleRemoveItem}/>)}
        {error && (
          <>
            <ErrorContainer>Error</ErrorContainer>
            <ErrorDescription>{error}</ErrorDescription>
          </>
        )}
        {loading && (<LoadingContainer>Loading...</LoadingContainer>)}
      </Contents>
    </PageWrapper>
  );
}

export default List;