import ItemDisplay from './ItemDisplay';
import styled from "styled-components"
import CategoryDisplay from './CategoryDisplay';

const ListContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding-top: 8px;
`;

function ItemList({categories, editMode, onRemoveItem, onSetItemChecked, onAddToCategory, onEditCategory})
{
  return (
    <ListContainer>
      {categories.filter((category) => category.items.length > 0).map((category) => (
        <CategoryDisplay 
          key={category.id}
          category={category}
          editMode={editMode}
          onAddToCategory={onAddToCategory}
          onEditCategory={onEditCategory}
        >
          {category.items.map((item) => (
            <ItemDisplay 
              key={item.id}
              item={item}
              editMode={editMode}
              onRemoveItem={onRemoveItem}
              onSetItemChecked={onSetItemChecked}
            />
          ))}
        </CategoryDisplay>
      ))}
    </ListContainer>
  ); 
}
export default ItemList