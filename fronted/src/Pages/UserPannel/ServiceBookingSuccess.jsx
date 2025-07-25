// BookingSuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // For receiving booking details and navigation

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
        {name === 'check-circle' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>}
        {name === 'briefcase' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></>}
        {name === 'calendar' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>}
        {name === 'clock' && <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>}
        {name === 'map-pin' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></>}
        {name === 'arrow-left' && <><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></>}
        {name === 'file-text' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></>}
        {/* Add more icons as needed */}
    </svg>
);

// --- Mock Booking Confirmation Data (would come from previous page/state or API) ---
const mockConfirmedBooking = {
    bookingId: `BKNG${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    transactionId: `PAY${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
    serviceDetails: {
        providerName: 'Priya Electric Works',
        serviceName: 'Standard Electrical Inspection',
    },
    bookingInfo: {
        date: '2024-07-15', // Example date
        time: '10:00 AM',   // Example time
        addressLine1: '123 Main St, Kankarbagh',
        city: 'Patna',
    },
    summary: {
        total: 525,
    }
};


const BookingSuccessPage = () => {
    // const location = useLocation();
    // const [confirmedBooking, setConfirmedBooking] = useState(location.state?.confirmedBooking || mockConfirmedBooking);
    const [confirmedBooking] = useState(mockConfirmedBooking); // Using mock directly

    useEffect(() => {
        if (!confirmedBooking) {
            // Handle case where booking details are missing (e.g., redirect)
            console.error("Confirmed booking details missing!");
            // Potentially redirect to homepage or an error page
            // history.push('/');
        }
        // You might want to clear any sensitive payment info from local/session storage here
    }, [confirmedBooking]);

    if (!confirmedBooking) {
        // Basic fallback if data is somehow missing
        return (
            <div className="booking-success-page">
                <header className="minimal-header">
                    <div className="container">
                        <div className="logo">
                            <a href="/">Service<span className="logo-accent">Hub</span></a>
                        </div>
                    </div>
                </header>
                <main className="success-main-content container">
                    <div className="success-card">
                        <Icon name="alert-triangle" size={60} color="var(--error-color)" className="status-icon" />
                        <h1>Booking Confirmation Not Found</h1>
                        <p>We couldn't find the details for your booking. Please check your bookings or contact support.</p>
                        <div className="success-actions">
                            <a href="/" className="btn btn-primary">Go to Homepage</a>
                            <a href="/bookings" className="btn btn-secondary">View My Bookings</a>
                        </div>
                    </div>
                </main>
                <footer className="minimal-footer">
                    <div className="container"><p>&copy; {new Date().getFullYear()} ServiceHub</p></div>
                </footer>
            </div>
        );
    }

    return (
        <div className="booking-success-page">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                    {/* Optional: Minimal nav if needed */}
                </div>
            </header>

            <main className="success-main-content container">
                <div className="success-card">
                    <Icon name="check-circle" size={80} color="var(--success-color)" className="status-icon" />
                    <h1>Booking Confirmed!</h1>
                    <p className="success-subtitle">
                        Thank you! Your service with <strong>{confirmedBooking.serviceDetails.providerName}</strong> has been successfully booked.
                    </p>

                    <div className="booking-details-summary">
                        <h3>Booking Summary</h3>
                        <p><strong>Booking ID:</strong> {confirmedBooking.bookingId}</p>
                        <p><strong>Transaction ID:</strong> {confirmedBooking.transactionId}</p>
                        <p><Icon name="briefcase" size={16} /> <strong>Service:</strong> {confirmedBooking.serviceDetails.serviceName}</p>
                        <p><Icon name="calendar" size={16} /> <strong>Date:</strong> {new Date(confirmedBooking.bookingInfo.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p><Icon name="clock" size={16} /> <strong>Time:</strong> {confirmedBooking.bookingInfo.time}</p>
                        <p><Icon name="map-pin" size={16} /> <strong>Address:</strong> {confirmedBooking.bookingInfo.addressLine1}, {confirmedBooking.bookingInfo.city}</p>
                        <p className="total-amount-display"><strong>Amount Paid:</strong> ₹{confirmedBooking.summary.total.toFixed(2)}</p>
                    </div>

                    <p className="confirmation-note">
                        A confirmation email with all the details has been sent to your registered email address.
                        Please contact the service provider if you have any specific questions prior to the service.
                    </p>

                    <div className="success-actions">
                        <a href="/bookings" className="btn btn-primary">
                            <Icon name="file-text" size={18} /> View My Bookings
                        </a>
                        <Link to="/" className="btn btn-secondary">
                            <Icon name="arrow-left" size={18} /> Back to Homepage
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="minimal-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default BookingSuccessPage;
