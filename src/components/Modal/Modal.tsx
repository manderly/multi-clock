import { Modal as BootstrapModal } from 'react-bootstrap';
import styled from 'styled-components';

const Modal = styled(BootstrapModal)`
  .modal-content {
    background-color:${props => props.theme.palette.bgInfo};
  }

  .modal-header {
    border-bottom: 1px solid ${props => props.theme.palette.button};
  }
`
export default Modal;
