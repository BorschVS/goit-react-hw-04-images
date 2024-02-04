import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(searchQuery, page) {
  const queryString = `?q=${searchQuery}&page=${page}&per_page=12&key=40756671-54754ada209148e7d7f60a97d&image_type=photo&orientation=horizontal`;
  const response = await axios.get(queryString);

  return response.data;
}
