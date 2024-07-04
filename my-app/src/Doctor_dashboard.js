import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Username, ProfilePicture, Address } from './UserComponents';
import BlogPost from './BlogPost';  // Import a BlogPost component
import BlogPostForm from './BlogPostForm';  // Import a BlogPostForm component

function DoctorDashboard() {
    const [user, setUser] = useState(null);
    const [blogPosts, setBlogPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://piyushraivds45.pythonanywhere.com/api/user/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

        axios.get('https://piyushraivds45.pythonanywhere.com/api/blogpost/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then((response) => {
            console.log(response.data);
            setBlogPosts(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access');
        navigate('/login');
    };
    function ProfilePicture({ profilePicture, className }) {
        return (
            <img 
                src={profilePicture || 'https://via.placeholder.com/150'} 
                alt="Profile" 
                className={`${className} object-cover`}
            />
        );
    }
    const draftPosts = blogPosts.filter(post => post.draft);

    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };
    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Doctor Dashboard</h2>
                <button 
                    onClick={handleLogout} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
            {user && (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            User Information
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Full name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <Username username={user.username} />
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Profile picture
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <ProfilePicture profilePicture={user.profile_picture} className="h-28 w-28 rounded-full" />
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <Address 
                                        addressLine1={user.address_line1} 
                                        city={user.city} 
                                        state={user.state} 
                                        pincode={user.pincode} 
                                    />
                                </dd>
                            </div>
                            
                        </dl>
                    </div>
                    <div className="mt-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">
        Write a New Blog Post
    </h3>
    <BlogPostForm />
</div>

<div className="mt-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">
        Your Blog Posts
    </h3>
    <div className="flex flex-wrap">
        {blogPosts.map((post) => (
            <BlogPost key={post.id} post={post} />
        ))}
    </div>
</div>

<div className="mt-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">
        Your Draft Posts
    </h3>
    <div className="grid grid-cols-1 gap-4">
        {draftPosts.map((post) => (
            <div key={post.id}>
                <BlogPost post={post} />
                <button onClick={() => handleEdit(post.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                </button>
            </div>
        ))}
    </div>
</div>

            
        </div>
            )}
        </div>
    );
}

export default DoctorDashboard;