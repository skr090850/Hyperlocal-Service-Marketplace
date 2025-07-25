// PaymentPage.jsx
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
        {name === 'briefcase' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></>}
        {name === 'calendar' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>}
        {name === 'clock' && <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>}
        {name === 'map-pin' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></>}
        {name === 'credit-card' && <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></>}
        {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></>}
        {name === 'shield-check' && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></>}
        {name === 'alert-triangle' && <><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></>}
        {name === 'check-circle' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>}
        {/* Add more icons as needed */}
    </svg>
);

// --- Mock Booking Data (would come from previous page/state) ---
const mockBookingDetails = {
    serviceDetails: {
        providerId: '2',
        providerName: 'Priya Electric Works',
        serviceName: 'Standard Electrical Inspection',
        serviceCategory: 'Electrical',
    },
    bookingInfo: {
        date: '2024-07-15', // Example date
        time: '10:00 AM',   // Example time
        addressLine1: '123 Main St, Kankarbagh',
        city: 'Patna',
        pincode: '800020',
    },
    summary: {
        subtotal: 500,
        taxes: 25,
        total: 525,
    }
};


const PaymentPage = () => {
    // const location = useLocation();
    // const history = useHistory();
    // const [bookingDetails, setBookingDetails] = useState(location.state?.bookingDetails || mockBookingDetails);
    const [bookingDetails] = useState(mockBookingDetails); // Using mock directly

    const [paymentFormData, setPaymentFormData] = useState({
        cardNumber: '',
        expiryDate: '', // MM/YY
        cvv: '',
        nameOnCard: '',
    });
    const [paymentErrors, setPaymentErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'error'

    useEffect(() => {
        if (!bookingDetails) {
            // Handle case where booking details are missing (e.g., redirect)
            console.error("Booking details missing!");
            // history.push('/services'); // Or some error page
        }
    }, [bookingDetails /*, history*/]);

    const handlePaymentChange = (e) => {
        let { name, value } = e.target;

        if (name === "cardNumber") {
            value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
            if (value.length > 19) value = value.substring(0, 19); // Visa/Mastercard max 16 digits + 3 spaces
        } else if (name === "expiryDate") {
            value = value.replace(/\D/g, '');
            if (value.length > 2 && value.length <= 4) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            if (value.length > 5) value = value.substring(0, 5);
        } else if (name === "cvv") {
            value = value.replace(/\D/g, '');
            if (value.length > 4) value = value.substring(0, 4); // Max 4 for Amex
        }


        setPaymentFormData(prev => ({ ...prev, [name]: value }));
        if (paymentErrors[name]) {
            setPaymentErrors(prev => ({ ...prev, [name]: null }));
        }
        setPaymentStatus(null); // Clear previous status messages
    };

    const validatePaymentForm = () => {
        const newErrors = {};
        const cardNumberCleaned = paymentFormData.cardNumber.replace(/\s/g, '');
        if (!cardNumberCleaned) {
            newErrors.cardNumber = 'Card Number is required.';
        } else if (!/^\d{13,16}$/.test(cardNumberCleaned)) { // Basic check, real validation is complex
            newErrors.cardNumber = 'Enter a valid card number (13-16 digits).';
        }

        if (!paymentFormData.expiryDate) {
            newErrors.expiryDate = 'Expiry Date is required.';
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentFormData.expiryDate)) {
            newErrors.expiryDate = 'Enter a valid Expiry Date (MM/YY).';
        } else {
            const [month, year] = paymentFormData.expiryDate.split('/');
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            if (parseInt(year, 10) < currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)) {
                newErrors.expiryDate = 'Card has expired.';
            }
        }


        if (!paymentFormData.cvv.trim()) {
            newErrors.cvv = 'CVV is required.';
        } else if (!/^\d{3,4}$/.test(paymentFormData.cvv.trim())) {
            newErrors.cvv = 'Enter a valid CVV (3-4 digits).';
        }

        if (!paymentFormData.nameOnCard.trim()) {
            newErrors.nameOnCard = 'Name on Card is required.';
        } else if (!/^[a-zA-Z\s.-]+$/.test(paymentFormData.nameOnCard.trim())) {
            newErrors.nameOnCard = 'Enter a valid name.';
        }

        setPaymentErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setPaymentStatus(null);
        if (!validatePaymentForm()) {
            console.log("Payment form validation failed", paymentErrors);
            return;
        }

        setIsProcessing(true);
        console.log('Processing payment with:', paymentFormData);

        // --- Simulate Payment Gateway Interaction ---
        // In a real app, you would integrate with Stripe.js, Razorpay Checkout, etc.
        // This would involve tokenizing card details securely on the client-side
        // and sending the token to your backend for processing.
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

        // Simulate success/failure
        const isPaymentSuccessful = Math.random() > 0.2; // 80% chance of success

        if (isPaymentSuccessful) {
            setPaymentStatus('success');
            console.log('Payment Successful!');
            // In a real app:
            // - Send booking confirmation to backend
            // - Redirect to a booking success page: history.push('/booking-success', { bookingId: 'XYZ123' });
        } else {
            setPaymentStatus('error');
            console.error('Payment Failed. Please try again.');
        }
        setIsProcessing(false);
    };

    if (!bookingDetails) {
        return (
            <div className="payment-page-container">
                <header className="minimal-header">
                    <div className="container"><div className="logo"><a href="/">Service<span className="logo-accent">Hub</span></a></div></div>
                </header>
                <div className="container payment-main-content">
                    <p className="error-message global-error-message">Error: Booking details not found. Please try booking again.</p>
                </div>
                <footer className="minimal-footer"><div className="container"><p>&copy; {new Date().getFullYear()} ServiceHub</p></div></footer>
            </div>
        );
    }

    return (
        <div className="payment-page-container">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <Link to="/">Service<span className="logo-accent">Hub</span></Link>
                    </div>
                    <nav className="main-nav-payment">
                        <a href="/booking">Back to Booking</a> {/* Adjust link as needed */}
                    </nav>
                </div>
            </header>

            <div className="container payment-main-content">
                <h1>Confirm & Pay</h1>
                <div className="payment-layout">
                    <div className="payment-form-section">
                        <h2><Icon name="credit-card" size={22} /> Payment Details</h2>
                        <p className="secure-info-text"><Icon name="lock" size={16} /> Your payment information is encrypted and secure.</p>

                        {/* Placeholder for Payment Gateway Logos (e.g., Visa, Mastercard, Razorpay) */}
                        <div className="payment-gateway-logos">
                            <img src="https://placehold.co/60x40/transparent/black?text=Visa" alt="Visa" />
                            <img src="https://placehold.co/60x40/transparent/black?text=Mastercard" alt="Mastercard" />
                            <img src="https://placehold.co/80x40/transparent/black?text=Razorpay" alt="Razorpay" />
                        </div>

                        <form onSubmit={handlePaymentSubmit} noValidate>
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    placeholder="0000 0000 0000 0000"
                                    value={paymentFormData.cardNumber}
                                    onChange={handlePaymentChange}
                                    required
                                    maxLength="19"
                                    aria-invalid={paymentErrors.cardNumber ? "true" : "false"}
                                />
                                {paymentErrors.cardNumber && <p className="error-text">{paymentErrors.cardNumber}</p>}
                            </div>

                            <div className="form-row">
                                <div className="form-group half-width">
                                    <label htmlFor="expiryDate">Expiry Date</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        name="expiryDate"
                                        placeholder="MM/YY"
                                        value={paymentFormData.expiryDate}
                                        onChange={handlePaymentChange}
                                        required
                                        maxLength="5"
                                        aria-invalid={paymentErrors.expiryDate ? "true" : "false"}
                                    />
                                    {paymentErrors.expiryDate && <p className="error-text">{paymentErrors.expiryDate}</p>}
                                </div>
                                <div className="form-group half-width">
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        type="text" // Use text for better masking control if needed, or password
                                        id="cvv"
                                        name="cvv"
                                        placeholder="123"
                                        value={paymentFormData.cvv}
                                        onChange={handlePaymentChange}
                                        required
                                        maxLength="4"
                                        aria-invalid={paymentErrors.cvv ? "true" : "false"}
                                    />
                                    {paymentErrors.cvv && <p className="error-text">{paymentErrors.cvv}</p>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="nameOnCard">Name on Card</label>
                                <input
                                    type="text"
                                    id="nameOnCard"
                                    name="nameOnCard"
                                    placeholder="e.g., John Doe"
                                    value={paymentFormData.nameOnCard}
                                    onChange={handlePaymentChange}
                                    required
                                    aria-invalid={paymentErrors.nameOnCard ? "true" : "false"}
                                />
                                {paymentErrors.nameOnCard && <p className="error-text">{paymentErrors.nameOnCard}</p>}
                            </div>

                            {paymentStatus === 'error' && (
                                <div className="error-message global-error-message payment-process-error">
                                    <Icon name="alert-triangle" size={18} /> Payment failed. Please check your details or try another card.
                                </div>
                            )}
                            {paymentStatus === 'success' && (
                                <div className="success-message payment-process-success">
                                    <Icon name="check-circle" size={18} /> Payment successful! Your booking is confirmed.
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary btn-block btn-pay-now" disabled={isProcessing || paymentStatus === 'success'}>
                                {isProcessing ? 'Processing...' : `Pay ₹${bookingDetails.summary.total.toFixed(2)} Now`}
                                {!isProcessing && paymentStatus !== 'success' && <Icon name="shield-check" size={18} />}
                            </button>
                        </form>
                    </div>

                    <div className="order-summary-section">
                        <h3>Order Summary</h3>
                        <div className="summary-card-item">
                            <h4><Icon name="briefcase" size={18} /> {bookingDetails.serviceDetails.serviceName}</h4>
                            <p>Provider: {bookingDetails.serviceDetails.providerName}</p>
                        </div>
                        <div className="summary-card-item">
                            <p><Icon name="calendar" size={16} /> Date: {new Date(bookingDetails.bookingInfo.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            <p><Icon name="clock" size={16} /> Time: {bookingDetails.bookingInfo.time}</p>
                        </div>
                        <div className="summary-card-item">
                            <p><Icon name="map-pin" size={16} /> Address: {bookingDetails.bookingInfo.addressLine1}, {bookingDetails.bookingInfo.city} - {bookingDetails.bookingInfo.pincode}</p>
                        </div>
                        <hr className="summary-divider" />
                        <div className="summary-item">
                            <span>Subtotal</span>
                            <span>₹{bookingDetails.summary.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-item">
                            <span>Taxes & Fees</span>
                            <span>₹{bookingDetails.summary.taxes.toFixed(2)}</span>
                        </div>
                        <div className="summary-item total">
                            <span>Amount Payable</span>
                            <span>₹{bookingDetails.summary.total.toFixed(2)}</span>
                        </div>
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

export default PaymentPage;
