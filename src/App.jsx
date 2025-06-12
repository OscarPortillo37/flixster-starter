import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {fetchSearchedData, fetchNowPlayingData, fetchGenreText} from './utils/fetch.js'
import MovieList from './MovieList';
import Sidebar from './Sidebar.jsx';
import MovieInfoModal from './MovieInfoModal'
import SearchForm from './SearchForm';
import SortForm from './SortForm';

const App = () => {
  // State variables
  const [displayed_movies, setDisplayedMovies] = useState({results: []});
  const [movies, setMovies] = useState({results: []}); // Current movie list
  const [page_no, setPageNo] = useState(1); // Current now playing page number
  const [is_search, setIsSearch] = useState(false);
  const [search_query, setSearchQuery] = useState("");
  const [open_modal, setOpenModal] = useState(false);
  const [movie_info, setMovieInfo] = useState({title: "", img: "", date: "", overview: "", trailer: "", genres: ""});
  const [id_to_genre, setIDToGenre] = useState([]);
  const [is_home_tab, setIsHomeTab] = useState(true);
  const [is_like_tab, setIsLikeTab] = useState(false);
  const [is_watch_tab, setIsWatchTab] = useState(false);

  // Dynamically render each tab
  useEffect(() => {
    if(is_home_tab) {
      setDisplayedMovies(movies);
    } else if(is_like_tab) {
      const liked_movies = {results: movies.results.filter((result_movie) => result_movie.liked === true)};
      setDisplayedMovies(liked_movies);
    } else {
      const watched_movies = {results: movies.results.filter((result_movie) => result_movie.watched === true)};
      setDisplayedMovies(watched_movies);
    }
  }, [is_home_tab, is_like_tab, is_watch_tab, movies]);

  // Initially fetch genre ID to genre mapping
  useEffect(() => {
    fetchGenreText(setIDToGenre);
  }, []);

  // Dynamic fetching of data
  useEffect(() => {
    if(is_search && search_query) {fetchSearchedData(movies, setMovies, page_no, search_query);}
    else fetchNowPlayingData(movies, setMovies, page_no);
  }, [page_no, is_search]);

  return (
    <div className="App">
      <Sidebar setIsHomeTab={setIsHomeTab} setIsLikeTab={setIsLikeTab} setIsWatchTab={setIsWatchTab}/>
      <section className="body">
        <header>
          <h1>🎥Flixster🎬</h1>
          <section id="search_n_sort">
            <SearchForm setSearchQuery={setSearchQuery} is_search={is_search} setIsSearch={setIsSearch} setPageNo={setPageNo} setMovies={setMovies}/>
            <SortForm movies={movies} setMovies={setMovies}/>
          </section>
        </header>
        <MovieList displayed_movies={displayed_movies} movies={movies} setMovies={setMovies} setPageNo={setPageNo} setOpenModal={setOpenModal} setMovieInfo={setMovieInfo} id_to_genre={id_to_genre} is_home_tab={is_home_tab}/>   
      </section>
      <MovieInfoModal open_modal={open_modal} setOpenModal={setOpenModal} movie_info={movie_info} />  
      <footer>© Oscar Platforms, Inc</footer>
    </div>
  )
}

export default App
