import css from './Modal.module.css';
import { createPortal } from 'react-dom';

import { useEffect } from 'react';

const modalRoot = document.getElementById('root-modal');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  function handleOwerlayClick(e) {
    if (e.currentTarget === e.target) onClose();
  }

  function handleKeyDown(e) {
    if (e.code === 'Escape') onClose();
  }

  return createPortal(
    <div className={css.Overlay} onClick={handleOwerlayClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}
