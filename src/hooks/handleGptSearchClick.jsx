import openai from "../utils/openai";
import { addGptMovieResult } from "../utils/gptSlice";
import searchText from "../components/GptSearchBar";
const handleGptSearchClick = async () => {
  console.log(searchText.current.value);
  // Make an API call to GPT API and get the movie results

  const gptQuery =
    "Act as a Movie recommendation system and suggest some movies for the query: " +
    searchText.current.value +
    ".only give me names of 5 movies,comma separated like the example given ahead.Example Result: Gadar,Sholay,Don,Golmaal,Koi Mil Gaya";

  const gptResults = await openai.chat.completions.create({
    messages: [{ role: "user", content: gptQuery }],
    model: "gpt-3.5-turbo",
  });

  console.log(gptResults.choices[0]?.message.content);
  const gptMovies = gptResults.choices?.message.content.split(",");

  // For each movie I will search TMDB API

  const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

  const tmdbResults = await Promise.all(promiseArray);
  console.log(tmdbResults);
  dispatch(
    addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
  );
};
export default handleGptSearchClick;
