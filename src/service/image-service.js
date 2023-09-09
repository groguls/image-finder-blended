import axios from 'axios';

const API_KEY = 'eEtqYNCIP7ebt8vg68SJ767UigqxKopyaNGkVagaPu6dQnsbOlJ0KEAK';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  per_page: 15,
  orientation: 'landscape',
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};
