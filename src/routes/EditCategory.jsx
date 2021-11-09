import {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components';

import LabelledInput from '../components/LabelledInput';
import IconButton from '../components/IconButton';
import ButtonHeader from '../components/ButtonHeader';

import { updateList } from '../slices/listSlice';
import { updateCategory, getList } from '../services/api';

const Container = styled.div`
    background-image: url(/${props => props.theme.backgroundImage});
    min-height: 100vh;
`;

const Contents = styled.section`
  width: 100vw;
`;

function EditCategory () {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const {listId, categoryId} = useParams();
    const list = useSelector((state) => state?.list?.value)
    const category = list?.categories?.find((category) => category?.id  === parseInt(categoryId, 10));

    const [name, setName] = useState(category?.name);
    const [aisle, setAisle] = useState(category?.sortOrder);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleBackButton = () => history.goBack();

    async function handleSaveButton() {
        // Validate new items
        const newList = await updateCategory(name, category.id, aisle, listId);
        dispatch(updateList(newList));

        history.push(`/list/${listId}`);
    }

    const handleNameChange = ({target}) => setName(target.value);
    const handleSortOrderChange = ({target}) => setAisle(target.value);

  useEffect(() => {
    async function fetchList() {
      setLoading(true);
      try {
        const newList = await getList(listId);
        const category = list?.categories?.find((category) => category?.id  === parseInt(categoryId, 10));
        setName(category.name);
        setAisle(category.sortOrder);
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
  }, [list, loading, error, listId, dispatch, setName, setAisle, categoryId]);

    return (
        <Container>
            <ButtonHeader label='Edit Category'>
                <IconButton icon='fas fa-times-circle' text='Cancel' onClick={handleBackButton}/>
                <IconButton icon='fas fa-check' text='Save' onClick={handleSaveButton}/>
            </ButtonHeader>
            <Contents>
            <LabelledInput 
                prompt='Category name:'
                value={name}
                onChange={handleNameChange}
                onSubmit={handleSaveButton}
            />
            <LabelledInput 
                prompt='Aisle for category:'
                value={aisle}
                onChange={handleSortOrderChange}
                onSubmit={handleSaveButton}
            />
            </Contents>
        </Container>
    );
}

export default EditCategory;