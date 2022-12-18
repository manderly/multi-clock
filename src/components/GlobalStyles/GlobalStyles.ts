import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-size:18px;
    background: ${({ theme }) => theme.palette.bgClocks};
    color: ${({ theme }) => theme.palette.textCopy};
    font-family: "Twemoji Country Flags", Tahoma, Helvetica, Arial, sans-serif;
    transition: all 0.30s linear;
  }

  h1, h2, h3 {
    color: ${({ theme }) => theme.palette.textHeader};
  }
  
  h3 {
    font-weight: normal;
  }

  a {
    color: ${({ theme }) => theme.palette.a ? theme.palette.a : theme.palette.button.active};
  }

  a:hover {
    color: ${({ theme }) => theme.palette.button.hover};
    opacity: 1;
  }

  .form-control {
    background-color: ${({ theme }) => theme.palette.button.bg};
    border: 1px solid ${({ theme }) => theme.palette.button.bg};
    color: ${({ theme }) => theme.palette.button.text};
  }

  .form-control:focus {
    background-color: ${({ theme }) => theme.palette.button.bg};
  }

  .form-control::placeholder {
    color: ${({ theme }) => theme.palette.textCopy} !important;
  }

  .timezone-picker-list {
    border: 1px solid ${({ theme }) => theme.palette.button.bg};
  }

  .timezone-picker-list-item {
    background-color: ${({ theme }) => theme.palette.button.bg};
  }

  .form-check-input {
    background-color: ${({ theme }) => theme.palette.button.bg};
    border-color: ${({ theme }) => theme.palette.button.bg};
  }

  .form-check-input:checked {
    background-color: ${({ theme }) => theme.palette.button.hover};
    border-color: ${({ theme }) => theme.palette.button};
  }

  .btn-secondary {
    color:${props => props.theme.palette.textHeader} !important;
    background-color:${props => props.theme.palette.button.hover} !important;
    border-color:${props => props.theme.palette.button} !important;
  }

  .btn-secondary:focus {
    background-color:${props => props.theme.palette.button.active} !important;
    border-color:${props => props.theme.palette.button.active} !important;
  }

  .btn-secondary:hover {
    background-color:${props => props.theme.palette.button.active} !important;
    border-color:${props => props.theme.palette.button.active} !important;
  }
`
  