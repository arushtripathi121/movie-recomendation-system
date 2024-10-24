import React from 'react'
import PreHeader from '../components/PreHeader'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin')
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    return (
        <div class="min-h-screen bg-gray-900 flex flex-col">
            <PreHeader hideButtons={false} />

            <div class="flex flex-col items-center justify-center flex-grow text-center px-10 py-20">
                <h1 class="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-5">
                    Discover Your Next Favorite Movie
                </h1>
                <p class="text-xl text-gray-300 mb-8 max-w-3xl">
                    CineSuggest is your personal movie guide, offering tailored recommendations based on your taste. Explore top-rated films, hidden gems, and everything in between!
                </p>
                <p onClick={handleSignUp} class="bg-gradient-to-r cursor-pointer from-blue-600 to-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Get Started Now
                </p>
            </div>

            <div class="flex justify-center py-10 space-x-6">
                <img src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/jaws-1975-poster.jpg?q=49&fit=crop&w=750&dpr=2" class="w-40 h-60 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300" />
                <img src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/apocalypse-now-1979-poster.jpg?q=49&fit=crop&w=750&dpr=2" class="w-40 h-60 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300" />
                <img src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/badlands-1973-poster.jpg?q=49&fit=crop&w=750&dpr=2" class="w-40 h-60 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300" />
            </div>
        </div>


    )
}

export default LandingPage
