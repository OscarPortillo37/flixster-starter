import React from "react";
import ReactDOM from "react-dom";

const SearchForm = () => {
    const handleSearchSubmit = (event) => {
        event.preventDefault();
    }

    const handleSearchClear = (event) => {
        event.preventDefault();
    }

    return (
        <form id="search_form">
            <input type="text" placeholder="Search for movie"/>
            <button type="submit" onClick={handleSearchSubmit}>Search</button>
            <button type="submit" onClick={handleSearchClear}>Clear</button>
        </form>
    );
}

export default SearchForm;