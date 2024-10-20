import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const PostHeader = ({ userEmail, onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        navigate('/');
    };

    useEffect(() => {
        const data = localStorage.getItem('userEmail');
        if (!data) {
            navigate('/');
        }
    }, []);

    return (
        <div className="flex items-center justify-between px-10 py-5 rounded-lg">
            <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center relative shadow-md">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                    <div className="absolute w-2.5 h-2.5 bg-blue-400 rounded-full top-1.5 left-1.5"></div>
                    <div className="absolute w-2.5 h-2.5 bg-blue-400 rounded-full top-1.5 right-1.5"></div>
                    <div className="absolute w-2.5 h-2.5 bg-blue-400 rounded-full bottom-1.5 left-1.5"></div>
                    <div className="absolute w-2.5 h-2.5 bg-blue-400 rounded-full bottom-1.5 right-1.5"></div>
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-yellow-500 tracking-wide">Cine</h1>
                    <h1 className="text-4xl font-extrabold text-blue-500 tracking-wide">Suggest</h1>
                </div>
            </div>

            <div className="relative flex items-center space-x-2">
                <FaUserCircle
                    className="w-8 h-8 text-gray-700 cursor-pointer"
                    onClick={toggleDropdown}
                />

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-20 p-4 top-8">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-gray-600">User Details</p>
                                <p className="text-gray-800 font-semibold">{userEmail}</p>
                            </div>
                            <IoClose
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={closeDropdown}
                            />
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                        >
                            <MdLogout className="mr-1" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostHeader;
