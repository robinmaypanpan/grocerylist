import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import LabelledInput from '../components/LabelledInput';
import Label from '../components/Label';
import IconButton from '../components/IconButton';
import ButtonHeader from '../components/ButtonHeader';

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

const Container = styled.div`
    background-image: url(/${props => props.theme.backgroundImage});
    min-height: 100vh;
`;

const Prompt = styled.div`
    width: 85%;
    margin: 0.6em auto 0em auto;
    padding: 8px;
    margin-bottom: 4px;

    border: ${props => props.theme.dataBorder};
    border-radius: ${props => props.theme.dataBorderRadius};
    background-color: ${props => props.theme.categoryBackground}
`;

const Contents = styled.section`
  width: 100vw;
`;

function NewList() {
  const [listId, setListId] = useState();
  const [listName, setListName] = useState('Grocery List');

  async function handleNewListButton() { 
    if (!listName) return;

    const {listId: newListId} = await createList(listName);

    setListId(newListId);
  }

  const handleTextChange = ({target}) => setListName(target.value);

  const partialUrl = `list/${listId}`;
  const fullUrl = window.location.href + partialUrl;

  const handleCopy = () => navigator.clipboard.writeText(fullUrl);

  return (
    <Container>
      {listId ?(
        <>
        <ButtonHeader label='List Created!'>
          <IconButton icon='fas fa-paste' text='Copy' onClick={handleCopy}/>
          <Link to={partialUrl}>
            <IconButton icon='far fa-paper-plane' text='Go' onClick={handleNewListButton}/>
          </Link>
        </ButtonHeader>
        <Contents>
          <Prompt>
            <Label>This is your personal and private URL. Keep it somewhere safe!</Label>
            <URLDisplay>{fullUrl}</URLDisplay>
            <Label>If you lose this URL, you lose access to your list!</Label>
          </Prompt>
        </Contents>
        </>
      ) : (
        <>
        <ButtonHeader label='Household List Creator'>
          <IconButton icon='fas fa-hammer' text='Create' onClick={handleNewListButton}/>
        </ButtonHeader>
        <Contents>
         <LabelledInput 
            prompt='Enter a name for your list'
            value={listName}
            onChange={handleTextChange}
            onSubmit={handleNewListButton}
          />
        </Contents>
        </>
      )}
    </Container>
  );
}

export default NewList;