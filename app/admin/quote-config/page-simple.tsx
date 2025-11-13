'use client';

import { useState } from 'react';
import { ComponentConfig } from '@/lib/config/calculator-schema';
import {
  PAPER_OPTIONS,
  SIZE_OPTIONS,
  GSM_OPTIONS,
  COLOUR_OPTIONS,
  FINISHING_OPTIONS,
} from '@/lib/config/default-configs';
import SimpleComponentConfig from './components/SimpleComponentConfig';

export default function QuoteConfigPageSimple() {
  const [activeComponentId, setActiveComponentId] = useState<string>('material');

  // Component definitions with relationships
  const components: Record<
    string,
    {
      config: ComponentConfig;
      allOptions: any[];
      subComponent?: ComponentConfig;
    }
  > = {
    material: {
      config: {
        id: 'material',
        label: 'Material',
        description: 'Paper types available to users',
        enabled: true,
        type: 'single-select',
        options: [],
        searchable: true,
        required: true,
      },
      allOptions: PAPER_OPTIONS,
      subComponent: {
        id: 'gsm',
        label: 'GSM Weights',
        description: 'Paper weights',
        enabled: true,
        type: 'single-select',
        options: GSM_OPTIONS,
        searchable: false,
        required: true,
      },
    },
    size: {
      config: {
        id: 'size',
        label: 'Size',
        description: 'Paper sizes available to users',
        enabled: true,
        type: 'single-select',
        options: [],
        searchable: true,
        required: true,
      },
      allOptions: SIZE_OPTIONS,
    },
    colour: {
      config: {
        id: 'colour',
        label: 'Colour',
        description: 'Print colour modes',
        enabled: true,
        type: 'single-select',
        options: [],
        searchable: false,
        required: true,
      },
      allOptions: COLOUR_OPTIONS,
    },
    finishing: {
      config: {
        id: 'finishing',
        label: 'Finishing Options',
        description: 'Post-print finishing',
        enabled: true,
        type: 'multi-select',
        options: [],
        searchable: true,
        required: false,
      },
      allOptions: FINISHING_OPTIONS,
    },
  };

  const [componentStates, setComponentStates] = useState(components);

  const handleUpdateComponent = (componentId: string, selectedOptions: any[]) => {
    setComponentStates({
      ...componentStates,
      [componentId]: {
        ...componentStates[componentId],
        config: {
          ...componentStates[componentId].config,
          options: selectedOptions,
        },
      },
    });
  };

  const handleExport = () => {
    const exportData = Object.entries(componentStates).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          enabled: value.config.enabled,
          options: value.config.options,
        },
      }),
      {}
    );

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `calculator-config-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const activeComponent = componentStates[activeComponentId];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quote Configuration</h1>
              <p className="text-sm text-gray-500 mt-1">
                Configure which options are available in the calculator
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm transition-colors"
              >
                Export Config
              </button>
              <button
                onClick={() => alert('Configuration saved!')}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-100px)]">
        {/* Left Sidebar - Component Selector */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Calculator Components
            </h2>
            <div className="space-y-1">
              {Object.entries(componentStates).map(([key, component]) => (
                <button
                  key={key}
                  onClick={() => setActiveComponentId(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeComponentId === key
                      ? 'bg-red-50 text-red-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm">{component.config.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {component.config.options.length} options configured
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 border-t border-gray-200 mt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Configuration Summary
            </h3>
            <div className="space-y-2 text-sm">
              {Object.entries(componentStates).map(([key, component]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">{component.config.label}</span>
                  <span className="font-medium text-gray-900">
                    {component.config.options.length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Component Configuration */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl">
            {/* Component Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeComponent.config.label}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {activeComponent.config.description}
              </p>
            </div>

            {/* Configuration Interface */}
            <SimpleComponentConfig
              component={activeComponent.config}
              allAvailableOptions={activeComponent.allOptions}
              subOptionComponent={activeComponent.subComponent}
              onUpdateComponent={handleUpdateComponent}
            />

            {/* Help Text */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
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
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">How it works</p>
                  <ul className="space-y-1 text-blue-800">
                    <li>1. Check the options you want to make available to users</li>
                    <li>
                      2. For options with sub-choices (like GSM for paper), select which
                      sub-options are allowed
                    </li>
                    <li>3. Users will only see the combinations you configure here</li>
                    <li>4. Click "Save Changes" when done</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
