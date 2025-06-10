import React from "react";
import ReactDOM from "react-dom";

const SortForm = () => {
    return (
        <section id="sort_form">
            <label for="sort_type">Sort: </label>
            <select id="sort_dropdown" name="sort_type">
                <option value="sort_none"></option>
                <option value="sort_title">Title</option>
                <option value="sort_release_data">Release Date</option>
                <option value="sort_rating">Rating</option>
            </select>
        </section>
    );
}

export default SortForm;