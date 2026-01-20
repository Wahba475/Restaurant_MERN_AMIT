import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-['Oswald',_sans-serif] text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="font-['DM_Sans',_sans-serif] text-gray-600 mb-8">
          Your order has been placed and is being processed. Thank you for
          dining with us!
        </p>
        <button
          onClick={() => navigate("/orders")}
          className="w-full py-3 bg-[#AD343E] text-white rounded-full font-bold hover:bg-[#8f2a32] transition-all"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
