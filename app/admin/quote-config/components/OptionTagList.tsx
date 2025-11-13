'use client';

import { Option } from '@/lib/config/calculator-schema';

interface OptionTagListProps {
  options: Option[];
  selectedIds: string[];
  onRemove: (optionId: string) => void;
  onClear?: () => void;
  maxDisplay?: number;
  emptyMessage?: string;
}

export default function OptionTagList({
  options,
  selectedIds,
  onRemove,
  onClear,
  maxDisplay,
  emptyMessage = 'No options selected',
}: OptionTagListProps) {
  const selectedOptions = options.filter((opt) => selectedIds.includes(opt.id));

  if (selectedOptions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
        {emptyMessage}
      </div>
    );
  }

  const displayedOptions = maxDisplay
    ? selectedOptions.slice(0, maxDisplay)
    : selectedOptions;
  const remainingCount = selectedOptions.length - displayedOptions.length;

  return (
    <div className="space-y-3">
      {/* Header with count and clear button */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Selected Options ({selectedOptions.length})
        </span>
        {onClear && selectedOptions.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-red-600 transition-colors font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Tag List */}
      <div className="flex flex-wrap gap-2">
        {displayedOptions.map((option) => (
          <div
            key={option.id}
            className="group inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-sm transition-all"
          >
            <span className="text-sm font-medium text-gray-900">
              {option.label}
            </span>
            {option.metadata && (
              <span className="text-xs text-gray-500">
                {Object.entries(option.metadata)
                  .map(([key, value]) =>
                    Array.isArray(value) ? value.join(', ') : value
                  )
                  .join(' • ')}
              </span>
            )}
            <button
              onClick={() => onRemove(option.id)}
              className="ml-1 p-0.5 rounded hover:bg-red-100 transition-colors"
              title={`Remove ${option.label}`}
            >
              <svg
                className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}

        {/* Show remaining count if maxDisplay is set */}
        {remainingCount > 0 && (
          <div className="inline-flex items-center px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg">
            <span className="text-sm font-medium text-gray-600">
              +{remainingCount} more
            </span>
          </div>
        )}
      </div>

      {/* Statistics */}
      {selectedOptions.length > 5 && (
        <div className="flex items-center gap-4 pt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <span>{selectedOptions.length} total options</span>
          </div>
        </div>
      )}
    </div>
  );
}
