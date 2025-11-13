'use client';

import { useState } from 'react';
import { CalculatorConfig, ComponentConfig, PermutationRule } from '@/lib/config/calculator-schema';
import { DEFAULT_CALCULATOR_CONFIG } from '@/lib/config/default-configs';
import ComponentList from './components/ComponentList';
import ComponentConfigPanel from './components/ComponentConfigPanel';
import PermutationRuleBuilder from './components/PermutationRuleBuilder';

export default function QuoteConfigPage() {
  const [config, setConfig] = useState<CalculatorConfig>(DEFAULT_CALCULATOR_CONFIG);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    'size'
  );
  const [activeTab, setActiveTab] = useState<'components' | 'permutations' | 'preview'>(
    'components'
  );

  // Get the selected component
  const selectedComponent = selectedComponentId
    ? config.components[selectedComponentId]
    : null;

  // Handle component toggle (enable/disable)
  const handleToggleComponent = (componentId: string, enabled: boolean) => {
    setConfig({
      ...config,
      components: {
        ...config.components,
        [componentId]: {
          ...config.components[componentId],
          enabled,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  // Handle component updates
  const handleUpdateComponent = (
    componentId: string,
    updates: Partial<ComponentConfig>
  ) => {
    setConfig({
      ...config,
      components: {
        ...config.components,
        [componentId]: {
          ...config.components[componentId],
          ...updates,
        },
      },
      updatedAt: new Date().toISOString(),
    });
  };

  // Export configuration
  const handleExportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `calculator-config-${config.id}-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import configuration
  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedConfig = JSON.parse(e.target?.result as string);
        setConfig(importedConfig);
        setSelectedComponentId(Object.keys(importedConfig.components)[0] || null);
      } catch (error) {
        alert('Error importing configuration. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  // Save configuration (placeholder for future API integration)
  const handleSaveConfig = () => {
    // In the future, this would send to an API
    console.log('Saving configuration:', config);
    alert('Configuration saved successfully!');
  };

  // Handle permutation rule operations
  const handleAddRule = (rule: PermutationRule) => {
    setConfig({
      ...config,
      permutationRules: [...config.permutationRules, rule],
      updatedAt: new Date().toISOString(),
    });
  };

  const handleUpdateRule = (ruleId: string, updates: Partial<PermutationRule>) => {
    setConfig({
      ...config,
      permutationRules: config.permutationRules.map((rule) =>
        rule.id === ruleId ? { ...rule, ...updates } : rule
      ),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleDeleteRule = (ruleId: string) => {
    setConfig({
      ...config,
      permutationRules: config.permutationRules.filter((rule) => rule.id !== ruleId),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleToggleRule = (ruleId: string, enabled: boolean) => {
    handleUpdateRule(ruleId, { enabled });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quote Config</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage calculator components and configuration
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Import Button */}
              <label className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm transition-colors cursor-pointer flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportConfig}
                  className="hidden"
                />
              </label>

              {/* Export Button */}
              <button
                onClick={handleExportConfig}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export
              </button>

              {/* Save Button */}
              <button
                onClick={handleSaveConfig}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Configuration
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('components')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'components'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Components
            </button>
            <button
              onClick={() => setActiveTab('permutations')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'permutations'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Permutation Rules
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Live Preview
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-[calc(100vh-180px)]">
        {activeTab === 'components' && (
          <div className="h-full flex">
            {/* Left Sidebar - Component List */}
            <div className="w-80 flex-shrink-0">
              <ComponentList
                components={config.components}
                selectedComponentId={selectedComponentId}
                onSelectComponent={setSelectedComponentId}
                onToggleComponent={handleToggleComponent}
              />
            </div>

            {/* Right Panel - Component Configuration */}
            <div className="flex-1 overflow-hidden">
              {selectedComponent ? (
                <ComponentConfigPanel
                  component={selectedComponent}
                  onUpdateComponent={handleUpdateComponent}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                      />
                    </svg>
                    <p className="text-lg">Select a component to configure</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'permutations' && (
          <PermutationRuleBuilder
            rules={config.permutationRules}
            components={config.components}
            onAddRule={handleAddRule}
            onUpdateRule={handleUpdateRule}
            onDeleteRule={handleDeleteRule}
            onToggleRule={handleToggleRule}
          />
        )}

        {activeTab === 'preview' && (
          <div className="h-full flex items-center justify-center bg-white">
            <div className="text-center text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <p className="text-lg">Live Preview</p>
              <p className="text-sm mt-2">Coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>Config ID: {config.id}</span>
            <span>•</span>
            <span>Version: {config.version}</span>
            <span>•</span>
            <span>Last Updated: {new Date(config.updatedAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>All changes saved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
