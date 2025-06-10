import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types"

const MovieCard = ({img, alt_txt, title, vote_avg}) => {
    return (
        <section className="movie_card">
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