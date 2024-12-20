"use client";
import React, { useRef, useEffect, memo } from "react";

interface GetVideoDurationProps {
  setDuration: (duration: number) => void;
  file: File | null;
}

const GetVideoDuration: React.FC<GetVideoDurationProps> = memo(({ setDuration, file }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!file) return;

    if (file.type && file.type.startsWith("video/")) {
      const video = videoRef.current;

      if (video) {
        video.preload = "metadata";

        video.onloadedmetadata = function () {
          const duration = video.duration;
          setDuration(duration);
          window.URL.revokeObjectURL(video.src);
        };

        const blobURL = URL.createObjectURL(file);
        video.src = blobURL;

        return () => {
          window.URL.revokeObjectURL(blobURL);
        };
      }
    }
  }, [file, setDuration]);

  return file ? <video ref={videoRef} style={{ display: "none" }}></video> : null;
});

export { GetVideoDuration };
