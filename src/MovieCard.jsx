import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types"
import {getGenresString} from "./utils/fetch.js"

const MovieCard = ({img, alt_txt, title, date, overview, genre_ids, vote_avg, setOpenModal, setMovieInfo, id_to_genre}) => {
    const handleClickMovieCard = () => {
        const date_readable = new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const genres_str = getGenresString(genre_ids, id_to_genre);
        setMovieInfo({title: title, img: img, date: date_readable, overview: overview, genres: genres_str});
        setOpenModal(true);
    }

    return (
        <section className="movie_card" onClick={handleClickMovieCard}>
            <img src={img} alt={alt_txt} className="movie_image"/>
            <p className="movie_title">{title}</p>
            <p className="movie_vote_average">Rating: {vote_avg}</p>
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