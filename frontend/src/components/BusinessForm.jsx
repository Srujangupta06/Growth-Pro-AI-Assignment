import { useContext, useState } from "react";
import validateBody from "../utils/validations";
import { useNavigate } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";
import { toast } from "react-hot-toast";
import { BusinessContext } from "../context/context";
import {backendUrl} from '../utils/constants'
const BusinessForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Consuming Context
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
      const response = await fetch(backendUrl+'/business-data', {
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
    <div className="h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={onHandleSubmit}
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-6"
      >
        <h2 className="text-lg font-bold mb-4">Enter Business Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Business Name"
          className="w-full mb-3 p-2 border rounded"
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
          className="w-full mb-3 p-2 border rounded"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setErrorMessage("");
          }}
          required
        />
        {errorMessage && (
          <p className="text-red-700 my-2 flex items-center gap-x-1">
            <MdOutlineErrorOutline />
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="bg-[#349f7b] text-white px-4 py-2 rounded hover:bg-[#335e50] w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BusinessForm;
