import Modal from 'components/Modal';
import css from './ImageGalleryItem.module.css';
import { useState } from 'react';

export default function ImageGalleryItem({ webformatURL, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <li className={css.GalleryItem} href={webformatURL}>
      <img
        className={css.GalleryItemImage}
        src={webformatURL}
        onClick={toggleModal}
        alt=""
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" className={css.GalleryLargeImage} />
          <button
            className={css.GalleryCloseButton}
            type="button"
            onClick={toggleModal}
          >
            ×
          </button>
        </Modal>
      )}
    </li>
  );
}
