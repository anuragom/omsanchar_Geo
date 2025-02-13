

import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getToken } from "../auth/auth";

const Geofencing = () => {
  const [branchCode, setBranchCode] = useState(""); 
  const [km, setKm] = useState(""); 
  const [branch, setBranch] = useState(null); 
  const [devices, setDevices] = useState([]);   
  const [filteredDevices, setFilteredDevices] = useState([]); // For filtered data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const token = getToken();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(
        "https://omhrms.omlogistics.co.in/omsanchar/geo_fencing",
        { branchCode, km },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { branch, devices } = response.data;
      setBranch(branch);
      setDevices(devices);
      setFilteredDevices(devices); // Initialize filtered devices
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (!branchCode || !km) {
      alert("Please enter both Branch Code and KM.");
      return;
    }
    fetchData();
  };

  const handleDeviceSearch = (query) => {
    setSearchQuery(query);
    const filtered = devices.filter(
      (device) =>
        device.DEVICE.toLowerCase().includes(query.toLowerCase()) ||
        device.LORRY_TYPE.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDevices(filtered);
  };

  const columns = [
    {
      name: "Device",
      selector: (row) => row.DEVICE,
      sortable: true,
    },
    {
      name: "KM",
      selector: (row) => row.KM,
      sortable: true,
    },
    {
      name: "Capacity",
      selector: (row) => row.CAPACITY,
      sortable: true,
    },
    {
      name: "Lorry Type",
      selector: (row) => row.LORRY_TYPE,
      sortable: true,
    },
    {
      name: "Challan Detail",
      selector: (row) => row.CHLN_DETAIL,
      sortable: true,
    },
    {
      name: "URL",
      cell: (row) => (
        <a
          href={row.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Trip
        </a>
      ),
    },
  ];

  return (
    <div className="p-4 w-full max-w-[58rem] lg:max-w-[58rem] 2xl:max-w-[100rem] mx-auto">
      {/* Back Button */}
      <div className="flex">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center mr-8 mb-4 text-[#2e2e2e] hover:text-bg-[#219EBC]"
      >
        <FaArrowLeft className="mr-2  text-#2e2e2e" />
        Back 
      </button>

      <h1 className="text-2xl font-bold mb-4">Geo-Fencing Data</h1>

      </div>
      

      {/* Input Section */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch Code
            </label>
            <input
              type="number"
              value={branchCode}
              onChange={(e) => setBranchCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Branch Code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              KM
            </label>
            <input
              type="number"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter KM"
            />
          </div>
          <button
            onClick={handleSearch}
            className="mt-6 px-2 bg-[#219EBC] text-white rounded-lg font-semibold hover:bg-[#2e2e2e]"
          >
            Search
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && <div className="text-blue-500">Loading...</div>}

      {/* Error State */}
      {error && <div className="text-red-500">Error fetching data</div>}

      {/* Branch Information */}
      {!loading && branch && (
        <div className="mb-4 p-4 bg-gray-100 flex items-center justify-between rounded-lg shadow-md">
        {/* Branch Name */}
        <p className="text-lg ">
          <strong>Branch Name:</strong> {branch.branchName}
        </p>
      
        {/* Search Bar for Devices */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleDeviceSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          placeholder="Search by Device or Lorry Type"
        />
      </div>
      
      )}

      {/* Devices Table */}
      {!loading && filteredDevices.length > 0 && (
        <DataTable
          columns={columns}
          data={filteredDevices}
          pagination
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
          onChangeRowsPerPage={(newRowsPerPage) => setRowsPerPage(newRowsPerPage)}
          highlightOnHover
          responsive
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "#f7fafc",
              },
            },
          }}
        />
      )}

      {/* No Devices Found */}
      {!loading && !error && filteredDevices.length === 0 && (
        <div className="text-gray-500">No devices found.</div>
      )}
    </div>
  );
};

export default Geofencing;
