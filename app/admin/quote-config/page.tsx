'use client';

import { useState } from 'react';
import {
  PaperCombination,
  PAPER_COMBINATIONS,
  PRODUCT_SIZES,
  ORIENTATIONS,
  SIDES,
  COATINGS,
  FINISHING_OPTIONS,
  FinishingOption,
} from '@/lib/config/paper-combinations';

interface SelectedPaperConfig extends PaperCombination {
  selectedGSM: number[];
  selectedSizes: string[];
  selectedCoatings: string[];
}

interface SelectedFinishingConfig {
  id: string;
  label: string;
  enabled: boolean;
  subSelections?: {
    [key: string]: string[];
  };
}

export default function QuoteConfigV2() {
  const [activeSection, setActiveSection] = useState<'paper' | 'product' | 'finishing'>('paper');

  // Paper System Config
  const [selectedPapers, setSelectedPapers] = useState<SelectedPaperConfig[]>([]);

  // Product Config
  const [selectedProductSizes, setSelectedProductSizes] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [selectedSides, setSelectedSides] = useState<string[]>([]);

  // Finishing Config
  const [finishingConfig, setFinishingConfig] = useState<SelectedFinishingConfig[]>([]);

  // Add paper to configuration
  const addPaper = (paper: PaperCombination) => {
    if (selectedPapers.some(p => p.paperId === paper.paperId)) return;

    setSelectedPapers([
      ...selectedPapers,
      {
        ...paper,
        selectedGSM: [],
        selectedSizes: [],
        selectedCoatings: [],
      },
    ]);
  };

  // Remove paper from configuration
  const removePaper = (paperId: string) => {
    setSelectedPapers(selectedPapers.filter(p => p.paperId !== paperId));
  };

  // Update paper sub-selections
  const updatePaperGSM = (paperId: string, gsm: number[]) => {
    setSelectedPapers(
      selectedPapers.map(p =>
        p.paperId === paperId ? { ...p, selectedGSM: gsm } : p
      )
    );
  };

  const updatePaperSizes = (paperId: string, sizes: string[]) => {
    setSelectedPapers(
      selectedPapers.map(p =>
        p.paperId === paperId ? { ...p, selectedSizes: sizes } : p
      )
    );
  };

  const updatePaperCoatings = (paperId: string, coatings: string[]) => {
    setSelectedPapers(
      selectedPapers.map(p =>
        p.paperId === paperId ? { ...p, selectedCoatings: coatings } : p
      )
    );
  };

  // Toggle finishing option
  const toggleFinishing = (option: FinishingOption) => {
    const existing = finishingConfig.find(f => f.id === option.id);

    if (existing) {
      setFinishingConfig(finishingConfig.filter(f => f.id !== option.id));
    } else {
      const newConfig: SelectedFinishingConfig = {
        id: option.id,
        label: option.label,
        enabled: true,
        subSelections: option.hasSubOptions
          ? Object.keys(option.subOptions!).reduce((acc, key) => ({
              ...acc,
              [key]: [],
            }), {})
          : undefined,
      };
      setFinishingConfig([...finishingConfig, newConfig]);
    }
  };

  // Update finishing sub-options
  const updateFinishingSubOption = (finishingId: string, subKey: string, values: string[]) => {
    setFinishingConfig(
      finishingConfig.map(f =>
        f.id === finishingId && f.subSelections
          ? {
              ...f,
              subSelections: {
                ...f.subSelections,
                [subKey]: values,
              },
            }
          : f
      )
    );
  };

  // Toggle helper
  const toggleInArray = <T,>(array: T[], item: T): T[] => {
    return array.includes(item) ? array.filter(i => i !== item) : [...array, item];
  };

  // Export configuration
  const handleExport = () => {
    const config = {
      paperSystem: selectedPapers,
      productSpecs: {
        sizes: selectedProductSizes,
        orientations: selectedOrientations,
        sides: selectedSides,
      },
      finishing: finishingConfig,
    };

    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `quote-config-${Date.now()}.json`);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quote Configuration</h1>
              <p className="text-sm text-gray-500 mt-1">
                Configure paper combinations, product specs, and finishing options
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm"
              >
                Export Config
              </button>
              <button
                onClick={() => alert('Configuration saved!')}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex gap-4 mt-6 border-b border-gray-200">
            <button
              onClick={() => setActiveSection('paper')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeSection === 'paper'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Paper System
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                {selectedPapers.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSection('product')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeSection === 'product'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Product Specs
            </button>
            <button
              onClick={() => setActiveSection('finishing')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeSection === 'finishing'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Finishing Options
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                {finishingConfig.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* PAPER SYSTEM SECTION */}
        {activeSection === 'paper' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Paper System:</strong> Paper Type, GSM, Sheet Size, and Coating are interwoven.
                Select which combinations users can choose.
              </p>
            </div>

            {/* Available Papers */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                1. Select Paper Types
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {PAPER_COMBINATIONS.map((paper) => {
                  const isSelected = selectedPapers.some(p => p.paperId === paper.paperId);
                  return (
                    <button
                      key={paper.paperId}
                      onClick={() => isSelected ? removePaper(paper.paperId) : addPaper(paper)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? 'bg-red-50 border-red-500'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{paper.paperName}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            GSM: {paper.allowedGSM.join(', ')}
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'bg-red-600 border-red-600' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Configure Selected Papers */}
            {selectedPapers.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  2. Configure Each Paper Type
                </h2>
                <div className="space-y-6">
                  {selectedPapers.map((paper) => (
                    <div key={paper.paperId} className="border-2 border-gray-200 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{paper.paperName}</h3>
                        <button
                          onClick={() => removePaper(paper.paperId)}
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        {/* GSM Selection */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            GSM Weights
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {paper.allowedGSM.map((gsm) => (
                              <button
                                key={gsm}
                                onClick={() =>
                                  updatePaperGSM(paper.paperId, toggleInArray(paper.selectedGSM, gsm))
                                }
                                className={`px-3 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                                  paper.selectedGSM.includes(gsm)
                                    ? 'bg-red-50 border-red-500 text-red-700'
                                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                                }`}
                              >
                                {gsm}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Sheet Sizes
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {paper.allowedSizes.map((size) => (
                              <button
                                key={size}
                                onClick={() =>
                                  updatePaperSizes(paper.paperId, toggleInArray(paper.selectedSizes, size))
                                }
                                className={`px-3 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                                  paper.selectedSizes.includes(size)
                                    ? 'bg-red-50 border-red-500 text-red-700'
                                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Coating Selection */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Coatings
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {COATINGS.filter(c => paper.allowedCoatings.includes(c.id)).map((coating) => (
                              <button
                                key={coating.id}
                                onClick={() =>
                                  updatePaperCoatings(
                                    paper.paperId,
                                    toggleInArray(paper.selectedCoatings, coating.id)
                                  )
                                }
                                className={`px-3 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                                  paper.selectedCoatings.includes(coating.id)
                                    ? 'bg-red-50 border-red-500 text-red-700'
                                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                                }`}
                              >
                                {coating.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Selection Summary */}
                      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                        <strong>Selected:</strong> {paper.selectedGSM.length} GSM weights, {paper.selectedSizes.length} sizes, {paper.selectedCoatings.length} coatings
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PRODUCT SPECS SECTION */}
        {activeSection === 'product' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Product Specs:</strong> These options are independent and don't affect each other.
              </p>
            </div>

            {/* Product Size */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Product Size (Cut Size)</h2>
              <p className="text-sm text-gray-600 mb-4">Select which final product sizes are available</p>
              <div className="grid grid-cols-8 gap-3">
                {PRODUCT_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedProductSizes(toggleInArray(selectedProductSizes, size))}
                    className={`px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all ${
                      selectedProductSizes.includes(size)
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Orientation</h2>
              <p className="text-sm text-gray-600 mb-4">Select allowed orientations</p>
              <div className="flex gap-3">
                {ORIENTATIONS.map((orientation) => (
                  <button
                    key={orientation}
                    onClick={() => setSelectedOrientations(toggleInArray(selectedOrientations, orientation))}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedOrientations.includes(orientation)
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {orientation}
                  </button>
                ))}
              </div>
            </div>

            {/* Sides */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Sides</h2>
              <p className="text-sm text-gray-600 mb-4">Select allowed printing sides</p>
              <div className="flex gap-3">
                {SIDES.map((side) => (
                  <button
                    key={side}
                    onClick={() => setSelectedSides(toggleInArray(selectedSides, side))}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedSides.includes(side)
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {side}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FINISHING OPTIONS SECTION */}
        {activeSection === 'finishing' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Finishing Options:</strong> Each finishing option can have its own sub-configurations.
              </p>
            </div>

            {/* Available Finishing Options */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                1. Select Finishing Options
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {FINISHING_OPTIONS.map((option) => {
                  const isSelected = finishingConfig.some(f => f.id === option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleFinishing(option)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? 'bg-red-50 border-red-500'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          {option.hasSubOptions && (
                            <div className="text-xs text-gray-500 mt-1">Has sub-options</div>
                          )}
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'bg-red-600 border-red-600' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Configure Finishing Sub-Options */}
            {finishingConfig.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  2. Configure Finishing Sub-Options
                </h2>
                <div className="space-y-6">
                  {finishingConfig.map((finishing) => {
                    const originalOption = FINISHING_OPTIONS.find(o => o.id === finishing.id);
                    if (!originalOption?.hasSubOptions || !finishing.subSelections) {
                      return (
                        <div key={finishing.id} className="border-2 border-gray-200 rounded-lg p-5">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">{finishing.label}</h3>
                            <span className="text-sm text-gray-500">No sub-options</span>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={finishing.id} className="border-2 border-gray-200 rounded-lg p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{finishing.label}</h3>
                          <button
                            onClick={() => toggleFinishing(originalOption)}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="space-y-4">
                          {Object.entries(originalOption.subOptions!).map(([key, values]) => (
                            <div key={key}>
                              <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {values.map((value) => {
                                  const isSelected = finishing.subSelections![key]?.includes(value);
                                  return (
                                    <button
                                      key={value}
                                      onClick={() => {
                                        const currentVals = finishing.subSelections![key] || [];
                                        updateFinishingSubOption(
                                          finishing.id,
                                          key,
                                          toggleInArray(currentVals, value)
                                        );
                                      }}
                                      className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                                        isSelected
                                          ? 'bg-red-50 border-red-500 text-red-700'
                                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                                      }`}
                                    >
                                      {value}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
