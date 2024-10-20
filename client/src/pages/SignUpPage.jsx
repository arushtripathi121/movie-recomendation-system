import React from 'react'
import PreHeader from '../components/PreHeader'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
    return (
        <div class="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200 flex flex-col items-center justify-center py-10">

            <Link to={'/'}>
                <PreHeader hideButtons={true} />
            </Link>

            <div class="w-full max-w-md bg-white rounded-xl shadow-2xl p-10">
                <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">Join Us!</h2>

                <form onSubmit={e => e.preventDefault()} class="flex flex-col space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />

                    <button
                        class="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-full shadow-lg font-semibold hover:shadow-xl transform hover:scale-105 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p class="text-center text-gray-600 mt-4">
                    Already have an account?
                    <Link to="/signin" class="text-blue-500 font-semibold"> Log in</Link>
                </p>
            </div>
        </div>


    )
}

export default SignUpPage
