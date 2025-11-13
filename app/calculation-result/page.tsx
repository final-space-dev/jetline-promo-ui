'use client';

export default function CalculationResult() {
  // Hardcoded data from the screenshot
  const data = {
    quantity: 1000,
    printType: 'Litho',
    totalPrice: 68923.22,
    breakdown: [
      { label: 'Make Readies', value: 12250.00 },
      { label: 'Paper', value: 8928.00 },
      { label: 'Run', value: 3280.00 },
      { label: 'Folding', value: 1331.52 },
      { label: 'Binding', value: 6026.20 },
      { label: 'Scoring', value: 1264.50 },
      { label: 'Punching', value: 33.00 },
      { label: 'Presentation Folders', value: 1250.00 },
      { label: 'Lamination', value: 34560.00 },
    ],
    specs: {
      totalImages: 4,
      fittingImages: 4,
      sections: 6,
      sheets: 3600,
      plates: 24,
    }
  };

  const formatPrice = (price: number): string => {
    return Math.round(price).toLocaleString('en-ZA');
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">Calculation Result</h1>
        <p className="text-center text-gray-600 mb-8">
          Clean, modern design approach for displaying calculation results
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quantity Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600">Quantity</span>
              </div>
              <p className="text-4xl font-bold text-center text-gray-900">{data.quantity}</p>
            </div>

            {/* Print Type */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-center gap-2">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700">{data.printType}</span>
              </div>
            </div>

            {/* Total Price Card */}
            <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2 text-center">Total Price</p>
              <p className="text-4xl font-bold text-center text-green-600">
                R {formatPrice(data.totalPrice)}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Images</span>
                  <span className="font-semibold text-gray-900">{data.specs.totalImages}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fitting Images</span>
                  <span className="font-semibold text-gray-900">{data.specs.fittingImages}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sections</span>
                  <span className="font-semibold text-gray-900">{data.specs.sections}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sheets</span>
                  <span className="font-semibold text-gray-900">{data.specs.sheets.toLocaleString('en-ZA')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Plates</span>
                  <span className="font-semibold text-gray-900">{data.specs.plates}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Cost Breakdown */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cost Breakdown</h2>

              <div className="space-y-3 mb-6">
                {data.breakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="text-base font-semibold text-gray-900">
                      R {formatPrice(item.value)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-center pt-6 border-t-2 border-gray-300">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  R {formatPrice(data.totalPrice)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <button className="bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  Submit
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  Assign Customer
                </button>
              </div>
            </div>

            {/* Restart Button */}
            <div className="mt-4 flex justify-end">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md">
                Restart Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
