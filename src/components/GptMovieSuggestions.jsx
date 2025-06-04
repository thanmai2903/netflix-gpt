import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames || movieNames.length === 0) return null;

  return (
    <>
      <div className="p-4 m-4 bg-opacity-90 text-white bg-black">
        <div>
          {movieNames.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default GptMovieSuggestions;
