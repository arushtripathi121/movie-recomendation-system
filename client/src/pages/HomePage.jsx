import React, { useEffect, useState } from 'react';
import PostHeader from '../components/PostHeader';
import { useNavigate } from 'react-router-dom';
import SlidingComponent from '../components/ShowMovies';

const HomePage = () => {
    const [user, setUser] = useState('');
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [recomendedMovies, setRecomendedMovies] = useState([]);
    const [upcommingMovies, setUpcommingMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getMovies = async (api) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDg2YzJjMjRiMzQ2MmI5MzI2NjJhODdmNzNlMjAxZSIsIm5iZiI6MTcyOTQyMzk3My4xMTkyOTUsInN1YiI6IjY2NWM2NzgxZmUyNTgyZWU1ZmY4YTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FmUyO5bhOcLV_9V4WbbZC1dZeXYG4CI1RfnYSFYF8sg',
            },
        };
        const res = await fetch(api, options);
        const movies = await res.json();
        return movies.results;
    };

    const fetchTopRatedMovies = async () => {
        const movies = await getMovies('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');
        setTopRatedMovies(movies);
    };

    const fetchRecomendedMovies = async () => {
        const movies = await getMovies('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        setRecomendedMovies(movies);
    };

    const fetchUpcommingMovies = async () => {
        const movies = await getMovies('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1');
        setUpcommingMovies(movies);
    };

    const handleSearch = async () => {
        setLoading(true);
        setSearchResults([]); // Clear previous results on new search
        const movies = await getMovies(`https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`);
        setSearchResults(movies);
        setLoading(false);
    };

    useEffect(() => {
        fetchTopRatedMovies();
        fetchRecomendedMovies();
        fetchUpcommingMovies();
    }, []);

    useEffect(() => {
        const data = localStorage.getItem('userEmail');
        if (!data) {
            navigate('/');
        } else {
            setUser(data);
        }
    }, [navigate]);

    return (
        <div className='min-h-screen bg-gray-900'>
            <PostHeader userEmail={user} />

            <div className='flex flex-col items-center px-3 gap-10 py-5'>
                <div className='w-full flex flex-col items-center'>
                    <div className='relative w-full max-w-md'>
                        <input
                            type='text'
                            placeholder='Search movies...'
                            className='w-full h-12 px-4 bg-gray-800 text-white placeholder-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200'
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            ) : (
                                'Search'
                            )}
                        </button>
                    </div>

                    <div className="w-full flex flex-col items-center pt-10">
                        {loading ? (
                            <div className="flex justify-center items-center h-12">
                                <div className="animate-spin h-4 w-4 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                            </div>
                        ) : (
                            searchResults.length > 0 ? (
                                <div className='w-full'>
                                    <SlidingComponent movies={searchResults} />
                                </div>
                            ) : (
                                <p className="text-gray-400">Search any movie or tv series</p>
                            )
                        )}
                    </div>
                </div>


                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">Top Rated Movies</h2>
                {topRatedMovies.length > 0 && (
                    <div className="w-full">
                        <SlidingComponent movies={topRatedMovies} />
                    </div>
                )}

                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">Recommended Movies</h2>
                {recomendedMovies.length > 0 && (
                    <div className="w-full">
                        <SlidingComponent movies={recomendedMovies} />
                    </div>
                )}

                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Upcoming Movies</h2>
                {upcommingMovies.length > 0 && (
                    <div className="w-full">
                        <SlidingComponent movies={upcommingMovies} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
