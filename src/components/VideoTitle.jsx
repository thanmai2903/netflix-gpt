const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 w-1/4 text-lg">{overview}</p>
      <div className="">
        <button className="rounded-lg bg-white/100 text-black px-9 hover:bg-slate-200 text-lg py-3">
          ▶ Play
        </button>

        <button className="rounded-lg text-white bg-gray-400 px-9 hover:bg-slate-600 bg-opacity-50 text-lg py-3 ml-2">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
