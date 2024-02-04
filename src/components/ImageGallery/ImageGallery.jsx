import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ gallery }) {
  function removeDuplicateIds(gallery) {
    const uniqueIds = new Set();
    return gallery.filter(item => {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        return true;
      }
      return false;
    });
  }

  const uniqueGallery = removeDuplicateIds(gallery);
  return (
    <ul className={css.ImageGallery}>
      {gallery &&
        uniqueGallery.map(({ id, ...otherProps }) => {
          return <ImageGalleryItem key={id} {...otherProps} />;
        })}
    </ul>
  );
}
