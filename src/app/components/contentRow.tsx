import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const cleanTitle = (title: string) => {
  return title
    .replace(/[\[\]\.()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

interface Video {
  id: string;
  name: string;
  thumbnail: string;
}

interface ContentRowProps {
  title: string;
  movies: Video[];
}

const ContentRow = ({ title, movies }: ContentRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const checkScrollable = () => {
    if (rowRef.current) {
      const { scrollWidth, clientWidth } = rowRef.current;
      setIsScrollable(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  return (
    <div className="relative">
      <h2 className="my-8 text-2xl font-semibold mb-4 ml-8">{title}</h2>
      <div
        ref={rowRef}
        className="flex space-x-4 overflow-x-auto px-8 scrollbar-hide"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {isScrollable && (
        <>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-lg"
            onClick={() => scroll("left")}
          >
            &lt;
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-lg"
            onClick={() => scroll("right")}
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

interface MovieCardProps {
  movie: Video;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const title = cleanTitle(movie.name);
  return (
    <Link href={`/${movie.name}?id=${movie.id}`} className="block">
      <div className="flex-shrink-0 w-40 h-60 bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out cursor-pointer relative">
        <Image
          src={movie.thumbnail}
          alt={movie.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <h3 className="text-white text-sm font-semibold">
            {cleanTitle(movie.name)}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ContentRow;
