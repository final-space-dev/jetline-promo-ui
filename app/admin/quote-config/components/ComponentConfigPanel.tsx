'use client';

import { useState } from 'react';
import { ComponentConfig, Option } from '@/lib/config/calculator-schema';
import SearchableMultiSelect from './SearchableMultiSelect';
import OptionTagList from './OptionTagList';

interface ComponentConfigPanelProps {
  component: ComponentConfig;
  onUpdateComponent: (componentId: string, updates: Partial<ComponentConfig>) => void;
}

export default function ComponentConfigPanel({
  component,
  onUpdateComponent,
}: ComponentConfigPanelProps) {
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>(
    component.options.map((opt) => opt.id)
  );

  const handleOptionsChange = (newSelectedIds: string[]) => {
    setSelectedOptionIds(newSelectedIds);
    const newOptions = component.options.filter((opt) =>
      newSelectedIds.includes(opt.id)
    );
    onUpdateComponent(component.id, { options: newOptions });
  };

  const handleRemoveOption = (optionId: string) => {
    const newSelectedIds = selectedOptionIds.filter((id) => id !== optionId);
    handleOptionsChange(newSelectedIds);
  };

  const handleClearAll = () => {
    handleOptionsChange([]);
  };

  const handleToggleRequired = () => {
    onUpdateComponent(component.id, { required: !component.required });
  };

  const handleToggleSearchable = () => {
    onUpdateComponent(component.id, { searchable: !component.searchable });
  };

  const handleUpdateLabel = (label: string) => {
    onUpdateComponent(component.id, { label });
  };

  const handleUpdateDescription = (description: string) => {
    onUpdateComponent(component.id, { description });
  };

  const handleUpdatePlaceholder = (placeholder: string) => {
    onUpdateComponent(component.id, { placeholder });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={component.label}
              onChange={(e) => handleUpdateLabel(e.target.value)}
              className="text-2xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full"
              placeholder="Component Label"
            />
            <input
              type="text"
              value={component.description || ''}
              onChange={(e) => handleUpdateDescription(e.target.value)}
              className="text-sm text-gray-500 bg-transparent border-none focus:outline-none focus:ring-0 p-0 mt-1 w-full"
              placeholder="Add description..."
            />
          </div>
          <div className="ml-4 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
            {component.type.replace('-', ' ')}
          </div>
        </div>

        {/* Component Settings */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={component.required}
              onChange={handleToggleRequired}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="text-sm font-medium text-gray-700">Required</span>
          </label>

          {(component.type === 'single-select' || component.type === 'multi-select') && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={component.searchable}
                onChange={handleToggleSearchable}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm font-medium text-gray-700">Searchable</span>
            </label>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {component.options.length} {component.options.length === 1 ? 'option' : 'options'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Placeholder Input */}
        {(component.type === 'single-select' ||
          component.type === 'multi-select' ||
          component.type === 'numeric-input') && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Placeholder Text
            </label>
            <input
              type="text"
              value={component.placeholder || ''}
              onChange={(e) => handleUpdatePlaceholder(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
              placeholder="Enter placeholder text..."
            />
          </div>
        )}

        {/* Option Management for Select Types */}
        {(component.type === 'single-select' || component.type === 'multi-select') && (
          <>
            {/* Add Options Section */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Manage Options
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Search and select which options should be available for this component.
              </p>
              <SearchableMultiSelect
                options={component.options}
                selectedIds={selectedOptionIds}
                onChange={handleOptionsChange}
                placeholder="Search to add options..."
                multiSelect={true}
              />
            </div>

            {/* Selected Options Display */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Active Options
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                These options will be shown to users in the calculator. Click the X to remove.
              </p>
              <OptionTagList
                options={component.options}
                selectedIds={selectedOptionIds}
                onRemove={handleRemoveOption}
                onClear={handleClearAll}
                emptyMessage="No options configured. Add options above to get started."
              />
            </div>

            {/* Bulk Actions */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Bulk Actions
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const allIds = component.options.map((opt) => opt.id);
                    handleOptionsChange(allIds);
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors"
                >
                  Clear All
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Custom Option
                </button>
              </div>
            </div>
          </>
        )}

        {/* Numeric Input Configuration */}
        {component.type === 'numeric-input' && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Number Input Settings
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Value
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="No minimum"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Value
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="No maximum"
                />
              </div>
            </div>
          </div>
        )}

        {/* Component Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Component ID: {component.id}
              </h4>
              <p className="text-xs text-blue-700">
                This identifier is used in permutation rules and calculator logic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
