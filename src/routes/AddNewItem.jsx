import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom";
import { useQueryParam, NumberParam } from 'use-query-params';

import styled from 'styled-components';

import LabelledInput from '../components/LabelledInput';
import IconButton from '../components/IconButton';
import ButtonHeader from '../components/ButtonHeader';

import { updateList } from '../slices/listSlice';
import { addItem } from '../services/api';

const CATEGORY_NONE = 'Uncategorized';

const Container = styled.div`
    background-image: url(/${props => props.theme.backgroundImage});
    min-height: 100vh;
`;

const Contents = styled.section`
  width: 100vw;
`;

function AddNewItem(props) {
    const list = useSelector((state) => state?.list?.value)
    const [initialCategoryId] = useQueryParam('categoryId', NumberParam);
    const initialCategory = list?.categories?.find((category) => category?.id  === initialCategoryId);

    const [categoryName, setCategoryName] = useState(initialCategory?.name || CATEGORY_NONE);

    const matchingCategory = list?.categories?.find((category) => category?.name === categoryName);
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
            <ButtonHeader label='Add a new item'>
                <IconButton icon='fas fa-times-circle' text='Cancel' onClick={handleBackButton}/>
                <IconButton icon='fas fa-plus-circle' text='Add' onClick={handleAddButton}/>
            </ButtonHeader>
            <Contents>
                <LabelledInput 
                    prompt='Item name:'
                    value={itemName}
                    onChange={handleNameChange}
                    onSubmit={handleAddButton}
                />
                <LabelledInput 
                    prompt='Item category:'
                    value={categoryName}
                    onChange={handleCategoryChange}
                    onSubmit={handleAddButton}
                    onClick={handleCategoryClick}
                />
                {matchingCategory ? null : (
                    <LabelledInput 
                        prompt='Aisle for new category:'
                        value={categoryOrder}
                        onChange={handleSortOrderChange}
                        onSubmit={handleAddButton}
                    />
                )}
            </Contents>
        </Container>
    );
}

export default AddNewItem;