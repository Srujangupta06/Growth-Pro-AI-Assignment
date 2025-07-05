import { useContext, useEffect, useState } from "react";
import { BusinessContext } from "../context/context";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaRegComments } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { backendUrl } from "../utils/constants";

const BusinessCard = () => {
  const { businessData, setBusinessData } = useContext(BusinessContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const locationParam = searchParams.get("location");

  useEffect(() => {
    setTimeout(() => setShowCard(true), 100);
  }, []);

  const onHandleRegenerateHeadline = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendUrl}/regenerate-headline?name=${name}&location=${locationParam}`
      );
      if (response.ok) {
        const data = await response.json();
        setBusinessData({
          ...businessData,
          headline: data.headline,
        });
      }
    } catch (e) {
      console.error("Regeneration failed:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!businessData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <p className="text-lg font-semibold text-red-600">No data found!</p>
          <button
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { rating, reviews, headline } = businessData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100 px-4 py-10">
      <div
        className={`bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg transform transition duration-500 ${
          showCard ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-xl sm:text-2xl font-extrabold text-center text-gray-800 mb-4">
          🏆 Business Spotlight
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-24">
            <ClipLoader color="#349f7b" size={40} />
          </div>
        ) : (
          <>
            <p className="text-gray-700 text-base sm:text-lg text-center italic mb-6">
              {headline ? `“${headline}”` : "No headline available"}
            </p>

            <div className="flex flex-col sm:flex-row justify-around items-center text-gray-600 text-sm sm:text-base gap-y-4 sm:gap-0">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span className="font-semibold">{rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegComments className="text-blue-500" />
                <span>{reviews} Reviews</span>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <button
            className="w-full py-2 bg-[#349f7b] text-white font-semibold rounded hover:bg-[#2c6f60] transition duration-300"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Back to Form
          </button>
          <button
            className="w-full py-2 bg-[#349f7b] text-white font-semibold rounded hover:bg-[#2c6f60] transition duration-300"
            onClick={onHandleRegenerateHeadline}
            disabled={loading}
          >
            Regenerate Headline
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
