import { Modal as BootstrapModal } from 'react-bootstrap';
import styled from 'styled-components';

const Modal = styled(BootstrapModal)`
  .modal-content {
    background-color:${props => props.theme.palette.bgInfo};
  }
  
  .btn-close {
    // it's an image, this won't work 
    // color: ${props => props.theme.palette.button.text};
    background-color:${props => props.theme.palette.button.hover};
  }
  
  .modal-header {
    background-color: ${props => props.theme.palette.bgInfo};
    border-bottom: 1px solid ${props => props.theme.palette.utilitiesBar.thinLine};
  }
`
export default Modal;
