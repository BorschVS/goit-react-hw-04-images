import { Component } from 'react';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Loader from 'components/Loader';
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

  getImages = async (searchQuery, page) => {
    try {
      this.setState({ loading: true });
      const response = await API.getImages(searchQuery, page);
      this.setState(({ gallery, page }) => ({
        searchQuery,
        gallery: [...gallery, ...response.hits],
        loading: false,
        page,
      }));
      console.log(searchQuery);
      return response.hits;
    } catch (error) {
      console.log(error);
    }
  };

  handleFormSubmit = async searchQuery => {
    try {
      this.setState({ gallery: [] });
      const gallery = await this.getImages(searchQuery, 1);
      this.setState({
        searchQuery,
        gallery,
        page: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      const { searchQuery, page } = this.state;
      await this.getImages(searchQuery, page);
    }
  }

  handleLoadMore = async () => {
    const { searchQuery, page } = this.state;
    const nextPage = page + 1;

    try {
      await this.getImages(searchQuery, nextPage);

      this.setState(({ gallery }) => ({
        gallery,
        page: nextPage,
      }));
    } catch (error) {
      console.log(error);
    }
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
      </div>
    );
  }
}

export default App;
