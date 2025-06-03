import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addtopRatedMovies } from "../utils/moviesSlice";
const useTopRatedMovies = () => {
  // Fetch Data from the TMDB API and update the store

  const dispatch = useDispatch();

  const gettopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addtopRatedMovies(json.results));
  };
  //useEffect is used that it can make to use components only once for multiple usage components - write once use anytime,anywhere,multipletimes
  useEffect(() => {
    gettopRatedMovies();
  }, []);
};
export default useTopRatedMovies;
