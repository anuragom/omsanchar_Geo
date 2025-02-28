





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import DataTable from "react-data-table-component";
import { getToken } from "../auth/auth";
import { CSVLink } from "react-csv";

const TrackMyVehicle = () => {
  const [empCode, setEmpCode] = useState("");
  const [lorryNumber, setLorryNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [idealData, setIdealData] = useState([]);
  const [liveTrackingData, setLiveTrackingData] = useState([]);
  const [liveTrackingByTripData, setLiveTrackingByTripData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  const navigate = useNavigate();
  const token = getToken();

  const handleButtonClick = (fetchFunction) => {
    if (!empCode.trim()) {
      alert("Please enter an Employee Code.");
      return;
    }
    setShowSearch(true);
    fetchFunction();
  };

  const fetchIdealVehicle = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(
        // `${import.meta.env.VITE_BASE_URL}/omsanchar/track_ideal_vehical`,
        "https://omhrms.omlogistics.co.in/omsanchar/track_ideal_vehical",
        { emp_code: empCode },
        { headers: { Authorization: `${token}`, "Content-Type": "application/json" } }
      );
      setIdealData(response.data.vehicles);
      setLiveTrackingData([]);
      setLiveTrackingByTripData([]);
      setError(response.data.vehicles.length === 0);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  const fetchLiveTracking = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(
        // `${import.meta.env.VITE_BASE_URL}/omsanchar/track_live_tracking`,
        "https://omhrms.omlogistics.co.in/omsanchar/track_live_tracking",
        { emp_code: empCode },
        { headers: { Authorization: `${token}`, "Content-Type": "application/json" } }
      );
      setLiveTrackingData(response.data.vehicles);
      setIdealData([]);
      setLiveTrackingByTripData([]);
      setError(response.data.vehicles.length === 0);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  const fetchLiveTrackingByTrip = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(
        // `${import.meta.env.VITE_BASE_URL}/omsanchar/track_myVehical`,
        "https://omhrms.omlogistics.co.in/omsanchar/track_myVehical",
        { emp_code: empCode },
        { headers: { Authorization: `${token}`, "Content-Type": "application/json" } }
      );
      setLiveTrackingByTripData(response.data.vehicles);
      setIdealData([]);
      setLiveTrackingData([]);
      setError(response.data.vehicles.length === 0);
    } catch {
      setError(true);
    }
    setLoading(false);
  };


  const filterDataByLorryNumber = (data) => {
    return data.filter((row) =>
      row.TRIP_LORRY_NO?.toLowerCase().includes(lorryNumber.toLowerCase())
    );
  };
  
  
  
  const filteredLiveTrackingData = liveTrackingData.filter((row) => {
    const status = row.STATUS.toLowerCase();
  
    // Extract delay hours if the format matches "X Hrs DELAY In-Transit"
    const match = status.match(/(\d+)\s*hrs\s*delay in-transit/i);
    const delayHours = match ? parseInt(match[1], 10) : null;
  
    if (statusFilter === "" || statusFilter === "All") {
      return true; // Show all data by default
    }
  
    if (statusFilter === "OK") {
      return status.includes("ok");
    }
  
    if (statusFilter === "REACHED") {
      return status.includes("reached");
    }
  
    if (statusFilter === "≤10") {
      return delayHours !== null && delayHours <= 10; // Show only ≤10 hrs delay In-Transit
    }
  
    if (statusFilter === "≥10") {
      return delayHours !== null && delayHours > 10 ; // Show only >10 hrs delay In-Transit
    }
  
    return false; // Exclude any unwanted data
  });
  
  const idealColumns = [
    { name: "Branch Code", selector: (row) => row.BRANCH_CODE, sortable: true, width: "120px" },
    { name: "Branch Name", selector: (row) => row.BRANCH_NAME, sortable: true, wrap: true, width: "130px" },
    { name: "Lorry Number", selector: (row) => row.TRIP_LORRY_NO, sortable: true, width: "130px" },
    { name: "Lorry Type", selector: (row) => row.LORRY_TYPE, sortable: true, wrap: true, width: "120px" },
    { name: "Capacity", selector: (row) => row.CAPACITY_KG, sortable: true, wrap: true },
    { name: "Gate In Date", selector: (row) => new Date(row.GATE_IN_DATE).toLocaleString(), sortable: true, wrap: true, width: "130px" },
    { name: "Tracking Remarks", selector: (row) => row.TRACKING_REMARKS, sortable: true, wrap: true, width: "150px" },
    {
      name: "Tracking Link",
      cell: (row) => (
        <a href={row.API_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          View Trip
        </a>
      ),
    },
  ];

  // Live Tracking Table Columns
  const liveTrackingByTripColumns = [
    { name: "Trip No", selector: (row) => row.TRIP_NO, sortable: true, width: "130px" },
    { name: "Trip Date", selector: (row) => row.TRIP_DATE, sortable: true, wrap: true, width: "140px" },
    { name: "Lorry No", selector: (row) => row.TRIP_LORRY_NO, sortable: true, width: "130px" },
    { name: "From", selector: (row) => row.FROM_NAME, sortable: true, wrap: true, width: "150px" },
    { name: "To", selector: (row) => row.TO_NAME, sortable: true, wrap: true, width: "150px" },
    { name: "Capacity (KG)", selector: (row) => row.CAPACITY, sortable: true },
    { name: "Weight", selector: (row) => row.WT, sortable: true },
    { name: "Load Summary", selector: (row) => row.LOAD_SUMM, sortable: true },
    { name: "Gate In Date", selector: (row) => new Date(row.GATE_IN_DATE).toLocaleString(), sortable: true, wrap: true, width: "150px" },
    { name: "KM Covered", selector: (row) => row.KM, sortable: true },
    { name: "Tracking Remarks", selector: (row) => row.TRACKING_REMARKS, sortable: true, wrap: true, width: "200px" },
  ];

  const liveTrackingColumns = [
    { name: "Lorry No", selector: (row) => row.LORRY_NO, sortable: true },
    { name: "Lorry Type", selector: (row) => row.LORRY_TYPE, sortable: true },
    { name: "Capacity (KG)", selector: (row) => row.CAPACITY_KG, sortable: true },
    { name: "Address", selector: (row) => row.ADDRESS, sortable: true,  wrap: true, width: "330px" },
    { name: "Lorry Owner", selector: (row) => row.LORRY_OWNER_NAME, sortable: true },
    { name: "Owner Contact", selector: (row) => row.LORRY_OWNER_NO, sortable: true },
    { name: "KM Covered", selector: (row) => row.KM, sortable: true },
    { name: "Status", selector: (row) => row.STATUS, sortable: true, wrap: true },
    {
      name: "Tracking Link",
      cell: (row) => (
        <a href={row.API_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          View Trip
        </a>
      ),
    },
  ];

  return (
    <div className="p-4 w-[58rem] lg:w-[58rem] 2xl:w-[100rem]">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate("/dashboard")} className="flex items-center mr-8">
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold">Track My Vehicle</h1>
        <CSVLink
          data={filteredLiveTrackingData}
          filename="live_tracking_data.csv"
          className="p-2 bg-black text-white ml-40 rounded-lg"
        >
          Export to CSV
        </CSVLink>
        {liveTrackingData.length > 0 && (
     
        <div className="ml-[5.2rem]">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded-lg">
            
            <option value="">All</option>
            <option value="OK">OK</option>
            <option value="≤10">Delay less than 10 Hrs</option>
            <option value="≥10">Delay more than 10 Hrs</option>
            <option value="REACHED">Reached</option>
         </select>
       </div>

      )}
      </div>

      <div className="flex gap-4 items-center mb-4">
        <input
          type="text"
          placeholder="Enter Employee Code"
          value={empCode}
          onChange={(e) => setEmpCode(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <button onClick={() => handleButtonClick(fetchIdealVehicle)} className="p-2 bg-[#219EBC] text-white rounded-lg">Ideal Vehicle</button>
        <button onClick={() => handleButtonClick(fetchLiveTracking)} className="p-2 bg-[#219EBC] text-white rounded-lg">Live Tracking</button>
        <button onClick={() => handleButtonClick(fetchLiveTrackingByTrip)} className="p-2 bg-[#219EBC] text-white rounded-lg">Live Tracking By Trip</button>
        {showSearch && (
        <div className="flex gap-4 items-center mb-4">
          <input
            type="text"
            placeholder="Search by Lorry Number"
            value={lorryNumber}
            onChange={(e) => setLorryNumber(e.target.value)}
            className="p-2 mt-4 border rounded-lg"
          />
        </div>
      )}


      </div>

    

     

      {loading && <div>Loading...</div>}
      {error && <div>No data found</div>}

      {!loading && !error && idealData.length > 0 && (
        <DataTable columns={idealColumns} data={idealData} pagination highlightOnHover />
      )}
      {!loading && !error && filteredLiveTrackingData.length > 0 && (
        <DataTable columns={liveTrackingColumns} data={filteredLiveTrackingData} pagination highlightOnHover />
      )}
      {!loading && !error && liveTrackingByTripData.length > 0 && (
        <DataTable columns={liveTrackingByTripColumns} data={liveTrackingByTripData} pagination highlightOnHover />
      )}
    </div>
  );
};

export default TrackMyVehicle;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { getToken } from "../auth/auth";
// import { CSVLink } from "react-csv";

// const TrackMyVehicle = () => {
//   const [empCode, setEmpCode] = useState("");
//   const [lorryNumber, setLorryNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [idealData, setIdealData] = useState([]);
//   const [liveTrackingData, setLiveTrackingData] = useState([]);
//   const [liveTrackingByTripData, setLiveTrackingByTripData] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [currentPageData, setCurrentPageData] = useState([]);

//   const navigate = useNavigate();
//   const token = getToken();

//   const handleButtonClick = (fetchFunction) => {
//     if (!empCode.trim()) {
//       alert("Please enter an Employee Code.");
//       return;
//     }
//     setShowSearch(true);
//     fetchFunction();
//   };

//   const fetchIdealVehicle = async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/omsanchar/track_ideal_vehical`,
//         { emp_code: empCode },
//         { headers: { Authorization: `${token}`, "Content-Type": "application/json" } }
//       );
//       setIdealData(response.data.vehicles);
//       setLiveTrackingData([]);
//       setLiveTrackingByTripData([]);
//       setError(response.data.vehicles.length === 0);
//     } catch {
//       setError(true);
//     }
//     setLoading(false);
//   };

//   const fetchLiveTracking = async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/omsanchar/track_live_tracking`,
//         { emp_code: empCode },
//         { headers: { Authorization: `${token}`, "Content-Type": "application/json" } }
//       );
//       setLiveTrackingData(response.data.vehicles);
//       setIdealData([]);
//       setLiveTrackingByTripData([]);
//       setError(response.data.vehicles.length === 0);
//     } catch {
//       setError(true);
//     }
//     setLoading(false);
//   };

//   const fetchLiveTrackingByTrip = async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/omsanchar/track_myVehical`,
//         { emp_code: empCode },
//         { headers: { Authorization: `${token}`, "Content-Type": "application/json" } }
//       );
//       setLiveTrackingByTripData(response.data.vehicles);
//       setIdealData([]);
//       setLiveTrackingData([]);
//       setError(response.data.vehicles.length === 0);
//     } catch {
//       setError(true);
//     }
//     setLoading(false);
//   };

//   const filteredLiveTrackingData = liveTrackingData.filter((row) => {
//     const status = row.STATUS.toLowerCase();
//     const match = status.match(/(\d+)\s*hrs\s*delay in-transit/i);
//     const delayHours = match ? parseInt(match[1], 10) : null;

//     if (statusFilter === "" || statusFilter === "All") {
//       return true;
//     }

//     if (statusFilter === "OK") {
//       return status.includes("ok");
//     }

//     if (statusFilter === "REACHED") {
//       return status.includes("reached");
//     }

//     if (statusFilter === "≤10") {
//       return delayHours !== null && delayHours <= 10;
//     }

//     if (statusFilter === "≥10") {
//       return delayHours !== null && delayHours > 10;
//     }

//     return false;
//   });

//   const filterDataByLorryNumber = (data) => {
//     return data.filter((row) =>
//       row.TRIP_LORRY_NO?.toLowerCase().includes(lorryNumber.toLowerCase())
//     );
//   };

//   const handlePageChange = (page) => {
//     setCurrentPageData(page);
//   };

//   const idealColumns = [
//     { name: "Branch Code", selector: (row) => row.BRANCH_CODE, sortable: true, width: "120px" },
//     { name: "Branch Name", selector: (row) => row.BRANCH_NAME, sortable: true, wrap: true, width: "130px" },
//     { name: "Lorry Number", selector: (row) => row.TRIP_LORRY_NO, sortable: true, width: "130px" },
//     { name: "Lorry Type", selector: (row) => row.LORRY_TYPE, sortable: true, wrap: true, width: "120px" },
//     { name: "Capacity", selector: (row) => row.CAPACITY_KG, sortable: true, wrap: true },
//     { name: "Gate In Date", selector: (row) => new Date(row.GATE_IN_DATE).toLocaleString(), sortable: true, wrap: true, width: "130px" },
//     { name: "Tracking Remarks", selector: (row) => row.TRACKING_REMARKS, sortable: true, wrap: true, width: "150px" },
//     {
//       name: "Tracking Link",
//       cell: (row) => (
//         <a href={row.API_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//           View Trip
//         </a>
//       ),
//     },
//   ];

//   const liveTrackingByTripColumns = [
//     { name: "Trip No", selector: (row) => row.TRIP_NO, sortable: true, width: "130px" },
//     { name: "Trip Date", selector: (row) => row.TRIP_DATE, sortable: true, wrap: true, width: "140px" },
//     { name: "Lorry No", selector: (row) => row.TRIP_LORRY_NO, sortable: true, width: "130px" },
//     { name: "From", selector: (row) => row.FROM_NAME, sortable: true, wrap: true, width: "150px" },
//     { name: "To", selector: (row) => row.TO_NAME, sortable: true, wrap: true, width: "150px" },
//     { name: "Capacity (KG)", selector: (row) => row.CAPACITY, sortable: true },
//     { name: "Weight", selector: (row) => row.WT, sortable: true },
//     { name: "Load Summary", selector: (row) => row.LOAD_SUMM, sortable: true },
//     { name: "Gate In Date", selector: (row) => new Date(row.GATE_IN_DATE).toLocaleString(), sortable: true, wrap: true, width: "150px" },
//     { name: "KM Covered", selector: (row) => row.KM, sortable: true },
//     { name: "Tracking Remarks", selector: (row) => row.TRACKING_REMARKS, sortable: true, wrap: true, width: "200px" },
//   ];

//   const liveTrackingColumns = [
//     { name: "Lorry No", selector: (row) => row.LORRY_NO, sortable: true },
//     { name: "Lorry Type", selector: (row) => row.LORRY_TYPE, sortable: true },
//     { name: "Capacity (KG)", selector: (row) => row.CAPACITY_KG, sortable: true },
//     { name: "Address", selector: (row) => row.ADDRESS, sortable: true, wrap: true, width: "330px" },
//     { name: "Lorry Owner", selector: (row) => row.LORRY_OWNER_NAME, sortable: true },
//     { name: "Owner Contact", selector: (row) => row.LORRY_OWNER_NO, sortable: true },
//     { name: "KM Covered", selector: (row) => row.KM, sortable: true },
//     { name: "Status", selector: (row) => row.STATUS, sortable: true, wrap: true },
//     {
//       name: "Tracking Link",
//       cell: (row) => (
//         <a href={row.API_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//           View Trip
//         </a>
//       ),
//     },
//   ];

//   const paginationOptions = {
//     rowsPerPageText: "Rows per page:",
//     rangeSeparatorText: "of",
//     selectAllRowsItem: true,
//     selectAllRowsItemText: "All",
//   };

//   return (
//     <div className="p-4 w-[58rem] lg:w-[58rem] 2xl:w-[100rem]">
//       <div className="flex items-center mb-4">
//         <button onClick={() => navigate("/dashboard")} className="flex items-center mr-8">
//           <FaArrowLeft className="mr-2" /> Back
//         </button>
//         <h1 className="text-2xl font-bold">Track My Vehicle</h1>
//         {liveTrackingData.length > 0 && (
//           <>
//             <CSVLink
//               data={currentPageData}
//               filename="live_tracking_data.csv"
//               className="p-2 bg-black text-white ml-40 rounded-lg"
//             >
//               Export to CSV
//             </CSVLink>
//             <div className="ml-[5.2rem]">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="p-2 border rounded-lg"
//               >
//                 <option value="">All</option>
//                 <option value="OK">OK</option>
//                 <option value="≤10">Delay less than 10 Hrs</option>
//                 <option value="≥10">Delay more than 10 Hrs</option>
//                 <option value="REACHED">Reached</option>
//               </select>
//             </div>
//           </>
//         )}
//       </div>

//       <div className="flex gap-4 items-center mb-4">
//         <input
//           type="text"
//           placeholder="Enter Employee Code"
//           value={empCode}
//           onChange={(e) => setEmpCode(e.target.value)}
//           className="p-2 border rounded-lg"
//         />
//         <button onClick={() => handleButtonClick(fetchIdealVehicle)} className="p-2 bg-[#219EBC] text-white rounded-lg">
//           Ideal Vehicle
//         </button>
//         <button onClick={() => handleButtonClick(fetchLiveTracking)} className="p-2 bg-[#219EBC] text-white rounded-lg">
//           Live Tracking
//         </button>
//         <button onClick={() => handleButtonClick(fetchLiveTrackingByTrip)} className="p-2 bg-[#219EBC] text-white rounded-lg">
//           Live Tracking By Trip
//         </button>
//         {showSearch && (
//           <div className="flex gap-4 items-center mb-4">
//             <input
//               type="text"
//               placeholder="Search by Lorry Number"
//               value={lorryNumber}
//               onChange={(e) => setLorryNumber(e.target.value)}
//               className="p-2 mt-4 border rounded-lg"
//             />
//           </div>
//         )}
//       </div>

//       {loading && <div>Loading...</div>}
//       {error && <div>No data found</div>}

//       {!loading && !error && idealData.length > 0 && (
//         <DataTable
//           columns={idealColumns}
//           data={filterDataByLorryNumber(idealData)}
//           pagination
//           paginationPerPage={50}
//           paginationRowsPerPageOptions={[50, 100, 200, 500]}
//           paginationComponentOptions={paginationOptions}
//           highlightOnHover
//           onChangePage={handlePageChange}
//         />
//       )}
//       {!loading && !error && filteredLiveTrackingData.length > 0 && (
//         <DataTable
//           columns={liveTrackingColumns}
//           data={filterDataByLorryNumber(filteredLiveTrackingData)}
//           pagination
//           paginationPerPage={50}
//           paginationRowsPerPageOptions={[50, 100, 200, 500]}
//           paginationComponentOptions={paginationOptions}
//           highlightOnHover
//           onChangePage={handlePageChange}
//         />
//       )}
//       {!loading && !error && liveTrackingByTripData.length > 0 && (
//         <DataTable
//           columns={liveTrackingByTripColumns}
//           data={filterDataByLorryNumber(liveTrackingByTripData)}
//           pagination
//           paginationPerPage={50}
//           paginationRowsPerPageOptions={[50, 100, 200, 500]}
//           paginationComponentOptions={paginationOptions}
//           highlightOnHover
//           onChangePage={handlePageChange}
//         />
//       )}
//     </div>
//   );
// };

// export default TrackMyVehicle;