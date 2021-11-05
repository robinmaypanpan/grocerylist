import styled from 'styled-components';

export const Label = styled.span`
    color: ${props => props.theme.buttonText};
`;

export const Icon = styled.i`
    position:absolute;
    line-height: 24px;
    top:50%;
    margin-top: -12px; /* Half of line height to keep left middle postion of container */
    left: 10px;
    color: ${props => props.theme.iconColor};
`;

const Button = styled.button`
    position: relative;
    display: block;

    background: ${props => props.highlight ? props.theme.highlight : props.theme.button};
    background-image: linear-gradient(rgba(255,0,0,0), ${props => props.theme.buttonGradient});

    font-size: 1.5em;
    padding: 0.5em 1em;
    border: ${props => props.theme.buttonBorder};
    border-radius: 10px;
    width: 85%;
    margin: 0.6em auto;
    cursor: pointer;
`;

export default Button;