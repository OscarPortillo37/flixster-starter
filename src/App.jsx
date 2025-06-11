import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {fetchSearchedData, fetchNowPlayingData, fetchGenreText} from './utils/fetch.js'
import MovieList from './MovieList';
import MovieInfoModal from './MovieInfoModal'
import SearchForm from './SearchForm';
import SortForm from './SortForm';

const App = () => {
  // State variables
  const [movies, setMovies] = useState({results: []}); // Current movie list
  const [page_no, setPageNo] = useState(1); // Current now playing page number
  const [is_search, setIsSearch] = useState(false);
  const [search_query, setSearchQuery] = useState("");
  const [open_modal, setOpenModal] = useState(false);
  const [movie_info, setMovieInfo] = useState({title: "", img: "", date: "", overview: "", genres: ""});
  const [id_to_genre, setIDToGenre] = useState([]);

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
      {/* Header */}
        <header>
          <h1>🎥Flixster🎬</h1>
          <section id="search_n_sort">
            <SearchForm setSearchQuery={setSearchQuery} is_search={is_search} setIsSearch={setIsSearch} setPageNo={setPageNo} setMovies={setMovies}/>
            <SortForm movies={movies} setMovies={setMovies}/>
          </section>
        </header>
      {/* Body */}
        <MovieList movies={movies} setPageNo={setPageNo} setOpenModal={setOpenModal} setMovieInfo={setMovieInfo} id_to_genre={id_to_genre}/>
        <MovieInfoModal open_modal={open_modal} setOpenModal={setOpenModal} movie_info={movie_info} />
      {/* Footer */}
        <footer>© Oscar Platforms, Inc</footer>
    </div>
  )
}

export default App
