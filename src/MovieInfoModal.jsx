import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

const MovieInfoModal = ({open_modal, setOpenModal, movie_info}) => {

    const handleCloseClick = () => {
        setOpenModal(false);
    }

    // Used to close modal when you press outside of the visual/center portion of the modal
    const handleModalClick = (event) => {
        if(event.target === event.currentTarget) setOpenModal(false);
    }

    return (
        <section className="modal" style={{display: open_modal ? `block` : 'none'}} onClick={handleModalClick}>
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
                <div className="modal_section">
                    <p className="modal_label">{`Runtime`}:</p>
                    <p>{`${movie_info.runtime} mins`}</p>
                </div>
                <iframe 
                    className="trailer_iframe"
                    src={movie_info.trailer}
                    title={`${movie_info.title} YouTube trailer video`}
                    allow="fullscreen"
                    allowFullScreen>
                        {'Unable to render trailer YouTube link:('}
                </iframe>
                <div>
                    <button type="button" onClick={handleCloseClick}>Close</button>
                </div>
            </section>
        </section>
    );
}

export default MovieInfoModal;