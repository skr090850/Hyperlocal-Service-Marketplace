// BookingFormPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        {name === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>}
        {name === 'briefcase' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></>}
        {name === 'calendar' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>}
        {name === 'clock' && <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>}
        {name === 'map-pin' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></>}
        {name === 'file-text' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></>}
        {name === 'credit-card' && <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></>}
        {/* Add more icons as needed */}
    </svg>
);

// --- Mock Data (Service/Provider details, replace with actual data fetching) ---
const mockServiceToBook = {
    providerId: '2',
    providerName: 'Priya Electric Works',
    providerProfileImageUrl: 'https://placehold.co/80x80/28a745/white?text=Priya',
    serviceName: 'Standard Electrical Inspection', // Or could be a user-selected specific service
    serviceCategory: 'Electrical',
    estimatedDuration: '1-2 hours',
    basePrice: 500, // Base price for the service
    // In a real app, you might fetch available time slots from the provider's schedule
};


const BookingFormPage = () => {
    // const { providerId, serviceId } = useParams(); // If IDs come from URL
    // const location = useLocation(); // To get passed state (e.g., service details)
    // const [serviceDetails, setServiceDetails] = useState(location.state?.serviceToBook || mockServiceToBook);

    const [serviceDetails] = useState(mockServiceToBook); // Using mock data directly

    const [formData, setFormData] = useState({
        date: '',
        time: '', // Could be specific time slots fetched from backend
        addressLine1: '',
        addressLine2: '',
        city: 'Patna', // Default or fetched based on user profile
        pincode: '',
        specialInstructions: '',
    });

    const [errors, setErrors] = useState({});
    const [bookingSummary, setBookingSummary] = useState({
        subtotal: serviceDetails.basePrice,
        taxes: serviceDetails.basePrice * 0.05, // Example 5% tax
        total: serviceDetails.basePrice * 1.05,
    });

    // Get current date for min attribute of date input
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (`0${today.getMonth() + 1}`).slice(-2);
        const day = (`0${today.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    // Available time slots (mocked, fetch from backend in real app)
    const availableTimeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ];

    useEffect(() => {
        // Fetch user's saved address if available and pre-fill
        // For now, we'll leave it blank or with defaults
        // Example:
        // const userAddress = getUserAddressFromProfile();
        // if (userAddress) {
        //   setFormData(prev => ({ ...prev, ...userAddress }));
        // }

        // Recalculate summary if base price changes (e.g., if service is configurable)
        const sub = serviceDetails.basePrice;
        const tax = sub * 0.05; // Example tax
        setBookingSummary({
            subtotal: sub,
            taxes: tax,
            total: sub + tax,
        });

    }, [serviceDetails.basePrice]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.date) newErrors.date = 'Please select a date.';
        if (!formData.time) newErrors.time = 'Please select a time slot.';
        if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required.';
        if (!formData.city.trim()) newErrors.city = 'City is required.';
        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required.';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Pincode must be 6 digits.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            window.location.href = "/payment";
            // console.log('Booking Details:', { serviceDetails, bookingInfo: formData, summary: bookingSummary });
            // Proceed to payment page, passing booking details
            // alert('Form validated. Proceeding to payment (simulated).');
            // In a real app: history.push('/payment', { bookingDetails: { ... } });
        } else {
            // console.log("Form validation failed", errors)
        }
    };

    if (!serviceDetails) {
        return <div className="loading-state">Loading service details...</div>;
    }

    return (
        <div className="booking-form-page">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                    <nav className="main-nav-booking">
                        <a href={`/provider/${serviceDetails.providerId}`}>Back to Profile</a> {/* Example link */}
                    </nav>
                </div>
            </header>

            <div className="container booking-main-content">
                <h1>Book Your Service</h1>
                <div className="booking-layout">
                    <div className="booking-form-section">
                        <div className="service-provider-summary-card">
                            <img src={serviceDetails.providerProfileImageUrl} alt={serviceDetails.providerName} className="provider-thumb" />
                            <div>
                                <h3>{serviceDetails.providerName}</h3>
                                <p><Icon name="briefcase" size={16} /> {serviceDetails.serviceName}</p>
                                <p className="category-tag">{serviceDetails.serviceCategory}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            <h2>Schedule Your Service</h2>
                            <div className="form-row">
                                <div className="form-group half-width">
                                    <label htmlFor="date"><Icon name="calendar" size={16} /> Service Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        min={getCurrentDate()}
                                        required
                                        aria-invalid={errors.date ? "true" : "false"}
                                    />
                                    {errors.date && <p className="error-text">{errors.date}</p>}
                                </div>
                                <div className="form-group half-width">
                                    <label htmlFor="time"><Icon name="clock" size={16} /> Preferred Time Slot</label>
                                    <select
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        aria-invalid={errors.time ? "true" : "false"}
                                    >
                                        <option value="" disabled>Select a time</option>
                                        {availableTimeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                                    </select>
                                    {errors.time && <p className="error-text">{errors.time}</p>}
                                </div>
                            </div>

                            <h2><Icon name="map-pin" size={18} /> Service Address</h2>
                            <div className="form-group">
                                <label htmlFor="addressLine1">Address Line 1</label>
                                <input
                                    type="text"
                                    id="addressLine1"
                                    name="addressLine1"
                                    placeholder="House No., Building, Street"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    required
                                    aria-invalid={errors.addressLine1 ? "true" : "false"}
                                />
                                {errors.addressLine1 && <p className="error-text">{errors.addressLine1}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
                                <input
                                    type="text"
                                    id="addressLine2"
                                    name="addressLine2"
                                    placeholder="Apartment, Suite, Landmark"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group half-width">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        aria-invalid={errors.city ? "true" : "false"}
                                    />
                                    {errors.city && <p className="error-text">{errors.city}</p>}
                                </div>
                                <div className="form-group half-width">
                                    <label htmlFor="pincode">Pincode</label>
                                    <input
                                        type="text"
                                        id="pincode"
                                        name="pincode"
                                        placeholder="6-digit pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                        maxLength="6"
                                        pattern="\d{6}"
                                        aria-invalid={errors.pincode ? "true" : "false"}
                                    />
                                    {errors.pincode && <p className="error-text">{errors.pincode}</p>}
                                </div>
                            </div>

                            <h2><Icon name="file-text" size={18} /> Special Instructions (Optional)</h2>
                            <div className="form-group">
                                <textarea
                                    id="specialInstructions"
                                    name="specialInstructions"
                                    rows="4"
                                    placeholder="Any specific requests or details for the provider..."
                                    value={formData.specialInstructions}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    <div className="booking-summary-section">
                        <h3>Booking Summary</h3>
                        <div className="summary-item">
                            <span>{serviceDetails.serviceName}</span>
                            <span>₹{bookingSummary.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-item">
                            <span>Estimated Duration</span>
                            <span>{serviceDetails.estimatedDuration}</span>
                        </div>
                        <div className="summary-item">
                            <span>Taxes & Fees (approx. 5%)</span>
                            <span>₹{bookingSummary.taxes.toFixed(2)}</span>
                        </div>
                        <hr className="summary-divider" />
                        <div className="summary-item total">
                            <span>Estimated Total</span>
                            <span>₹{bookingSummary.total.toFixed(2)}</span>
                        </div>
                        <Link to="/payment" ><button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block btn-proceed">
                            <Icon name="credit-card" size={18} /> Proceed to Payment
                        </button></Link>
                        <p className="secure-payment-info">
                            You will be redirected to a secure payment gateway.
                        </p>
                    </div>
                </div>
            </div>

            <footer className="minimal-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default BookingFormPage;
