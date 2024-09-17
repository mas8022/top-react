import { useState, useRef, useEffect } from "react";

const useAudio = (src) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;

    audioRef.current.onerror = () => {
      setError("Failed to load audio");
    };

    return () => {
      audioRef.current.pause();
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const setVolumeLevel = (level) => {
    const parsedLevel = parseFloat(level);
    const validLevel = Math.max(0, Math.min(1, parsedLevel));
    setVolume(validLevel);
  };

  return {
    isPlaying,
    play,
    pause,
    setVolumeLevel,
    error,
  };
};

export default useAudio;
