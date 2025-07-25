// BrowseServicesPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import './UserPannel.css'; // Page-specific CSS

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
        {name === 'search' && <><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></>}
        {name === 'tool' && <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>}
        {name === 'zap' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>}
        {name === 'smile' && <><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></>}
        {name === 'settings' && <><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>}
        {name === 'hammer' && <g transform="rotate(0 12 12)"><path d="M19.48 8.37l-2.85-2.85c-.78-.78-2.05-.78-2.83 0l-1.17 1.17-2.83-2.83c-.78-.78-2.05-.78-2.83 0L4.12 6.71c-.78.78-.78 2.05 0 2.83l2.83 2.83L4.12 15.2c-.78.78-.78 2.05 0 2.83l2.85 2.85c.78.78 2.05.78 2.83 0l2.83-2.83 1.17 1.17c.78.78 2.05.78 2.83 0l2.85-2.85c.78-.78.78-2.05 0-2.83L16.66 12l2.82-2.83c.79-.78.79-2.05 0-2.8z"></path><path d="M10.05 7.47l-1.41-1.41M13.59 4.05L12.17 2.64"></path><rect x="2" y="14" width="10" height="8" rx="1" transform="rotate(-45 7 18)" /></g>}
        {name === 'truck' && <><rect x="1" y="3" width="15" height="13" rx="2"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></>}
        {name === 'home' && <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>}
        {name === 'book-open' && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></>}
        {name === 'heart' && <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>}
    </svg>
);

// --- Mock Service Data ---
const serviceCategoriesData = [
    {
        categoryName: 'Home Maintenance',
        iconName: 'home',
        services: [
            { id: 's101', name: 'Plumbing Repairs', description: 'Fix leaky faucets, clogged drains, and burst pipes.', iconName: 'tool' },
            { id: 's102', name: 'Electrical Work', description: 'Wiring, fixture installation, and electrical safety checks.', iconName: 'zap' },
            { id: 's103', name: 'Carpentry Services', description: 'Custom furniture, repairs, and wood installations.', iconName: 'hammer' },
            { id: 's104', name: 'Appliance Repair', description: 'Get your home appliances fixed by experts.', iconName: 'settings' },
        ]
    },
    {
        categoryName: 'Personal Care',
        iconName: 'smile',
        services: [
            { id: 's201', name: 'Hair Styling & Salon', description: 'Haircuts, coloring, styling for men and women.', iconName: 'smile' }, // Reusing smile, could be scissors
            { id: 's202', name: 'Makeup Artist', description: 'Professional makeup for events, weddings, and photoshoots.', iconName: 'heart' }, // Reusing heart, could be makeup brush
            { id: 's203', name: 'Manicure & Pedicure', description: 'Nail care, polishing, and spa treatments.', iconName: 'smile' }, // Reusing smile
        ]
    },
    {
        categoryName: 'Moving & Logistics',
        iconName: 'truck',
        services: [
            { id: 's301', name: 'Local Movers & Packers', description: 'Reliable and efficient home or office relocation services.', iconName: 'truck' },
            { id: 's302', name: 'Long Distance Moving', description: 'Intercity and interstate moving solutions.', iconName: 'truck' },
        ]
    },
    {
        categoryName: 'Education & Tutoring',
        iconName: 'book-open',
        services: [
            { id: 's401', name: 'Math & Science Tutoring', description: 'Personalized tutoring for school and college students.', iconName: 'book-open' },
            { id: 's402', name: 'Language Classes', description: 'Learn new languages with experienced tutors.', iconName: 'book-open' },
        ]
    }
];

// --- ServiceCard Component ---
const ServiceCard = ({ service }) => {
    const handleFindProviders = (serviceName) => {
        // In a real app, navigate to ServiceListingsPage with serviceName as a filter
        // e.g., history.push(`/providers?service=${encodeURIComponent(serviceName)}`);
        alert(`Finding providers for: ${serviceName}`);
    };

    return (
        <div className="service-card">
            <div className="service-card-icon-container">
                <Icon name={service.iconName || 'tool'} size={36} className="service-card-icon" />
            </div>
            <h4>{service.name}</h4>
            <p>{service.description}</p>
            <button onClick={() => handleFindProviders(service.name)} className="btn btn-primary btn-small">
                Find Providers
            </button>
        </div>
    );
};


// --- Main BrowseServicesPage Component ---
const BrowseServicesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) {
            return serviceCategoriesData;
        }
        const lowerSearchTerm = searchTerm.toLowerCase();
        return serviceCategoriesData
            .map(category => {
                const filteredServices = category.services.filter(
                    service =>
                        service.name.toLowerCase().includes(lowerSearchTerm) ||
                        service.description.toLowerCase().includes(lowerSearchTerm)
                );
                return { ...category, services: filteredServices };
            })
            .filter(category => category.services.length > 0); // Only include categories that still have services after filtering
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="browse-services-page">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                    <nav className="main-nav-browse">
                        <a href="/">Home</a>
                        {/* Link to user dashboard if logged in, or login/signup */}
                        <a href="/login">Login</a>
                    </nav>
                </div>
            </header>

            <main className="container browse-main-content">
                <div className="page-title-header">
                    <h1>Explore Our Services</h1>
                    <p>Find the right professional for any job, big or small, in Patna.</p>
                </div>

                <div className="service-search-bar-container">
                    <Icon name="search" size={22} className="search-bar-icon" />
                    <input
                        type="text"
                        placeholder="Search for services (e.g., plumbing, makeup artist, local movers...)"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="service-search-input"
                    />
                </div>

                {filteredCategories.length > 0 ? (
                    filteredCategories.map(category => (
                        <section key={category.categoryName} className="service-category-section">
                            <h2 className="category-title">
                                <Icon name={category.iconName || 'list'} size={28} className="category-title-icon" />
                                {category.categoryName}
                            </h2>
                            <div className="services-grid">
                                {category.services.map(service => (
                                    <ServiceCard key={service.id} service={service} />
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <div className="no-services-found">
                        <Icon name="search" size={48} className="no-results-icon" />
                        <h3>No services found matching "{searchTerm}"</h3>
                        <p>Try a different search term or browse all categories by clearing the search.</p>
                    </div>
                )}
            </main>

            <footer className="minimal-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                    <p><a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a></p>
                </div>
            </footer>
        </div>
    );
};

export default BrowseServicesPage;
