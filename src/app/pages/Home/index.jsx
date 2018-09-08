import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import FilterMovies from '../../components/FilterMovies';
import SearchMovies from '../../components/SearchMovies';
import { api_key } from '../../utils/apiKey';

import './style.css';

export default class Home extends Component {
  state = {
    movies: [],
    genres: [],
    actualPage: 2,
    actualFilter: '',
    fetchMore: true,
    totalPages: 0,
    actualState: '',
    movieSearching: ''
  };
  componentDidMount() {
    axios.all([this.getMovies(), this.getGenres()]).then(data => {
      let movies = data[0].data.results.map(movie => {
        let genres = [];
        for (let genreId of movie.genre_ids) {
          genres.push(
            data[1].data.genres.find(genre => genre.id === genreId).name
          );
        }
        movie.genres = genres.join(', ');

        return movie;
      });
      this.setState({
        movies,
        genres: data[1].data.genres
      });
    });
  }

  getMovies(category, page = 1) {
    switch (category) {
      case 'Popular':
        return axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${page}`
        );
      case 'Upcoming':
        return axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&page=${page}`
        );
      default:
        return axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&page=${page}`
        );
    }
  }

  getGenres() {
    return axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`
    );
  }

  fetchMoreData = () => {
    if (this.state.actualState === 'searching-movies') {
      if (this.state.actualPage >= this.totalPages) {
        this.setState({ fetchMore: false });
        return;
      }
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${
            this.state.movieSearching
          }&page=${this.state.actualPage}`
        )
        .then(res => {
          let movies = res.data.results.map(movie => {
            let genres = [];
            for (let genreId of movie.genre_ids) {
              genres.push(
                this.state.genres.find(genre => genre.id === genreId).name
              );
            }
            movie.genres = genres.join(', ');

            return movie;
          });
          this.setState({
            movies: this.state.movies.concat(movies),
            actualPage: this.state.actualPage + 1
          });
        });
    } else {
      axios
        .all([this.getMovies(this.state.actualFilter, this.state.actualPage)])
        .then(data => {
          let movies = data[0].data.results.map(movie => {
            let genres = [];
            for (let genreId of movie.genre_ids) {
              genres.push(
                this.state.genres.find(genre => genre.id === genreId).name
              );
            }
            movie.genres = genres.join(', ');

            return movie;
          });

          this.setState({
            movies: this.state.movies.concat(movies),
            actualPage: this.state.actualPage + 1
          });
        });
    }
  };

  handleFilter = filterName => {
    axios.all([this.getMovies(filterName, 1)]).then(data => {
      let movies = data[0].data.results.map(movie => {
        let genres = [];
        for (let genreId of movie.genre_ids) {
          genres.push(
            this.state.genres.find(genre => genre.id === genreId).name
          );
        }
        movie.genres = genres.join(', ');

        return movie;
      });
      this.setState({ movies, actualFilter: filterName });
    });
  };

  searchMovies = e => {
    let movieName = e.target.value;
    if (movieName === '') {
      axios.all([this.getMovies()]).then(data => {
        let movies = data[0].data.results.map(movie => {
          let genres = [];
          for (let genreId of movie.genre_ids) {
            genres.push(
              this.state.genres.find(genre => genre.id === genreId).name
            );
          }
          movie.genres = genres.join(', ');

          return movie;
        });
        this.setState({ movies, actualState: '', movieSearching: '' });
      });
      return;
    }
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movieName}&page=1`
      )
      .then(res => {
        let movies = res.data.results.map(movie => {
          let genres = [];
          for (let genreId of movie.genre_ids) {
            genres.push(
              this.state.genres.find(genre => genre.id === genreId).name
            );
          }
          movie.genres = genres.join(', ');

          return movie;
        });
        this.setState({
          movies,
          totalPages: res.data.total_pages,
          actualState: 'searching-movies',
          movieSearching: movieName
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <div className="movie-filter">
            <Row>
              <Col className="v-center">
                <FilterMovies handleFilter={this.handleFilter} />
              </Col>
              <Col className="text-right v-center">
                <SearchMovies searchMovies={this.searchMovies} />
              </Col>
            </Row>
          </div>
        </Container>

        <div className="movie-list">
          <InfiniteScroll
            dataLength={this.state.movies ? this.state.movies.length : 0}
            next={this.fetchMoreData}
            hasMore={this.state.fetchMore}
          >
            <Container>
              <Row>
                {this.state.movies.map(movie => (
                  <Col sm="6" md="4" lg="3" key={movie.id}>
                    <div
                      className="movie-list__thumbnail"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${
                          movie.poster_path
                        })`
                      }}
                    >
                      <span className="movie-list__rating">
                        {movie.vote_average}
                      </span>
                      <Link
                        to={'/movie/' + movie.id}
                        className="movie-list__category"
                      >
                        <span className="movie-list__category-item">
                          {movie.genres}
                        </span>
                      </Link>
                    </div>
                    <h5 className="movie-list__title">{movie.title}</h5>
                    <span className="movie-list__year">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : 'N/A'}
                    </span>
                  </Col>
                ))}
              </Row>
            </Container>
          </InfiniteScroll>
        </div>
      </React.Fragment>
    );
  }
}
