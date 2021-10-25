import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: scroll;
    height: 700px;
    width: 100%;
`;

const Item = styled.div`
    font-size: 1.5em;
    margin-left: 0.5em;
    padding:0.15em;
    color:white;
`;

const Line = styled.hr`
    width: 100%;
    height: 1px;
    color: gray;
    background-color: gray;
    border-style: none;
`;

function ItemList({ list }){
    const items = list.map((item) => (
      <>
        <Item key={item.id}>{item.name}</Item>
        <Line key={`Line${item.id}`}/>
      </>
    ))
    
    return (
      <Container>
        <Line/>
        {items}
      </Container>
    );
}

export default ItemList;