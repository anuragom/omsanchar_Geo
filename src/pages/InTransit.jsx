


import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { getToken } from "../auth/auth";

const InTransit = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [branchCode, setBranchCode] = useState("");
  const [km, setKm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = getToken();

  // Validation: Only numbers, max 10 digits
  const handleBranchCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setBranchCode(value);
    }
  };

  // Validation: Only numbers, max 4 digits, up to 2 decimals
  const handleKmChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,5}(\.\d{0,2})?$/.test(value)) {
      setKm(value);
    }
  };


  const fetchData = async () => {
    if (!branchCode || !km) {
      alert("Please enter both Branch Code and KM.");
      return;
    }
  
    setLoading(true);
    setError(false);
  
    try {
      const response = await axios.post(
        // `${import.meta.env.VITE_BASE_URL}/omsanchar/inTransit_Vehical`, 
        "https://omhrms.omlogistics.co.in/omsanchar/inTransit_Vehical",
        { bcode: branchCode, km: km },
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.length === 0) {
        setError(true);
      }
  
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  
    setLoading(false);
  };
  
  useEffect(() => {
    const result = data.filter((item) =>
      item.CHLN_LORRY_NO.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search, data]);

  const columns = [
    {
      name: "Lorry Number",
      selector: (row) => row.CHLN_LORRY_NO,
      sortable: true,
      width: "154px",
    },
    {
      name: "From",
      selector: (row) => row.CHLN_FROM,
      sortable: true,
      width: "200px",
      wrap: true,
    },
    {
      name: "To",
      selector: (row) => row.CHLN_TO,
      sortable: true,
      width: "200px",
      wrap: true,
    },
    {
      name: "Address",
      selector: (row) => row.ADDRESS,
      sortable: true,
      width: "200px",
      wrap: true,
    },
    {
      name: "KM",
      selector: (row) => parseFloat(row.KM).toFixed(2), // Show only 2 decimal places
      sortable: true,
    },
    {
      name: "Challan Date",
      selector: (row) => new Date(row.CHALLAN_DATE).toLocaleDateString(),
      sortable: true,
      width: "150px",
    },
    {
      name: "Capacity",
      selector: (row) => row.CAPACITY,
      sortable: true,
    },
    {
      name: "Weight",
      selector: (row) => row.CHLN_WEIGHT,
      sortable: true,
    },
    {
      name: "Lorry Type",
      selector: (row) => row.LORRY_TYPE,
      sortable: true,
      wrap: true,
      width: "130px",
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
    <div className="p-4 w-[35rem] sm:w-[58rem] lg:w-[58rem] 2xl:w-[100rem]">
    <h1 className="text-2xl font-bold mb-4">In Transit Vehicles.</h1>
  
    {/* Input Fields */}
    <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label htmlFor="branchCode" className="block font-medium mb-1">
          Branch Code
        </label>
        <input
          id="branchCode"
          type="text"
          placeholder="Enter Branch Code"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 w-full"
          value={branchCode}
          onChange={handleBranchCodeChange}
        />
      </div>
  
      <div>
        <label htmlFor="km" className="block font-medium mb-1">
          KM
        </label>
        <input
          id="km"
          type="text"
          placeholder="Enter KM"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 w-full"
          value={km}
          onChange={handleKmChange}
        />
      </div>
  
      <button
        onClick={fetchData}
        className="p-2 bg-[#219EBC] text-white rounded-lg font-semibold hover:bg-[#2e2e2e] self-end"
      >
        Search
      </button>
    </div>
  
    {/* Loading and Error Messages */}
    {loading && <div className="text-blue-500">Loading...</div>}
    {error && <div className="text-red-500">No data found</div>}
  
    {/* Search and Table */}
    {!loading && !error && data.length > 0 && (
      <>
        <div className="mb-4">
          <label htmlFor="search" className="block font-medium mb-1">
            Search by Lorry Number
          </label>
          <input
            id="search"
            type="text"
            placeholder="Enter Lorry Number"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
  
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
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
      </>
    )}
  </div>
  
  );
};

export default InTransit;

