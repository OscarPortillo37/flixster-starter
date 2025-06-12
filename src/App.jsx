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
  const [is_display_empty, setIsDisplayEmpty] = useState(false);
  const [is_show_load_more, setIsShowLoadMore] = useState(true);
  const [is_found_all_results, setIsFoundAllResults] = useState(false);

  // Dynamically render each tab
  useEffect(() => {
    if(is_home_tab) {
      setDisplayedMovies(movies);
      setIsShowLoadMore(!is_found_all_results);
    } else if(is_like_tab) {
      const liked_movies = {results: movies.results.filter((result_movie) => result_movie.liked === true)};
      setDisplayedMovies(liked_movies);
      setIsShowLoadMore(false);
    } else {
      const watched_movies = {results: movies.results.filter((result_movie) => result_movie.watched === true)};
      setDisplayedMovies(watched_movies);
      setIsShowLoadMore(false);
    }
  }, [is_home_tab, is_like_tab, is_watch_tab, movies, is_found_all_results]);

  // Check if there are no movies to display
  useEffect(() => {
    if(displayed_movies.results.length === 0) {
      setIsDisplayEmpty(true);
      setIsShowLoadMore(false);
    }
    else {
      setIsDisplayEmpty(false);
      if(is_home_tab) setIsShowLoadMore(!is_found_all_results);
    }
  }, [displayed_movies, is_found_all_results])

  // Initially fetch genre ID to genre mapping
  useEffect(() => {
    fetchGenreText(setIDToGenre);
  }, []);

  // Dynamic fetching of data
  useEffect(() => {
    async function load() {
      let is_found_all_results_;
      if(is_search && search_query) {is_found_all_results_ = await fetchSearchedData(movies, setMovies, page_no, search_query);}
      else is_found_all_results_ = await fetchNowPlayingData(movies, setMovies, page_no);
      console.log("is found all results_");
      console.log(is_found_all_results_);
      setIsFoundAllResults(is_found_all_results_);
    }
    load();
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
        <h2 style={{display: is_display_empty ? "block" : "none"}}>{"No Movies Available:("}</h2>
        <MovieList displayed_movies={displayed_movies} movies={movies} setMovies={setMovies} setPageNo={setPageNo} setOpenModal={setOpenModal} setMovieInfo={setMovieInfo} id_to_genre={id_to_genre} is_show_load_more={is_show_load_more}/>   
      </section>
      <MovieInfoModal open_modal={open_modal} setOpenModal={setOpenModal} movie_info={movie_info} />  
      <footer>© Oscar Platforms, Inc</footer>
    </div>
  )
}

export default App
