import { Link, createBrowserRouter, BrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import React from 'react'
import LandingPage from '../src/Pages/LandingPage/LandingPage'
import SignupPage from './Components/RegisterPage'
import LoginPage from './Components/LoginPage'
import ServiceListingsPage from '../src/Pages/UserPannel/ServiceListingPage'
import ServiceProviderProfilePage from '../src/Pages/UserPannel/ServiceProviderProfile'
import BookingFormPage from '../src/Pages/UserPannel/ServiceBookingForm';
import PaymentPage from '../src/Pages/UserPannel/ServicePaymentForm'
import BookingSuccessPage from '../src/Pages/UserPannel/ServiceBookingSuccess';
import UserDashboardPage from '../src/Pages/UserPannel/UserDashboard';
import ProviderSignupPage from './Pages/ProviderPannel/ProviderRegisterPage';
import ProviderLoginPage from './Pages/ProviderPannel/ProviderLoginPage';
import ProviderDashboardPage from './Pages/ProviderPannel/ProviderDashboard';
import AdminLoginPage from './Pages/AdminPannel/AdminLogin';
import AdminDashboardPage from './Pages/AdminPannel/AdminDashboard';
import BrowseServicesPage from './Pages/UserPannel/ServiceListPage';

const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <LandingPage />,
      },
      {
        index: true,
        path: "/home",
        element: <LandingPage />,
      },
      {
        path: "/register",
        element: <SignupPage/>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/browse-services",
        element: <BrowseServicesPage />
      },
      {
        path: "/booking-form",
        element: <BookingFormPage/>
      },
      {
        path: "/payment",
        element: <PaymentPage />
      },
      {
        path: "/service-booking-success",
        element: <BookingSuccessPage/>
      },
      {
        path: "/user-dashboard",
        element: <UserDashboardPage/>
      },
      {
        path: "/provider-register",
        element: <ProviderSignupPage/>
      },
      {
        path: "/provider-login",
        element: <ProviderLoginPage/>
      },
      {
        path: "/provider-dashboard",
        element: <ProviderDashboardPage/>
      },
      {
        path: "/admin-login",
        element: <AdminLoginPage/>
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboardPage/>
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;