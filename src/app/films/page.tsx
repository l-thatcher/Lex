"use client";
import { useState, useEffect } from "react";
import ContentRow from "../components/contentRow";
import Hero from "../components/hero";
const TvShowsPage = () => {
  const [tvShows, setTvShows] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await fetch("/api/videos?category=films");
        const data = await response.json();
        setTvShows(data);
      } catch (error) {
        console.error("Failed to fetch Films:", error);
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
    <div className="pb-4 pt-14 bg-gray-900 !h-sceen">
      <Hero movies={tvShows} />
      <ContentRow title="Films" movies={tvShows} />
    </div>
  );
};

export default TvShowsPage;
