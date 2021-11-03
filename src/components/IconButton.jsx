import styled from 'styled-components';

const Container = styled.button`
    display: flex;
    flex-direction: column;

    background: ${props => props.highlight ? props.theme.highlight : props.theme.button};

    border: 2px solid ${props => props.theme.button};
    border-radius: 10px;
    width: 65px;
    padding: 5px;
`;

export const Label = styled.span`
    color: ${props => props.theme.iconColor};
    margin: 0.2em auto 0em auto;
    font-size: 1.3em;
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