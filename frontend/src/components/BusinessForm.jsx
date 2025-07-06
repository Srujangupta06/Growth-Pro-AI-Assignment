import { useContext, useState } from "react";
import validateBody from "../utils/validations";
import { useNavigate } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";
import { toast } from "react-hot-toast";
import { BusinessContext } from "../context/context";

const BusinessForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { setBusinessData } = useContext(BusinessContext);

  const onHandleSubmit = (e) => {
    try {
      e.preventDefault();
      validateBody({ name, location });
      sendBusinessDetails();
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const sendBusinessDetails = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/business-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, location }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Headline Generated Successfully", {
          position: "top-center",
          duration: 1500,
          style: {
            padding: "16px",
            whiteSpace: "nowrap",
            minWidth: "fit-content",
          },
        });

        setBusinessData(data.data);
        navigate(`/business-card?name=${name}&location=${location}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <form
        onSubmit={onHandleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Enter Business Details</h2>

        <input
          type="text"
          name="name"
          placeholder="Business Name"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#349f7b]"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorMessage("");
          }}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#349f7b]"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setErrorMessage("");
          }}
          required
        />

        {errorMessage && (
          <p className="text-red-700 text-sm my-2 flex items-center gap-x-2">
            <MdOutlineErrorOutline size={20} />
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#349f7b] text-white font-semibold py-3 rounded-md hover:bg-[#2e7a65] transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BusinessForm;
