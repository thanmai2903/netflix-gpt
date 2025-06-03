import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/moviesSlice";
const useUpcomingMovies = () => {
  // Fetch Data from the TMDB API and update the store

  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };
  //useEffect is used that it can make to use components only once for multiple usage components - write once use anytime,anywhere,multipletimes
  useEffect(() => {
    getUpcomingMovies();
  }, []);
};
export default useUpcomingMovies;
