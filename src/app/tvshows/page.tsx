"use client";
import { useState, useEffect } from "react";
import ContentRow from "../components/contentRow";

const TvShowsPage = () => {
  const [tvShows, setTvShows] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await fetch("/api/videos?category=tv%20shows");
        const data = await response.json();
        setTvShows(data);
      } catch (error) {
        console.error("Failed to fetch TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto pb-4 pt-14">
      <ContentRow title="TV Shows" movies={tvShows} />
    </div>
  );
};

export default TvShowsPage;
