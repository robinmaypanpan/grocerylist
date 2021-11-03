import { useState } from "react";
import styled from "styled-components"

const ItemDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    flex-basis: auto;
    flex-wrap: no-wrap;
    width: 100%;
    color: ${props => props.theme.dataText};
    border-style: solid;
    border-width: 1px 0px 0px 0px;
    text-align: middle;
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
    margin-right: 1.5em;
    transform: scale(2);
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
        <ItemDiv onClick={handleToggleChecked}>
            {editMode ? <Icon onClick={handleOnClick} className='fas fa-times-circle' /> : null}
            <ItemSpan strikeText={item.checked}>
                {item.name}
                <br />
                <DateSpan>
                    Added on xx/xx
                </DateSpan>
            </ItemSpan>
            <EmptyElement/>
            <CheckBox type='checkbox' checked={item.checked} onChange={handleToggleChecked} />
        </ItemDiv>
    )
}
export default ItemDisplay