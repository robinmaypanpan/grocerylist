import React, {useState} from 'react';
import { updateList } from '../slices/listSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom";
import { useQueryParam, NumberParam } from 'use-query-params';

import styled from 'styled-components';
import ItemInput from '../components/ItemInput';
import Label from '../components/Label';
import IconButton from '../components/IconButton';
import MenuBar from '../components/MenuBar';

import { addItem } from '../services/api';

const CATEGORY_NONE = 'Uncategorized';

const Container = styled.div`
    background-image: url(/${props => props.theme.backgroundImage});
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
    const list = useSelector((state) => state.list.value)
    const [initialCategoryId] = useQueryParam('categoryId', NumberParam);
    const initialCategory = list.categories.find((category) => category?.id  === initialCategoryId);

    const [categoryName, setCategoryName] = useState(initialCategory?.name || CATEGORY_NONE);

    const matchingCategory = list.categories.find((category) => category?.name === categoryName);
    const initialCategoryOrder = matchingCategory?.sortOrder || 0;
    const [categoryOrder, setCategoryOrder] = useState(initialCategoryOrder);

    const [itemName, setItemName] = useState('');
    
    const dispatch = useDispatch();
    const history = useHistory();
    const {listId} = useParams();

    async function handleAddButton() {
        if (!itemName) return;
        const newList = await addItem(itemName, listId, categoryName, categoryOrder);
        dispatch(updateList(newList));

        history.push(`/list/${listId}`);
    }

    const handleKeyPress = ({key}) => key === 'Enter' && handleAddButton();
    const handleNameChange = ({target}) => setItemName(target.value);
    const handleCategoryChange = ({target}) => setCategoryName(target.value);
    const handleSortOrderChange = ({target}) => setCategoryOrder(target.value);
    const handleBackButton = () => history.goBack();
    const handleCategoryClick = () => {
        if(categoryName === CATEGORY_NONE) {
            setCategoryName('');
        }
    }

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
                    onClick={handleCategoryClick}
                    id='itemInput'
                />
                {matchingCategory ? null : (
                <>
                    <Label htmlFor='itemInput'>Aisle for new category:</Label>
                    <ItemInput 
                        type='text' 
                        value={categoryOrder} 
                        onChange={handleSortOrderChange}
                        onKeyPress={handleKeyPress}
                        id='itemInput'
                    />
                </>
                )}
            </Contents>
        </Container>
    );
}

export default AddNewItem;