import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { updateList } from '../slices/listSlice';
import { Link, useParams } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer'
import styled from 'styled-components';

import ItemList from '../components/ItemList';
import Footer from '../components/Footer';
import IconButton from '../components/IconButton';
import ButtonHeader from '../components/ButtonHeader';

import { getList, removeItem, updateItem, removeChecked } from '../services/api';

const Container = styled.div`
  background-image: url(/${props => props.theme.backgroundImage});
  min-height: 100vh;
`;

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
  const history = useHistory();
  const {listId} = useParams();

  const [isIdle, setIdle] = useState(false);

  useIdleTimer({
    timeout: 1000 * 60 * 5,
    debounce: 500,
    onIdle: () => setIdle(true),
    onActive: () => setIdle(false),
  })

  useEffect(() => {
    let timeoutId;
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
        if (!isIdle) {
          timeoutId = setTimeout(fetchList, 1000 * 10);
        }
      }
    }

    fetchList();

    return () => {
      if (timeoutId) { clearTimeout(timeoutId); }
    };
  }, [listId, dispatch, isIdle]);

  const addNewItemDestination = `/addNewItem/${listId}`;

  function handleAddToCategory (category) {
    history.push({
      pathname: addNewItemDestination,
      search: `?categoryId=${category.id}`
    });
  }

  function handleEditCategory (category) {
    history.push({
      pathname: `/editCategory/${listId}/${category.id}`,
    });
  }

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

  return (
    <Container>
      <ButtonHeader label={list?.name}>
          <Link to='/' target="_blank">
            <IconButton icon='fas fa-external-link-square-alt' text='New'/>
          </Link>
          <Link to={addNewItemDestination}>
            <IconButton icon='fas fa-plus-circle' text='Add'/>
          </Link>
          <IconButton icon='fas fa-edit' text='Edit' onClick={toggleEditMode} highlight={editMode}/>
          <IconButton icon='fas fa-trash' text='Clear' onClick={handleRemoveChecked}/>
      </ButtonHeader>
      <Contents>
        {list?.categories?.length > 0 && (
          <ItemList 
            categories={list?.categories}
            editMode={editMode}
            onEditCategory={handleEditCategory}
            onRemoveItem={handleRemoveItem}
            onSetItemChecked={handleSetItemChecked}
            onAddToCategory={handleAddToCategory}
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