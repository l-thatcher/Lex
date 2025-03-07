"use client";
import Head from "next/head";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import ContentRow from "./components/contentRow";
import Footer from "./components/footer";
import { useState, useEffect } from "react";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/videos");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>ModernFlix - Stream Your Favorites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-14">
        {/* <Hero /> */}

        <ContentRow title="All Videos" movies={videos} />
      </main>

      <Footer />
    </div>
  );
}
