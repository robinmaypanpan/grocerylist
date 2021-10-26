import React, {useState} from 'react';
import { updateList } from '../slices/listSlice';
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import PageWrapper from '../components/PageWrapper';

const ItemInput = styled.input`
    position: absolute;
    top: 15vh;
    left: 7vw;
    width: 80vw;

    font-size: 1.2em;
    padding: 0.5em;

    border: 2px solid #d45b12;
    border-radius: 10px;
`;

const BottomButton = styled(StyledButton)`
    position:absolute;
    bottom: 2vh;
    left: 7.5vw;
`;

const TopButton = styled(StyledButton)`
    position:absolute;
    top: 2vh;
    left: 7.5vw;
`;

function AddNewItem() {
    const [itemName, setItemName] = useState('');
    const dispatch = useDispatch();

    async function handleAddButton() {
        if (!itemName) return;
        const data = {name: itemName};

        const response = await fetch('/api/addItem', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        dispatch(updateList(json));

        window.location = '/';
    }

    function handleKeyPress(event) {
        if(event.key === 'Enter'){
            handleAddButton();
        }
    }

    function handleTextChange(event) {
        const textBox = event.target;
        setItemName(textBox.value);
    }

    function handleBackButton() {
        window.location = '/';
    }

    return (
        <PageWrapper>
            <TopButton onClick={handleAddButton}>Add Item</TopButton>
            <ItemInput 
                autoFocus
                type='text' 
                value={itemName} 
                onChange={handleTextChange}
                onKeyPress={handleKeyPress}
            />            
            <BottomButton onClick={handleBackButton}>Cancel</BottomButton>
        </PageWrapper>
    );
}

export default AddNewItem;