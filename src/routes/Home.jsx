import React, {useState} from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import PageWrapper from '../components/PageWrapper';
import StyledButton from '../components/StyledButton';
import ItemInput from '../components/ItemInput';

import { createList } from '../services/api';

const URLDisplay = styled.div`
  width: 85vw;
  text-align: center;
  font-size: 1.5em;

  margin: 2em auto;

  color: black;
  background-color: white;

  border: 2px solid #d45b12;
  border-radius: 10px;

  word-break: break-all;
  word-wrap: break-word;
`;

const Label = styled.div`
  color: #F3BC2E;
  text-align: center;
  font-size: 1.8em;
  padding-top:1em;
  padding-bottom: 0.5em;
`;

function Home() {
  const [listId, setListId] = useState();
  const [listName, setListName] = useState('Grocery List');
  const history = useHistory();

  async function handleNewListButton() { 
    if (!listName) return;

    const {listId: newListId} = await createList(listName);

    setListId(newListId);
  }

  const handleKeyPress = ({key}) => key === 'Enter' && handleNewListButton();
  const handleTextChange = ({target}) => setListName(target.value);

  const partialUrl = `list/${listId}`;
  const fullUrl = window.location.href + partialUrl;

  const handleGoToList = () => history.push(partialUrl);
  
  const handleCopy = () => navigator.clipboard.writeText(fullUrl);

  return (
    <PageWrapper>
      {listId ?(
        <>
          <Label>This is your personal and private URL. Keep it somewhere safe!</Label>
          <URLDisplay>{fullUrl}</URLDisplay>
          <Label>If you lose this URL, you lose access to your list!</Label>
          <StyledButton onClick={handleCopy}>Copy to clipboard</StyledButton>
          <StyledButton onClick={handleGoToList}>Go to your new list</StyledButton>
        </>
      ) : (
        <>
          <Label>Enter a title for your list</Label>
          <ItemInput 
              autoFocus
              type='text' 
              value={listName}
              onChange={handleTextChange}
              onKeyPress={handleKeyPress}
          />
          <StyledButton onClick={handleNewListButton}>Create New List</StyledButton>
        </>
      )}
    </PageWrapper>
  );
}

export default Home;