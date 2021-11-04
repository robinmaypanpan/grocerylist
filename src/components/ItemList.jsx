import ItemDisplay from './ItemDisplay';
import styled from "styled-components"

const ListContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

function ItemList({list, editMode, onRemoveItem, onSetItemChecked})
{
  return (
    <ListContainer>
      {list.map((item) => (
        <ItemDisplay 
          key={item.id}
          item={item}
          editMode={editMode}
          onRemoveItem={onRemoveItem}
          onSetItemChecked={onSetItemChecked}
        />)
      )}
    </ListContainer>
  ); 
}
export default ItemList