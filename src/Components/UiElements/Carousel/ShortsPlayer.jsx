const ShortsPlayer = ({ videoId }) => {
  return (
    <div className="max-w-screen-md ">
      <div className="relative overflow-hidden h-[400px] w-[283px]">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0`}
          allowFullScreen
          style={{ borderRadius: "12px" }}
        ></iframe>
      </div>
    </div>
  );
};

export default ShortsPlayer;
