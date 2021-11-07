import styled from 'styled-components';
import Label from '../components/Label';

const Container = styled.div`
    width: 85%;
    margin: 0.6em auto 0em auto;
    padding: 8px;
    margin-bottom: 4px;

    border: ${props => props.theme.dataBorder};
    border-radius: ${props => props.theme.dataBorderRadius};
    background-color: ${props => props.theme.promptBackground}
`;

const ItemInput = styled.input`
    display: block;
    width: 80%;

    font-size: 1.2em;
    padding: 0.5em;
    margin: 0.2em auto;

    border: ${props => props.theme.promptBorder};
    border-radius: 10px;
`;

function LabelledInput({prompt, value, onChange, onSubmit, onClick, autoFocus}) {
    const handleKeyPress = ({key}) => key === 'Enter' && onSubmit();

    return (
        <Container>
            <Label htmlFor='itemInput'>{prompt}</Label>
            <ItemInput 
                autoFocus={autoFocus}
                type='text' 
                value={value} 
                onChange={onChange}
                onKeyPress={handleKeyPress}
                onClick={onClick}
                id='itemInput'
            />
        </Container>
    );
}

export default LabelledInput;