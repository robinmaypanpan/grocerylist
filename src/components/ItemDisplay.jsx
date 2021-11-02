import { useState } from "react";
import styled from "styled-components"
const ItemDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    flex-basis: auto;
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
`
const Icon = styled.i`
    color: red;
    margin-right: 0.5em;
`;
//className='fas fa-times-circle'
function ItemDisplay({ item, editMode, onRemoveItem }) {
    const [isChecked, setChecked] = useState(false);

    function handleOnChange() {
        if(!editMode) setChecked(!isChecked);
    }
    function handleOnClick() {
        onRemoveItem(item.id);
    }
    return (
            <ItemDiv onClick={handleOnChange}>
                <ItemSpan strikeText={isChecked}>
                    {editMode ? <Icon onClick={handleOnClick} className='fas fa-times-circle' /> : null}
                    {item.name}
                </ItemSpan>
                <CheckBox type='checkbox' checked={isChecked} onChange={handleOnChange} />
            </ItemDiv>

    )
}
export default ItemDisplay