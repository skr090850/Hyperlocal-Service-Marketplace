// AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import './AdminPannel.css';

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
        {name === 'users' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></>}
        {name === 'briefcase' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></>}
        {name === 'tool' && <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>}
        {name === 'file-text' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></>}
        {name === 'star' && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>}
        {name === 'dollar-sign' && <><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></>}
        {name === 'log-out' && <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></>}
        {name === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>}
        {name === 'list' && <><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></>}
        {name === 'bar-chart-2' && <><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></>}
        {name === 'download' && <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></>}
        {name === 'bell' && <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></>}
        {name === 'check-circle' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>}
        {name === 'x-circle' && <><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></>}
        {name === 'slash' && <><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></>}
        {name === 'user-check' && <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></>}
        {name === 'user-x' && <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="17" y1="8" x2="21" y2="12"></line><line x1="21" y1="8" x2="17" y2="12"></line></>}
        {name === 'eye' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></>}
    </svg >
);

// --- Mock Admin Data ---
const mockAdminUser = {
    name: 'Admin User',
    email: 'admin@servicehub.com',
    profileImageUrl: 'https://placehold.co/100x100/6f42c1/white?text=ADM',
};

const initialPlatformStats = {
    totalUsers: 1250,
    totalProviders: 280,
    totalBookings: 3500,
    pendingApprovals: 15, 
    monthlyRevenue: 750000,
    revenueBreakdown: [
        { month: '2024-01', revenue: 65000, bookings: 320, newUsers: 150, newProviders: 10 },
        { month: '2024-02', revenue: 72000, bookings: 350, newUsers: 180, newProviders: 12 },
        { month: '2024-03', revenue: 80000, bookings: 380, newUsers: 200, newProviders: 8 },
        { month: '2024-04', revenue: 750000, bookings: 360, newUsers: 190, newProviders: 15 },
    ]
};

const initialMockUsersList = [
    { id: 'u1', name: 'Aarav Patel', email: 'aarav@example.com', joined: '2024-01-15', status: 'Active' },
    { id: 'u2', name: 'Bhavna Singh', email: 'bhavna@example.com', joined: '2024-02-10', status: 'Active' },
    { id: 'u3', name: 'Chetan Reddy', email: 'chetan@example.com', joined: '2024-03-01', status: 'Suspended' },
    { id: 'u4', name: 'Diya Mehta', email: 'diya@example.com', joined: '2023-12-05', status: 'Active' },
];
const initialMockProvidersList = [
    { id: 'p1', businessName: 'Quick Plumbers Patna', contact: 'quick@example.com', category: 'Plumbing', status: 'Approved' },
    { id: 'p2', name: 'Ananya Tutors', contact: 'ananya@example.com', category: 'Tutoring', status: 'Pending Approval' },
    { id: 'p3', name: 'FitZone Gym', contact: 'fitzone@example.com', category: 'Fitness', status: 'Approved' },
    { id: 'p4', businessName: 'CleanSweep Co.', contact: 'sweep@example.com', category: 'Cleaning', status: 'Suspended' },
    { id: 'p5', name: 'TechSolve IT', contact: 'tech@example.com', category: 'Appliance Repair', status: 'Pending Approval' },
];


const AdminDashboardPage = () => {
    const [adminUser] = useState(mockAdminUser);
    const [platformStats, setPlatformStats] = useState(initialPlatformStats);
    const [users, setUsers] = useState(initialMockUsersList);
    const [providers, setProviders] = useState(initialMockProvidersList);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        const pendingCount = providers.filter(p => p.status === 'Pending Approval').length;
        setPlatformStats(prevStats => ({
            ...prevStats, 
            pendingApprovals: pendingCount, 
            revenueBreakdown: prevStats.revenueBreakdown.map(item =>
                item.month === '2024-04' ? { ...item, revenue: prevStats.monthlyRevenue } : item
            )
        }));
    }, [providers]); 

    const handleLogout = () => {
        console.log('Admin logged out');
        alert('Admin Logged out successfully. Redirecting to Admin Login...');
        window.location.href = '/admin/login';
    };

    const handleDownloadData = (format) => {
        const dataToExport = platformStats.revenueBreakdown || [
            { month: 'N/A', revenue: 0, bookings: 0, newUsers: 0, newProviders: 0 }
        ];

        if (dataToExport.length === 0) {
            alert("No revenue data available to download.");
            return;
        }

        let content = '';
        const filename = `revenue_report_${new Date().toISOString().split('T')[0]}`;
        const headers = Object.keys(dataToExport[0]);

        const escapeCsvField = (field) => {
            const stringField = String(field);
            if (stringField.includes(',') || stringField.includes('\n') || stringField.includes('"')) {
                return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
        };

        content += headers.map(escapeCsvField).join(',') + '\n'; // Headers

        dataToExport.forEach(row => { // Rows
            content += headers.map(header => escapeCsvField(row[header])).join(',') + '\n';
        });

        const blob = new Blob([content], { type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/vnd.ms-excel;charset=utf-8;' });
        const link = document.createElement("a");

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `${filename}.${format === 'excel' ? 'xls' : format}`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            alert(`Revenue data download initiated as ${filename}.${format === 'excel' ? 'xls' : format}`);
        } else {
            alert("Your browser does not support direct file downloads. Please try a different browser.");
        }
    };

    // --- User Management Actions ---
    const toggleUserStatus = (userId) => {
        setUsers(prevUsers =>
            prevUsers.map(user => {
                if (user.id === userId) {
                    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
                    alert(`User ${user.name} status changed to ${newStatus}.`);
                    return { ...user, status: newStatus };
                }
                return user;
            })
        );
    };

    // --- Provider Management Actions ---
    const handleProviderAction = (providerId, newStatus) => {
        setProviders(prevProviders =>
            prevProviders.map(provider => {
                if (provider.id === providerId) {
                    alert(`Provider "${provider.businessName || provider.name}" status changed to ${newStatus}.`);
                    return { ...provider, status: newStatus };
                }
                return provider;
            })
        );
    };


    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div className="dashboard-section">
                        <h2>Platform Overview</h2>
                        <div className="overview-grid admin-overview-grid">
                            <div className="overview-card">
                                <h3><Icon name="users" size={24} /> Total Users</h3>
                                <p className="stat-number">{platformStats.totalUsers}</p>
                                <a href="#users" onClick={() => setActiveSection('users')} className="card-link">Manage Users</a>
                            </div>
                            <div className="overview-card">
                                <h3><Icon name="briefcase" size={24} /> Total Providers</h3>
                                <p className="stat-number">{platformStats.totalProviders}</p>
                                <a href="#providers" onClick={() => setActiveSection('providers')} className="card-link">Manage Providers</a>
                            </div>
                            <div className="overview-card">
                                <h3><Icon name="file-text" size={24} /> Total Bookings</h3>
                                <p className="stat-number">{platformStats.totalBookings}</p>
                                <a href="#bookings" onClick={() => setActiveSection('bookings')} className="card-link">Manage Bookings</a>
                            </div>
                            <div className="overview-card">
                                <h3><Icon name="bell" size={24} /> Pending Approvals</h3>
                                <p className="stat-number">{platformStats.pendingApprovals}</p>
                                <a href="#providers" onClick={() => setActiveSection('providers')} className="card-link">Review Applications</a>
                            </div>
                        </div>
                    </div>
                );
            case 'users':
                return (
                    <div className="dashboard-section">
                        <h2><Icon name="users" /> User Management</h2>
                        <p>View, search, and manage all registered users.</p>
                        <table className="management-table">
                            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{new Date(user.joined).toLocaleDateString()}</td>
                                        <td><span className={`status-badge status-${user.status.toLowerCase().replace(/\s+/g, '-')}`}>{user.status}</span></td>
                                        <td className="action-buttons-cell">
                                            <button className="btn btn-secondary btn-small" title="View User Details"><Icon name="eye" size={14} /> View</button>
                                            {user.status === 'Active' ? (
                                                <button className="btn btn-warning btn-small" title="Suspend User" onClick={() => toggleUserStatus(user.id)}>
                                                    <Icon name="user-x" size={14} /> Suspend
                                                </button>
                                            ) : (
                                                <button className="btn btn-success btn-small" title="Activate User" onClick={() => toggleUserStatus(user.id)}>
                                                    <Icon name="user-check" size={14} /> Activate
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'providers':
                return (
                    <div className="dashboard-section">
                        <h2><Icon name="briefcase" /> Provider Management</h2>
                        <p>Manage service providers, approve applications, and view profiles.</p>
                        <table className="management-table">
                            <thead><tr><th>ID</th><th>Business/Name</th><th>Contact</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
                            <tbody>
                                {providers.map(provider => (
                                    <tr key={provider.id}>
                                        <td>{provider.id}</td><td>{provider.businessName || provider.name}</td><td>{provider.contact}</td><td>{provider.category}</td>
                                        <td><span className={`status-badge status-${provider.status.replace(/\s+/g, '-').toLowerCase()}`}>{provider.status}</span></td>
                                        <td className="action-buttons-cell">
                                            {provider.status === 'Pending Approval' && (
                                                <>
                                                    <button className="btn btn-success btn-small" title="Approve Provider" onClick={() => handleProviderAction(provider.id, 'Approved')}>
                                                        <Icon name="check-circle" size={14} /> Approve
                                                    </button>
                                                    <button className="btn btn-danger btn-small" title="Reject Application" onClick={() => handleProviderAction(provider.id, 'Rejected')}>
                                                        <Icon name="x-circle" size={14} /> Reject
                                                    </button>
                                                </>
                                            )}
                                            {provider.status === 'Approved' && (
                                                <button className="btn btn-warning btn-small" title="Suspend Provider" onClick={() => handleProviderAction(provider.id, 'Suspended')}>
                                                    <Icon name="slash" size={14} /> Suspend
                                                </button>
                                            )}
                                            {provider.status === 'Suspended' && (
                                                <button className="btn btn-success btn-small" title="Reinstate Provider" onClick={() => handleProviderAction(provider.id, 'Approved')}>
                                                    <Icon name="check-circle" size={14} /> Reinstate
                                                </button>
                                            )}
                                            <button className="btn btn-secondary btn-small" title="View Provider Details"><Icon name="eye" size={14} /> View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'services':
                return (
                    <div className="dashboard-section">
                        <h2><Icon name="list" /> Service Category Management</h2>
                        <p>Add, edit, or remove service categories available on the platform.</p>
                    </div>
                );
            case 'bookings':
                return (
                    <div className="dashboard-section">
                        <h2><Icon name="file-text" /> Booking Management</h2>
                        <p>Oversee all bookings, handle disputes, and view transaction details.</p>
                    </div>
                );
            case 'reviews':
                return (
                    <div className="dashboard-section">
                        <h2><Icon name="star" /> Ratings & Reviews</h2>
                        <p>Moderate user and provider reviews, manage reported content.</p>
                    </div>
                );
            case 'revenue':
                return (
                    <div className="dashboard-section revenue-reports-section">
                        <h2><Icon name="dollar-sign" /> Revenue Reports</h2>
                        <p>Analyze platform revenue, trends, and financial performance.</p>
                        <div className="revenue-summary-cards">
                            <div className="overview-card revenue-card">
                                <h3>Total Revenue (All Time)</h3>
                                <p className="stat-number">₹{(platformStats.monthlyRevenue * 12 * 1.5).toLocaleString()}</p>
                            </div>
                            <div className="overview-card revenue-card">
                                <h3>Monthly Revenue (Current)</h3>
                                <p className="stat-number">₹{platformStats.monthlyRevenue.toLocaleString()}</p>
                            </div>
                            <div className="overview-card revenue-card">
                                <h3>Average Booking Value</h3>
                                <p className="stat-number">₹{(platformStats.totalBookings > 0 ? (platformStats.monthlyRevenue * 12 * 1.5) / platformStats.totalBookings : 0).toFixed(0)}</p>
                            </div>
                        </div>
                        <div className="charts-container">
                            <div className="chart-placeholder">
                                <h3>Monthly Revenue Trend</h3>
                                <Icon name="bar-chart-2" size={100} className="chart-icon-placeholder" />
                                <p>(Placeholder for Monthly Revenue Line/Bar Chart)</p>
                            </div>
                            <div className="chart-placeholder">
                                <h3>Revenue by Service Category</h3>
                                <Icon name="bar-chart-2" size={100} className="chart-icon-placeholder" />
                                <p>(Placeholder for Pie/Doughnut Chart)</p>
                            </div>
                            <div className="chart-placeholder">
                                <h3>Top Earning Providers</h3>
                                <Icon name="list" size={100} className="chart-icon-placeholder" />
                                <p>(Placeholder for Top Providers List/Bar Chart)</p>
                            </div>
                        </div>
                        <div className="download-reports-section">
                            <h3>Download Revenue Data</h3>
                            <div className="download-buttons">
                                <button className="btn btn-secondary" onClick={() => handleDownloadData('csv')}>
                                    <Icon name="download" size={16} /> Download CSV
                                </button>
                                <button className="btn btn-secondary" onClick={() => handleDownloadData('excel')}>
                                    <Icon name="download" size={16} /> Download Excel
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <p>Welcome to the Admin Dashboard!</p>;
        }
    };

    if (!adminUser) {
        return <div className="loading-state">Loading Admin Dashboard...</div>;
    }

    return (
        <div className="admin-dashboard-page">
            <aside className="dashboard-sidebar admin-sidebar">
                <div className="sidebar-header">
                    <img src={adminUser.profileImageUrl} alt={adminUser.name} className="user-avatar admin-avatar" onError={(e) => e.target.src = 'https://placehold.co/80x80/cccccc/333333?text=Admin'} />
                    <h3>{adminUser.name}</h3>
                    <p className="user-email-sidebar">{adminUser.email}</p>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className={activeSection === 'overview' ? 'active' : ''}><a href="#overview" onClick={() => setActiveSection('overview')}><Icon name="layout-dashboard" /> Overview</a></li>
                        <li className={activeSection === 'users' ? 'active' : ''}><a href="#users" onClick={() => setActiveSection('users')}><Icon name="users" /> Users</a></li>
                        <li className={activeSection === 'providers' ? 'active' : ''}><a href="#providers" onClick={() => setActiveSection('providers')}><Icon name="briefcase" /> Providers</a></li>
                        <li className={activeSection === 'services' ? 'active' : ''}><a href="#services" onClick={() => setActiveSection('services')}><Icon name="list" /> Service Categories</a></li>
                        <li className={activeSection === 'bookings' ? 'active' : ''}><a href="#bookings" onClick={() => setActiveSection('bookings')}><Icon name="file-text" /> Bookings</a></li>
                        <li className={activeSection === 'reviews' ? 'active' : ''}><a href="#reviews" onClick={() => setActiveSection('reviews')}><Icon name="star" /> Reviews</a></li>
                        <li className={activeSection === 'revenue' ? 'active' : ''}><a href="#revenue" onClick={() => setActiveSection('revenue')}><Icon name="dollar-sign" /> Revenue Reports</a></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">
                        <Icon name="log-out" /> Logout
                    </button>
                </div>
            </aside>

            <main className="dashboard-main-content admin-main-content">
                <header className="dashboard-header">
                    <h1>Admin Control Panel</h1>
                </header>
                {renderSection()}
            </main>
        </div>
    );
};

export default AdminDashboardPage;
