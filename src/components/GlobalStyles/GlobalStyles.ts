import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.palette.bg};
    color: ${({ theme }) => theme.palette.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.30s linear;
  }

  a {
    color: ${({ theme }) => theme.palette.buttonActive};
  }

  a:hover {
    color: ${({ theme }) => theme.palette.buttonHover};
  }

  .form-check-input {
    background-color: ${({ theme }) => theme.palette.button};
    border-color: ${({ theme }) => theme.palette.button};
  }

  .form-check-input:checked {
    background-color: ${({ theme }) => theme.palette.buttonHover};
    border-color: ${({ theme }) => theme.palette.button};
  }
`
  