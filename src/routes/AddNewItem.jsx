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
    max-width: 800px;
    margin: auto;
    padding-top: 8px;
`;

function AddNewItem(props) {
    const [itemName, setItemName] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const listId = props.match.params.listId;

    async function handleAddButton() {
        if (!itemName) return;
        const newList = await addItem(itemName, listId);
        dispatch(updateList(newList));

        history.push(`/list/${listId}`);
    }

    const handleKeyPress = ({key}) => key === 'Enter' && handleAddButton();
    const handleTextChange = ({target}) => setItemName(target.value);
    const handleBackButton = () => history.goBack();

    return (
        <Container>
            <Label htmlFor='itemInput'>Enter the item description</Label>
            <ItemInput 
                autoFocus
                type='text' 
                value={itemName} 
                onChange={handleTextChange}
                onKeyPress={handleKeyPress}
                id='itemInput'
            />    
            <StyledButton onClick={handleAddButton}>
                <ButtonIcon className="fas fa-plus-circle"/>
                <ButtonLabel>Add Item</ButtonLabel>
            </StyledButton>  
            <StyledButton onClick={handleBackButton}>
                <ButtonIcon className="fas fa-times-circle"/>
                <ButtonLabel>Cancel</ButtonLabel>
            </StyledButton>
        </Container>
    );
}

export default AddNewItem;