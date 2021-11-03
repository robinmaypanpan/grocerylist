import ItemDisplay from './ItemDisplay';
function ItemList({list, editMode, onRemoveItem, onSetItemChecked})
{
  return (
    <div>
      {list.map((item) => (
        <ItemDisplay 
          key={item.id}
          item={item}
          editMode={editMode}
          onRemoveItem={onRemoveItem}
          onSetItemChecked={onSetItemChecked}
        />)
      )}
    </div>
  ); 
}
export default ItemList