'use client';

import { useState } from 'react';

type PrintType = 'Litho' | 'Digital';
type Quantity = 1000 | 2000 | 3000;

export default function CalculationResult() {
  const [selectedCombinations, setSelectedCombinations] = useState<Set<string>>(
    new Set(['Litho-1000'])
  );
  const [showImposition, setShowImposition] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<{printType: PrintType, qty: Quantity} | null>(null);

  const calculations = {
    Litho: {
      1000: {
        printing: [
          { label: 'Make Readies', value: 12250.00 },
          { label: 'Paper', value: 8928.00 },
          { label: 'Run', value: 3280.00 },
        ],
        finishing: [
          { label: 'Folding', value: 1332.00 },
          { label: 'Binding', value: 6026.00 },
          { label: 'Scoring', value: 1265.00 },
          { label: 'Punching', value: 33.00 },
          { label: 'Presentation Folders', value: 1250.00 },
          { label: 'Lamination', value: 34560.00 },
        ],
      },
      2000: {
        printing: [
          { label: 'Make Readies', value: 12250.00 },
          { label: 'Paper', value: 17856.00 },
          { label: 'Run', value: 6560.00 },
        ],
        finishing: [
          { label: 'Folding', value: 2664.00 },
          { label: 'Binding', value: 12052.00 },
          { label: 'Scoring', value: 2530.00 },
          { label: 'Punching', value: 66.00 },
          { label: 'Presentation Folders', value: 2500.00 },
          { label: 'Lamination', value: 69120.00 },
        ],
      },
      3000: {
        printing: [
          { label: 'Make Readies', value: 12250.00 },
          { label: 'Paper', value: 26784.00 },
          { label: 'Run', value: 9840.00 },
        ],
        finishing: [
          { label: 'Folding', value: 3996.00 },
          { label: 'Binding', value: 18078.00 },
          { label: 'Scoring', value: 3795.00 },
          { label: 'Punching', value: 99.00 },
          { label: 'Presentation Folders', value: 3750.00 },
          { label: 'Lamination', value: 103680.00 },
        ],
      },
    },
    Digital: {
      1000: {
        printing: [
          { label: 'Make Ready', value: 500.00 },
          { label: 'Paper', value: 8928.00 },
          { label: 'Run Charges', value: 15000.00 },
        ],
        finishing: [
          { label: 'Folding', value: 1332.00 },
          { label: 'Binding', value: 6026.00 },
          { label: 'Scoring', value: 1265.00 },
          { label: 'Punching', value: 33.00 },
          { label: 'Presentation Folders', value: 1250.00 },
          { label: 'Lamination', value: 34560.00 },
        ],
      },
      2000: {
        printing: [
          { label: 'Make Ready', value: 500.00 },
          { label: 'Paper', value: 17856.00 },
          { label: 'Run Charges', value: 30000.00 },
        ],
        finishing: [
          { label: 'Folding', value: 2664.00 },
          { label: 'Binding', value: 12052.00 },
          { label: 'Scoring', value: 2530.00 },
          { label: 'Punching', value: 66.00 },
          { label: 'Presentation Folders', value: 2500.00 },
          { label: 'Lamination', value: 69120.00 },
        ],
      },
      3000: {
        printing: [
          { label: 'Make Ready', value: 500.00 },
          { label: 'Paper', value: 26784.00 },
          { label: 'Run Charges', value: 45000.00 },
        ],
        finishing: [
          { label: 'Folding', value: 3996.00 },
          { label: 'Binding', value: 18078.00 },
          { label: 'Scoring', value: 3795.00 },
          { label: 'Punching', value: 99.00 },
          { label: 'Presentation Folders', value: 3750.00 },
          { label: 'Lamination', value: 103680.00 },
        ],
      },
    },
  };

  const specs = {
    totalImages: 4,
    fittingImages: 4,
    sections: 6,
    sheets: 3600,
    plates: 24,
  };

  const formatPrice = (price: number): string => {
    return Math.round(price).toLocaleString('en-ZA');
  };

  const getCombinationKey = (printType: PrintType, qty: Quantity): string => {
    return `${printType}-${qty}`;
  };

  const toggleCombination = (printType: PrintType, qty: Quantity) => {
    const key = getCombinationKey(printType, qty);
    const newSet = new Set(selectedCombinations);
    if (newSet.has(key)) {
      if (newSet.size > 1) {
        newSet.delete(key);
      }
    } else {
      newSet.add(key);
    }
    setSelectedCombinations(newSet);
  };

  const calculateTotal = (printType: PrintType, qty: Quantity) => {
    const data = calculations[printType][qty];
    const printingTotal = data.printing.reduce((sum, item) => sum + item.value, 0);
    const finishingTotal = data.finishing.reduce((sum, item) => sum + item.value, 0);
    return printingTotal + finishingTotal;
  };

  const getCheaperOption = (qty: Quantity): PrintType | null => {
    const lithoTotal = calculateTotal('Litho', qty);
    const digitalTotal = calculateTotal('Digital', qty);
    if (lithoTotal < digitalTotal) return 'Litho';
    if (digitalTotal < lithoTotal) return 'Digital';
    return null;
  };

  const parsedCombinations = Array.from(selectedCombinations)
    .map(key => {
      const [printType, qtyStr] = key.split('-');
      return {
        printType: printType as PrintType,
        quantity: parseInt(qtyStr) as Quantity,
        key
      };
    })
    .sort((a, b) => {
      if (a.quantity !== b.quantity) return a.quantity - b.quantity;
      return a.printType.localeCompare(b.printType);
    });

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto px-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Calculation Result</h1>
        <p className="text-center text-gray-600 mb-8">
          Select print type and quantities to create quote lines
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Specifications - Top Left */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-4">Specifications</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Layout</p>
                <p className="text-sm font-semibold text-gray-900">Portrait</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Total Images</p>
                <p className="text-sm font-semibold text-gray-900">{specs.totalImages}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Fitting Images</p>
                <p className="text-sm font-semibold text-gray-900">{specs.fittingImages}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Sections</p>
                <p className="text-sm font-semibold text-gray-900">{specs.sections}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Sheets</p>
                <p className="text-sm font-semibold text-gray-900">{specs.sheets.toLocaleString('en-ZA')}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Plates</p>
                <p className="text-sm font-semibold text-gray-900">{specs.plates}</p>
              </div>
            </div>
          </div>
          {([1000, 2000, 3000] as Quantity[]).map((qty) => {
            const cheaperOption = getCheaperOption(qty);

            return (
              <div key={qty} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Quantity - {qty.toLocaleString('en-ZA')}
                </h2>
                <div className="space-y-4">

                {(['Litho', 'Digital'] as PrintType[]).map((printType) => {
                  const key = getCombinationKey(printType, qty);
                  const isSelected = selectedCombinations.has(key);
                  const isCheaper = cheaperOption === printType;
                  const data = calculations[printType][qty];
                  const printingTotal = data.printing.reduce((sum, item) => sum + item.value, 0);
                  const finishingTotal = data.finishing.reduce((sum, item) => sum + item.value, 0);
                  const total = printingTotal + finishingTotal;

                  return (
                    <div key={key} className="relative">
                      <button
                        onClick={() => toggleCombination(printType, qty)}
                        className={`group relative w-full text-left rounded-xl p-5 border transition-all cursor-pointer ${
                          isCheaper ? 'bg-green-50' : 'bg-white'
                        } ${
                          isSelected
                            ? 'border-blue-500 shadow-lg'
                            : 'border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center w-full">
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <h3 className="text-base font-semibold text-gray-900">{printType}</h3>
                          </div>
                          <div className="flex-1 flex justify-center">
                            {isCheaper && (
                              <span className="bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                                Better Price
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Total</p>
                            <p className="text-xl font-bold text-green-600">R {formatPrice(total)}</p>
                          </div>
                        </div>

                      <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500 ease-in-out">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDetail({printType, qty});
                            setShowDetailModal(true);
                          }}
                          className="absolute bottom-3 left-3 z-10 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-md transition-all transform hover:scale-105 opacity-0 group-hover:opacity-100"
                        >
                          Info
                        </button>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Printing</h4>
                              <div className="space-y-1">
                                {data.printing.map((item, index) => (
                                  <div key={index} className="flex justify-between text-xs">
                                    <span className="text-gray-600">{item.label}</span>
                                    <span className="font-semibold text-gray-900">R {formatPrice(item.value)}</span>
                                  </div>
                                ))}
                                <div className="flex justify-between text-xs pt-1 border-t border-gray-200 mt-1">
                                  <span className="font-semibold text-gray-700">Subtotal</span>
                                  <span className="font-semibold text-gray-900">R {formatPrice(printingTotal)}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Finishing</h4>
                              <div className="space-y-1">
                                {data.finishing.map((item, index) => (
                                  <div key={index} className="flex justify-between text-xs">
                                    <span className="text-gray-600">{item.label}</span>
                                    <span className="font-semibold text-gray-900">R {formatPrice(item.value)}</span>
                                  </div>
                                ))}
                                <div className="flex justify-between text-xs pt-1 border-t border-gray-200 mt-1">
                                  <span className="font-semibold text-gray-700">Subtotal</span>
                                  <span className="font-semibold text-gray-900">R {formatPrice(finishingTotal)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </button>
                    </div>
                  );
                })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white py-4 px-12 rounded-xl font-semibold text-base transition-all shadow-lg"
          >
            Submit {parsedCombinations.length} Quote Line{parsedCombinations.length > 1 ? 's' : ''}
          </button>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedDetail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-xl font-bold text-gray-900">Detailed Data</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Paper Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Paper Section</h3>

                  {/* Printing Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Printing Information</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity</span>
                        <span className="font-semibold text-gray-900">{specs.totalImages} images</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product Size</span>
                        <span className="font-semibold text-gray-900">A2 : 420x594</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Black Only</span>
                        <span className="font-semibold text-gray-900">No</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paper Size</span>
                        <span className="font-semibold text-gray-900">915x640 - A1 press</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fitting Images</span>
                        <span className="font-semibold text-gray-900">{specs.fittingImages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sides</span>
                        <span className="font-semibold text-gray-900">Single Sided</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-gray-600">Paper</span>
                        <span className="font-semibold text-gray-900">Brilliant White 135gsm - Gloss</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sheets</span>
                        <span className="font-semibold text-gray-900">{specs.sheets.toLocaleString('en-ZA')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sections</span>
                        <span className="font-semibold text-gray-900">{specs.sections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Press Pass</span>
                        <span className="font-semibold text-gray-900">No</span>
                      </div>
                    </div>
                  </div>

                  {/* Spots Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Spots Information</h4>
                    <p className="text-sm text-gray-500 italic">No spot color information available</p>
                  </div>

                  {/* Finishing Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Finishing Information</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">UV Varnish</span>
                        <span className="font-semibold text-gray-900">No</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spot Varnish</span>
                        <span className="font-semibold text-gray-900">No</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lamination</span>
                        <span className="font-semibold text-gray-900">No</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Binding</span>
                        <span className="font-semibold text-gray-900">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Folding</span>
                        <span className="font-semibold text-gray-900">0 folds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Collating</span>
                        <span className="font-semibold text-gray-900">No</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Die-cut</span>
                        <span className="font-semibold text-gray-900">No</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Scoring</span>
                        <span className="font-semibold text-gray-900">No</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-gray-600">Hand Gluing</span>
                        <span className="font-semibold text-gray-900">No</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Notes</h4>
                    <p className="text-sm text-gray-500 text-center py-4">No comments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
