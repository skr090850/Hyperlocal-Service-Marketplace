// ServiceProviderProfilePage.jsx
import React, { useState, useEffect } from 'react';

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
        {name === 'star' && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>}
        {name === 'map-pin' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></>}
        {name === 'phone' && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></>}
        {name === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
        {name === 'calendar' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>}
        {name === 'clock' && <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>}
        {name === 'briefcase' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></>}
        {name === 'image' && <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></>}
        {name === 'message-square' && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>}
        {/* Add more icons as needed */}
    </svg>
);

// --- Mock Data for a single provider (replace with API call) ---
const mockProviderDetails = {
    id: '2', // Assuming we are viewing Priya Electric Works
    name: 'Priya Electric Works',
    tagline: 'Your Trusted Partner for All Electrical Needs in Patna',
    serviceCategory: 'Electrical',
    specialties: ['Residential Wiring', 'Commercial Wiring', 'Fixture Installation & Repair', 'Appliance Installation', 'Emergency Electrical Services', 'Safety Inspections'],
    rating: 4.8,
    reviewsCount: 210,
    location: 'Shop No. 15, Boring Road Chauraha, Patna, Bihar - 800001',
    city: 'Patna',
    profileImageUrl: 'https://placehold.co/150x150/28a745/white?text=Priya', // Square profile image
    bannerImageUrl: 'https://placehold.co/1200x400/5cb85c/white?text=Priya+Electric+Works+Banner', // Wider banner image
    description: "Priya Electric Works has been proudly serving the Patna community for over 10 years. We are a team of certified and experienced electricians dedicated to providing top-quality electrical services for both residential and commercial clients. Our commitment is to ensure safety, reliability, and customer satisfaction on every job. Whether it's a small repair or a large installation project, we handle it with utmost professionalism and care.",
    contact: {
        phone: '+91 98765 43210',
        email: 'priya.electric@example.com',
        // website: 'www.priyaelectric.com' // Optional
    },
    workingHours: [
        { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 5:00 PM' },
        { day: 'Sunday', hours: 'Closed (Emergency Services Available)' },
    ],
    gallery: [
        { id: 'g1', url: 'https://placehold.co/600x400/28a745/white?text=Project+1', caption: 'Residential Wiring Project' },
        { id: 'g2', url: 'https://placehold.co/600x400/28a745/white?text=Project+2', caption: 'Commercial Lighting Setup' },
        { id: 'g3', url: 'https://placehold.co/600x400/28a745/white?text=Project+3', caption: 'Fixture Installation' },
        { id: 'g4', url: 'https://placehold.co/600x400/28a745/white?text=Project+4', caption: 'Panel Upgrade' },
    ],
    reviews: [
        { id: 'r1', userName: 'Amit Singh', rating: 5, comment: 'Excellent service! Priya was very professional and fixed the issue quickly. Highly recommended.', date: '2024-05-10' },
        { id: 'r2', userName: 'Sunita Devi', rating: 4, comment: 'Good work, but was a bit late for the appointment. Overall satisfied with the quality.', date: '2024-04-22' },
        { id: 'r3', userName: 'Rajesh Kumar', rating: 5, comment: 'Very knowledgeable and efficient. Solved a complex wiring problem in my office. Thank you!', date: '2024-03-15' },
    ],
    isVerified: true,
    experienceYears: 10,
    priceIndicator: '₹₹₹',
};


// --- ReviewCard Component ---
const ReviewCard = ({ review }) => (
    <div className="review-card">
        <div className="review-header">
            <strong className="review-user-name">{review.userName}</strong>
            <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
        </div>
        <div className="review-rating">
            {Array(5).fill(0).map((_, i) => (
                <Icon key={i} name="star" size={16} color={i < review.rating ? '#ffc107' : '#e0e0e0'} className={i < review.rating ? 'filled-star' : 'empty-star'} />
            ))}
        </div>
        <p className="review-comment">{review.comment}</p>
    </div>
);

// --- ServiceProviderProfilePage Component ---
const ServiceProviderProfilePage = () => {
    // const { providerId } = useParams(); // Uncomment if using React Router
    const [provider, setProvider] = useState(null);
    const [activeImage, setActiveImage] = useState(null); // For gallery modal

    useEffect(() => {
        // Simulate API call to fetch provider details based on providerId
        // For now, using mock data directly
        // In a real app: fetch(`/api/providers/${providerId}`).then(res => res.json()).then(data => setProvider(data));
        setProvider(mockProviderDetails);
        if (mockProviderDetails && mockProviderDetails.gallery.length > 0) {
            // setActiveImage(mockProviderDetails.gallery[0].url); // Set initial active image for main display
        }
    }, [/* providerId */]); // Add providerId to dependency array if using React Router

    const handleBookService = () => {
        // Navigate to booking page or open booking modal
        alert(`Booking service with ${provider.name}. This will redirect to a booking form.`);
        // history.push(`/book/${provider.id}`);
    };

    const openImageModal = (imageUrl) => {
        setActiveImage(imageUrl);
    };

    const closeImageModal = () => {
        setActiveImage(null);
    };


    if (!provider) {
        return <div className="loading-state">Loading provider details...</div>;
    }

    return (
        <div className="provider-profile-page">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                    <nav className="main-nav-profile">
                        <a href="/">Home</a>
                        <a href="/services">Browse Services</a>
                    </nav>
                </div>
            </header>

            <div className="profile-banner" style={{ backgroundImage: `url(${provider.bannerImageUrl || 'https://placehold.co/1200x300/cccccc/333333?text=Service+Provider'})` }}>
                {/* Banner content can be added here if needed */}
            </div>

            <div className="container profile-main-content">
                <div className="profile-header-section">
                    <img src={provider.profileImageUrl} alt={provider.name} className="profile-picture" onError={(e) => e.target.src = 'https://placehold.co/150x150/cccccc/333333?text=Photo'} />
                    <div className="profile-header-info">
                        <h1>{provider.name} {provider.isVerified && <span className="verified-badge-profile" title="Verified Provider">✔ Verified</span>}</h1>
                        <p className="profile-tagline">{provider.tagline}</p>
                        <div className="profile-meta">
                            <span><Icon name="briefcase" size={16} /> {provider.serviceCategory}</span>
                            <span><Icon name="star" size={16} color="#ffc107" /> {provider.rating.toFixed(1)} ({provider.reviewsCount} reviews)</span>
                            <span><Icon name="map-pin" size={16} /> {provider.city}</span>
                        </div>
                    </div>
                    <button onClick={handleBookService} className="btn btn-primary btn-book-service">
                        Book Service
                    </button>
                </div>

                <div className="profile-layout">
                    <div className="profile-left-column">
                        <section className="profile-section about-section">
                            <h2>About {provider.name}</h2>
                            <p>{provider.description}</p>
                            <p><strong>Experience:</strong> {provider.experienceYears} years</p>
                        </section>

                        <section className="profile-section specialties-section">
                            <h2>Specialties</h2>
                            <ul className="specialties-list">
                                {provider.specialties.map(spec => <li key={spec}>{spec}</li>)}
                            </ul>
                        </section>

                        <section className="profile-section gallery-section">
                            <h2><Icon name="image" size={22} /> Our Work Gallery</h2>
                            <div className="gallery-grid">
                                {provider.gallery.map(img => (
                                    <div key={img.id} className="gallery-item" onClick={() => openImageModal(img.url)}>
                                        <img src={img.url} alt={img.caption} onError={(e) => e.target.src = 'https://placehold.co/200x150/cccccc/333333?text=Work+Sample'} />
                                        <div className="gallery-item-caption">{img.caption}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="profile-right-column">
                        <section className="profile-section contact-section card-style">
                            <h2>Contact Information</h2>
                            <p><Icon name="phone" size={16} /> <strong>Phone:</strong> <a href={`tel:${provider.contact.phone}`}>{provider.contact.phone}</a></p>
                            <p><Icon name="mail" size={16} /> <strong>Email:</strong> <a href={`mailto:${provider.contact.email}`}>{provider.contact.email}</a></p>
                            <p><Icon name="map-pin" size={16} /> <strong>Address:</strong> {provider.location}</p>
                        </section>

                        <section className="profile-section hours-section card-style">
                            <h2><Icon name="clock" size={20} /> Working Hours</h2>
                            <ul>
                                {provider.workingHours.map(wh => <li key={wh.day}><strong>{wh.day}:</strong> {wh.hours}</li>)}
                            </ul>
                        </section>
                    </div>
                </div>

                <section className="profile-section reviews-section">
                    <h2><Icon name="message-square" size={22} /> Customer Reviews ({provider.reviewsCount})</h2>
                    <div className="reviews-summary">
                        <span className="average-rating">{provider.rating.toFixed(1)}</span>
                        <div>
                            {Array(5).fill(0).map((_, i) => (
                                <Icon key={i} name="star" size={24} color={i < Math.round(provider.rating) ? '#ffc107' : '#e0e0e0'} className={i < Math.round(provider.rating) ? 'filled-star' : 'empty-star'} />
                            ))}
                        </div>
                        <span>Based on {provider.reviewsCount} reviews</span>
                    </div>
                    <div className="review-list">
                        {provider.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                    </div>
                    {/* Add a "Write a Review" button/form if user is eligible */}
                </section>
            </div>

            {/* Image Modal for Gallery */}
            {activeImage && (
                <div className="image-modal-overlay" onClick={closeImageModal}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-modal-btn" onClick={closeImageModal}>&times;</span>
                        <img src={activeImage} alt="Enlarged gallery view" />
                    </div>
                </div>
            )}

            <footer className="minimal-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ServiceProviderProfilePage;
