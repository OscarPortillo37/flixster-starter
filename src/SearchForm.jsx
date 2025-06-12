import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

const SearchForm = ({setSearchQuery, is_search, setIsSearch, setPageNo, setMovies}) => {
    // State Variables

    // Handlers
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if(is_search) { // If re-submitting w/out clear first
            setIsSearch(false);
            setPageNo(1);
        }
        setMovies({results: []});
        setSearchQuery(encodeURIComponent(event.target.elements.movie_input.value));
        setIsSearch(true);
        setPageNo(1);
    }
    const handleSearchClear = (event) => {
        event.preventDefault();
        event.target.form.elements.movie_input.value = '';
        setMovies({results: []});
        setSearchQuery('');
        setPageNo(1);
        setIsSearch(false);
    }

    return (
        <form id="search_form" onSubmit={handleSearchSubmit}>
            <input type="text" name="movie_input" placeholder="Search for movie..."/>
            <button type="submit">🔍</button>
            <button type="button" onClick={handleSearchClear}>🗑</button>
        </form>
    );
}

// SearchForm.propTypes = {
//     movies: PropTypes.object.isRequired,
//     setMovies: PropTypes.func.isRequired,
//     setNPPageNo: PropTypes.func.isRequired,
// }

export default SearchForm;