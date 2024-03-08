import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Username, Address } from './UserComponents';
import BlogPost from './BlogPost';

function ProfilePicture({ profilePicture, className }) {
    return (
        <img 
            src={profilePicture || 'https://via.placeholder.com/150'} 
            alt="Profile" 
            className={`${className} object-cover`}
        />
    );
}

function PatientDashboard() {
    const [user, setUser] = useState(null);
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://piyushrai.pythonanywhere.com/api/user/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

        axios.get('https://piyushrai.pythonanywhere.com/api/blogpost/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then((response) => {
            setBlogPosts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredPosts = selectedCategory === 'all' ? blogPosts : blogPosts.filter(post => post.category === selectedCategory);

    function handleLogout() {
        localStorage.removeItem('access');
        navigate('/login');
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Patient Dashboard</h2>
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
                </div>
            )}
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
                <div className="flex items-center mb-4">
                    <span className="mr-2">Filter by category:</span>
                    <div className="flex">
                        <CategoryButton name="All" handleClick={() => handleCategoryChange('all')} isSelected={selectedCategory === 'all'} />
                        <CategoryButton name="Mental Health" handleClick={() => handleCategoryChange('mental_health')} isSelected={selectedCategory === 'mental_health'} />
                        <CategoryButton name="Heart Disease" handleClick={() => handleCategoryChange('heart_disease')} isSelected={selectedCategory === 'heart_disease'} />
                        <CategoryButton name="Covid19" handleClick={() => handleCategoryChange('covid19')} isSelected={selectedCategory === 'covid19'} />
                        <CategoryButton name="Immunization" handleClick={() => handleCategoryChange('immunization')} isSelected={selectedCategory === 'immunization'} />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {filteredPosts.map((post) => (
                        <BlogPost key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function CategoryButton({ name, handleClick, isSelected }) {
    return (
        <button
            onClick={handleClick}
            className={`mr-2 py-1 px-3 rounded ${
                isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
        >
            {name}
        </button>
    );
}

export default PatientDashboard;

