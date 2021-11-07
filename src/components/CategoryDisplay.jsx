import styled from "styled-components";

const Container = styled.div`
    margin:5px; 
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;

    padding: 4px 5px;

    color: ${props => props.theme.categoryText};
    border: ${props => props.theme.dataBorder};
    border-radius: ${props => props.theme.dataBorderRadius};

    background-color: ${props => props.theme.categoryBackground};
`;

const Label = styled.span`
    font-size: 1.2em;
    font-weight: bold;
`;

const Contents = styled.div`
    margin 2px;
`;

const Spacer = styled.span`
    flex-grow: 3;
`;

const Icon = styled.i`
    margin-right: 0.4em;
    font-size: 1.4em;
`;

function CategoryDisplay({category, children, onAddToCategory}) {
    const handleAddToCategory = () => onAddToCategory(category);

    return (
        <Container>
            <Header>
                <Label>{category.name}</Label>
                <Spacer/>
                <Icon className='fas fa-plus-circle' onClick={handleAddToCategory}></Icon>
            </Header>
            <Contents>
                {children}
            </Contents>
        </Container>
    );
}

export default CategoryDisplay;