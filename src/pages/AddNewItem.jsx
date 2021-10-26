import React, {useState} from 'react';
import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import PageWrapper from '../components/PageWrapper';

const ItemInput = styled.input`
    display: block;
    width: 80vw;

    font-size: 1.2em;
    padding: 0.5em;
    margin: 2em auto;

    border: 2px solid #d45b12;
    border-radius: 10px;
`;

const BottomButton = styled(StyledButton)`
    position:absolute;
    bottom: 2vh;
    left: 7.5vw;
    width: 85vw;
`;

const Header = styled.div`
    position:absolute;
    top: 2vh;
    width: 100vw;
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
            body: JSON.stringify(data)
        });

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
            <Header>
                <StyledButton onClick={handleAddButton}>Add Item</StyledButton>
                <ItemInput 
                    autoFocus
                    type='text' 
                    value={itemName} 
                    onChange={handleTextChange}
                    onKeyPress={handleKeyPress}
                />      
            </Header>      
            <BottomButton onClick={handleBackButton}>Cancel</BottomButton>
        </PageWrapper>
    );
}

export default AddNewItem;