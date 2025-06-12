// Fetch Searched Data
export const fetchSearchedData = async (movies, setMovies, page_no, search_query) => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&language=en-US&page=${page_no}&query=${search_query}`);
        if(!response.ok) throw new Error('Failed to fetch movie data');
        const movies_json = await response.json();
        console.log(movies_json);
        await setMovies({results: [...movies.results, ...movies_json.results].map(result_movie => ({...result_movie, liked: false, watched: false}))});
    } catch (e) {
        console.log('Error: ', e);
    }
}

// Fetch Now Playing Data
export const fetchNowPlayingData = async (movies, setMovies, page_no) => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${page_no}`);
        if(!response.ok) throw new Error('Failed to fetch movie data');
        const movies_json = await response.json();
        setMovies({results: [...movies.results, ...movies_json.results].map(result_movie => ({...result_movie, liked: false, watched: false}))});
    } catch (e) {
        console.log('Error: ', e);
    }
}

// Fetch trailer
export const fetchTrailer = async (movie_id) => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${api_key}&language=en-US`);
        if(!response.ok) throw new Error('Failed to fetch movie data');
        const videos_json = await response.json();
        //console.log(videos_json);
        const trailer_obj = videos_json.results.find((video_obj) => {
            return video_obj.type === "Trailer";
        });
        //console.log(trailer_obj);
        const trailer_link = `https://www.youtube.com/embed/${trailer_obj.key}`
        console.log(trailer_link);
        return trailer_link;
    } catch (e) {
        console.log('Error: ', e);
    }
}

// Fetch Genre ID -> Genre Name Text Mapping
export const fetchGenreText = async (setIDToGenre) => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en`)
        if(!response.ok) throw new Error('Failed to fetch movie data');
        const genre_mappings_json = await response.json();
        console.log(genre_mappings_json);
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