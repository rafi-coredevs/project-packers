import { useState, useRef } from "react";
import play from "../../../assets/icons/play.svg";

const Player = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  // const [hover, setHover] = useState(true)
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
  return (
    <div className="relative">
      <video ref={videoRef} width="100%" height="100%" loop={true}>
        <source src={url} type="video/mp4" />
      </video>
      {
        isPlaying ?
          <button
            className='absolute top-0 right-0 bottom-0 left-0'
            onClick={togglePlay}
          />
          :
          <button
            className={`absolute top-0 right-0 bottom-0 left-0 bg-[#0d3d4bda] flex justify-center items-center active:origin-center ${isPlaying && 'hidden'}`}
            onClick={togglePlay}
          >
            <img src={play} alt="play" />
          </button>
      }
    </div>
  );
};

export default Player;
