import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg border border-gray-100">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="font-['Oswald',_sans-serif] text-3xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        <p className="font-['DM_Sans',_sans-serif] text-gray-600 mb-8">
          The payment process was cancelled. No charges were made.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-3 bg-[#AD343E] text-white rounded-full font-bold hover:bg-[#8f2a32] transition-all"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="w-full py-3 text-gray-600 font-bold hover:text-gray-900 transition-all"
          >
            Return to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
