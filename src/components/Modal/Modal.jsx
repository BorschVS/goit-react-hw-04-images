import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const { Component } = require('react');

const modalRoot = document.getElementById('root-modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleOwerlayClick = e => {
    if (e.currentTarget === e.target) this.props.onClose();
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleOwerlayClick}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
