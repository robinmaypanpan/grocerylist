import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import PageWrapper from '../components/PageWrapper';
import StyledButton, {Icon as ButtonIcon, Label as ButtonLabel} from '../components/StyledButton';
import ItemInput from '../components/ItemInput';
import Label from '../components/Label';

import { createList } from '../services/api';

const URLDisplay = styled.div`
  width: 85vw;
  text-align: center;
  font-size: 1.5em;

  margin: 2em auto;

  color: black;
  background-color: white;

  border: 2px solid ${props => props.theme.button};
  border-radius: 10px;

  word-break: break-all;
  word-wrap: break-word;
`;

function NewList() {
  const [listId, setListId] = useState();
  const [listName, setListName] = useState('Grocery List');

  async function handleNewListButton() { 
    if (!listName) return;

    const {listId: newListId} = await createList(listName);

    setListId(newListId);
  }

  const handleKeyPress = ({key}) => key === 'Enter' && handleNewListButton();
  const handleTextChange = ({target}) => setListName(target.value);

  const partialUrl = `list/${listId}`;
  const fullUrl = window.location.href + partialUrl;

  const handleCopy = () => navigator.clipboard.writeText(fullUrl);

  return (
    <PageWrapper>
      {listId ?(
        <>
          <Label>This is your personal and private URL. Keep it somewhere safe!</Label>
          <URLDisplay>{fullUrl}</URLDisplay>
          <Label>If you lose this URL, you lose access to your list!</Label>

          <StyledButton onClick={handleCopy}>
              <ButtonIcon className="fas fa-paste"/>
              <ButtonLabel>Copy to clipboard</ButtonLabel>
          </StyledButton>  
          <Link to={partialUrl}>

            <StyledButton>
                <ButtonIcon className="far fa-paper-plane"/>
                <ButtonLabel>Go to your new list</ButtonLabel>
            </StyledButton>  
          </Link>
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
          <StyledButton onClick={handleNewListButton}>
              <ButtonIcon className="fas fa-hammer"/>
              <ButtonLabel>Create New List</ButtonLabel>
          </StyledButton>  
        </>
      )}
    </PageWrapper>
  );
}

export default NewList;