import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PreHeader = ({ hideButtons }) => {

    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin')
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    useEffect(() => {
        const item = localStorage.getItem('userEmail');
        if (item) {
            navigate('/home')
        }
    }, [])
    return (
        <div className="flex items-center justify-between px-10 py-5">

            <div class="flex items-center space-x-3">
                <div class="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center relative shadow-md">
                    <div class="w-5 h-5 bg-white rounded-full"></div>
                    <div class="absolute w-2.5 h-2.5 bg-blue-400 rounded-full top-1.5 left-1.5"></div>
                    <div class="absolute w-2.5 h-2.5 bg-blue-400 rounded-full top-1.5 right-1.5"></div>
                    <div class="absolute w-2.5 h-2.5 bg-blue-400 rounded-full bottom-1.5 left-1.5"></div>
                    <div class="absolute w-2.5 h-2.5 bg-blue-400 rounded-full bottom-1.5 right-1.5"></div>
                </div>
                <div>
                    <h1 class="text-4xl font-extrabold text-yellow-500 tracking-wide">Cine</h1>
                    <h1 class="text-4xl font-extrabold text-blue-500 tracking-wide">Suggest</h1>
                </div>
            </div>
            {hideButtons == false &&
                <div className="flex items-center gap-6 font-semibold">
                    <p className="text-gray-300 text-xl cursor-pointer hover:text-white transition duration-300" onClick={handleSignIn}>Login</p>
                    <p className="bg-yellow-500 text-white px-4 py-2 rounded-md text-xl cursor-pointer hover:bg-yellow-600 transition duration-300" onClick={handleSignUp}>
                        Sign Up
                    </p>
                </div>
            }
        </div>
    )
}

export default PreHeader;