'use client';

import { useState } from 'react';
import { ComponentConfig, Option } from '@/lib/config/calculator-schema';

interface OptionWithSubOptions extends Option {
  allowedSubOptions?: string[]; // e.g., allowed GSM values for this paper
}

interface SimpleComponentConfigProps {
  component: ComponentConfig;
  allAvailableOptions: Option[]; // All possible options from the system
  subOptionComponent?: ComponentConfig; // e.g., GSM component for Material
  onUpdateComponent: (componentId: string, selectedOptions: OptionWithSubOptions[]) => void;
}

export default function SimpleComponentConfig({
  component,
  allAvailableOptions,
  subOptionComponent,
  onUpdateComponent,
}: SimpleComponentConfigProps) {
  const [selectedOptions, setSelectedOptions] = useState<OptionWithSubOptions[]>(
    component.options.map(opt => ({ ...opt, allowedSubOptions: [] }))
  );
  const [searchTerm, setSearchTerm] = useState('');

  // Filter available options by search
  const filteredOptions = allAvailableOptions.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isOptionSelected = (optionId: string) => {
    return selectedOptions.some(opt => opt.id === optionId);
  };

  const toggleOption = (option: Option) => {
    if (isOptionSelected(option.id)) {
      // Remove option
      const newSelected = selectedOptions.filter(opt => opt.id !== option.id);
      setSelectedOptions(newSelected);
      onUpdateComponent(component.id, newSelected);
    } else {
      // Add option with empty sub-options
      const newSelected = [...selectedOptions, { ...option, allowedSubOptions: [] }];
      setSelectedOptions(newSelected);
      onUpdateComponent(component.id, newSelected);
    }
  };

  const updateSubOptions = (optionId: string, subOptionIds: string[]) => {
    const newSelected = selectedOptions.map(opt =>
      opt.id === optionId ? { ...opt, allowedSubOptions: subOptionIds } : opt
    );
    setSelectedOptions(newSelected);
    onUpdateComponent(component.id, newSelected);
  };

  const toggleSubOption = (optionId: string, subOptionId: string) => {
    const option = selectedOptions.find(opt => opt.id === optionId);
    if (!option) return;

    const currentSubOptions = option.allowedSubOptions || [];
    const newSubOptions = currentSubOptions.includes(subOptionId)
      ? currentSubOptions.filter(id => id !== subOptionId)
      : [...currentSubOptions, subOptionId];

    updateSubOptions(optionId, newSubOptions);
  };

  return (
    <div className="space-y-6">
      {/* Search and Add Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Select Allowed Options
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose which options store users can select for "{component.label}"
        </p>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search options..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 mb-4"
        />

        <div className="border border-gray-200 rounded-lg divide-y max-h-64 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = isOptionSelected(option.id);
              return (
                <label
                  key={option.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleOption(option)}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{option.label}</div>
                    {option.metadata && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        Available: {option.metadata.gsm?.join(', ')} GSM
                      </div>
                    )}
                  </div>
                </label>
              );
            })
          )}
        </div>
      </div>

      {/* Configure Selected Options with Sub-Options */}
      {selectedOptions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Configure Selected Options
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            For each option, specify which {subOptionComponent?.label || 'sub-options'} are allowed
          </p>

          <div className="space-y-4">
            {selectedOptions.map((option) => {
              const availableSubOptions = subOptionComponent?.options || [];
              const optionMetadata = allAvailableOptions.find(o => o.id === option.id)?.metadata;
              const allowedGSMs = optionMetadata?.gsm || [];

              return (
                <div
                  key={option.id}
                  className="border-2 border-gray-200 rounded-lg p-4 bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{option.label}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Select allowed {subOptionComponent?.label || 'options'} for this choice
                      </p>
                    </div>
                    <button
                      onClick={() => toggleOption(option)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Sub-options selection */}
                  {subOptionComponent && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-4 gap-2">
                        {availableSubOptions
                          .filter(subOpt => {
                            // Filter GSM options based on what's available for this material
                            if (allowedGSMs.length > 0) {
                              return allowedGSMs.includes(parseInt(subOpt.value));
                            }
                            return true;
                          })
                          .map((subOption) => {
                            const isSelected = (option.allowedSubOptions || []).includes(
                              subOption.id
                            );
                            return (
                              <button
                                key={subOption.id}
                                onClick={() => toggleSubOption(option.id, subOption.id)}
                                className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                                  isSelected
                                    ? 'bg-red-50 border-red-500 text-red-700'
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                {subOption.label}
                              </button>
                            );
                          })}
                      </div>

                      {/* Quick actions */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            const allSubIds = availableSubOptions
                              .filter(subOpt => {
                                if (allowedGSMs.length > 0) {
                                  return allowedGSMs.includes(parseInt(subOpt.value));
                                }
                                return true;
                              })
                              .map(so => so.id);
                            updateSubOptions(option.id, allSubIds);
                          }}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Select All
                        </button>
                        <span className="text-xs text-gray-400">•</span>
                        <button
                          onClick={() => updateSubOptions(option.id, [])}
                          className="text-xs text-gray-600 hover:text-gray-700 font-medium"
                        >
                          Clear All
                        </button>
                      </div>

                      {/* Selection count */}
                      <div className="text-xs text-gray-500 mt-2">
                        {(option.allowedSubOptions || []).length} of{' '}
                        {
                          availableSubOptions.filter(subOpt => {
                            if (allowedGSMs.length > 0) {
                              return allowedGSMs.includes(parseInt(subOpt.value));
                            }
                            return true;
                          }).length
                        }{' '}
                        selected
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {selectedOptions.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">
            No options selected. Choose options from the list above.
          </p>
        </div>
      )}
    </div>
  );
}
