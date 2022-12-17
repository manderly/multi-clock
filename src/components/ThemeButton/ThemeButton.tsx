import { Button as BootstrapButton } from 'react-bootstrap';
import styled from 'styled-components';

const ThemeButton = styled(BootstrapButton)`
  &:focus {
    ${props => props.outlined ? '' : 'background-color:' + props.theme.palette.button.active};
    border-color:${props => props.theme.palette.button.active};
  }

  &:hover {
    ${props => props.outlined ? '' : 'background-color:' + props.theme.palette.button.hover};
    border-color:${props => props.theme.palette.button.hover};
  }
  
  &:disabled {
    ${props => props.outlined ? '' : 'background-color:' + props.theme.palette.button.disabled};
    border-color:${props => props.theme.palette.button.disabled};
  }

  color:${props => props.theme.palette.textCopy};
  ${props => props.outlined ? '' : 'background-color:' + props.theme.palette.button.bg};
  border-color:${props => props.theme.palette.button.bg};
`
export default ThemeButton;

