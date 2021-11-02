import { useState } from "react";
import styled from "styled-components"
const ItemDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    flex-basis: auto;
    width: 100%;
    color: ${props=>props.theme.dataText};
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
    text-decoration: ${props=>props.strikeText?'line-through':''};
`;
const CheckBox  = styled.input`
    transform: scale(2);
    margin-right: 1.5em;
`
function ItemDisplay({item})
{
    const [isChecked, setChecked] = useState(false);

    function handleOnChange(){
        setChecked(!isChecked);
    }

    return (
        <ItemDiv onClick={handleOnChange}>
            <ItemSpan strikeText={isChecked}>
                {item.name}
            </ItemSpan>
            <CheckBox type='checkbox' checked={isChecked} onChange={handleOnChange}/>
        </ItemDiv>
    )
}
export default ItemDisplay