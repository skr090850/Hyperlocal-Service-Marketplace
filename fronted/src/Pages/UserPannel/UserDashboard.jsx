// UserDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import './UserPannel.css'; // Assuming this CSS file exists and is styled
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom'; // Not using Link for # navigation for now

// --- Helper Icon Component (can be moved to a shared file) ---
const Icon = ({ name, size = 20, color = 'currentColor', className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon icon-${name} ${className}`}
    >
        {name === 'layout-dashboard' && <><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></>}
        {name === 'file-text' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></>}
        {name === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>}
        {name === 'settings' && <><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>}
        {name === 'log-out' && <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></>}
        {name === 'search' && <><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></>}
        {name === 'calendar' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>}
        {name === 'clock' && <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>}
        {name === 'map-pin' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></>}
        {name === 'briefcase' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></>}
        {name === 'edit-3' && <><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></>}
        {name === 'save' && <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></>}
        {name === 'x-circle' && <><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></>}
        {name === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
        {name === 'phone' && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></>}
    </svg>
);

// --- Mock User Data (replace with actual authenticated user data) ---
const mockUser = {
    name: 'Aisha Sharma',
    email: 'aisha.sharma@example.com',
    profileImageUrl: 'https://placehold.co/100x100/007bff/white?text=AS',
    memberSince: '2023-05-15',
    phone: '+91 9988776655', // Added phone
    address: { // Added address object
        line1: '123, Rose Villa',
        line2: 'Gandhi Nagar',
        city: 'Patna',
        pincode: '800001'
    }
};

// --- Mock Upcoming Bookings Data ---
const mockUpcomingBookings = [
    {
        id: 'B001',
        serviceName: 'Deep Home Cleaning',
        providerName: 'Sparkle Clean Co.',
        date: '2025-05-20',
        time: '02:00 PM',
        status: 'Scheduled',
        address: '123, Rose Villa, Gandhi Nagar, Patna - 800001', // Added for detail view
        notes: 'Please bring eco-friendly cleaning supplies.'
    },
    {
        id: 'B002',
        serviceName: 'AC Repair & Servicing',
        providerName: 'CoolTech Services',
        date: '2025-05-22',
        time: '11:00 AM',
        status: 'Scheduled',
        address: '456, Tech Park, Bailey Road, Patna - 800014',
        notes: ''
    },
];

// --- EditUserProfileForm Component (Defined inline) ---
const EditUserProfileForm = ({ currentUser, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        pincode: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || '',
                phone: currentUser.phone || '',
                addressLine1: currentUser.address?.line1 || '',
                addressLine2: currentUser.address?.line2 || '',
                city: currentUser.address?.city || '',
                pincode: currentUser.address?.pincode || ''
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (formData.phone.trim() && !/^\+?[0-9\s-()]{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid phone number (10-15 digits).";
        }
        if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address Line 1 is required.";
        if (!formData.city.trim()) newErrors.city = "City is required.";
        if (!formData.pincode.trim()) {
            newErrors.pincode = "Pincode is required.";
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Pincode must be 6 digits.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const updatedUserData = {
                name: formData.name,
                phone: formData.phone,
                address: {
                    line1: formData.addressLine1,
                    line2: formData.addressLine2,
                    city: formData.city,
                    pincode: formData.pincode,
                }
            };
            onSave(updatedUserData);
        }
    };

    return (
        <div className="edit-user-profile-form">
            <form onSubmit={handleSubmit} noValidate>
                <h4>Edit Your Profile</h4>
                <div className="form-group">
                    <label htmlFor="eup-name">Full Name</label>
                    <input type="text" id="eup-name" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="eup-email">Email (Cannot be changed)</label>
                    <input type="email" id="eup-email" name="email" value={currentUser.email} readOnly disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="eup-phone">Phone Number</label>
                    <input type="tel" id="eup-phone" name="phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>
                <h5 className="form-subsection-title">Address</h5>
                <div className="form-group">
                    <label htmlFor="eup-addressLine1">Address Line 1</label>
                    <input type="text" id="eup-addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
                    {errors.addressLine1 && <p className="error-text">{errors.addressLine1}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="eup-addressLine2">Address Line 2 (Optional)</label>
                    <input type="text" id="eup-addressLine2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <div className="form-group half-width">
                        <label htmlFor="eup-city">City</label>
                        <input type="text" id="eup-city" name="city" value={formData.city} onChange={handleChange} />
                        {errors.city && <p className="error-text">{errors.city}</p>}
                    </div>
                    <div className="form-group half-width">
                        <label htmlFor="eup-pincode">Pincode</label>
                        <input type="text" id="eup-pincode" name="pincode" value={formData.pincode} onChange={handleChange} maxLength="6" />
                        {errors.pincode && <p className="error-text">{errors.pincode}</p>}
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary"><Icon name="save" size={16} /> Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}><Icon name="x-circle" size={16} /> Cancel</button>
                </div>
            </form>
        </div>
    );
};


const UserDashboardPage = () => {
    const [user, setUser] = useState(mockUser);
    const [upcomingBookings, setUpcomingBookings] = useState(mockUpcomingBookings);
    const [activeSection, setActiveSection] = useState('overview');
    const [isEditingUserProfile, setIsEditingUserProfile] = useState(false);
    const [viewingBookingId, setViewingBookingId] = useState(null); // To store ID of booking being viewed

    useEffect(() => {
        // Fetch user data and bookings on component mount
    }, []);

    const handleLogout = () => {
        console.log('User logged out');
        alert('Logged out successfully. Redirecting to homepage...');
        window.location.href = '/';
    };

    const handleUserProfileSave = (updatedData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...updatedData, // This will update name, phone, address
        }));
        setIsEditingUserProfile(false);
        alert("Profile updated successfully!");
    };

    const handleViewBooking = (bookingId) => {
        setActiveSection('bookings'); // Navigate to bookings section
        setViewingBookingId(bookingId); // Set the ID of the booking to be viewed/highlighted
        // In a more complex app, this might involve fetching full details if not already loaded
    };

    const renderSection = () => {
        // If viewing a specific booking, show its details in the 'bookings' section
        if (activeSection === 'bookings' && viewingBookingId) {
            const bookingToView = upcomingBookings.find(b => b.id === viewingBookingId) ||
                /* find in past bookings if you have them */
                null;
            return (
                <div className="dashboard-section">
                    <h2>Booking Details</h2>
                    {bookingToView ? (
                        <div className="booking-detail-view">
                            <p><strong>Booking ID:</strong> {bookingToView.id}</p>
                            <p><strong>Service:</strong> {bookingToView.serviceName}</p>
                            <p><strong>Provider:</strong> {bookingToView.providerName}</p>
                            <p><strong>Date:</strong> {new Date(bookingToView.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            <p><strong>Time:</strong> {bookingToView.time}</p>
                            <p><strong>Status:</strong> <span className={`booking-status ${bookingToView.status.toLowerCase()}`}>{bookingToView.status}</span></p>
                            <p><strong>Address:</strong> {bookingToView.address}</p>
                            {bookingToView.notes && <p><strong>Notes:</strong> {bookingToView.notes}</p>}
                            {/* Add more details like price, option to cancel/reschedule etc. */}
                            <button className="btn btn-secondary" onClick={() => { setViewingBookingId(null); /* setActiveSection('overview'); Optional: go back to overview or stay in bookings list */ }}>
                                <Icon name="arrow-left" size={16} /> Back to Bookings List
                            </button>
                        </div>
                    ) : (
                        <p>Booking details not found.</p>
                    )}
                </div>
            );
        }


        switch (activeSection) {
            case 'overview':
                return (
                    <div className="dashboard-section">
                        <h2>Dashboard Overview</h2>
                        <div className="overview-grid">
                            <div className="overview-card">
                                <h3>Upcoming Bookings</h3>
                                <p className="stat-number">{upcomingBookings.length}</p>
                                <a href="#bookings" onClick={() => { setActiveSection('bookings'); setViewingBookingId(null); }} className="card-link">View All</a>
                            </div>
                            <div className="overview-card">
                                <h3>Past Bookings</h3>
                                <p className="stat-number">5</p> {/* Mock stat */}
                                <a href="#bookings" onClick={() => { setActiveSection('bookings'); setViewingBookingId(null); }} className="card-link">View History</a>
                            </div>
                            <div className="overview-card">
                                <h3>Messages</h3>
                                <p className="stat-number">2</p> {/* Mock stat */}
                                <a href="#messages" className="card-link">Read Messages</a> {/* Assuming #messages will be a section */}
                            </div>
                        </div>

                        <h3><Icon name="calendar" /> Upcoming Bookings</h3>
                        {upcomingBookings.length > 0 ? (
                            <ul className="booking-list">
                                {upcomingBookings.map(booking => (
                                    <li key={booking.id} className="booking-list-item">
                                        <div className="booking-item-info">
                                            <strong>{booking.serviceName}</strong> with {booking.providerName}
                                            <p><Icon name="clock" size={16} /> {new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} at {booking.time}</p>
                                        </div>
                                        <span className={`booking-status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                                        <button onClick={() => handleViewBooking(booking.id)} className="btn btn-secondary btn-small">
                                            <Icon name="eye" size={14} /> View
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>You have no upcoming bookings.</p>
                        )}
                    </div>
                );
            case 'bookings':
                // This will now list all bookings, and the detail view is handled by the condition at the start of renderSection
                return (
                    <div className="dashboard-section">
                        <h2>My Bookings</h2>
                        {/* Add tabs for Upcoming, Past, Cancelled bookings here */}
                        <h4>Upcoming Bookings</h4>
                        {upcomingBookings.length > 0 ? (
                            <ul className="booking-list">
                                {upcomingBookings.map(booking => (
                                    <li key={booking.id} className="booking-list-item">
                                        <div className="booking-item-info">
                                            <strong>{booking.serviceName}</strong> with {booking.providerName}
                                            <p><Icon name="clock" size={16} /> {new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} at {booking.time}</p>
                                        </div>
                                        <span className={`booking-status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                                        <button onClick={() => handleViewBooking(booking.id)} className="btn btn-secondary btn-small">
                                            <Icon name="eye" size={14} /> View Details
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No upcoming bookings.</p>
                        )}
                        {/* Placeholder for Past Bookings */}
                        <h4>Past Bookings</h4>
                        <p>You have 5 past bookings. (List to be implemented)</p>
                    </div>
                );
            case 'profile':
                return (
                    <div className="dashboard-section">
                        <h2>My Profile</h2>
                        {isEditingUserProfile ? (
                            <EditUserProfileForm
                                currentUser={user}
                                onSave={handleUserProfileSave}
                                onCancel={() => setIsEditingUserProfile(false)}
                            />
                        ) : (
                            <div className="profile-details-card">
                                <div className="profile-info-header">
                                    <img src={user.profileImageUrl} alt={user.name} className="user-avatar-large" onError={(e) => e.target.src = 'https://placehold.co/120x120/cccccc/333333?text=User'} />
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                </div>
                                <div className="profile-info-grid">
                                    <div>
                                        <h4>Contact Information</h4>
                                        <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <h4>Address</h4>
                                        <p>{user.address?.line1 || 'Not provided'}</p>
                                        {user.address?.line2 && <p>{user.address.line2}</p>}
                                        <p>{user.address?.city || ''}{user.address?.city && user.address?.pincode ? ', ' : ''}{user.address?.pincode || ''}</p>
                                    </div>
                                </div>
                                <p className="member-since-text"><strong>Member Since:</strong> {new Date(user.memberSince).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <button className="btn btn-primary edit-profile-main-btn" onClick={() => setIsEditingUserProfile(true)}>
                                    <Icon name="edit-3" size={16} /> Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 'settings':
                return (
                    <div className="dashboard-section">
                        <h2>Account Settings</h2>
                        <p>Manage notification preferences, password, and other account settings.</p>
                    </div>
                );
            default:
                return null;
        }
    };


    if (!user) {
        return <div className="loading-state">Loading user dashboard...</div>;
    }

    return (
        <div className="user-dashboard-page">
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <img src={user.profileImageUrl} alt={user.name} className="user-avatar" onError={(e) => e.target.src = 'https://placehold.co/80x80/cccccc/333333?text=User'} />
                    <h3>{user.name}</h3>
                    <p className="user-email-sidebar">{user.email}</p>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className={activeSection === 'overview' ? 'active' : ''}>
                            <a href="#overview" onClick={() => { setActiveSection('overview'); setViewingBookingId(null); setIsEditingUserProfile(false); }}>
                                <Icon name="layout-dashboard" /> Overview
                            </a>
                        </li>
                        <li className={activeSection === 'bookings' ? 'active' : ''}>
                            <a href="#bookings" onClick={() => { setActiveSection('bookings'); setViewingBookingId(null); setIsEditingUserProfile(false); }}>
                                <Icon name="file-text" /> My Bookings
                            </a>
                        </li>
                        <li className={activeSection === 'profile' ? 'active' : ''}>
                            <a href="#profile" onClick={() => { setActiveSection('profile'); setViewingBookingId(null); /* Keep edit form open if already editing */ }}>
                                <Icon name="user" /> My Profile
                            </a>
                        </li>
                        <li className={activeSection === 'settings' ? 'active' : ''}>
                            <a href="#settings" onClick={() => { setActiveSection('settings'); setViewingBookingId(null); setIsEditingUserProfile(false); }}>
                                <Icon name="settings" /> Settings
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">
                        <Icon name="log-out" /> Logout
                    </button>
                </div>
            </aside>

            <main className="dashboard-main-content">
                <header className="dashboard-header">
                    <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
                    <Link to="/service-booking" className="btn btn-primary new-booking-btn">
                        <Icon name="search" size={18} /> Book a New Service
                    </Link>
                </header>
                {renderSection()}
            </main>
        </div>
    );
};

export default UserDashboardPage;
