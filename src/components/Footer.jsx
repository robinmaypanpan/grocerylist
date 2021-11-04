import styled from 'styled-components';
import version from '../version';

const Container = styled.footer`
    font-size: 0.3em;
    text-align: center;
    color: ${props => props.theme.footerColor};
`;

const VersionText = styled.span`
    font-weight: bold;
`;

const CopyrightText = styled.span`
`;

function Footer() {
    return (
        <Container>
            <VersionText>Version {version.major}.{version.minor}.{version.revision} </VersionText>
            <CopyrightText>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></CopyrightText>
        </Container>
    )
}

export default Footer;