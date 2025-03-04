


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUser, clearUser } from "../auth/auth";
// import {
//   FaChevronLeft,
//   FaTruck,
//   FaMapMarkerAlt,
//   FaSearch,
//   FaRoute,
//   FaThermometerEmpty,
//   FaSignInAlt,
//   FaClock,
//   FaLayerGroup,
//   FaRoad,
//   FaImages,
//   FaMapPin,
//   FaPrint,
//   FaStoreAlt,
//   FaClipboardList,
//   FaChartBar,
//   FaHandshake,
// } from "react-icons/fa";

// const menuItems = [
//   { label: "In-Transit (For Your Branch)", path: "/in-transit", icon: <FaTruck /> },
//   { label: "Geo Fencing (Nearby)", path: "/geo-fencing", icon: <FaMapMarkerAlt /> },
//   { label: "Track (My Vehicle)", path: "/track", icon: <FaSearch /> },
//   { label: "Route (Master)", path: "/route-master", icon: <FaRoute /> },
//   { label: "Ideal Vehicle (with Empty)", path: "/ideal-vehicle", icon: <FaThermometerEmpty /> },
//   { label: "Gate Entry (Auto From GPS)", path: "/gate-entry", icon: <FaSignInAlt /> },
//   { label: "Delay Vehicle", path: "/delay-vehicle", icon: <FaClock /> },
//   { label: "Mode wise In-Transit (Vehicle)", path: "/mode-in-transit", icon: <FaLayerGroup /> },
//   { label: "Track All Vehicle (5699)", path: "/track-all", icon: <FaRoad /> },
//   { label: "Trip Wise Vehicle Utilization", path: "/trip-wise", icon: <FaChartBar /> },
//   { label: "In-Transit Delay Vehicle", path: "/in-transit-delay", icon: <FaClock /> },
//   { label: "Vehicle FIFO (Status)", path: "/vehicle-fifo", icon: <FaLayerGroup /> },
//   { label: "Vehicle Load/Unload (Images)", path: "/vehicle-load-unload", icon: <FaImages /> },
//   { label: "Vehicle Live (Status)", path: "/vehicle-live", icon: <FaMapPin /> },
//   { label: "Device Challan Status", path: "/device-challan", icon: <FaClipboardList /> },
//   { label: "Sticker Print From (Another Branch)", path: "/sticker-print-other", icon: <FaPrint /> },
//   { label: "Lorry Vendor (Query)", path: "/lorry-vendor", icon: <FaStoreAlt /> },
//   { label: "Consolidate Eway (Detail)", path: "/consolidate-eway", icon: <FaClipboardList /> },
//   { label: "Sticker Print (>1 Branch)", path: "/sticker-print", icon: <FaPrint /> },
//   { label: "REQ VS IDEAL VEHICLE (Detail)", path: "/req-vs-ideal", icon: <FaChartBar /> },
//   { label: "VEH L-U PARTYWISE (Images)", path: "/veh-lu-partywise", icon: <FaHandshake /> },
// ];

// function Header() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const user = getUser();

//   const handleNavigate = (path) => {
//     navigate(path);
//     setMenuOpen(false); // Close the menu after navigation
//   };

//   const handleLogout = () => {
//     clearUser(); // Clear the user session
//     navigate("/login"); // Redirect to login page
//   };

//   const haldeDashboard = () => {
//     navigate("/dashboard");
//   };

//   return (
//     <header className="bg-[#2e2e2e] text-white p-4 flex items-center justify-between shadow-md overflow-x-hidden">
//     {/* Left Section: Company Name and Logo */}
//     <div className="flex items-center space-x-4">
//       <img
//         src="/omlogo.png"
//         alt="Company Logo"
//         className="h-10 w-14 sm:h-12 sm:w-16 rounded-full shadow-md"
//         onClick={haldeDashboard}
//       />
//       <h1 className="text-lg sm:text-xl font-bold whitespace-nowrap">
//         Om Logistics Ltd
//       </h1>
//     </div>
  
//     {/* Right Section */}
//     <div className="relative">
//       {/* Mobile View Menu Button */}
//       <div className="sm:hidden">
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-white focus:outline-none"
//         >
//           <div className="space-y-1">
//             <span className="block h-1 w-6 bg-white rounded"></span>
//             <span className="block h-1 w-6 bg-white rounded"></span>
//             <span className="block h-1 w-6 bg-white rounded"></span>
//           </div>
//         </button>
//       </div>
  
//       {/* Dropdown Menu */}
//       {menuOpen && (
//         <div className="absolute right-0 mt-6 w-64 bg-gray-700 text-white rounded shadow-lg z-50 max-h-[83vh] overflow-y-auto">
//           {/* Cross Button */}
//           <div className="flex justify-end p-2">
//             <button onClick={() => setMenuOpen(false)}>
//               <FaChevronLeft className="text-white text-lg" />
//             </button>
//           </div>
//           <ul className="flex flex-col space-y-1 py-2 px-4">
//             {menuItems.map((item) => (
//               <li key={item.path} className="flex items-center space-x-2">
//                 <span className="text-lg">{item.icon}</span>
//                 <button
//                   onClick={() => handleNavigate(item.path)}
//                   className="block text-sm font-medium hover:text-[#219EBC] py-1 w-full text-left"
//                 >
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="block text-sm font-medium hover:text-[#219EBC] py-1 w-full text-left"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
  
//     {/* Desktop View */}
//     <div className="hidden sm:flex items-center space-x-4">
//       <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
//         {user?.USER_USER_NAME || "User"}
//       </span>
//       <button
//         onClick={handleLogout}
//         className="bg-white hover:bg-gray-100 text-[#219EBC] px-4 py-2 text-sm font-semibold rounded-full shadow-md"
//       >
//         Logout
//       </button>
//     </div>
//   </header>
  
//   );
// }

// export default Header;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, clearUser } from "../auth/auth";
import {
  FaChevronLeft,
  FaTruck,
  FaMapMarkerAlt,
  FaSearch,
  FaRoute,
  FaThermometerEmpty,
  FaSignInAlt,
  FaClock,
  FaLayerGroup,
  FaRoad,
  FaImages,
  FaMapPin,
  FaPrint,
  FaStoreAlt,
  FaClipboardList,
  FaChartBar,
  FaHandshake,
} from "react-icons/fa";

const menuItems = [
  { label: "In-Transit (For Your Branch)", path: "/in-transit", icon: FaTruck },
  { label: "Geo Fencing (Nearby)", path: "/geo-fencing", icon: FaMapMarkerAlt },
  { label: "Track (My Vehicle)", path: "/track", icon: FaSearch },
  { label: "Route (Master)", path: "/route-master", icon: FaRoute },
  { label: "Ideal Vehicle (with Empty)", path: "/ideal-vehicle", icon: FaThermometerEmpty },
  { label: "Gate Entry (Auto From GPS)", path: "/gate-entry", icon: FaSignInAlt },
  { label: "Delay Vehicle", path: "/delay-vehicle", icon: FaClock },
  { label: "Mode wise In-Transit (Vehicle)", path: "/mode-in-transit", icon: FaLayerGroup },
  { label: "Track All Vehicle (5699)", path: "/track-all", icon: FaRoad },
  { label: "Trip Wise Vehicle Utilization", path: "/trip-wise", icon: FaChartBar },
  { label: "In-Transit Delay Vehicle", path: "/in-transit-delay", icon: FaClock },
  { label: "Vehicle FIFO (Status)", path: "/vehicle-fifo", icon: FaLayerGroup },
  { label: "Vehicle Load/Unload (Images)", path: "/vehicle-load-unload", icon: FaImages },
  { label: "Vehicle Live (Status)", path: "/vehicle-live", icon: FaMapPin },
  { label: "Device Challan Status", path: "/device-challan", icon: FaClipboardList },
  { label: "Sticker Print From (Another Branch)", path: "/sticker-print-other", icon: FaPrint },
  { label: "Lorry Vendor (Query)", path: "/lorry-vendor", icon: FaStoreAlt },
  { label: "Consolidate Eway (Detail)", path: "/consolidate-eway", icon: FaClipboardList },
  { label: "Sticker Print (>1 Branch)", path: "/sticker-print", icon: FaPrint },
  { label: "REQ VS IDEAL VEHICLE (Detail)", path: "/req-vs-ideal", icon: FaChartBar },
  { label: "VEH L-U PARTYWISE (Images)", path: "/veh-lu-partywise", icon: FaHandshake },
];

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = getUser();

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <header className="bg-[#2e2e2e] text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Left Section: Logo and Company Name */}
      <div className="flex items-center space-x-4">
        <img
          src="/omlogo.png"
          alt="Om Logistics Logo"
          className="h-10 w-14 sm:h-12 sm:w-16 rounded-full shadow-md cursor-pointer"
          onClick={handleDashboard}
        />
        <h1 className="text-lg sm:text-xl font-bold whitespace-nowrap">Om Logistics Ltd</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        {/* Desktop View */}
        <div className="hidden sm:flex items-center space-x-4">
          <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
            {user?.USER_USER_NAME || "User"}
          </span>
          <button
            onClick={handleLogout}
            className="bg-white hover:bg-gray-100 text-[#219EBC] px-4 py-2 text-sm font-semibold rounded-full shadow-md transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Mobile View Hamburger Menu */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-white rounded"></span>
              <span className="block h-0.5 w-6 bg-white rounded"></span>
              <span className="block h-0.5 w-6 bg-white rounded"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 sm:hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-gray-700 text-white shadow-lg overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <FaChevronLeft className="text-white text-lg" />
              </button>
            </div>
            {/* Menu Items */}
            <ul className="flex flex-col space-y-2 p-4">
              {menuItems.map((item) => (
                <li key={item.path} className="flex items-center space-x-3">
                  <item.icon className="text-lg" />
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className="text-sm font-medium hover:text-[#219EBC] py-1 w-full text-left transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium hover:text-[#219EBC] py-1 w-full text-left transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;