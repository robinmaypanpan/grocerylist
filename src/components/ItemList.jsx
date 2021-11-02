import ItemDisplay from './ItemDisplay';
function ItemList({list})
{


  //var listOfNames = [];
  // for(var i = 0; i < list.length; i++)
  // {
  //   listOfNames[i] = list[i].name;
  // }

  //var listOfNames = list.map((item) => item.name);

  return (
    <div>
      {/* {listOfNames.join()} */}
      
          {list.map((item) => (<ItemDisplay item={item}/>))}
      
      
    </div>
  ); 
}
export default ItemList