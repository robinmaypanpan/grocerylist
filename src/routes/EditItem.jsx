import {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components';

import LabelledInput from '../components/LabelledInput';
import IconButton from '../components/IconButton';
import ButtonHeader from '../components/ButtonHeader';

import { updateList } from '../slices/listSlice';
import { updateItem, getList } from '../services/api';

const CATEGORY_NONE = 'Uncategorized';

const Container = styled.div`
  background-image: url(/${props => props.theme.backgroundImage});
  min-height: 100vh;
`;

const Contents = styled.section`
  width: 100vw;
`;

function EditItem () {
  // Assuming we already have the list, go ahead and find all our information about it.
  const {listId, itemId} = useParams();
  const list = useSelector((state) => state?.list?.value)

  const item = list?.items?.find((item) => item?.id === parseInt(itemId, 10));
  const [itemName, setItemName] = useState(item?.name);

  // This is the original category that the item had.
  const originalCategory = item ? list?.categories?.find((category) => category?.id === item?.categoryId) : {};

  const [categoryName, setCategoryName] = useState(originalCategory?.name || CATEGORY_NONE);

  // Find the actual category where the name matches, if any exist
  const matchingCategory = list?.categories?.find((category) => category?.name === categoryName);

  const initialCategoryOrder = matchingCategory?.sortOrder || 0;
  const [categoryOrder, setCategoryOrder] = useState(initialCategoryOrder);

  const history = useHistory();
  const dispatch = useDispatch();

  async function handleSaveButton() {
      // Validate new items
      const newList = await updateItem(itemId, listId, {name: itemName, categoryName, sortOrder: categoryOrder});
      dispatch(updateList(newList));

      history.push(`/list/${listId}`);
  }

  const handleNameChange = ({target}) => setItemName(target.value);
  const handleCategoryChange = ({target}) => setCategoryName(target.value);
  const handleSortOrderChange = ({target}) => setCategoryOrder(target.value);
  const handleBackButton = () => history.goBack();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // Load in the data for this item if we are coming to the page fresh.
  useEffect(() => {
    async function fetchList() {
      setLoading(true);
      try {
        const newList = await getList(listId);
        // This should trigger a rerender of this page so our appropriate data should come up
        dispatch(updateList(newList));
      } catch(error) {
        console.error('Received error: ' + error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    if (!list && !loading && !error) {
        fetchList();
    }
  }, [dispatch, error, list, listId, loading]);

    return (
        <Container>
            <ButtonHeader label='Edit Item'>
                <IconButton icon='fas fa-times-circle' text='Cancel' onClick={handleBackButton}/>
                <IconButton icon='fas fa-check' text='Save' onClick={handleSaveButton}/>
            </ButtonHeader>
            <Contents>
              <LabelledInput 
                  prompt='Item name:'
                  value={itemName}
                  onChange={handleNameChange}
                  onSubmit={handleSaveButton}
              />
              <LabelledInput 
                  prompt='Category name:'
                  value={categoryName}
                  onChange={handleCategoryChange}
                  onSubmit={handleSaveButton}
              />
              {matchingCategory ? null : (
                  <LabelledInput 
                      prompt='Aisle for new category:'
                      value={categoryOrder}
                      onChange={handleSortOrderChange}
                      onSubmit={handleSaveButton}
                  />
              )}
            </Contents>
        </Container>
    );
}

export default EditItem;