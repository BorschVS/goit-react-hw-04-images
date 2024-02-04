import Modal from 'components/Modal';
import css from './ImageGalleryItem.module.css';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { webformatURL, largeImageURL } = this.props;
    return (
      <li className={css.GalleryItem} href={webformatURL}>
        <img
          className={css.GalleryItemImage}
          src={webformatURL}
          onClick={this.toggleModal}
          alt=""
        />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" className={css.GalleryLargeImage} />
            <button
              className={css.GalleryCloseButton}
              type="button"
              onClick={this.toggleModal}
            >
              ×
            </button>
          </Modal>
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
