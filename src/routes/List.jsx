import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateList } from '../slices/listSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ItemList from '../components/ItemList';
import StyledButton, {Icon as ButtonIcon, Label as ButtonLabel} from '../components/StyledButton';
import Label from '../components/Label';
import Footer from '../components/Footer';

import { getList, removeItem } from '../services/api';

const Header = styled.header`
  position: sticky;
  top: 0;
  padding-bottom: 15px;
  background-color: ${props => props.theme.background}
`

const Contents = styled.section`
  width: 100vw;
`;

const ErrorContainer = styled.div`
  text-align: center;
  width: 100%;
  color: ${props => props.theme.label};
  font-size: 5em;
`;

const ErrorDescription = styled.div`
  padding: 50px;
  text-align: center;
  width: 100% - 50px;
  color: ${props => props.theme.dataText};
  font-size: 1em;
`;

const LoadingContainer = styled.div`
  text-align: center;
  width: 100%;
  color: ${props => props.theme.label};
  font-size: 2em;
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
    <>
      <Header>
        <Label>{list.name}</Label>
        <Link to={addNewItemDestination}>
          <StyledButton>
              <ButtonIcon className="fas fa-plus-circle"/>
              <ButtonLabel>Add New Item</ButtonLabel>
          </StyledButton>  
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
      <Footer/>
    </>
  );
}

export default List;