import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const getRatingColor = (rating) => {
  if (rating >= 7) return 'text-green-500';
  if (rating >= 4) return 'text-yellow-500';
  return 'text-red-500';
};

const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const title = movie.title || movie.name || movie.original_name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const { overview, vote_average, poster_path } = movie;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-30">
      <div className="bg-gray-800 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative overflow-hidden flex">
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-lg">
          &times;
        </button>
        <div className="w-1/2 h-full p-4">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        </div>
        <div className="flex flex-col justify-center p-6 w-1/2">
          <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
          <div className="text-gray-400 text-lg mb-2">
            {new Date(releaseDate) > new Date() ? (
              <span className="font-bold text-blue-500">
                🚀 Coming Soon: Mark your calendar!
              </span>
            ) : (
              <span>
                📅 Release Date: {new Date(releaseDate).toLocaleDateString()}
              </span>
            )}
          </div>
          <p className="text-gray-300 text-lg mb-2">{overview}</p>
          <p className={`font-bold text-2xl ${getRatingColor(vote_average)}`}>
            Rating: {vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>
  );
};

const MovieCard = ({ movie, onClick }) => {
  if (!movie.poster_path) return null;

  const title = movie.title || movie.name || movie.original_name;
  const rating = movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : "N/A";

  return (
    <div
      className="relative flex transition-all duration-300 max-w-[400px] mb-4 cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-full h-[400px] object-cover transition-transform duration-300 rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={title}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h4 className="text-white text-xl font-bold">{title}</h4>
        <p className={`text-white font-semibold ${getRatingColor(movie.vote_average)}`}>
          Rating: {rating}
        </p>
      </div>
    </div>
  );
};


const SlidingComponent = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };


  const filteredMovies = movies.filter(movie => movie.poster_path);

  const displayMovies = filteredMovies.length > 0 ? filteredMovies : [referenceMovieData];

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={5}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1536: { slidesPerView: 6 },
        }}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        {displayMovies.map((movie) => (
          <SwiperSlide key={movie.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MovieCard
              movie={movie}
              onClick={() => handleCardClick(movie)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default SlidingComponent;
