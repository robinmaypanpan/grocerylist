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

    background: ${props => props.theme.button};

    font-size: 1.5em;
    padding: 0.5em 1em;
    border: 2px solid ${props => props.theme.button};
    border-radius: 10px;
    width: 85vw;
    margin: 0.6em auto 0 auto;
`;

export default Button;