import styled from "styled-components";

const Container = styled.div`
    margin:5px;
    color: ${props => props.theme.dataText};
    border: ${props => props.theme.dataBorder};
    border-radius: ${props => props.theme.dataBorderRadius};  
`;

const Label = styled.span`
    position: relative;
    top: -9px;
    left: 4px;
    padding: 2px 5px;

    font-size: 1.2em;
    font-weight: bold;
    
    color: ${props => props.theme.dataText};
    border: ${props => props.theme.dataBorder};
    border-radius: ${props => props.theme.dataBorderRadius};

    background-color: ${props => props.theme.categoryBackground};
`;

const Contents = styled.div`
    margin 2px;
`;

function CategoryDisplay({category, children}) {
    return (
        <Container>
            <Label>{category.name}</Label>
            <Contents>
                {children}
            </Contents>
        </Container>
    );
}

export default CategoryDisplay;