import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleQueryChange(e) {
    setSearchQuery(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (searchQuery === '') {
      return toast.warning('Введите что-нибудь нормальное');
    }
    onSubmit(searchQuery);

    setSearchQuery('');
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          name="searchQuery"
          value={searchQuery}
          onChange={handleQueryChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
      <ToastContainer />
    </header>
  );
}
