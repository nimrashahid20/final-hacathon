import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let fetchUserData = async () => {
            let token = localStorage.getItem('token');
            if (!token) {
                navigate('/login')
                return;
            }
            try {
                const response = await fetch('http://localhost:5000/api/user/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success(data.message);
                    setUser(data.user)
                    // console.log(data.user);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUserData();
    }, [])

    return (
        <>
            <div className='flex justify-center items-center min-h-screen  px-4'>
                <div className='relative flex flex-col rounded-xl bg-white shadow-lg p-6 w-full max-w-md'>
                    <h2 className='text-2xl font-semibold text-gray-800 text-center mb-5'>Profile</h2>
                    <p className='text-gray-500 text-center'>{user?.name}</p>
                    <p className='text-gray-500 text-center'>{user?.email}</p>
                    <p className='text-gray-500 text-center mb-6'>{user?.created_at}</p>

                    <button
                        className='w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300 disabled:bg-gray-500'
                        type='submit'

                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </>
    )
}

export default Profile
