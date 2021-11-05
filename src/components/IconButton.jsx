import styled from 'styled-components';

const Container = styled.button`
    display: flex;
    flex-direction: column;
    background: ${props => props.highlight ? props.theme.highlight : props.theme.button};
    background-image: linear-gradient(rgba(255,0,0,0), ${props => props.theme.buttonGradient});
    border: ${props => props.theme.buttonBorder};
    border-radius: 10px;
    width: 80px;
    height: 85px;
    padding: 5px;
    cursor: pointer;
    flex-grow: 0;
    align-items: center;
    justify-content: center;
    gap: 3px;
`;

export const Label = styled.div`
    color: ${props => props.theme.iconColor};
    font-size: 1.3em;
    text-align: center;
`;

export const Icon = styled.i`
    color: ${props => props.theme.iconColor};
    margin: 0.1em auto 0em auto;
    font-size: 1.7em;
`;

export default function IconButton({icon, text, onClick, highlight}) {
    return (
        <Container onClick={onClick} highlight={highlight}>
            <Icon className={icon}/>
            <Label>{text}</Label>
        </Container>
    );
}