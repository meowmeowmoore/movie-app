/* eslint-disable */

export default class MovieService {
  apiBase = 'https://api.themoviedb.org/3/movie/';

  apiSearch = 'https://api.themoviedb.org/3/search/movie';

  apiKey = '856dc569092ab9cdd989b0d8a88b2a64';

  async getMovieById(id) {
    const res = await fetch(`${this.apiBase}${id}?api_key=${this.apiKey}`);

    if (!res.ok) {
      throw new Error(`Error in 'movieService', when you do query
                      ${this.apiBase}${id}  received ${res.status} `);
    }
    return res.json();
  }

  async getMoviesByName(value) {
    const res = await fetch(`${this.apiSearch}?api_key=${this.apiKey}&query=${value}`);
    if (!res.ok) {
      throw new Error(`Error in 'movieService', when you do query 
                      ${this.apiBase} received ${res.status}`);
    }
    return res.json();
  }

  async getInfoMovie(id) {
    const movie = await this.getMovieById(id).then((movieInfo) => movieInfo);
    return {
      id: movie.id,
      poster: movie.poster_path,
      name: movie.title,
      date: movie.release_date,
      description: this.symbolCount(movie.overview),
    };
  }

  async getAllMoviesByName(value) {
    const resultObj = await this.getMoviesByName(value);
    return resultObj.results;
  }

  getInfoMovie(movie) {
    return {
      id: movie.id,
      poster: movie.poster_path,
      name: movie.title,
      date: movie.release_date,
      description: this.symbolCount(movie.overview),
    };
  }

  symbolCount(text) {
    const textSlice = text.slice(0, 203);
    const lastIndex = textSlice.lastIndexOf(' ');
    return `${textSlice.slice(0, lastIndex)} ...`;
  }
}
