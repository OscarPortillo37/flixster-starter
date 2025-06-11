import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

const MovieInfoModal = ({open_modal, setOpenModal, movie_info}) => {

    const handleCloseClick = () => {
        setOpenModal(false);
    }

    return (
        <section className="modal" style={{display: open_modal ? `block` : 'none'}}>
            <section className="modal_content">
                <h2>{movie_info.title}</h2>
                <img src={movie_info.img} alt={`${movie_info.title} Poster`} className="modal_movie_img"/>
                <div className="modal_section" id="modal_date_section">
                    <p className="modal_label">Release Date:</p>
                    <p>{movie_info.date}</p>
                </div>
                <div className="modal_section">
                    <p className="modal_label">Overview:</p>
                    <p>{movie_info.overview}</p>             
                </div>
                <div className="modal_section">
                    <p className="modal_label">Genres:</p>
                    <p>{movie_info.genres}</p>
                </div>
                <div>
                    <button type="button" onClick={handleCloseClick}>Close</button>
                </div>
            </section>
        </section>
    );
}

export default MovieInfoModal;