


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaChevronLeft,
//   FaChevronRight,
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

// const Navbar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleNavbar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const menuItems = [
//     { label: "In-Transit (For Your Branch)", path: "/in-transit", icon: <FaTruck /> },
//     { label: "Geo Fencing (Nearby)", path: "/geo-fencing", icon: <FaMapMarkerAlt /> },
//     { label: "Track (My Vehicle)", path: "/track", icon: <FaSearch /> },
//     { label: "Route (Master)", path: "/route-master", icon: <FaRoute /> },
//     { label: "Ideal Vehicle (with Empty)", path: "/ideal-vehicle", icon: <FaThermometerEmpty /> },
//     { label: "Gate Entry (Auto From GPS)", path: "/gate-entry", icon: <FaSignInAlt /> },
//     { label: "Delay Vehicle", path: "/delay-vehicle", icon: <FaClock /> },
//     { label: "Mode wise In-Transit (Vehicle)", path: "/mode-in-transit", icon: <FaLayerGroup /> },
//     { label: "Track All Vehicle (5699)", path: "/track-all", icon: <FaRoad /> },
//     { label: "Trip Wise Vehicle Utilization", path: "/trip-wise", icon: <FaChartBar /> },
//     { label: "In-Transit Delay Vehicle", path: "/in-transit-delay", icon: <FaClock /> },
//     { label: "Vehicle FIFO (Status)", path: "/vehicle-fifo", icon: <FaLayerGroup /> },
//     { label: "Vehicle Load/Unload (Images)", path: "/vehicle-load-unload", icon: <FaImages /> },
//     { label: "Vehicle Live (Status)", path: "/vehicle-live", icon: <FaMapPin /> },
//     { label: "Device Challan Status", path: "/device-challan", icon: <FaClipboardList /> },
//     { label: "Sticker Print From (Another Branch)", path: "/sticker-print-other", icon: <FaPrint /> },
//     { label: "Lorry Vendor (Query)", path: "/lorry-vendor", icon: <FaStoreAlt /> },
//     { label: "Consolidate Eway (Detail)", path: "/consolidate-eway", icon: <FaClipboardList /> },
//     { label: "Sticker Print (>1 Branch)", path: "/sticker-print", icon: <FaPrint /> },
//     { label: "REQ VS IDEAL VEHICLE (Detail)", path: "/req-vs-ideal", icon: <FaChartBar /> },
//     { label: "VEH L-U PARTYWISE (Images)", path: "/veh-lu-partywise", icon: <FaHandshake /> },
//   ];

//   return (
//     <div className="relative h-screen ">
//       <nav
//         className={`bg-gray-700 text-white h-full p-4 flex flex-col overflow-hidden transition-all duration-300 ${
//           isCollapsed ? "w-16" : "w-64"
//         }`}
//       >
//         <h2
//           className={`text-xl font-bold text-center border-b-2 border-[#219EBC] pb-2 transition-all duration-300 ${
//             isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
//           }`}
//         >
//           Geo Tracking
//         </h2>
//         <ul className="flex-1 mt-4 overflow-hidden">
//           <style>
//             {`
//               .hide-scrollbar {
//                 -ms-overflow-style: none; /* IE and Edge */
//                 scrollbar-width: none; /* Firefox */
//               }
//               .hide-scrollbar::-webkit-scrollbar {
//                 display: none; /* Chrome, Safari, and Edge */
//               }
//             `}
//           </style>
//           <div className="h-full overflow-y-auto hide-scrollbar space-y-2">
//             {menuItems.map((item, index) => (
//               <li
//                 key={index}
//                 className="flex items-center cursor-pointer bg-[#219EBC] hover:bg-white hover:text-black transition-all duration-300 mb-2 p-3 rounded-lg shadow-md"
//               >
//                 <Link to={item.path} className="flex items-center">
//                   <div className={`${isCollapsed ? "text-xl" : "text-2xl"}`}>
//                     {item.icon}
//                   </div>
//                   <span
//                     className={`ml-4 text-sm font-medium transition-all ${
//                       isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
//                     }`}
//                   >
//                     {item.label}
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </div>
//         </ul>
//       </nav>
//       {/* Toggle Button */}
//       <button
//         onClick={toggleNavbar}
//         className="absolute top-4 right-[13px] bg-[#219EBC] text-white p-2 rounded-full shadow-md hover:bg-white hover:text-black transition-all duration-300"
//       >
//         {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
//       </button>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
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

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { label: "In-Transit (For Your Branch)", path: "/in-transit", icon: <FaTruck /> },
    { label: "Geo Fencing (Nearby)", path: "/geo-fencing", icon: <FaMapMarkerAlt /> },
    { label: "Track (My Vehicle)", path: "/track", icon: <FaSearch /> },
    { label: "Route (Master)", path: "/route-master", icon: <FaRoute /> },
    { label: "Ideal Vehicle (with Empty)", path: "/ideal-vehicle", icon: <FaThermometerEmpty /> },
    { label: "Gate Entry (Auto From GPS)", path: "/gate-entry", icon: <FaSignInAlt /> },
    { label: "Delay Vehicle", path: "/delay-vehicle", icon: <FaClock /> },
    { label: "Mode wise In-Transit (Vehicle)", path: "/mode-in-transit", icon: <FaLayerGroup /> },
    { label: "Track All Vehicle (5699)", path: "/track-all", icon: <FaRoad /> },
    { label: "Trip Wise Vehicle Utilization", path: "/trip-wise", icon: <FaChartBar /> },
    { label: "In-Transit Delay Vehicle", path: "/in-transit-delay", icon: <FaClock /> },
    { label: "Vehicle FIFO (Status)", path: "/vehicle-fifo", icon: <FaLayerGroup /> },
    { label: "Vehicle Load/Unload (Images)", path: "/vehicle-load-unload", icon: <FaImages /> },
    { label: "Vehicle Live (Status)", path: "/vehicle-live", icon: <FaMapPin /> },
    { label: "Device Challan Status", path: "/device-challan", icon: <FaClipboardList /> },
    { label: "Sticker Print From (Another Branch)", path: "/sticker-print-other", icon: <FaPrint /> },
    { label: "Lorry Vendor (Query)", path: "/lorry-vendor", icon: <FaStoreAlt /> },
    { label: "Consolidate Eway (Detail)", path: "/consolidate-eway", icon: <FaClipboardList /> },
    { label: "Sticker Print (>1 Branch)", path: "/sticker-print", icon: <FaPrint /> },
    { label: "REQ VS IDEAL VEHICLE (Detail)", path: "/req-vs-ideal", icon: <FaChartBar /> },
    { label: "VEH L-U PARTYWISE (Images)", path: "/veh-lu-partywise", icon: <FaHandshake /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#2e2e2e] text-white p-4 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <h2
        className={`text-xl font-bold text-center border-b-2 border-[#219EBC] pb-2 transition-all duration-300 ${
          isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        Geo Tracking
      </h2>
      <ul className="flex-1 mt-4 overflow-y-scroll hide-scrollbar">
        <style>
          {`
            .hide-scrollbar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
            .hide-scrollbar::-webkit-scrollbar {
              display: none; /* Chrome, Safari, and Edge */
            }
          `}
        </style>
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center cursor-pointer bg-[#219EBC] hover:bg-white hover:text-black transition-all duration-300 mb-2 p-3 rounded-lg shadow-md"
            >
              <Link to={item.path} className="flex items-center">
                <div className={`${isCollapsed ? "text-xl" : "text-2xl"}`}>{item.icon}</div>
                <span
                  className={`ml-4 text-sm font-medium transition-all ${
                    isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </div>
      </ul>
      {/* Toggle Button */}
      {/* <button
        onClick={toggleNavbar}
        className="absolute top-4 right-[-10px] bg-[#219EBC] text-white p-2 rounded-full shadow-md hover:bg-white hover:text-black transition-all duration-300"
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button> */}
    </div>
  );
};

export default Navbar;
