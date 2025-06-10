import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import MovieCard from "./MovieCard";

const MovieList = () => {
    // State Variables
    const [movies, setMovies] = useState({"results": []}); // Current movie list
    const [page_no, setPageNo] = useState(1); // Current page number

    // Fetch Data
    const fetchData = async () => {
        const api_key = import.meta.env.VITE_APP_API_KEY;
        // API keys seem to use query that is + separated
        try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${page_no}`);
            if(!response.ok) throw new Error('Failed to fetch movie data');
            const movies_json = await response.json();
            setMovies((prev_movies) => ({results: [...prev_movies.results, ...movies_json.results]}));
        } catch (e) {
            console.log('Error: ', e);
        }
    }

    // Load More
    const handleLoadSubmit = (event) => {
        event.preventDefault();
        setPageNo((page_no) => page_no + 1); // Increment page number
    }

    // TODO: Add more to dependency list when I add search
    useEffect(() => {
        fetchData();
    }, [page_no]);

    return (
        <section className="movie_list_body">
            <section className="movie_list">
            {
                movies.results.map(movie => {
                    return(
                        <section className="movie_card_container">
                            <MovieCard img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt_txt={`${movie.title} Poster`} title={movie.title} vote_avg={movie.vote_average} />
                        </section>
                    );
                })
            }
            </section>
            <section id="load_more">
                <button id="load_btn" onClick={handleLoadSubmit}>Load More...</button>
            </section>
        </section>
    );
}

export default MovieList;