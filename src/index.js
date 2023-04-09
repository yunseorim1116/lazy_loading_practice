
console.log('?')

import { API_KEY } from "./apikey.js";
import { fetchMovieData, createMockData, renderMovieData, handleLazyLoad } from './movie.js';

window.onload = async function() {
  try {
    const movieData = await fetchMovieData('20220407');
    const processedData = createMockData(movieData);
    renderMovieData(processedData);
    handleLazyLoad();
  } catch (error) {
    console.log(error);
  }
};