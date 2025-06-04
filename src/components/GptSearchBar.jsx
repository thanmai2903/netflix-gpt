import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import searchMovieTMDB from "../hooks/searchMovieTMDB";
import handleGptSearchClick from "../hooks/handleGptSearchClick";
const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // search movie in TMDB
  searchMovieTMDB();
  const onSearchClick = () => {
    const value = searchText.current?.value;
    if (value) {
      handleGptSearchClick(value, dispatch);
    }
  };
  return (
    <div className="w-screen h-screen bg-cover bg-center flex items-center justify-center">
      <form
        className="w-1/2 grid grid-cols-12 bg-black bg-opacity-60 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-white col-span-9 rounded"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
