import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";

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

    let updateProfile = () => {
        navigate('/updateProfile')
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
                <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-6 text-center">
                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <div className="profile-photo">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                                id="profilePhotoImg"
                                alt="Profile Photo"
                                className="w-20 h-20 rounded-full border-2 border-gray-300"
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <h2 className="text-lg font-semibold mt-3">Eleanor Pena</h2>
                    <p className="text-gray-500">{user?.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{user?.email}</p>

                    {/* Edit Profile Button */}
                    <button className="text-sm px-4 mt-2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300 disabled:bg-gray-500 hover:cursor-pointer" onClick={updateProfile} type='submit'>
                        Edit Profile
                    </button>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mt-3">
                        Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.
                        Artist/ Creative Director by Day #NFT minting @ with FND night.
                    </p>

                    {/* Social Icons */}
                    <div className="flex justify-center space-x-4 mt-4">

                        <FaTwitter className="text-gray-500 hover:text-black cursor-pointer" />
                        <FaFacebook className="text-gray-500 hover:text-black cursor-pointer" />
                        <FaLinkedin className="text-gray-500 hover:text-black cursor-pointer" />
                    </div>

                    {/* Joined Date */}
                    <p className="bg-gray-200 text-gray-600 text-xs py-1 px-3 rounded-md mt-4 inline-block">
                        {user?.created_at}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Profile
