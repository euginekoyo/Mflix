
import axios from 'axios';

// Define the base URL for the API
const MOVIE_API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/movies`;
const USER_API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/auth/getUsers`;

// Create a new movie
export const createMovie = async (movieData) => {
    try {
        const response = await axios.post(MOVIE_API_URL, movieData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating movie:', error);
        throw error; // Rethrow the error to handle it in the component
    }
};
export const fetchMovies = async () => {
    try {
        const response = await axios.get(MOVIE_API_URL);
        return response.data; // Axios automatically parses JSON
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        return [];
    }
};
export const getUsers=async()=>{
    try {
        const response = await axios.get(USER_API_URL);
        return response.data;

        } catch (error) {
        console.log('Error fetching user',error.message);
        return[];
    }
}