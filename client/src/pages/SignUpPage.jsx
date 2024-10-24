import React, { useState } from 'react'
import PreHeader from '../components/PreHeader'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../constants/constant';

const SignUpPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setComfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const validatePassword = () => {
        if (confirmPassword === password) {
            return true;
        }

        setErrorMessage('Passwords did not match');
        return false;
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        const checkValidatePassword = validatePassword();

        if (checkValidatePassword) {
            const res = await fetch(api + 'signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();

            console.log(data);

            if (data.errorMessage) {
                setErrorMessage(data.errorMessage);
            }

            if (data.data) {
                localStorage.setItem('userEmail', data.data.email);
                navigate('/home');
            }
        }
    }
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-10">
            <Link to={'/'}>
                <PreHeader hideButtons={true} />
            </Link>

            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-10">
                <h2 className="text-4xl font-bold text-center text-white mb-8">Join Us!</h2>

                <form onSubmit={handleSignUp} className="flex flex-col space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-4 bg-gray-700 border border-gray-600 text-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-4 bg-gray-700 border border-gray-600 text-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-4 bg-gray-700 border border-gray-600 text-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={confirmPassword}
                        onChange={e => setComfirmPassword(e.target.value)}
                    />

                    <button
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-full shadow-lg font-semibold hover:shadow-xl transform hover:scale-105 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="flex flex-col pt-2 items-center text-red-500 text-lg font-semibold">{errorMessage && errorMessage}</p>

                <p className="text-center text-gray-400 mt-4">
                    Already have an account?
                    <Link to="/signin" className="text-blue-500 font-semibold"> Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage
