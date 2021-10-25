import React, {useState} from 'react';
import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import PageWrapper from '../components/PageWrapper';

const ItemInput = styled.input`
    display: block;

    font-size: 1.2em;

    padding: 0.2em 0.5em;
    border: 2px solid #d45b12;
    border-radius: 10px;
    width: 85%;
    margin: 0.6em auto;
`;

const BottomButton = styled(StyledButton)`
    justify-content: bottom;
`;

function AddNewItem() {
    const [itemName, setItemName] = useState('');

    async function handleAddButton() {
        if (!itemName) return;
        const data = {name: itemName};

        await fetch('/api/addItem', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        window.location = '/';
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
            <StyledButton onClick={handleAddButton}>Add Item</StyledButton>
            <ItemInput autoFocus type='text' value={itemName} onChange={handleTextChange}/>            
            <BottomButton onClick={handleBackButton}>Cancel</BottomButton>
        </PageWrapper>
    );
}

export default AddNewItem;