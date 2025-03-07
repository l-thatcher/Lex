"use client";

import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function VideoPlayer({
  params,
}: {
  params: { videoId: string }; // Remove Promise
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    // Direct assignment instead of Promise handling
    setVideoId(params.videoId);
  }, [params]);

  useEffect(() => {
    if (!playerRef.current && videoRef.current && videoId) {
      // Video.js configuration
      const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: `/videos/${videoId}/master.m3u8`,
            type: "application/x-mpegURL",
          },
        ],
        playbackRates: [0.5, 1, 1.5, 2], // Define available playback rates
        plugins: {
          httpSourceSelector: {
            default: "auto",
          },
        },
      };

      // Initialize Video.js player
      playerRef.current = videojs(
        videoRef.current,
        videoJsOptions,
        function onPlayerReady() {
          console.log("Player is ready");
        }
      );

      // Add HTTP Source Selector plugin
      playerRef.current.httpSourceSelector();

      // Ensure Playback Rate Menu Button is added to the control bar
      playerRef.current.controlBar.addChild("playbackRateMenuButton", {});
    }

    return () => {
      // Dispose of the player when the component unmounts
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!playerRef.current.isFullscreen()) {
        playerRef.current.requestFullscreen();
      } else {
        playerRef.current.exitFullscreen();
      }
    }
  };

  if (!videoId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-teal-400 text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 pt-12">
          {videoId.replace(/\./g, " ")}
        </h1>
        <div className="relative aspect-video" onDoubleClick={toggleFullscreen}>
          <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-400">
            Enjoy watching {videoId.replace(/\./g, " ")}. This video is streamed
            using adaptive bitrate streaming for the best viewing experience.
            Double-click the video to enter or exit fullscreen mode.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
