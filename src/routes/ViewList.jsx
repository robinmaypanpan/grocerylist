import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateList } from '../slices/listSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Label from '../components/Label';
import ItemList from '../components/ItemList';
import Footer from '../components/Footer';
import IconButton from '../components/IconButton';
import MenuBar from '../components/MenuBar';

import { getList, removeItem, updateItem, removeChecked } from '../services/api';

const Container = styled.div`
  background-image: url(/leaves_small.png);
  min-height: 100vh;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  width:100vw;
  z-index: 10;
  background-color: ${props => props.theme.background};
  border-bottom: ${props => props.theme.headerBorder};
  padding-bottom: 8px;
  padding-top: 8px;
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

function ViewList(props) {
  const list = useSelector((state) => state.list.value)
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

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

  async function handleRemoveChecked () {
    const newList = await removeChecked(listId);
    dispatch(updateList(newList));
  }

  async function handleSetItemChecked (item, checked) {
    const newList = await updateItem(item, {checked, listId});
    dispatch(updateList(newList));
  }

  const toggleEditMode = () => setEditMode(!editMode);

  const addNewItemDestination = `/addNewItem/${listId}`;

  return (
    <Container>
      <Header>
        <Label>{list.name}</Label>
        <MenuBar>
          <Link to='/' target="_blank">
            <IconButton icon='fas fa-external-link-square-alt' text='New'/>
          </Link>
          <Link to={addNewItemDestination}>
            <IconButton icon='fas fa-plus-circle' text='Add'/>
          </Link>
          <IconButton icon='fas fa-edit' text='Edit' onClick={toggleEditMode} highlight={editMode}/>
          <IconButton icon='fas fa-trash' text='Clear' onClick={handleRemoveChecked}/>
        </MenuBar>
      </Header>
      <Contents>
        {list?.categories?.length > 0 && (
          <ItemList 
            categories={list.categories}
            editMode={editMode}
            onRemoveItem={handleRemoveItem}
            onSetItemChecked={handleSetItemChecked}
          />
        )}
        {error && (
          <>
            <ErrorContainer>Error</ErrorContainer>
            <ErrorDescription>{error}</ErrorDescription>
          </>
        )}
        {loading && (<LoadingContainer>Loading...</LoadingContainer>)}
      </Contents>
      <Footer/>
    </Container>
  );
}

export default ViewList;