import styled from 'styled-components';
import Item from './Item';

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: scroll;
    background-color: ${props => props.theme.background}
`;

function ItemList({ top, height, list, onRemoveItem, editMode}){
    return (
      <Container top={top} height={height}>
        {list.map((item) => <Item key={item.id} item={item} editMode={editMode} onRemoveItem={onRemoveItem}/>)}
      </Container>
    );
}

export default ItemList;