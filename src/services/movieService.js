export default class MovieService {
  apiBase = 'https://api.themoviedb.org/3/movie/';

  apiKey = '856dc569092ab9cdd989b0d8a88b2a64';

  async getMovie(id) {
    const res = await fetch(`${this.apiBase}${id}?api_key=${this.apiKey}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.apiBase}${id}  received ${res.status} `);
    }

    return res.json();
  }
}
