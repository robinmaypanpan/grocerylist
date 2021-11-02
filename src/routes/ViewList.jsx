import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateList } from '../slices/listSlice';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Label from '../components/Label';
import ItemList from '../components/ItemList';
import Footer from '../components/Footer';
import IconButton from '../components/IconButton';
import MenuBar from '../components/MenuBar';

import { getList, removeItem } from '../services/api';

const Header = styled.header`
  position: sticky;
  top: 0;
  width:100vw;
  z-index: 10;
  background-color: ${props => props.theme.background};
  padding-bottom: 20px;
  padding-top: 5px;
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
  const history = useHistory();

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

  const toggleEditMode = () => setEditMode(!editMode);

  const addNewItemDestination = `/addNewItem/${listId}`;

  return (
    <>
      <Header>
        <Label>{list.name}</Label>
        <MenuBar>
          <Link to={addNewItemDestination}>
            <IconButton icon='fas fa-plus-circle' text='Add'/>
          </Link>
          <IconButton icon='fas fa-edit' text='Edit' onClick={toggleEditMode} highlight={editMode}/>
        </MenuBar>
      </Header>
      <Contents>
        {list?.items?.length > 0 && (<ItemList list={list.items} editMode={editMode} onRemoveItem={handleRemoveItem}/>)}
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

export default ViewList;