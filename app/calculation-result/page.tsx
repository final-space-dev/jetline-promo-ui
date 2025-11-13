'use client';

import { useState } from 'react';

type PrintType = 'Litho' | 'Digital';
type Quantity = 1000 | 2000 | 3000;

export default function CalculationResult() {
  const [selectedCombinations, setSelectedCombinations] = useState<Set<string>>(
    new Set(['Litho-1000'])
  );
  const [showImposition, setShowImposition] = useState(false);

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

        {showImposition && (
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Imposition Layout</h2>
            <div className="flex justify-center">
              <svg width="700" height="480" viewBox="0 0 700 480" className="mx-auto">
                {/* Arrow markers */}
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#9ca3af" />
                  </marker>
                  <marker id="arrowhead-reverse" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <polygon points="8 0, 0 4, 8 8" fill="#9ca3af" />
                  </marker>
                </defs>

                {/* A2 Sheet label at top */}
                <text x="350" y="30" fontSize="18" fill="#475569" textAnchor="middle" fontWeight="700">A2 Sheet (915×640mm)</text>

                {/*
                  Imposition calculation:
                  A2 sheet: 915mm × 640mm
                  A4 portrait: 210mm × 297mm
                  2×2 grid: 420mm × 594mm (total content)
                  Available space: 915-420=495mm width, 640-594=46mm height
                  Margin per side: width=247.5mm each side, height=23mm each side

                  SVG scale: Using 915mm width = 550px, so 1mm ≈ 0.601px
                  A2 rect: 550px × 384px (640mm)
                  A4 portrait: 126px × 178px (210×297mm)
                  Margins: 149px sides (247.5mm), 14px top/bottom (23mm)
                */}

                {/* A2 Sheet (landscape) - outer border with rounded corners */}
                <rect x="75" y="60" width="550" height="384"
                      fill="white" stroke="#64748b" strokeWidth="2" rx="10" ry="10" />

                {/* Calculate positions for 2×2 grid centered on A2 sheet
                     A2 left edge: 75
                     Left margin: 149px (247.5mm)
                     Page 1&3 left: 75 + 149 = 224
                     Page 2&4 left: 224 + 126 + 16 = 366 (16px = 27mm gap between pages)

                     A2 top edge: 60
                     Top margin: 14px (23mm)
                     Page 1&2 top: 60 + 14 = 74
                     Page 3&4 top: 74 + 178 + 16 = 268 (16px = 27mm gap between pages)
                */}

                {/* Page 1 - Top left A4 */}
                <rect x="224" y="74" width="126" height="178"
                      fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="6" ry="6" />
                <text x="287" y="168" fontSize="36" fill="#1e40af" textAnchor="middle" fontWeight="700">1</text>
                <text x="287" y="190" fontSize="11" fill="#1e40af" textAnchor="middle">210×297mm</text>

                {/* Page 2 - Top right A4 */}
                <rect x="366" y="74" width="126" height="178"
                      fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="6" ry="6" />
                <text x="429" y="168" fontSize="36" fill="#1e40af" textAnchor="middle" fontWeight="700">2</text>
                <text x="429" y="190" fontSize="11" fill="#1e40af" textAnchor="middle">210×297mm</text>

                {/* Page 3 - Bottom left A4 */}
                <rect x="224" y="268" width="126" height="178"
                      fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="6" ry="6" />
                <text x="287" y="362" fontSize="36" fill="#1e40af" textAnchor="middle" fontWeight="700">3</text>
                <text x="287" y="384" fontSize="11" fill="#1e40af" textAnchor="middle">210×297mm</text>

                {/* Page 4 - Bottom right A4 */}
                <rect x="366" y="268" width="126" height="178"
                      fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="6" ry="6" />
                <text x="429" y="362" fontSize="36" fill="#1e40af" textAnchor="middle" fontWeight="700">4</text>
                <text x="429" y="384" fontSize="11" fill="#1e40af" textAnchor="middle">210×297mm</text>

                {/* A2 Sheet dimensions at bottom - width */}
                <line x1="75" y1="460" x2="625" y2="460" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-reverse)"/>
                <text x="350" y="475" fontSize="13" fill="#6b7280" textAnchor="middle" fontWeight="600">915mm</text>

                {/* A2 Sheet dimensions at bottom right - height */}
                <line x1="645" y1="60" x2="645" y2="444" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-reverse)"/>
                <text x="668" y="257" fontSize="13" fill="#6b7280" textAnchor="middle" fontWeight="600" transform="rotate(90 668 257)">640mm</text>
              </svg>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
              4 × A4 Portrait pages centered on A2 Sheet with equal margins
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              <h3 className="text-lg font-bold text-gray-900">Specifications:</h3>
              <div className="flex gap-4 flex-1 justify-center">
                <div className="border border-gray-200 rounded-lg px-4 py-3 w-32">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1 text-left">Layout</span>
                  <span className="text-2xl font-bold text-gray-900 block text-center">Portrait</span>
                </div>
                <div className="border border-gray-200 rounded-lg px-4 py-3 w-32">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1 text-left">Total Images</span>
                  <span className="text-3xl font-bold text-gray-900 block text-center">{specs.totalImages}</span>
                </div>
                <div className="border border-gray-200 rounded-lg px-4 py-3 w-32">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1 text-left">Fitting Images</span>
                  <span className="text-3xl font-bold text-gray-900 block text-center">{specs.fittingImages}</span>
                </div>
                <div className="border border-gray-200 rounded-lg px-4 py-3 w-32">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1 text-left">Sections</span>
                  <span className="text-3xl font-bold text-gray-900 block text-center">{specs.sections}</span>
                </div>
                <div className="border border-gray-200 rounded-lg px-4 py-3 w-32">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1 text-left">Sheets</span>
                  <span className="text-3xl font-bold text-gray-900 block text-center">{specs.sheets.toLocaleString('en-ZA')}</span>
                </div>
                <div className="border border-gray-200 rounded-lg px-4 py-3 w-32">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1 text-left">Plates</span>
                  <span className="text-3xl font-bold text-gray-900 block text-center">{specs.plates}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <button
                type="button"
                onClick={() => setShowImposition((prev) => !prev)}
                aria-expanded={showImposition}
                className={`flex items-center gap-2 border py-3 px-6 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                  showImposition
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>Imposition</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showImposition ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-xl font-semibold text-sm transition-all shadow-lg"
              >
                Submit {parsedCombinations.length} Quote Line{parsedCombinations.length > 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {([1000, 2000, 3000] as Quantity[]).map((qty) => {
            const cheaperOption = getCheaperOption(qty);

            return (
              <div key={qty} className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 text-center">
                  {qty.toLocaleString('en-ZA')} Units
                </h2>

                {(['Litho', 'Digital'] as PrintType[]).map((printType) => {
                  const key = getCombinationKey(printType, qty);
                  const isSelected = selectedCombinations.has(key);
                  const isCheaper = cheaperOption === printType;
                  const data = calculations[printType][qty];
                  const printingTotal = data.printing.reduce((sum, item) => sum + item.value, 0);
                  const finishingTotal = data.finishing.reduce((sum, item) => sum + item.value, 0);
                  const total = printingTotal + finishingTotal;

                  return (
                    <button
                      key={key}
                      onClick={() => toggleCombination(printType, qty)}
                      className={`group relative w-full text-left rounded-xl p-5 border transition-all cursor-pointer ${
                        isCheaper ? 'bg-green-50' : 'bg-white'
                      } ${
                        isSelected
                          ? 'border-red-500 shadow-lg'
                          : 'border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected ? 'border-red-500 bg-red-500' : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <h3 className="text-base font-semibold text-gray-900">{printType}</h3>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="text-xl font-bold text-green-600">R {formatPrice(total)}</p>
                        </div>
                      </div>

                      <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500 ease-in-out">
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

                          {isCheaper && (
                            <div className="text-left">
                              <span className="text-xs font-semibold text-green-700">Better price</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
