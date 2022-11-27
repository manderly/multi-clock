import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.palette.bgClocks};
    color: ${({ theme }) => theme.palette.textCopy};
    font-family: "Twemoji Country Flags", Tahoma, Helvetica, Arial, sans-serif;
    transition: all 0.30s linear;
  }

  h1, h2, h3 {
    color: ${({ theme }) => theme.palette.textHeader};
  }

  a {
    color: ${({ theme }) => theme.palette.a ? theme.palette.a : theme.palette.buttonActive};
  }

  a:hover {
    color: ${({ theme }) => theme.palette.buttonHover};
    opacity: 1;
  }

  .form-control {
    background-color: ${({ theme }) => theme.palette.button};
    border: 1px solid ${({ theme }) => theme.palette.button};
    color: ${({ theme }) => theme.palette.textCopy};
  }

  .form-control:focus {
    background-color: ${({ theme }) => theme.palette.button};
  }

  .form-control::placeholder {
    color: ${({ theme }) => theme.palette.textCopy} !important;
  }

  .timezone-picker-list {
    border: 1px solid ${({ theme }) => theme.palette.button};
  }

  .timezone-picker-list-item {
    background-color: ${({ theme }) => theme.palette.button};
  }

  .form-check-input {
    background-color: ${({ theme }) => theme.palette.button};
    border-color: ${({ theme }) => theme.palette.button};
  }

  .form-check-input:checked {
    background-color: ${({ theme }) => theme.palette.buttonHover};
    border-color: ${({ theme }) => theme.palette.button};
  }

  .btn-secondary {
    color:${props => props.theme.palette.textHeader} !important;
    background-color:${props => props.theme.palette.buttonHover} !important;
    border-color:${props => props.theme.palette.button} !important;
  }

  .btn-secondary:focus {
    background-color:${props => props.theme.palette.buttonActive} !important;
    border-color:${props => props.theme.palette.buttonActive} !important;
  }

  .btn-secondary:hover {
    background-color:${props => props.theme.palette.buttonActive} !important;
    border-color:${props => props.theme.palette.buttonActive} !important;
  }
`
  