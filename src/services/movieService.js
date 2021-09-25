/* eslint-disable */

export default class MovieService {
  apiBase = 'https://api.themoviedb.org/3/';
  apiKey = '856dc569092ab9cdd989b0d8a88b2a64';
  sessionId = '';

  async createGuestSession() {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`
    );
    if (!response.ok) {
      throw new Error(`This problem became in creating id guest's session, ${response.status} `);
    }
    return response.json();
  }

  async getSessionId() {
    const guest = localStorage.getItem('guest_session_ID');
    if (!guest) {
      this.sessionId = await this.createGuestSession().then((info) => info.guest_session_id);
      localStorage.setItem('guest_session_ID', JSON.stringify(this.sessionId));
    }
    this.sessionId = JSON.parse(guest);
    return this.sessionId;
  }

  clearLocalStorage() {
    return Storage.clear;
  }

  async RateMovie(movieId, rating) {
    const guestSessionId = JSON.parse(localStorage.getItem('guest_session_ID'));
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          value: rating,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`This problem became in creating id guest's session, ${res.status} `);
    }

    return res.json();
  }

  async getListOfRatedMovies() {
    const guest = JSON.parse(localStorage.getItem('guest_session_ID'));
    const res = await fetch(
      `${this.apiBase}guest_session/${guest}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    );
    if (!res.ok) {
      throw new Error(`This problem became in getRatedMovies(), ${res.status} `);
    }
    return res.json();
  }

  async getMovieById(id) {
    const res = await fetch(`${this.apiBase}movie/${id}?api_key=${this.apiKey}`);

    if (!res.ok) {
      throw new Error(`Error in 'movieService', when you do query
                      ${this.apiBase}movie/${id}  received ${res.status} `);
    }
    return res.json();
  }

  async getMoviesByName(value, page) {
    const res = await fetch(`${this.apiBase}search/movie?api_key=${this.apiKey}&query=${value}
                                   &page=${page}`);
    if (!res.ok) {
      throw new Error(`Error in 'movieService', when you do query 
                      ${this.apiBase}movie/ received ${res.status}`);
    }
    return res.json();
  }

  async getAllMoviesByName(value, page) {
    const resultObj = await this.getMoviesByName(value, page);
    return resultObj;
  }
}
