import React, { useEffect, useState } from 'react';
import PostHeader from '../components/PostHeader';
import { useNavigate } from 'react-router-dom';
import SlidingComponent from '../components/ShowMovies';

const HomePage = () => {
    const [user, setUser] = useState('');
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [recomendedMovies, setRecomendedMovies] = useState([]);
    const [upcommingMovies, setUpcommingMovies] = useState([]);
    const [trending, setTrending] = useState([]);
    const [region, setRegion] = useState('US');

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

    const fetchTrending = async () => {
        const movies = await getMovies('https://api.themoviedb.org/3/trending/all/day?language=en-US');
        setTrending(movies);
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
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">Top Rated Movies</h2>
            {topRatedMovies.length !== 0 && (
                <div className="w-full">
                    <SlidingComponent movies={topRatedMovies} />
                </div>
            )}
    
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">Recommended Movies</h2>
            {recomendedMovies.length !== 0 && (
                <div className="w-full">
                    <SlidingComponent movies={recomendedMovies} />
                </div>
            )}
    
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Upcoming Movies</h2>
            {upcommingMovies.length !== 0 && (
                <div className="w-full">
                    <SlidingComponent movies={upcommingMovies} />
                </div>
            )}
        </div>
    </div>
    

    );
};

export default HomePage;
