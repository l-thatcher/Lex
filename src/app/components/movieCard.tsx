import Link from "next/link";
import Image from "next/image";

const cleanTitle = (title: string) => {
  return title
    .replace(/[\[\]\.()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

export default MovieCard;
