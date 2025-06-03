import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";
const usePopularMovies = () => {
  // Fetch Data from the TMDB API and update the store

  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };
  //useEffect is used that it can make to use components only once for multiple usage components - write once use anytime,anywhere,multipletimes
  useEffect(() => {
    getPopularMovies();
  }, []);
};
export default usePopularMovies;
