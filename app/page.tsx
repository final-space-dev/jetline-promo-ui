'use client';

import { useState } from 'react';

type ProductCategory = 'Wall Calendars' | 'Tent Calendars' | 'Poster Calendars' | 'Desk Pads';
type Promotion = '7-Page Calendar' | '13-Page Calendar';
type ProductOption = 'A1' | 'A2' | 'A3';
type UnitOption = 300 | 500 | 'custom';

interface PricingData {
  [key: string]: {
    [key: string]: {
      300: number;
      500: number;
    };
  };
}

const pricingData: PricingData = {
  '7-Page Calendar': {
    'A1': { 300: 83.33, 500: 63.00 },
    'A2': { 300: 51.67, 500: 39.00 },
    'A3': { 300: 28.33, 500: 21.00 },
  },
  '13-Page Calendar': {
    'A1': { 300: 136.67, 500: 102.00 },
    'A2': { 300: 80.00, 500: 59.00 },
    'A3': { 300: 45.00, 500: 33.00 },
  },
};

export default function Home() {
  const [category, setCategory] = useState<ProductCategory>('Wall Calendars');
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [productOption, setProductOption] = useState<ProductOption | null>(null);
  const [units, setUnits] = useState<UnitOption | null>(null);
  const [customUnits, setCustomUnits] = useState<string>('');
  const [unitPrice, setUnitPrice] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateUnitPrice = (promo: Promotion, option: ProductOption, qty: number): number => {
    const basePrice300 = pricingData[promo][option][300];
    const basePrice500 = pricingData[promo][option][500];

    if (qty <= 300) return basePrice300;
    if (qty >= 500) return basePrice500;

    // Linear interpolation for quantities between 300 and 500
    const ratio = (qty - 300) / (500 - 300);
    return basePrice300 - (basePrice300 - basePrice500) * ratio;
  };

  const handleUnitsChange = (value: UnitOption) => {
    setUnits(value);
    setShowResults(false);

    if (value !== 'custom' && promotion && productOption) {
      const price = calculateUnitPrice(promotion, productOption, value);
      setUnitPrice(price);
    } else {
      setUnitPrice(null);
    }
  };

  const handleCustomUnitsChange = (value: string) => {
    setCustomUnits(value);
    setShowResults(false);
    const qty = parseInt(value);

    if (qty > 0 && promotion && productOption) {
      const price = calculateUnitPrice(promotion, productOption, qty);
      setUnitPrice(price);
    } else {
      setUnitPrice(null);
    }
  };

  const handleCalculate = () => {
    if (unitPrice !== null) {
      setShowResults(true);
    }
  };

  const handleRestartQuote = () => {
    setPromotion(null);
    setProductOption(null);
    setUnits(null);
    setCustomUnits('');
    setUnitPrice(null);
    setShowResults(false);
  };

  const getQuantity = (): number => {
    if (units === 'custom') return parseInt(customUnits) || 0;
    return units || 0;
  };

  const getTotalCost = (): number => {
    if (!unitPrice) return 0;
    return unitPrice * getQuantity();
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">Standard Products</h1>
          <p className="text-center text-gray-600">
            Browse our standard product offerings and select the perfect option for your needs
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          {(['Wall Calendars', 'Tent Calendars', 'Poster Calendars', 'Desk Pads'] as ProductCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-lg font-medium transition-all border-2 ${
                category === cat
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              {cat}
              {cat === 'Wall Calendars' && <span className="ml-2 text-sm text-gray-500">12</span>}
              {cat === 'Tent Calendars' && <span className="ml-2 text-sm text-gray-500">3</span>}
              {cat === 'Poster Calendars' && <span className="ml-2 text-sm text-gray-500">6</span>}
              {cat === 'Desk Pads' && <span className="ml-2 text-sm text-gray-500">8</span>}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Selection Steps */}
          <div className="space-y-5">
            {/* Step 1: Promotion Selection */}
            <div>
              <h2 className="text-base font-semibold mb-3 flex items-center text-gray-900">
                <span className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center mr-2 text-xs shadow-lg shadow-red-200">1</span>
                Select Promotion
              </h2>
              <div className="flex gap-3">
                {(['7-Page Calendar', '13-Page Calendar'] as Promotion[]).map((promo) => (
                  <button
                    key={promo}
                    onClick={() => {
                      setPromotion(promo);
                      setProductOption(null);
                      setUnits(null);
                      setCustomUnits('');
                      setUnitPrice(null);
                      setShowResults(false);
                    }}
                    className={`flex-1 py-4 px-4 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                      promotion === promo
                        ? 'border-red-500 bg-gradient-to-br from-red-50 to-white text-red-700 shadow-lg shadow-red-100 transform scale-[1.02]'
                        : 'border-gray-200 text-gray-700 hover:border-red-300 hover:shadow-md hover:bg-gradient-to-br hover:from-red-50/30 hover:to-white'
                    }`}
                  >
                    {promo}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Product Option Selection */}
            {promotion && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <h2 className="text-base font-semibold mb-3 flex items-center text-gray-900">
                  <span className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center mr-2 text-xs shadow-lg shadow-red-200">2</span>
                  Select Product Option
                </h2>
                <div className="flex gap-3">
                  {(['A1', 'A2', 'A3'] as ProductOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setProductOption(option);
                        setUnits(null);
                        setCustomUnits('');
                        setUnitPrice(null);
                        setShowResults(false);
                      }}
                      className={`flex-1 py-4 px-4 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                        productOption === option
                          ? 'border-red-500 bg-gradient-to-br from-red-50 to-white text-red-700 shadow-lg shadow-red-100 transform scale-[1.02]'
                          : 'border-gray-200 text-gray-700 hover:border-red-300 hover:shadow-md hover:bg-gradient-to-br hover:from-red-50/30 hover:to-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Units Selection */}
            {productOption && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <h2 className="text-base font-semibold mb-3 flex items-center text-gray-900">
                  <span className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center mr-2 text-xs shadow-lg shadow-red-200">3</span>
                  Select Units
                </h2>
                <div className="flex gap-3 mb-3">
                  {([300, 500, 'custom'] as UnitOption[]).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => handleUnitsChange(unit)}
                      className={`flex-1 py-4 px-4 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                        units === unit
                          ? 'border-red-500 bg-gradient-to-br from-red-50 to-white text-red-700 shadow-lg shadow-red-100 transform scale-[1.02]'
                          : 'border-gray-200 text-gray-700 hover:border-red-300 hover:shadow-md hover:bg-gradient-to-br hover:from-red-50/30 hover:to-white'
                      }`}
                    >
                      {unit === 'custom' ? 'Custom' : unit}
                    </button>
                  ))}
                </div>

                {units === 'custom' && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Enter Custom Quantity
                    </label>
                    <input
                      type="number"
                      value={customUnits}
                      onChange={(e) => handleCustomUnitsChange(e.target.value)}
                      placeholder="Enter quantity..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 text-sm transition-all"
                      min="1"
                    />
                  </div>
                )}

                {unitPrice !== null && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-xs font-medium text-gray-600 mb-1">Unit Price</p>
                    <p className="text-2xl font-bold text-gray-900">R {unitPrice.toFixed(2)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Calculate Button */}
            {unitPrice !== null && (
              <div className="flex justify-center">
                <button
                  onClick={handleCalculate}
                  className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
                >
                  Calculate
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Results Panel */}
          <div className="lg:col-span-1">
            {showResults && unitPrice !== null && (
              <div className="sticky top-8 space-y-4">
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quote Ready</span>
                    </div>
                    <button
                      onClick={handleRestartQuote}
                      className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {productOption} {promotion}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category} • Full Colour
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-baseline py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Quantity</span>
                      <span className="text-base font-semibold text-gray-900">{getQuantity()} units</span>
                    </div>
                    <div className="flex justify-between items-baseline py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Unit Price</span>
                      <span className="text-base font-semibold text-gray-900">R {unitPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total Price - Highlighted */}
                  <div className="bg-white rounded-xl p-4 mb-6 border-2 border-green-200 shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Total Price</p>
                        <p className="text-3xl font-bold text-green-600">
                          R {getTotalCost().toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-green-100 rounded-full p-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2">
                    <span>Submit Quote</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>

                {/* Additional Info Card */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-900 mb-1">Need help?</p>
                      <p className="text-xs text-blue-700">Our team can assist with bulk orders and custom requirements.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
