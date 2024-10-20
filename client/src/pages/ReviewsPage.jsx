import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaUser } from 'react-icons/fa';

const ReviewsPage = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDg2YzJjMjRiMzQ2MmI5MzI2NjJhODdmNzNlMjAxZSIsIm5iZiI6MTcyOTQyMzk3My4xMTkyOTUsInN1YiI6IjY2NWM2NzgxZmUyNTgyZWU1ZmY4YTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FmUyO5bhOcLV_9V4WbbZC1dZeXYG4CI1RfnYSFYF8sg',
                },
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setReviews(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [movieId]);

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="bg-gray-900 text-gray-100 p-6 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-teal-400">Movie Reviews</h1>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                reviews.map(review => (
                    <div key={review.id} className="border border-gray-700 rounded-lg p-4 mb-4 bg-gray-800">
                        <h3 className="text-xl font-semibold text-teal-300 flex items-center">
                            <FaUser className="mr-2" />
                            {review.author}
                        </h3>
                        <p className="mt-2 text-gray-300">{review.content}</p>
                        <div className="flex justify-between mt-4 text-gray-400 text-sm">
                            <span className="font-bold flex items-center">
                                <FaStar className="text-yellow-400 mr-1" />
                                {review.author_details.rating || 'N/A'}
                            </span>
                            <span>{new Date(review.created_at).toLocaleDateString()}</span>
                            <a
                                href={review.url}
                                className="bg-blue-500 text-white py-1 px-3 rounded transition duration-200 hover:bg-blue-600"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                ))
            )}
        </div>

    );
};

export default ReviewsPage;
