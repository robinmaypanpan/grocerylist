import styled from "styled-components"
import dateFormat from "dateformat";


const ItemDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%-16px;
    color: ${props => props.theme.dataText};
    border: ${props => props.theme.dataBorder};
    border-radius: ${props => props.theme.dataBorderRadius};
    margin: 4px 8px;
    margin-top: 0px;
    max-width: 800px;
    text-align: middle;
    background-color: ${props => props.theme.dataBackground};
    background-image: linear-gradient(rgba(255,0,0,0), ${props => props.theme.dataGradient});
    background: ${props => props.checked ? props.theme.dataCheckedBackground : null};
`;

const ItemSpan = styled.span`
    font-size: 1.3em;
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
    cursor: pointer;
    
    &:checked {
        background: ${props => props.theme.dataCheckboxCheckedBackground};
    
        &:after {
            content: '\\2714';
            font-size: 14px;
            position: absolute;
            top: -3px;
            left: 1px;
            color: ${props => props.theme.dataCheckboxCheckColor};
        }
    }

    &:active {
        box-shadow: 0 1px 2px rgba(0,0,0,0.1), inset 0px 1px 3px rgba(0,0,0,0.2);
    }

`;

const Icon = styled.i`
    margin-left: 0.5em;
    font-size: 1.8em;
    color: ${props => props.theme.deleteButtonColor};
`;

const DateSpan = styled.p`
    font-size: 0.6em;
    margin: auto;
    color: ${props => props.theme.dateColor};
`;

const Spacer = styled.span`
    flex-grow: 3;
`;

function ItemDisplay({ item, editMode, onRemoveItem, onEditItem, onSetItemChecked }) {
    function handleClickItem() {
        if (editMode) onEditItem(item);
    }
    
    function handleToggleChecked() {
        if (!editMode) onSetItemChecked(item, !item.checked);
    }

    function handleClickRemove() {
        onRemoveItem(item.id);
    }

    function formatDateAdded(timestamp) {
        const dateAdded = new Date(timestamp);
        const formattedDate = dateFormat(dateAdded, "mm/dd");
        return formattedDate;
    }

    return (
        <ItemDiv onClick={handleClickItem} checked={item.checked}>
            {editMode ? <Icon onClick={handleClickRemove} className='fas fa-times-circle' /> : null}
            <ItemSpan strikeText={item.checked}>
                {item.name}
                <br />
                <DateSpan>
                    Added on {formatDateAdded(item.timestamp)}
                </DateSpan>
            </ItemSpan>
            <Spacer />
            {!editMode ?
                <div>
                    <CheckBox type='checkbox' onClick={handleToggleChecked} checked={item.checked} readOnly/>
                </div>
                : null}
        </ItemDiv>
    )
}
export default ItemDisplay