// Fetch Searched Data
export const fetchSearchedData = async (movies, setMovies, page_no, search_query) => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&language=en-US&page=${page_no}&query=${search_query}`);
        if(!response.ok) throw new Error('Failed to fetch movie data');
        const movies_json = await response.json();
        console.log(movies_json);
        setMovies({results: [...movies.results, ...movies_json.results]});
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
        setMovies({results: [...movies.results, ...movies_json.results]});
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