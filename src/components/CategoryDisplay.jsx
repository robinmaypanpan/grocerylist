import styled from "styled-components";
import { useState } from 'react';

const Container = styled.div`
    margin:4px 5px; 
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;

    padding: 4px 5px;
    margin-bottom: 4px;

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

const SmallIcon = styled.i`
    text-align: center;
    width: 0.6em;
    margin-right: 0.2em;
    font-size: 1.3em;
`;

function CategoryDisplay({category, children, onAddToCategory, editMode, onEditCategory}) {
    const handleAddToCategory = () => { 
        if (!editMode) {
            onAddToCategory(category);
        }
    }
    const [collapsed, setCollapsed] = useState(false);
    const handleClickName = () => {
        if (!editMode) {
            setCollapsed(!collapsed);
        }
    }
    const handleClickCategory = () => {
        if (editMode) {
            onEditCategory(category);
        }
    }

    const collapseIcon = collapsed ? 'fas fa-caret-right' : 'fas fa-caret-down';

    return (
        <Container onClick={handleClickCategory}>
            <Header>
                <Label onClick={handleClickName}><SmallIcon className={collapseIcon}/>{category.name}</Label>
                <Spacer/>
                <Icon className='fas fa-plus-circle' onClick={handleAddToCategory}/>
            </Header>
            <Contents>
                {collapsed ? null : children}
            </Contents>
        </Container>
    );
}

export default CategoryDisplay;