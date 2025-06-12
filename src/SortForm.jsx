import React from "react";
import ReactDOM from "react-dom";

const SortForm = ({movies, setMovies}) => {
    const handleChange = (event) => {
        const sort_type_value = event.target.value;
        if(sort_type_value === "sort_title") {
            setMovies((prev_movies) => {
                const sorted = [...prev_movies.results].sort((a, b) => {
                    return(a.title.localeCompare(b.title));
                });
                return {results: sorted}
            });
        }
        else if(sort_type_value === "sort_release_date") {
            setMovies((prev_movies) => {
                const sorted = [...prev_movies.results].sort((a, b) => {
                    const date_a = new Date(a.release_date);
                    const date_b = new Date(b.release_date);
                    return date_b - date_a;
                });
                return {results: sorted}
            });
        }
        else if(sort_type_value === "sort_rating") {
            setMovies((prev_movies) => {
                const sorted = [...prev_movies.results].sort((a, b) => {
                    return (b.vote_average - a.vote_average);
                });
                return {results: sorted}
            });
        }
    }

    return (
        <section id="sort_form">
            <label for="sort_type">Sort: </label>
            <select id="sort_dropdown" name="sort_type" onChange={handleChange}>
                <option value="sort_none">None</option>
                <option value="sort_title">Title</option>
                <option value="sort_release_date">Release Date</option>
                <option value="sort_rating">Rating</option>
            </select>
        </section>
    );
}

export default SortForm;


// button onClick={handleClick}

// const handleClick = () => {
//     setPageNum((prev_pageNum) => {return prev_pageNum + 1});
// }