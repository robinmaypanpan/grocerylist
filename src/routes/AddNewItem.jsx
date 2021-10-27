import React, {useState} from 'react';
import { updateList } from '../slices/listSlice';
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import PageWrapper from '../components/PageWrapper';
import ItemInput from '../components/ItemInput';

import { addItem } from '../services/api';

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