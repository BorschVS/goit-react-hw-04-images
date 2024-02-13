import { Component } from 'react';
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

class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    loading: false,
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      await this.getImages(searchQuery, page);
    }
  }

  getImages = async (searchQuery, page) => {
    try {
      this.setState({ loading: true });
      const response = await API.getImages(searchQuery, page);
      this.setState(({ gallery, page }) => ({
        searchQuery,
        gallery: [...gallery, ...response.hits],
        page,
      }));
      return response.hits;
    } catch (error) {
      throw new Error(toast.error(error.message));
    } finally {
      this.setState({ loading: false });
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      gallery: [],
      searchQuery,
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(({ gallery, page }) => ({
      gallery,
      page: page + 1,
    }));
  };

  render() {
    const { gallery, loading } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
        {loading && <Loader />}
        {gallery.length > 0 && !loading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
