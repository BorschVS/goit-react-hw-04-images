import { useReducer, useEffect, useState } from 'react';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Loader from 'components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import * as API from '../../services/api';
//
import css from './App.module.css';
import Button from 'components/Button';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  async function getImages(query, page) {
    try {
      setLoading(true);
      const response = await API.getImages(query, page);
      setGallery(gallery => [...gallery, ...response.hits]);
      setPage(page);
      return response.hits;
    } catch (error) {
      throw new Error(toast.error(error.message));
    } finally {
      setLoading(false);
    }
  }

  function handleFormSubmit(query) {
    if (query !== searchQuery) setGallery([]);
    setSearchQuery(query);
    setPage(1);
  }

  function handleLoadMore() {
    setPage(page => page + 1);
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {gallery && gallery.length > 0 && <ImageGallery gallery={gallery} />}
      {loading && <Loader />}
      {gallery && gallery.length > 0 && !loading && (
        <Button onLoadMore={handleLoadMore} />
      )}
      <ToastContainer />
    </div>
  );
}

// useReducer version:

// function appReducer(state, action) {
//   switch (action.type) {
//     case 'loading':
//       return { ...state, loading: !state.loading };
//     case 'setGallery':
//       console.log(action.gallery);
//       return { ...state, gallery: action.gallery };
//     case 'setPage':
//       console.log(action.page);
//       return { ...state, page: action.page };
//     case 'submit':
//       return {
//         ...state,
//         gallery: [],
//         searchQuery: action.searchQuery,
//         page: 1,
//       };
//     case 'loadMore':
//       return { ...state, page: state.page + 1 };
//     default:
//       throw Error('Unknown action: ' + action.type);
//   }
// }

// const initialState = {
//   searchQuery: '',
//   page: 1,
//   gallery: [],
//   loading: false,
// };

// export default function App() {
//   const [{ searchQuery, page, gallery, loading }, dispatch] = useReducer(
//     appReducer,
//     initialState
//   );

//   useEffect(() => {
//     if (searchQuery === '') {
//       return;
//     }
//     getImages(searchQuery, page);
//   }, [searchQuery, page]);

//   async function getImages(query, page) {
//     try {
//       dispatch({ type: 'loading' });
//       const response = await API.getImages(query, page);
//       dispatch({ type: 'setGallery', gallery: [...gallery, ...response.hits] });
//       dispatch({ type: 'setPage', page });
//       return response.hits;
//     } catch (error) {
//       throw new Error(toast.error(error.message));
//     } finally {
//       dispatch({ type: 'loading' });
//     }
//   }

//   function handleFormSubmit(searchQuery) {
//     dispatch({ type: 'submit', searchQuery });
//   }

//   function handleLoadMore() {
//     dispatch({ type: 'loadMore' });
//   }

//   return (
//     <div className={css.App}>
//       <Searchbar onSubmit={handleFormSubmit} />
//       {gallery && gallery.length > 0 && <ImageGallery gallery={gallery} />}
//       {loading && <Loader />}
//       {gallery && gallery.length > 0 && !loading && (
//         <Button onLoadMore={handleLoadMore} />
//       )}
//       <ToastContainer />
//     </div>
//   );
// }
