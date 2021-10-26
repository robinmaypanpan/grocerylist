import styled from 'styled-components';
import { useDispatch } from 'react-redux'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    border-style: solid;
    border-width: 1px 0px 0px 0px;
    border-color: white;
`;

const Text = styled.span`
    height: 100%;
    width: 93.5%;
    margin: 1em 0.5em;
    font-size: 1.5em;
    color:white;
`;

function Item({item}) {
    const dispatch = useDispatch();
    async function handleClick() {
        const response = await fetch('/api/removeItem', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item) 
        });
        const json = await response.json();
        dispatch({type: 'UPDATE_LIST', payload: json});
    }

    return (
        <Container>
            <Text onClick={handleClick}>{item.name}</Text>
        </Container>
    );
}

export default Item;