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
      <ul>
          {list.map((item) => <li>{item.name}</li>)}
      </ul>
      
    </div>
  ); 
}
export default ItemList