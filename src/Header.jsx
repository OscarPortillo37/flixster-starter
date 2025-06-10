import React from "react";
import ReactDOM from "react-dom";
import SearchForm from './SearchForm';
import SortForm from './SortForm';

const Header = () => {
    return (
        <header>
            <h1>🎥Flixster🎬</h1>
            <section id="search_sort">
                <SearchForm />
                <SortForm />
            </section>
        </header>
    );
}

export default Header;