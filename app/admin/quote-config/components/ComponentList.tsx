'use client';

import { ComponentConfig } from '@/lib/config/calculator-schema';

interface ComponentListProps {
  components: Record<string, ComponentConfig>;
  selectedComponentId: string | null;
  onSelectComponent: (componentId: string) => void;
  onToggleComponent: (componentId: string, enabled: boolean) => void;
}

export default function ComponentList({
  components,
  selectedComponentId,
  onSelectComponent,
  onToggleComponent,
}: ComponentListProps) {
  const componentList = Object.values(components).sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const enabledCount = componentList.filter((c) => c.enabled).length;
  const totalCount = componentList.length;

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Components</h2>
        <p className="text-xs text-gray-500">
          {enabledCount} of {totalCount} enabled
        </p>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {componentList.map((component) => {
            const isSelected = selectedComponentId === component.id;
            const optionCount = component.options.length;

            return (
              <div
                key={component.id}
                className={`group relative rounded-lg transition-all ${
                  isSelected
                    ? 'bg-red-50 ring-2 ring-red-500 ring-inset'
                    : 'hover:bg-gray-50'
                }`}
              >
                {/* Component Button */}
                <button
                  onClick={() => onSelectComponent(component.id)}
                  className="w-full text-left p-3 rounded-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`font-semibold text-sm truncate ${
                            component.enabled ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {component.label}
                        </span>
                        {component.required && (
                          <span className="text-xs text-red-600 font-medium">
                            Required
                          </span>
                        )}
                      </div>
                      {component.description && (
                        <p
                          className={`text-xs truncate ${
                            component.enabled ? 'text-gray-500' : 'text-gray-400'
                          }`}
                        >
                          {component.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={`text-xs ${
                            component.enabled ? 'text-gray-600' : 'text-gray-400'
                          }`}
                        >
                          {component.type === 'single-select' && '● Single'}
                          {component.type === 'multi-select' && '● Multiple'}
                          {component.type === 'numeric-input' && '● Number'}
                          {component.type === 'toggle' && '● Toggle'}
                        </span>
                        {optionCount > 0 && (
                          <span
                            className={`text-xs ${
                              component.enabled ? 'text-gray-600' : 'text-gray-400'
                            }`}
                          >
                            {optionCount} {optionCount === 1 ? 'option' : 'options'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Enable/Disable Toggle */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleComponent(component.id, !component.enabled);
                      }}
                      className="flex-shrink-0 mt-1"
                    >
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          component.enabled ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                        title={component.enabled ? 'Disable component' : 'Enable component'}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            component.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </button>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer with Add Component Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Component
        </button>
      </div>
    </div>
  );
}
