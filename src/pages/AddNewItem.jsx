import React, {useState} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  position: relative;
  min-height: 100vh;
  color: white;
`;

const ItemInput = styled.input`
    display: block;

    font-size: 1.2em;

    padding: 0.2em 0.5em;
    border: 2px solid #d45b12;
    border-radius: 10px;
    width: 85%;
    margin: 0.6em auto;
`;

const AddButton = styled.button`
    display: block;

    background: #d45b12;
    color: white;

    font-size: 1.5em;
    padding: 0.5em 1em;
    border: 2px solid #d45b12;
    border-radius: 10px;
    width: 85%;
    margin: 0.6em auto;
`;

function AddNewItem() {
    const [itemName, setItemName] = useState('');

    async function handleButton() {
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

    return (
        <Wrapper>
            <AddButton onClick={handleButton}>Add Item</AddButton>
            <ItemInput autoFocus type='text' value={itemName} onChange={handleTextChange}/>
        </Wrapper>
    );
}

export default AddNewItem;