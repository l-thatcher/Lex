import { useState, useRef, useEffect } from "react";
import MovieCard from "./movieCard";

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

export default ContentRow;
