import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: scroll;
    height: 100%;
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

function ItemList({ top, height, list }){
    return (
      <Container top={top} height={height}>
        <Line/>
        {list.map((item) => (
          <>
            <Item key={item.id}>{item.name}</Item>
            <Line key={`Line${item.id}`}/>
          </>
        ))}
      </Container>
    );
}

export default ItemList;