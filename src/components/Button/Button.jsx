import css from './Button.module.css';

export default function Button({ onLoadMore }) {
  return (
    <button className={css.Button} onClick={() => onLoadMore()}>
      Load More
    </button>
  );
}
