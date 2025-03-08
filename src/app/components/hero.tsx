import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Video {
  id: string;
  name: string;
  thumbnail: string;
}

interface HeroProps {
  movies: Video[];
}

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [currentMovie, setCurrentMovie] = useState(0);
  const [fade, setFade] = useState(true);

  const movieCount = movies.length;

  // Automatic slider change
  useEffect(() => {
    if (movieCount > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 10000); // Change hero every 10 seconds
      return () => clearInterval(interval);
    }
  }, [movieCount, currentMovie]);

  // Fade animation on slide change
  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 50);
    return () => clearTimeout(timeout);
  }, [currentMovie]);

  const handlePrev = () => {
    setCurrentMovie((prev) => (prev - 1 + movieCount) % movieCount);
  };

  const handleNext = () => {
    setCurrentMovie((prev) => (prev + 1) % movieCount);
  };

  const movie = movies[currentMovie];
  if (!movie) return null;

  const heroImage = movie.thumbnail;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Hero image with fade animation */}
      <div
        key={movie.id}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={heroImage}
          alt={movie.name}
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation and content */}
      <div className="absolute inset-0 flex items-center justify-between z-20">
        {/* Left navigation button */}
        <button
          onClick={handlePrev}
          className="ml-4 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Hero text and action button */}
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-white">{movie.name}</h1>
          <Link href={`/${movie.name}?id=${movie.id}`}>
            <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-full transition flex items-center mx-auto">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Play Now
            </button>
          </Link>
        </div>

        {/* Right navigation button */}
        <button
          onClick={handleNext}
          className="mr-4 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
