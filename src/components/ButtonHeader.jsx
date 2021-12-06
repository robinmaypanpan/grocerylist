import styled from 'styled-components';
import MenuBar from '../components/MenuBar';
import Label from '../components/Label';

const Header = styled.header`
    position: sticky;
    top: 0;
    width:100vw;
    z-index: 10;
    background-color: ${props => props.theme.background};
    border-bottom: ${props => props.theme.headerBorder};
    padding-bottom: 8px;
    padding-top: 8px;
`

function ButtonHeader({label, children}) {
    return (
        <Header>
        <Label>{label}</Label>
        <MenuBar>
            {children}
        </MenuBar>
    </Header>
    );
}

export default ButtonHeader;