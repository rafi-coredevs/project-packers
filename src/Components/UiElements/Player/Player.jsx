import { useState, useRef } from "react";
import play from "../../../assets/icons/play.svg";
import pasue from "../../../assets/icons/pause.svg";
const Player = ({url}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
const [hover, setHover] = useState(true)
    const togglePlay = () => {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };
  return (
    <div onMouseOver={()=> setHover(true)} onMouseLeave={()=> setHover(false)} className="relative">
      <video ref={videoRef} width="100%" height="100%">
        <source src={url} type="video/mp4" />
      </video>
      <span className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
       {hover && <img onClick={togglePlay} src={isPlaying ?  pasue : play } />}
      </span>
    </div>
  );
};

export default Player;
