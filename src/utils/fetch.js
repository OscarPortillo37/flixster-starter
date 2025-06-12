// Fetch Searched Data
export const fetchSearchedData = async (movies, setMovies, page_no, search_query) => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&language=en-US&page=${page_no}&query=${search_query}`);
        if(!response.ok) throw new Error('Failed to fetch movie data');
        const movies_json = await response.json();
        const is_found_all_results_ = (movies_json.results.length < 20); // Checks if we've reached the end (each tmdb page has 20 movies)
        console.log(is_found_all_results_);
        await setMovies({results: [...movies.results, ...movies_json.results].map(result_movie => ({...result_movie, liked: false, watched: false}))});
        return is_found_all_results_;
    } catch (e) {
        console.error('Error: ', e);
    }
}

// Fetch Now Playing Data
export const fetchNowPlayingData = async (movies, setMovies, page_no) => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${page_no}`);
        if(!response.ok) throw new Error('Failed to fetch movie data');
        const movies_json = await response.json();
        const is_found_all_results_ = (movies_json.results.length < 20); // Checks if we've reached the end (each tmdb page has 20 movies)
        setMovies({results: [...movies.results, ...movies_json.results].map(result_movie => ({...result_movie, liked: false, watched: false}))});
        console.log(is_found_all_results_);
        return is_found_all_results_;
    } catch (e) {
        console.error('Error: ', e);
    }
}

// Fetch trailer
export const fetchTrailer = async (movie_id) => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${api_key}&language=en-US`);
        if(!response.ok) throw new Error('Failed to fetch movie data');
        const videos_json = await response.json();
        const trailer_obj = videos_json.results.find((video_obj) => {
            return video_obj.type === "Trailer";
        });
        const trailer_link = `https://www.youtube.com/embed/${trailer_obj.key}`
        return trailer_link;
    } catch (e) {
        console.error('Error: ', e);
    }
}

// Fetch Genre ID -> Genre Name Text Mapping
export const fetchGenreText = async (setIDToGenre) => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en`)
        if(!response.ok) throw new Error('Failed to fetch movie data');
        const genre_mappings_json = await response.json();
        setIDToGenre(genre_mappings_json);
    }
    catch(e){
        console.error('Error:', e);
    }
}

export const getGenresString = (genre_ids, id_to_genre) => {
    let genre_names = [];
    for(const genre_id of genre_ids) {
        const mapping_pair = id_to_genre.genres.find((mapping) => mapping.id === genre_id);
        genre_names.push(mapping_pair.name);
    }
    return genre_names.join(', ');
}