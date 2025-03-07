import { useState, useEffect } from "react";

interface Movie {
  title: string;
  description: string;
  image: string;
}

const Hero: React.FC = () => {
  const [currentMovie, setCurrentMovie] = useState(0);
  const movies: Movie[] = [
    {
      title: "Cosmic Odyssey",
      description:
        "Embark on an interstellar journey across the universe, where the boundaries of human exploration are pushed to their limits.",
      image: "/hero-cosmic-odyssey.jpg",
    },
    {
      title: "Neon Nights",
      description:
        "Dive into a cyberpunk world where technology rules and danger lurks around every neon-lit corner.",
      image: "/hero-neon-nights.jpg",
    },
    // Add more movies as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % movies.length);
    }, 10000); // Change hero every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const movie = movies[currentMovie];

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center z-20">
        <div className="ml-16 max-w-2xl">
          <h1 className="text-6xl font-bold mb-4 text-white">{movie.title}</h1>
          <p className="text-xl mb-6 text-gray-200">{movie.description}</p>
          <div className="flex space-x-4">
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
            <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-full transition">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
