import React, { useState } from 'react'
import PreHeader from '../components/PreHeader';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { api } from '../constants/constant';

const SignInPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleSignin = async (e) => {
    e.preventDefault();
    const res = await fetch(api + 'signin', {
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

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-10">
      <Link to={'/'}>
        <PreHeader hideButtons={true} />
      </Link>

      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-10">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Welcome Back!</h2>

        <form onSubmit={handleSignin} className="flex flex-col space-y-6">
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

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-full shadow-lg font-semibold hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="flex flex-col pt-2 items-center text-red-500 text-lg font-semibold">
          {errorMessage && errorMessage}
        </p>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?
          <Link to="/signup" className="text-blue-500 font-semibold"> Sign up</Link>
        </p>
      </div>
    </div>

  )
}

export default SignInPage;
