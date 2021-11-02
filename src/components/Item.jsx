import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;

    border-style: solid;
    border-width: 1px 0px 0px 0px;
    border-color: white;
`;

const Text = styled.span`
    height: 100%;
    width: 93.5%;
    margin: 0.7em 0.1em;
    font-size: 1.5em;
    color:${props => props.theme.dataText};
`;

const Icon = styled.i`
    font-size: 1.9em;
    margin: auto 7px;
    color:${props => props.color}
`;

function Item({item, editMode, onRemoveItem}) {
    const handleRemoveItem = () => onRemoveItem(item.id);
    return (
        <Container>
            {editMode ? <Icon onClick={handleRemoveItem} className='fas fa-times-circle' color='red'/> : null}
            <Text>{item.name}</Text>
        </Container>
    );
}

export default Item;