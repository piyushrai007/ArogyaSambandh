import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Username, Address, ProfilePicture } from './UserComponents';
import BlogPost from './BlogPost';
import Modal from 'react-modal';
import PredictionModel from './pred';

function AppointmentForm({ doctorId, doctorName, onAppointmentBooked }) {
    const [specialty, setSpecialty] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [userid, setPatientId] = useState('');
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // Add this line
    const navigate = useNavigate();
    const specialties = ['ENT', 'Heart', 'Mental', 'Orthopedic', 'Dermatology'];

    useEffect(() => {
        const userid = localStorage.getItem('userid');
        if (userid) {
            setPatientId(userid);
        }
    }, []);

    const handleBookAppointment = () => {
        // Parse the start time to obtain hours and minutes
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        
        // Calculate the end time by adding 45 minutes to the start time
        const endMinutes = startMinutes + 45;
        const endHours = startHours + Math.floor(endMinutes / 60);
        
        // Adjust hours and minutes to ensure they are within the valid range
        const adjustedEndHours = endHours % 24;
        const adjustedEndMinutes = endMinutes % 60;
        
        // Format the end time as HH:mm
        const endTime = `${adjustedEndHours < 10 ? '0' : ''}${adjustedEndHours}:${adjustedEndMinutes < 10 ? '0' : ''}${adjustedEndMinutes}`;
    
        axios.post('https://piyushrai.pythonanywhere.com/api/appointments/', {
            patient: userid,
            doctor: doctorId,
            speciality: specialty,
            date_of_appointment: date,
            start_time: startTime,
            end_time: endTime,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then((response) => {
            console.log(response.data);
            onAppointmentBooked(response.data, doctorName);
            setIsConfirmationModalOpen(true);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
            <select 
                value={specialty} 
                onChange={(e) => setSpecialty(e.target.value)} 
                className="w-full p-2 mb-4 border rounded"
            >
                <option value="">Select specialty</option>
                {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                ))}
            </select>
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="w-full p-2 mb-4 border rounded"
            />
            <input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)} 
                className="w-full p-2 mb-4 border rounded"
            />
            <button 
                onClick={handleBookAppointment} 
                className="w-full p-2 bg-blue-500 text-white rounded"
            >
                Confirm
            </button>
            <Modal
                isOpen={isConfirmationModalOpen}
                onRequestClose={() => setIsConfirmationModalOpen(false)}
            >
                <ConfirmationScreen doctorName={doctorName} />
            </Modal>
        </div>
    );
}

function ConfirmationScreen({ doctorName }) {
    return (
        <div>
            <h2>Appointment Booked</h2>
            <p>{doctorName}</p>
            <button onClick={() => window.location.reload()}>Close</button>
        </div>
    );
}

function DoctorList() {
    const [bookedDoctorName, setBookedDoctorName] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('https://piyushrai.pythonanywhere.com/api/doctors/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then((response) => {
            setDoctors(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleBookAppointment = (doctorId, doctorName) => {
        setSelectedDoctorId(doctorId);
        setBookedDoctorName(doctorName);
        setIsModalOpen(true);
    };

    const handleAppointmentBooked = (appointment, doctorName) => {
        setAppointment(appointment);
        setBookedDoctorName(doctorName);
        setIsModalOpen(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Doctors</h2>
            {doctors && doctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg">
                    <div>
                        <ProfilePicture profilePicture={doctor.profile_picture} className="h-20 w-20 rounded-full" />

                        <h3 className="text-xl font-bold">{doctor.username}</h3>

                        <p className="text-gray-500">{doctor.specialization}</p>
                        <button 
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow" 
                            onClick={() => handleBookAppointment(doctor.id, doctor.username)}
                        >
                            Book Appointment
                        </button>
                    </div>
                    <Modal
                        isOpen={selectedDoctorId === doctor.id && isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                    >
                        <AppointmentForm doctorId={doctor.id} doctorName={bookedDoctorName} onAppointmentBooked={handleAppointmentBooked} />
                    </Modal>
                </div>
            ))}
        </div>
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
                    <DoctorList />
                    <PredictionModel/>
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
                    {blogPosts.map((post) => (
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

