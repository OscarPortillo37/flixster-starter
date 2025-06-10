import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import MovieCard from "./MovieCard";

const MovieList = () => {
    const fetchData = async () => {
        const api_key = import.meta.env.VITE_APP_API_KEY;
        // API keys seem to use query that is + separated
        try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`);
            if(!response.ok) throw new Error('Failed to fetch movie data');
            const movies_json = await response.json();
            setMovies(movies_json);
        } catch (e) {
            console.log('Error: ', e);
        }
    }

    const [movies, setMovies] = useState({"results": []});

    // TODO: Add more to dependency list when I add search
    useEffect(() => {
        fetchData();
    }, []);

    return (
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
    );
}

export default MovieList;