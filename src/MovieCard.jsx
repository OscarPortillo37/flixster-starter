import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types"
import {getGenresString, fetchTrailer} from "./utils/fetch.js"

const MovieCard = ({id, img, alt_txt, title, date, overview, genre_ids, vote_avg, liked, watched, movies, setMovies, setOpenModal, setMovieInfo, id_to_genre}) => {
    const liked_style = {color: liked ? "red" : "black"}
    const watched_style = {color: watched ? "cornflowerblue" : "black"}

    // Handlers
    const handleClickLiked = (event) => {
        event.stopPropagation();
        const prev_liked = movies.results.find((result_movie) => (result_movie.id === id)).liked;
        const new_results = movies.results.map((result_movie) => (
                (result_movie.id === id) ? {...result_movie, liked: !prev_liked}: result_movie
        ));
        setMovies({results: new_results});
    }
    const handleClickWatched = (event) => {
        event.stopPropagation();
        const prev_watched = movies.results.find((result_movie) => (result_movie.id === id)).watched;
        const new_results = movies.results.map((result_movie) => (
                (result_movie.id === id) ? {...result_movie, watched: !prev_watched}: result_movie
        ));
        setMovies({results: new_results});
    }
    const handleClickMovieCard = async () => {
        const date_readable = new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const genres_str = getGenresString(genre_ids, id_to_genre);
        const trailer = await fetchTrailer(id);
        console.log(trailer);
        setMovieInfo({title: title, img: img, date: date_readable, overview: overview, trailer: trailer, genres: genres_str});
        setOpenModal(true);
    }

    return (
        <section className="movie_card" onClick={handleClickMovieCard}>
            <img src={img} alt={alt_txt} className="movie_image"/>
            <p className="movie_title">{title}</p>
            <p className="movie_vote_average">Rating: {vote_avg}</p>
            <section className="liked_n_watched">
                <button type="button" className="watched_btn" style={watched_style} onClick={handleClickWatched} >👁</button>
                <button type="button" className="liked_btn" style={liked_style} onClick={handleClickLiked}>❤</button>
            </section>
        </section>
    );
}

MovieCard.propTypes = {
    img: PropTypes.string.isRequired,
    alt_txt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_avg : PropTypes.number.isRequired,
}

export default MovieCard;