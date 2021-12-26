import { Modal as BootstrapModal } from 'react-bootstrap';
import styled from 'styled-components';

const Modal = styled(BootstrapModal)`
.modal-content {
  background-color:${props => props.theme.palette.body};
}
`
export default Modal;
