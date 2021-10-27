import styled from 'styled-components';

const Button = styled.button`
    display: block;

    background: ${props => props.theme.button};;
    color: ${props => props.theme.buttonText};;

    font-size: 1.5em;
    padding: 0.5em 1em;
    border: 2px solid ${props => props.theme.button};;
    border-radius: 10px;
    width: 85vw;
    margin: 0.6em auto 0 auto;
`;

export default Button;