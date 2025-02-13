

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import InTransit from "./pages/InTransit";
import GeoFencing from "./pages/GeoFencing";
import RouteMaster from "./pages/RouteMaster";
import Login from "./auth/Login";
import ProtectedRoute from "./Routes/ProtectedRoutes"; // Import your ProtectedRoute component

// Layout Component
const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex h-screen">
      {!isLoginPage ? (
        <>
          {/* Navbar hidden on mobile */}
          <div className="hidden sm:block">
            <Navbar />
          </div>
          <div className="flex-1 sm:ml-64">
            {/* Header Section */}
            <div className="fixed top-0 left-0 sm:left-64 right-0 z-10">
              <Header />
            </div>
            {/* Main Content */}
            <div className="mt-16 p-4 overflow-y-auto h-full">{children}</div>
          </div>
        </>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </div>
  );
};

// Login Wrapper
const LoginPageWrapper = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // After successful login, navigate to the dashboard
    navigate('/dashboard');
  };

  return <Login onLogin={handleLogin} />;
};

// App Component
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to /login as the default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login Route */}
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPageWrapper />
            </Layout>
          }
        />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute element={<Layout><Dashboard /></Layout>} />
          }
        />
        <Route
          path="/in-transit"
          element={
            <ProtectedRoute element={<Layout><InTransit /></Layout>} />
          }
        />
        <Route
          path="/geo-fencing"
          element={
            <ProtectedRoute element={<Layout><GeoFencing /></Layout>} />
          }
        />
        <Route
          path="/route-master"
          element={
            <ProtectedRoute element={<Layout><RouteMaster /></Layout>} />
          }
        />
        
        {/* Redirect all other paths to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
