import { useState } from "react";
import styled from "styled-components"

const ItemDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%-16px;
    color: ${props => props.theme.dataText};
    border: ${props => props.theme.dataBorder};
    border-radius: ${props => props.theme.dataBorderRadius};
    margin: 8px;
    margin-top: 0px;
    max-width: 800px;
    text-align: middle;
    background-color: ${props => props.theme.dataBackground};
    background-image: linear-gradient(rgba(255,0,0,0), ${props => props.theme.dataGradient});

    &.checked {
        background: ${props => props.theme.dataCheckedBackground};
    }
`;

const ItemSpan = styled.span`
    font-size: 1.5em;
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    margin: 0.7em 0.5em;
    text-decoration: ${props => props.strikeText ? 'line-through' : ''};
`;

const CheckBox = styled.input`
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    margin-right: 2em;
    transform: scale(3);
    border: ${props => props.theme.dataCheckboxBorder};
    background-color: ${props => props.theme.dataCheckboxBackground};
    
    &:checked {
        background: ${props => props.theme.dataCheckboxCheckedBackground};
    
        &:after {
            content: '\\2714';
            font-size: 14px;
            position: absolute;
            top: 0px;
            left: 1px;
            color: ${props => props.theme.dataCheckboxCheckColor};
        }
    }

    &:active {
        box-shadow: 0 1px 2px rgba(0,0,0,0.1), inset 0px 1px 3px rgba(0,0,0,0.2);
    }

`;

const Icon = styled.i`
    margin-left: 0.7em;
    font-size: 1.5em;
    color: red;
    margin-right: 0.5em;
`;
const DateSpan = styled.p`
    font-size: 0.6em;
    margin: auto;
`;
const EmptyElement = styled.span`
    flex-grow: 3;
`;

function ItemDisplay({ item, editMode, onRemoveItem, onSetItemChecked }) {
    function handleToggleChecked() {
        if(!editMode) onSetItemChecked(item, !item.checked);
    }

    function handleOnClick() {
        onRemoveItem(item.id);
    }
    return (
        <ItemDiv className={item.checked ? "checked" : null}>
            {editMode ? <Icon onClick={handleOnClick} className='fas fa-times-circle' /> : null}
            <ItemSpan strikeText={item.checked}>
                {item.name}
                <br />
                <DateSpan>
                    Added on xx/xx
                </DateSpan>
            </ItemSpan>
            <EmptyElement/>
            <div>
                <CheckBox type='checkbox' checked={item.checked} onChange={handleToggleChecked} />
            </div>
        </ItemDiv>
    )
}
export default ItemDisplay