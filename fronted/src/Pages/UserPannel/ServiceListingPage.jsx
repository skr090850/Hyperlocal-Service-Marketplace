// ServiceListingsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
// You might also import a common CSS file if you have one for shared styles like buttons, containers etc.
// import './AuthCommon.css'; // Example if you reuse some common styles

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
        {name === 'filter' && <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>}
        {name === 'chevron-down' && <polyline points="6 9 12 15 18 9"></polyline>}
        {name === 'search' && <><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></>}
        {/* Add more icons as needed */}
    </svg>
);

// --- Mock Data (replace with API call in a real app) ---
const mockServiceProviders = [
    {
        id: '1',
        name: 'Ramesh Kumar Plumbing',
        serviceCategory: 'Plumbing',
        specialties: ['Leak Detection', 'Pipe Repair', 'Drain Cleaning'],
        rating: 4.5,
        reviews: 120,
        priceIndicator: '₹₹', // e.g., ₹, ₹₹, ₹₹₹
        location: 'Kankarbagh, Patna',
        imageUrl: 'https://placehold.co/300x200/007bff/white?text=Plumber+Ramesh',
        description: 'Experienced plumber providing reliable services in Kankarbagh and nearby areas. Available 24/7 for emergencies.',
        isVerified: true,
    },
    {
        id: '2',
        name: 'Priya Electric Works',
        serviceCategory: 'Electrical',
        specialties: ['Wiring', 'Fixture Installation', 'Appliance Repair'],
        rating: 4.8,
        reviews: 210,
        priceIndicator: '₹₹₹',
        location: 'Boring Road, Patna',
        imageUrl: 'https://placehold.co/300x200/28a745/white?text=Electrician+Priya',
        description: 'Certified electrician for all your home and office electrical needs. Safety and quality guaranteed.',
        isVerified: true,
    },
    {
        id: '3',
        name: 'Anita\'s Beauty Hub',
        serviceCategory: 'Beautician',
        specialties: ['Bridal Makeup', 'Hair Styling', 'Skincare'],
        rating: 4.2,
        reviews: 85,
        priceIndicator: '₹₹',
        location: 'Rajendra Nagar, Patna',
        imageUrl: 'https://placehold.co/300x200/ffc107/black?text=Beautician+Anita',
        description: 'Professional beautician services at your doorstep or at our salon. Using top-quality products.',
        isVerified: false,
    },
    {
        id: '4',
        name: 'QuickFix Appliances',
        serviceCategory: 'Appliance Repair',
        specialties: ['AC Repair', 'Refrigerator Repair', 'Washing Machine'],
        rating: 4.0,
        reviews: 95,
        priceIndicator: '₹₹',
        location: 'Ashok Rajpath, Patna',
        imageUrl: 'https://placehold.co/300x200/dc3545/white?text=Appliance+Repair',
        description: 'Fast and reliable repair for all major home appliances. Experienced technicians.',
        isVerified: true,
    },
    {
        id: '5',
        name: 'Suresh Carpentry Solutions',
        serviceCategory: 'Carpentry',
        specialties: ['Furniture Making', 'Door Repair', 'Custom Woodwork'],
        rating: 4.6,
        reviews: 70,
        priceIndicator: '₹₹₹',
        location: 'Kankarbagh, Patna',
        imageUrl: 'https://placehold.co/300x200/6f42c1/white?text=Carpenter+Suresh',
        description: 'Skilled carpenter for all your wooden furniture and fixture needs. Quality craftsmanship.',
        isVerified: true,
    },
    {
        id: '6',
        name: 'MoveEasy Packers Patna',
        serviceCategory: 'Moving Services',
        specialties: ['Local Shifting', 'Packing', 'Loading/Unloading'],
        rating: 3.9,
        reviews: 55,
        priceIndicator: '₹₹₹',
        location: 'Danapur, Patna',
        imageUrl: 'https://placehold.co/300x200/fd7e14/white?text=Movers+Packers',
        description: 'Affordable and reliable moving services within Patna. Careful handling of your belongings.',
        isVerified: false,
    },
    {
        id: '7',
        name: 'DeepClean Home Services',
        serviceCategory: 'Cleaning',
        specialties: ['Deep Home Cleaning', 'Sofa Cleaning', 'Bathroom Cleaning'],
        rating: 4.9,
        reviews: 150,
        priceIndicator: '₹₹',
        location: 'Bailey Road, Patna',
        imageUrl: 'https://placehold.co/300x200/17a2b8/white?text=DeepClean+Services',
        description: 'Professional home cleaning services to make your space sparkle. Eco-friendly products used.',
        isVerified: true,
    }
];

const allCategories = [...new Set(mockServiceProviders.map(p => p.serviceCategory))];
// Extract unique locations for a dropdown (optional, text search is more flexible)
// const allLocations = [...new Set(mockServiceProviders.map(p => p.location.split(',')[0].trim()))];


// --- ServiceProviderCard Component ---
const ServiceProviderCard = ({ provider }) => {
    const handleViewProfile = (providerId) => {
        // In a real app, navigate to the provider's profile page
        // e.g., history.push(`/provider/${providerId}`);
        alert(`Viewing profile for provider ID: ${providerId} (Name: ${provider.name})`);
    };

    return (
        <div className="service-provider-card">
            <img src={provider.imageUrl} alt={provider.name} className="provider-image" onError={(e) => e.target.src = 'https://placehold.co/300x200/cccccc/333333?text=Image+Not+Found'} />
            <div className="provider-info">
                <h3>{provider.name} {provider.isVerified && <span className="verified-badge" title="Verified Provider">✔</span>}</h3>
                <p className="provider-category">{provider.serviceCategory}</p>
                <div className="provider-rating">
                    <Icon name="star" size={18} color="#ffc107" />
                    <span>{provider.rating.toFixed(1)} ({provider.reviews} reviews)</span>
                </div>
                <p className="provider-location">
                    <Icon name="map-pin" size={16} className="location-icon" /> {provider.location}
                </p>
                <p className="provider-description">{provider.description.substring(0, 100)}...</p>
                <div className="provider-specialties">
                    {provider.specialties.slice(0, 3).map(spec => <span key={spec} className="specialty-tag">{spec}</span>)}
                </div>
                <div className="card-footer">
                    <span className="price-indicator">{provider.priceIndicator}</span>
                    <button onClick={() => handleViewProfile(provider.id)} className="btn btn-primary btn-small">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination-nav">
            <ul className="pagination">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button onClick={() => onPageChange(currentPage - 1)} className="page-link">&laquo; Prev</button>
                    </li>
                )}
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li className="page-item">
                        <button onClick={() => onPageChange(currentPage + 1)} className="page-link">Next &raquo;</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};


// --- Main ServiceListingsPage Component ---
const ServiceListingsPage = () => {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [filters, setFilters] = useState({
        category: 'all',
        minRating: 0,
        location: '', // Added location filter
    });
    const [sortBy, setSortBy] = useState('rating_desc'); // e.g., 'rating_desc', 'price_asc', 'name_asc'
    const [searchTerm, setSearchTerm] = useState(''); // For search within listings

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6; // Number of services to show per page

    // Simulate fetching data
    useEffect(() => {
        setServiceProviders(mockServiceProviders);
    }, []);

    // Apply filters and sorting
    useEffect(() => {
        let providers = [...serviceProviders];

        // Apply search term filter (name or description)
        if (searchTerm) {
            providers = providers.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (filters.category !== 'all') {
            providers = providers.filter(p => p.serviceCategory === filters.category);
        }

        // Apply rating filter
        if (filters.minRating > 0) {
            providers = providers.filter(p => p.rating >= filters.minRating);
        }

        // Apply location filter
        if (filters.location.trim() !== '') {
            providers = providers.filter(p =>
                p.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'rating_desc':
                providers.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating_asc':
                providers.sort((a, b) => a.rating - b.rating);
                break;
            case 'name_asc':
                providers.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name_desc':
                providers.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setFilteredProviders(providers);
        setCurrentPage(1); // Reset to first page when filters/sort change
    }, [serviceProviders, filters, sortBy, searchTerm]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : (name === 'minRating' ? parseFloat(value) : value),
        }));
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Pagination logic
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = useMemo(() =>
        filteredProviders.slice(indexOfFirstService, indexOfLastService),
        [filteredProviders, indexOfFirstService, indexOfLastService]
    );
    const totalPages = Math.ceil(filteredProviders.length / servicesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to top on page change
    };


    return (
        <div className="service-listings-page">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                    <nav className="main-nav-listings">
                        <a href="/">Home</a>
                    </nav>
                </div>
            </header>

            <div className="container page-content-area">
                <aside className="filters-sidebar">
                    <h3><Icon name="filter" size={22} /> Filters</h3>
                    <div className="filter-group">
                        <label htmlFor="location-filter">Location</label>
                        <input
                            type="text"
                            id="location-filter"
                            name="location"
                            placeholder="e.g., Kankarbagh, Patna"
                            value={filters.location}
                            onChange={handleFilterChange}
                            className="location-search-input"
                        />
                    </div>
                    <div className="filter-group">
                        <label htmlFor="category-filter">Service Category</label>
                        <select id="category-filter" name="category" value={filters.category} onChange={handleFilterChange}>
                            <option value="all">All Categories</option>
                            {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="rating-filter">Minimum Rating</label>
                        <div className="rating-filter-inputs">
                            <input
                                type="range"
                                id="rating-filter"
                                name="minRating"
                                min="0" max="5" step="0.5"
                                value={filters.minRating}
                                onChange={handleFilterChange}
                            />
                            <span>{filters.minRating.toFixed(1)}+ Stars</span>
                        </div>
                    </div>
                    <div className="filter-group">
                        <label>Price Range (Example)</label>
                        <div><input type="checkbox" id="price1" name="price" value="₹" /> <label htmlFor="price1">₹ (Affordable)</label></div>
                        <div><input type="checkbox" id="price2" name="price" value="₹₹" /> <label htmlFor="price2">₹₹ (Mid-Range)</label></div>
                        <div><input type="checkbox" id="price3" name="price" value="₹₹₹" /> <label htmlFor="price3">₹₹₹ (Premium)</label></div>
                    </div>
                </aside>

                <main className="listings-main-content">
                    <div className="listings-header">
                        <h2>Available Services {filters.location ? `in ${filters.location}` : 'in Patna'}</h2>
                        <div className="search-and-sort">
                            <div className="search-bar-listings">
                                <input
                                    type="text"
                                    placeholder="Search by name, service..."
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                />
                                <button className="search-btn-listings"><Icon name="search" size={18} /></button>
                            </div>
                            <div className="sort-options">
                                <label htmlFor="sort-by">Sort by: </label>
                                <select id="sort-by" value={sortBy} onChange={handleSortChange}>
                                    <option value="rating_desc">Rating: High to Low</option>
                                    <option value="rating_asc">Rating: Low to High</option>
                                    <option value="name_asc">Name: A to Z</option>
                                    <option value="name_desc">Name: Z to A</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {currentServices.length > 0 ? (
                        <div className="service-providers-grid">
                            {currentServices.map(provider => (
                                <ServiceProviderCard key={provider.id} provider={provider} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>No service providers found matching your criteria. Try adjusting your filters or search term.</p>
                        </div>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </main>
            </div>

            <footer className="minimal-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                    <p>
                        <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ServiceListingsPage;
