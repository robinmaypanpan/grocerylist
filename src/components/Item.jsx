import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    border-style: solid;
    border-width: 1px 0px 0px 0px;
    border-color: white;
`;

const Text = styled.span`
    height: 100%;
    width: 93.5%;
    margin: 1em 0.5em;
    font-size: 1.5em;
    color:${props => props.theme.dataText};
`;

function Item({item, onClick}) {
    return (
        <Container>
            <Text onClick={onClick}>{item.name}</Text>
        </Container>
    );
}

export default Item;