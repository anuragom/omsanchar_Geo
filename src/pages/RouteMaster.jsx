


import React, { useState } from "react";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RouteMaster = () => {
  const [formData, setFormData] = useState({
    vehicleName: "",
    vehicleModel: "",
    rcNumber: "",
    pollutionDetails: "",
    chassisNumber: "",
    engineNumber: "",
    vehicleColor: "",
    ownerName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Vehicle details submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    setFormData({
      vehicleName: "",
      vehicleModel: "",
      rcNumber: "",
      pollutionDetails: "",
      chassisNumber: "",
      engineNumber: "",
      vehicleColor: "",
      ownerName: "",
    });
  };

  return (
    <div>
  
      <div className="p-6 bg-gray-100 min-h-screen">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Vehicle Master</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-6"
        >
          {/* Vehicle Name and Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="vehicleName"
                className="block text-gray-700 font-semibold mb-2"
              >
                Vehicle Name
              </label>
              <input
                type="text"
                id="vehicleName"
                name="vehicleName"
                value={formData.vehicleName}
                onChange={handleChange}
                placeholder="Enter vehicle name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="vehicleModel"
                className="block text-gray-700 font-semibold mb-2"
              >
                Vehicle Model
              </label>
              <input
                type="text"
                id="vehicleModel"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                placeholder="Enter vehicle model"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* RC Number and Pollution Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="rcNumber"
                className="block text-gray-700 font-semibold mb-2"
              >
                RC Number
              </label>
              <input
                type="text"
                id="rcNumber"
                name="rcNumber"
                value={formData.rcNumber}
                onChange={handleChange}
                placeholder="Enter RC number"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="pollutionDetails"
                className="block text-gray-700 font-semibold mb-2"
              >
                Pollution Details
              </label>
              <input
                type="text"
                id="pollutionDetails"
                name="pollutionDetails"
                value={formData.pollutionDetails}
                onChange={handleChange}
                placeholder="Enter pollution details"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Chassis Number and Engine Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="chassisNumber"
                className="block text-gray-700 font-semibold mb-2"
              >
                Chassis Number
              </label>
              <input
                type="text"
                id="chassisNumber"
                name="chassisNumber"
                value={formData.chassisNumber}
                onChange={handleChange}
                placeholder="Enter chassis number"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="engineNumber"
                className="block text-gray-700 font-semibold mb-2"
              >
                Engine Number
              </label>
              <input
                type="text"
                id="engineNumber"
                name="engineNumber"
                value={formData.engineNumber}
                onChange={handleChange}
                placeholder="Enter engine number"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Vehicle Color and Owner Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="vehicleColor"
                className="block text-gray-700 font-semibold mb-2"
              >
                Vehicle Color
              </label>
              <input
                type="text"
                id="vehicleColor"
                name="vehicleColor"
                value={formData.vehicleColor}
                onChange={handleChange}
                placeholder="Enter vehicle color"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="ownerName"
                className="block text-gray-700 font-semibold mb-2"
              >
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RouteMaster;
