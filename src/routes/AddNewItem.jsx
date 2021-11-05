import React, {useState} from 'react';
import { updateList } from '../slices/listSlice';
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import styled from 'styled-components';
import StyledButton, {Icon as ButtonIcon, Label as ButtonLabel} from '../components/StyledButton';
import ItemInput from '../components/ItemInput';
import Label from '../components/Label';
import IconButton from '../components/IconButton';
import MenuBar from '../components/MenuBar';

import { addItem } from '../services/api';

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

function AddNewItem(props) {
    const [itemName, setItemName] = useState('');
    const [categoryName, setCategoryName] = useState('Uncategorized');
    const dispatch = useDispatch();
    const history = useHistory();

    const listId = props.match.params.listId;

    async function handleAddButton() {
        if (!itemName) return;
        const newList = await addItem(itemName, listId, categoryName);
        dispatch(updateList(newList));

        history.push(`/list/${listId}`);
    }

    const handleKeyPress = ({key}) => key === 'Enter' && handleAddButton();
    const handleNameChange = ({target}) => setItemName(target.value);
    const handleCategoryChange = ({target}) => setCategoryName(target.value);
    const handleBackButton = () => history.goBack();

    return (
        <Container>
            <Header>
                <Label>Add a new item</Label>
                <MenuBar>
                    <IconButton icon='fas fa-times-circle' text='Cancel' onClick={handleBackButton}/>
                    <IconButton icon='fas fa-plus-circle' text='Add' onClick={handleAddButton}/>
                </MenuBar>
            </Header>
            <Contents>
                <Label htmlFor='itemInput'>Item name:</Label>
                <ItemInput 
                    autoFocus
                    type='text' 
                    value={itemName} 
                    onChange={handleNameChange}
                    onKeyPress={handleKeyPress}
                    id='itemInput'
                />
                <Label htmlFor='itemInput'>Item category:</Label>
                <ItemInput 
                    type='text' 
                    value={categoryName} 
                    onChange={handleCategoryChange}
                    onKeyPress={handleKeyPress}
                    id='itemInput'
                />
            </Contents>
        </Container>
    );
}

export default AddNewItem;