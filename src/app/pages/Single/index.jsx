import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import { api_key } from '../../utils/apiKey';
import './style.css';

export default class Single extends Component {
  state = {
    movie: {},
    genres: [],
    trailerCode: ''
  };

  componentDidMount() {
    axios.all([this.getMovieInfo(), this.getMovieTrailer()]).then(res => {
      this.setState({
        movie: res[0].data,
        genres: res[0].data.genres,
        trailerCode: res[1].data.results[0].key
      });
    });
  }

  getMovieInfo() {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${
        this.props.match.params.id
      }?api_key=${api_key}`
    );
  }

  getMovieTrailer() {
    return axios.get(
      `http://api.themoviedb.org/3/movie/${
        this.props.match.params.id
      }/videos?api_key=${api_key}`
    );
  }

  goToYoutube() {
    console.log('asd');
  }
  render() {
    const {
      backdrop_path,
      original_title,
      release_date,
      overview,
      poster_path
    } = this.state.movie;
    const { genres, trailerCode } = this.state;
    return (
      <div className="single-page">
        <div
          className="single-page__banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${backdrop_path})`
          }}
        />
        <div className="single-page__content">
          <Container>
            <Row>
              <Col md="3">
                <div className="movie-thumbnail">
                  <img
                    src={'https://image.tmdb.org/t/p/w500/' + poster_path}
                    alt=""
                  />
                  <a
                    href={'https://www.youtube.com/watch?v=' + trailerCode}
                    target="_blank"
                    className="trailer-btn hide-desktop"
                  >
                    <i className="fas fa-play" />
                  </a>
                </div>
              </Col>
              <Col md="9">
                <div className="movie-info">
                  <div className="movie-info__left">
                    <h3 className="movie-info__title">{original_title}</h3>
                    <ul>
                      <li>
                        <i className="fas fa-calendar-alt" />{' '}
                        {moment(release_date).format('MM-DD-YYYY')}
                      </li>
                      <li>
                        <i className="fas fa-tag" />{' '}
                        {genres.map((genre, i) => (
                          <span key={i}>
                            {genre.name}
                            {i + 1 < genres.length && ', '}
                          </span>
                        ))}
                      </li>
                    </ul>
                  </div>
                  <div className="movie-info__right">
                    <a
                      href={'https://www.youtube.com/watch?v=' + trailerCode}
                      target="_blank"
                      className="trailer-btn hide-mobile"
                    >
                      <i className="fas fa-play" />
                    </a>
                  </div>
                </div>
                <div className="synopsis">
                  <h3 className="synopsis__title">Synopsis</h3>
                  <p>{overview}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
