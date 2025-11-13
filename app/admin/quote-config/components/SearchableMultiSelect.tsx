'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Option } from '@/lib/config/calculator-schema';

interface SearchableMultiSelectProps {
  options: Option[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  placeholder?: string;
  maxHeight?: string;
  multiSelect?: boolean;
  label?: string;
}

export default function SearchableMultiSelect({
  options,
  selectedIds,
  onChange,
  placeholder = 'Search options...',
  maxHeight = 'max-h-64',
  multiSelect = true,
  label,
}: SearchableMultiSelectProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuzzy search implementation
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;

    const search = searchTerm.toLowerCase();
    return options.filter((option) => {
      const label = option.label.toLowerCase();
      const value = option.value.toLowerCase();

      // Exact match
      if (label.includes(search) || value.includes(search)) return true;

      // Fuzzy match: check if all characters appear in order
      let searchIndex = 0;
      for (let i = 0; i < label.length && searchIndex < search.length; i++) {
        if (label[i] === search[searchIndex]) {
          searchIndex++;
        }
      }
      return searchIndex === search.length;
    });
  }, [options, searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        setFocusedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
        e.preventDefault();
        break;
      case 'ArrowUp':
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        e.preventDefault();
        break;
      case 'Enter':
        if (filteredOptions[focusedIndex]) {
          toggleOption(filteredOptions[focusedIndex].id);
        }
        e.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        e.preventDefault();
        break;
    }
  };

  const toggleOption = (optionId: string) => {
    if (multiSelect) {
      if (selectedIds.includes(optionId)) {
        onChange(selectedIds.filter((id) => id !== optionId));
      } else {
        onChange([...selectedIds, optionId]);
      }
    } else {
      onChange([optionId]);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const selectedOptions = options.filter((opt) => selectedIds.includes(opt.id));
  const selectedCount = selectedIds.length;

  return (
    <div ref={dropdownRef} className="relative">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      )}

      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            setFocusedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedCount > 0 && !isOpen
              ? `${selectedCount} selected`
              : placeholder
          }
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className={`absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg ${maxHeight} overflow-y-auto`}
        >
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500 text-sm">
              No options found for "{searchTerm}"
            </div>
          ) : (
            <div className="py-2">
              {filteredOptions.map((option, index) => {
                const isSelected = selectedIds.includes(option.id);
                const isFocused = index === focusedIndex;

                return (
                  <button
                    key={option.id}
                    onClick={() => toggleOption(option.id)}
                    className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${
                      isFocused ? 'bg-red-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    {multiSelect && (
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected
                            ? 'bg-red-600 border-red-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {option.label}
                      </div>
                      {option.metadata && (
                        <div className="text-xs text-gray-500 mt-0.5">
                          {Object.entries(option.metadata).map(([key, value]) => (
                            <span key={key} className="mr-2">
                              {key}: {Array.isArray(value) ? value.join(', ') : value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {!multiSelect && isSelected && (
                      <svg
                        className="w-5 h-5 text-red-600 flex-shrink-0"
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
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Selected Count Badge */}
      {multiSelect && selectedCount > 0 && !isOpen && (
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
            {selectedCount} selected
          </span>
          <button
            onClick={() => onChange([])}
            className="text-xs text-gray-500 hover:text-red-600 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
