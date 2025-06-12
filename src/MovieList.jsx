import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import MovieCard from "./MovieCard";

const MovieList = ({displayed_movies, movies, setMovies, setPageNo, setOpenModal, setMovieInfo, id_to_genre, is_show_load_more}) => {
    // Load More
    const handleLoadSubmit = (event) => {
        event.preventDefault();
        setPageNo((prev_page_no) => {return (prev_page_no + 1);});
    }

    return (
        <section className="movie_list_body">
            <section className="movie_list">
            {
                displayed_movies.results.map(movie => {
                    return(
                        <section className="movie_card_container">
                            <MovieCard id={movie.id} img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt_txt={`${movie.title} Poster`} title={movie.title} vote_avg={movie.vote_average} date={movie.release_date} overview={movie.overview} liked={movie.liked} watched={movie.watched} movies={movies} setMovies={setMovies} genre_ids={movie.genre_ids} setOpenModal={setOpenModal} setMovieInfo={setMovieInfo} id_to_genre={id_to_genre}/>
                        </section>
                    );
                })
            }
            </section>
            <section id="load_more">
                <button id="load_btn" style={{display: is_show_load_more ? "block" : "none"}} onClick={handleLoadSubmit}>Load More...</button>
            </section>
        </section>
    );
}

// MovieList.propTypes = {
//     movies: PropTypes.object.isRequired,
//     setMovies: PropTypes.func.isRequired,
//     page_np_no: PropTypes.number.isRequired,
//     setNPPageNo: PropTypes.func.isRequired,
// }

export default MovieList;