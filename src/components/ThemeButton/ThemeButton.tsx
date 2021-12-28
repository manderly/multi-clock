import { Button as BootstrapButton } from 'react-bootstrap';
import styled from 'styled-components';

const ThemeButton = styled(BootstrapButton)`
  &:focus {
    background-color:${props => props.theme.palette.buttonActive};
    border-color:${props => props.theme.palette.buttonActive};
  }

  &:hover {
    background-color:${props => props.theme.palette.buttonHover};
    border-color:${props => props.theme.palette.buttonHover};
  }

  color:${props => props.theme.palette.textCopy};
  background-color:${props => props.theme.palette.button};
  border-color:${props => props.theme.palette.button};
`
export default ThemeButton;

