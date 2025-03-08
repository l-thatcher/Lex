import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Video {
  id: string;
  name: string;
  thumbnail: string;
}

const Hero: React.FC = () => {
  const [currentMovie, setCurrentMovie] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/videos");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchAllVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      const interval = setInterval(() => {
        setCurrentMovie((prev) => (prev + 1) % videos.length);
      }, 10000); // Change hero every 10 seconds

      return () => clearInterval(interval);
    }
  }, [videos]);

  const movie = videos[currentMovie];

  if (!movie) return null; // Prevent rendering before data is fetched

  // Assuming you want to use the thumbnail as the hero image
  // You might need to adjust the image URL or handling based on your API response
  const heroImage = movie.thumbnail;

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <Image
        src={heroImage}
        alt={movie.name}
        layout="fill"
        objectFit="cover"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center z-20">
        <div className="ml-16 max-w-2xl">
          <h1 className="text-6xl font-bold mb-4 text-white">{movie.name}</h1>
          {/* You might want to add a description or other details if available */}
          <div className="flex space-x-4">
            <Link href={`/${movie.name}`}>
              <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-full transition flex items-center">
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
