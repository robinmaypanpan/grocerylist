import styled from 'styled-components';
import Item from './Item';

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: scroll;
    height: 100%;
`;

function ItemList({ top, height, list, onRemoveItem}){
    return (
      <Container top={top} height={height}>
        {list.map((item) => <Item key={item.id} item={item} onClick={() => onRemoveItem(item.id)}/>)}
      </Container>
    );
}

export default ItemList;