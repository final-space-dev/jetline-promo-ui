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
          <button className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Selection
          </button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Selection Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Promotion Selection */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Select Promotion
              </h2>
              <div className="flex gap-4">
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
                    className={`flex-1 py-6 px-4 rounded-xl font-medium text-lg transition-all border-2 ${
                      promotion === promo
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md transform scale-105'
                        : 'border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
                  >
                    {promo}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Product Option Selection */}
            {promotion && (
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Select Product Option
                </h2>
                <div className="flex gap-4">
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
                      className={`flex-1 py-6 px-4 rounded-xl font-medium text-lg transition-all border-2 ${
                        productOption === option
                          ? 'border-green-600 bg-green-50 text-green-700 shadow-md transform scale-105'
                          : 'border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50/50'
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
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                  <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                  Select Units
                </h2>
                <div className="flex gap-4 mb-4">
                  {([300, 500, 'custom'] as UnitOption[]).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => handleUnitsChange(unit)}
                      className={`flex-1 py-6 px-4 rounded-xl font-medium text-lg transition-all border-2 ${
                        units === unit
                          ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-md transform scale-105'
                          : 'border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50/50'
                      }`}
                    >
                      {unit === 'custom' ? 'Custom' : unit}
                    </button>
                  ))}
                </div>

                {units === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Custom Quantity
                    </label>
                    <input
                      type="number"
                      value={customUnits}
                      onChange={(e) => handleCustomUnitsChange(e.target.value)}
                      placeholder="Enter quantity..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none text-lg"
                      min="1"
                    />
                  </div>
                )}

                {unitPrice !== null && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">Unit Price</p>
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
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-6 shadow-xl sticky top-8 border-2 border-gray-700">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-semibold">Calendars Results</h3>
                  <button
                    onClick={handleRestartQuote}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    Restart Quote
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <p className="text-sm text-gray-300 mb-1">
                      {productOption} {promotion} - {category}, Full Colour
                    </p>
                    <p className="text-2xl font-bold text-right">
                      R {getTotalCost().toFixed(2)}
                    </p>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Total Cost</span>
                      <span className="text-green-400 font-semibold text-lg">
                        R {getTotalCost().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Unit Price</span>
                      <span className="text-green-400 font-semibold">R {unitPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-all shadow-lg">
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
