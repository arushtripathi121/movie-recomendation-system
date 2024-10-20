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
        if(confirmPassword === password) {
            return true;
        }

        setErrorMessage('Passwords did not match');
        return false;
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        const checkValidatePassword = validatePassword();

        if(checkValidatePassword) {
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
        <div class="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200 flex flex-col items-center justify-center py-10">

            <Link to={'/'}>
                <PreHeader hideButtons={true} />
            </Link>

            <div class="w-full max-w-md bg-white rounded-xl shadow-2xl p-10">
                <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">Join Us!</h2>

                <form onSubmit={handleSignUp} class="flex flex-col space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={confirmPassword}
                        onChange={e => setComfirmPassword(e.target.value)}
                    />

                    <button
                        class="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-full shadow-lg font-semibold hover:shadow-xl transform hover:scale-105 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className='flex flex-col pt-2 items-center text-red-500 text-lg font-semibold'>{errorMessage && errorMessage}</p>

                <p class="text-center text-gray-600 mt-4">
                    Already have an account?
                    <Link to="/signin" class="text-blue-500 font-semibold"> Log in</Link>
                </p>
            </div>
        </div>


    )
}

export default SignUpPage
