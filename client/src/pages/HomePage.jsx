import React, { useEffect, useState } from 'react'
import PostHeader from '../components/PostHeader';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('userEmail');
        if(!data){
            navigate('/')
        }
        setUser(data);
    }, [])
  return (
    <div className='min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100'>
      <PostHeader userEmail={user}/>
    </div>
  )
}

export default HomePage;
