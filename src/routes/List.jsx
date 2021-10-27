import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateList } from '../slices/listSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ItemList from '../components/ItemList';
import StyledButton, {Icon as ButtonIcon, Label as ButtonLabel} from '../components/StyledButton';
import PageWrapper from '../components/PageWrapper';
import Label from '../components/Label';

import { getList, removeItem } from '../services/api';

const Contents = styled.section`
  position: absolute;  
  top: 14vh;
  height: 86vh;
  width: 100vw;
  left: 0;
`;

const ErrorContainer = styled.div`
  position: absolute;
  top: 35%;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.label};
  font-size: 5em;
  height: 700px;
`;

const ErrorDescription = styled.div`
  position: absolute;
  top: 60%;
  padding: 50px;
  text-align: center;
  width: 100% - 50px;
  color: ${props => props.theme.dataText};
  font-size: 1em;
  height: 700px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 40%;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.label};
  font-size: 2em;
  height: 700px;  
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
      <header>
        <Label>{list.name}</Label>
        <Link to={addNewItemDestination}>
          <StyledButton>
              <ButtonIcon className="fas fa-list"/>
              <ButtonLabel>Add New Item</ButtonLabel>
          </StyledButton>  
        </Link>
      </header>
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