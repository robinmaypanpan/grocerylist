import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import reportWebVitals from './reportWebVitals';
import Router from './Router';

import { Provider } from 'react-redux';
import store from './store';

import Footer from './components/Footer';
import styled, {ThemeProvider} from 'styled-components';
import autumnTheme from './themes/autumn';

const Background = styled.div`
  background-color: ${props => props.theme.background}
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={autumnTheme}>
        <Background>
          <Router/>
          <Footer/>
        </Background>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
